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
      setPwError('Incorrect password. Please try again.');
      setPw('');
    }
  }

  if (!unlocked) {
    return (
      <main id="main-content" className="gate-wrap">
        <div className="gate-card">
          <h1>Tibet &amp; Monica</h1>
          <p>Guest list — private access</p>
          {/* 1.3.1 — label explicitly associated with password input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleUnlock(); }}
            aria-label="Guest list login"
          >
            <label htmlFor="gate-password" className="gate-label">Password</label>
            <input
              id="gate-password"
              type="password"
              placeholder="Enter password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setPwError(''); }}
              aria-invalid={pwError ? 'true' : undefined}
              aria-describedby={pwError ? 'gate-error-msg' : undefined}
              autoFocus
              autoComplete="current-password"
            />
            <button type="submit" className="gate-btn">Enter</button>
          </form>
          {/* role="alert" announces the error immediately to screen readers */}
          <div
            id="gate-error-msg"
            className="gate-error"
            role="alert"
            aria-live="assertive"
          >
            {pwError}
          </div>
        </div>
      </main>
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

      <main id="main-content" className="gl-main">
        {/* Stats summary */}
        <div className="stats" role="list" aria-label="RSVP summary statistics">
          {[
            { label: 'RSVPs',         value: totalRsvps  },
            { label: 'Total guests',  value: totalGuests },
            { label: 'Kids',          value: totalKids   },
            { label: 'Dietary notes', value: withDietary },
          ].map(({ label, value }) => (
            <div key={label} className="stat-card" role="listitem">
              <div className="stat-label" id={`stat-${label.replace(/\s+/g,'-').toLowerCase()}`}>{label}</div>
              <div
                className="stat-value"
                aria-labelledby={`stat-${label.replace(/\s+/g,'-').toLowerCase()}`}
              >
                {loading ? '—' : value}
              </div>
            </div>
          ))}
        </div>

        <div className="table-wrap">
          {loading && <div className="loading" role="status" aria-live="polite">Loading guests…</div>}

          {!loading && guests.length === 0 && (
            <div className="empty" role="status">No RSVPs yet — check back soon.</div>
          )}

          {!loading && guests.length > 0 && (
            <table aria-label="RSVP guest list">
              <caption className="sr-only">
                Guest list with {totalRsvps} RSVPs totalling {totalGuests} guests
              </caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Party</th>
                  <th scope="col">Dietary</th>
                  <th scope="col">Note</th>
                  <th scope="col">Submitted</th>
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
                        <span className="pill green">
                          {guestCount} guest{guestCount !== 1 ? 's' : ''}
                        </span>
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
