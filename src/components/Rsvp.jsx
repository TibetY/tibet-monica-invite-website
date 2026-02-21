import { useState } from 'react';
import { db } from '../lib/supabase';

const INITIAL_FORM = {
  fname: '', lname: '', email: '',
  guests: 1, kids: 0,
  dietary: '', note: '',
};

export default function Rsvp() {
  const [form, setForm]             = useState(INITIAL_FORM);
  const [extraGuests, setExtraGuests] = useState([]);
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors]         = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  }

  function handleGuestCountChange(e) {
    const count = parseInt(e.target.value, 10);
    setForm((prev) => ({ ...prev, guests: count }));
    const extras = [];
    for (let i = 2; i <= count; i++) {
      extras.push({ id: i, name: '', email: '', dietary: '' });
    }
    setExtraGuests(extras);
  }

  function handleExtraChange(id, field, value) {
    setExtraGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.fname.trim()) newErrors.fname = true;
    if (!form.email.trim()) newErrors.email = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    const row = {
      fname:   form.fname.trim(),
      lname:   form.lname.trim(),
      email:   form.email.trim(),
      guests:  form.guests,
      kids:    parseInt(form.kids, 10),
      dietary: form.dietary.trim(),
      note:    form.note.trim(),
    };

    extraGuests.forEach((g) => {
      row[`guest${g.id}_name`]    = g.name.trim()    || null;
      row[`guest${g.id}_email`]   = g.email.trim()   || null;
      row[`guest${g.id}_dietary`] = g.dietary.trim() || null;
    });

    const { error } = await db.from('rsvps').insert(row);
    setSubmitting(false);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error(error);
      alert('Something went wrong — please try again or email us at tibety@protonmail.com');
    }
  }

  return (
    <section className="rsvp" id="rsvp">

      <svg className="rsvp-botanical rsvp-botanical-l" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M50 360 C70 295 145 215 220 135 C258 95 315 55 355 28" stroke="#4d7352" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M220 135 C192 118 158 130 142 158 C126 185 136 218 158 226" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.25)" strokeLinecap="round"/>
        <path d="M268 90 C242 74 210 82 196 107 C181 132 192 160 212 167" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.2)" strokeLinecap="round"/>
        <path d="M315 58 C293 44 263 52 249 74 C235 96 245 122 265 128" stroke="#4d7352" strokeWidth="1.1" fill="rgba(122,158,126,.18)" strokeLinecap="round"/>
      </svg>

      <svg className="rsvp-botanical rsvp-botanical-r" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M50 360 C70 295 145 215 220 135 C258 95 315 55 355 28" stroke="#4d7352" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M220 135 C192 118 158 130 142 158 C126 185 136 218 158 226" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.25)" strokeLinecap="round"/>
        <path d="M268 90 C242 74 210 82 196 107 C181 132 192 160 212 167" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.2)" strokeLinecap="round"/>
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <span className="section-label reveal" style={{ color: 'var(--sage-deep)' }}>RSVP</span>
        <h2 className="rsvp-heading reveal reveal-delay-1">Will you join us?</h2>
        <p className="rsvp-sub reveal reveal-delay-2">Let us know by 16 April 2026</p>

        {submitted ? (
          <div className="thankyou">
            <div className="thankyou-icon">🌿</div>
            <div className="thankyou-heading">Can't wait to see you!</div>
            <p className="thankyou-text">We'll be in touch soon with the address and all the details. Thank you for celebrating with us.</p>
          </div>
        ) : (
          <form className="rsvp-form reveal reveal-delay-2" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <div className="field">
                <label htmlFor="fname">First name</label>
                <input
                  type="text" id="fname" name="fname"
                  placeholder="Your first name"
                  value={form.fname} onChange={handleChange}
                  className={errors.fname ? 'error' : ''}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="lname">Last name</label>
                <input
                  type="text" id="lname" name="lname"
                  placeholder="Your last name"
                  value={form.lname} onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" name="email"
                placeholder="you@example.com"
                value={form.email} onChange={handleChange}
                className={errors.email ? 'error' : ''}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="guests">Number of guests</label>
              <select id="guests" name="guests" value={form.guests} onChange={handleGuestCountChange}>
                <option value={1}>Just me (1)</option>
                <option value={2}>2 of us</option>
                <option value={3}>3 guests</option>
              </select>
            </div>

            {extraGuests.map((g) => (
              <div key={g.id} className="guest-block">
                <span className="guest-block-label">Guest {g.id}</span>
                <div className="field-group">
                  <div className="field">
                    <label htmlFor={`guest${g.id}_name`}>Full name</label>
                    <input
                      type="text" id={`guest${g.id}_name`}
                      placeholder={`Guest ${g.id} name`}
                      value={g.name}
                      onChange={(e) => handleExtraChange(g.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`guest${g.id}_email`}>Email</label>
                    <input
                      type="email" id={`guest${g.id}_email`}
                      placeholder="guest@example.com"
                      value={g.email}
                      onChange={(e) => handleExtraChange(g.id, 'email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor={`guest${g.id}_dietary`}>Dietary notes</label>
                  <input
                    type="text" id={`guest${g.id}_dietary`}
                    placeholder="e.g. vegetarian, gluten-free, allergies…"
                    value={g.dietary}
                    onChange={(e) => handleExtraChange(g.id, 'dietary', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <div className="field">
              <label htmlFor="kids">Number of kids (if any)</label>
              <select id="kids" name="kids" value={form.kids} onChange={handleChange}>
                <option value={0}>None 🥳</option>
                <option value={1}>1 kid 🤨</option>
                <option value={2}>2 kids 😩</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="dietary">Dietary notes</label>
              <input
                type="text" id="dietary" name="dietary"
                placeholder="e.g. vegetarian, gluten-free, allergies…"
                value={form.dietary} onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="note">
                A little note for us <span style={{ opacity: .5 }}>(optional)</span>
              </label>
              <textarea
                id="note" name="note"
                placeholder="Congrats, a memory, a song request…"
                value={form.note} onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? 'Sending…' : 'RSVP with love'}
            </button>
          </form>
        )}

        <p className="rsvp-deadline reveal">
          Questions? Reach us at{' '}
          <a href="mailto:tibety@protonmail.com" style={{ color: 'var(--sage-deep)' }}>
            tibety@protonmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
