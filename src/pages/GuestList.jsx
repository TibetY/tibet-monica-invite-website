import { useState } from 'react';
import { db } from '../lib/supabase';

const PASSWORD = import.meta.env.VITE_GUESTLIST_PASSWORD;

export default function GuestList() {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadGuests() {
    setLoading(true);
    const { data, error } = await db
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false });
    setLoading(false);
    if (!error && data) setGuests(data);
  }

  function handleUnlock() {
    if (pw === PASSWORD) {
      setUnlocked(true);
      loadGuests();
    } else {
      setPwError('Incorrect password.');
      setPw('');
    }
  }

  if (!unlocked) {
    return (
      <div className="gate-wrap">
        <div className="gate-card">
          <h1>Tibet &amp; Monica</h1>
          <p>Guest list · Private</p>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            autoFocus
          />
          <button className="gate-btn" onClick={handleUnlock}>Enter</button>
          <div className="gate-error">{pwError}</div>
        </div>
      </div>
    );
  }

  const totalRsvps  = guests.length;
  const totalGuests = guests.reduce((s, r) => s + (r.guests || 1), 0);
  const totalKids   = guests.reduce((s, r) => s + (r.kids   || 0), 0);
  const withDietary = guests.filter((r) =>
    [r.dietary, r.guest2_dietary, r.guest3_dietary].some((d) => d && d.trim())
  ).length;

  return (
    <>
      <header className="gl-header">
        <h1>Guest List</h1>
        <span className="subtitle">Tibet &amp; Monica · May 2026</span>
      </header>

      <main className="gl-main">
        <div className="stats">
          {[
            { label: 'RSVPs',         value: totalRsvps  },
            { label: 'Total guests',  value: totalGuests },
            { label: 'Kids',          value: totalKids   },
            { label: 'Dietary notes', value: withDietary },
          ].map(({ label, value }) => (
            <div key={label} className="stat-card">
              <div className="stat-label">{label}</div>
              <div className="stat-value">{loading ? '—' : value}</div>
            </div>
          ))}
        </div>

        <div className="table-wrap">
          {loading && <div className="loading">Loading guests…</div>}

          {!loading && guests.length === 0 && (
            <div className="empty">No RSVPs yet — check back soon.</div>
          )}

          {!loading && guests.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Party</th>
                  <th>Dietary</th>
                  <th>Note</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((r) => {
                  const guestCount = r.guests || 1;
                  const kidsCount  = r.kids   || 0;

                  const extras = [];
                  if (guestCount >= 2 && r.guest2_name)
                    extras.push(`${r.guest2_name}${r.guest2_dietary ? ' · ' + r.guest2_dietary : ''}`);
                  if (guestCount >= 3 && r.guest3_name)
                    extras.push(`${r.guest3_name}${r.guest3_dietary ? ' · ' + r.guest3_dietary : ''}`);

                  const dietaryItems = [r.dietary, r.guest2_dietary, r.guest3_dietary]
                    .filter((d) => d && d.trim());

                  const submitted = r.created_at
                    ? new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                    : '—';

                  return (
                    <tr key={r.id}>
                      <td className="name-cell">
                        <strong>{r.fname} {r.lname || ''}</strong>
                      </td>
                      <td><span style={{ fontSize: '.82rem' }}>{r.email}</span></td>
                      <td>
                        <span className="pill green">{guestCount} guest{guestCount !== 1 ? 's' : ''}</span>
                        {kidsCount > 0 && (
                          <span className="pill" style={{ marginLeft: '.3rem' }}>
                            {kidsCount} kid{kidsCount !== 1 ? 's' : ''}
                          </span>
                        )}
                        {extras.length > 0 && (
                          <div className="guests-detail">
                            {extras.map((e, i) => <span key={i}>{e}<br /></span>)}
                          </div>
                        )}
                      </td>
                      <td>
                        {dietaryItems.length > 0
                          ? <span className="dietary-text">{dietaryItems.join('; ')}</span>
                          : <span className="dietary-none">None</span>}
                      </td>
                      <td>
                        {r.note
                          ? <span className="note-text">{r.note}</span>
                          : <span className="dietary-none">—</span>}
                      </td>
                      <td><span className="date-text">{submitted}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}
