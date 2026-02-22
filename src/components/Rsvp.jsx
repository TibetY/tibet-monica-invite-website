import { useState, useRef, useEffect } from 'react';
import { db } from '../lib/supabase';

const INITIAL_FORM = {
  fname: '', lname: '', email: '',
  guests: 1, kids: 0,
  dietary: '', note: '',
};

export default function Rsvp() {
  const [form, setForm]               = useState(INITIAL_FORM);
  const [extraGuests, setExtraGuests] = useState([]);
  const [submitted, setSubmitted]     = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [reviewing, setReviewing]     = useState(false); // 3.3.6 AAA — review before submit
  const [errors, setErrors]           = useState({});

  const reviewHeadingRef = useRef(null);
  const thankyouHeadingRef = useRef(null);

  // Move focus to review heading when review step opens (2.4.3 — Focus Order)
  useEffect(() => {
    if (reviewing && reviewHeadingRef.current) {
      reviewHeadingRef.current.focus();
    }
  }, [reviewing]);

  // Move focus to thank-you heading after submission (2.4.3 — Focus Order)
  useEffect(() => {
    if (submitted && thankyouHeadingRef.current) {
      thankyouHeadingRef.current.focus();
    }
  }, [submitted]);

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

  // First click: validate then show review panel (3.3.6 AAA)
  function handleReview(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.fname.trim()) newErrors.fname = true;
    if (!form.email.trim()) newErrors.email = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setReviewing(true);
  }

  // Second click: actually submit
  async function handleSubmit() {
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
      // Use a visible error message instead of alert() for accessibility
      setReviewing(false);
      setErrors({ submit: 'Something went wrong — please try again or email us at tibety@protonmail.com' });
    }
  }

  const guestCountLabel = form.guests === 1
    ? 'Just me (1)'
    : form.guests === 2
      ? '2 of us'
      : '3 guests';

  return (
    <section className="rsvp" id="rsvp" aria-labelledby="rsvp-heading">

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
        <span className="section-label reveal" style={{ color: 'var(--ink)' }}>RSVP</span>
        <h2 id="rsvp-heading" className="rsvp-heading reveal reveal-delay-1">Will you join us?</h2>
        <p className="rsvp-sub reveal reveal-delay-2">
          Let us know by <time dateTime="2026-04-16">16 April 2026</time>
        </p>

        {/* Submit error (non-network) */}
        {errors.submit && (
          <p role="alert" style={{ color: 'var(--error-text)', marginBottom: '1rem', fontSize: '.9rem' }}>
            {errors.submit}
          </p>
        )}

        {submitted ? (
          /* ── Thank-you state ── */
          <div className="thankyou" aria-live="polite">
            <div className="thankyou-icon" aria-hidden="true">🌿</div>
            {/* tabIndex="-1" allows programmatic focus without adding to tab order */}
            <h3
              className="thankyou-heading"
              tabIndex="-1"
              ref={thankyouHeadingRef}
            >
              Can't wait to see you!
            </h3>
            <p className="thankyou-text">
              We'll be in touch soon with the address and all the details.
              Thank you for celebrating with us.
            </p>
          </div>

        ) : reviewing ? (
          /* ── Review step (3.3.6 AAA — Error Prevention: All) ── */
          <div className="rsvp-review" role="region" aria-labelledby="review-heading">
            <h3
              id="review-heading"
              className="rsvp-review-heading"
              tabIndex="-1"
              ref={reviewHeadingRef}
            >
              Review your RSVP
            </h3>
            <dl>
              <dt>Name</dt>
              <dd>{form.fname} {form.lname}</dd>
              <dt>Email</dt>
              <dd>{form.email}</dd>
              <dt>Guests</dt>
              <dd>{guestCountLabel}</dd>
              {extraGuests.map((g) => g.name && (
                <>
                  <dt key={`dt-${g.id}`}>Guest {g.id}</dt>
                  <dd key={`dd-${g.id}`}>
                    {g.name}{g.dietary ? ` — ${g.dietary}` : ''}
                  </dd>
                </>
              ))}
              <dt>Kids</dt>
              <dd>{form.kids > 0 ? `${form.kids} kid${form.kids !== 1 ? 's' : ''}` : 'None'}</dd>
              {form.dietary && (
                <>
                  <dt>Dietary</dt>
                  <dd>{form.dietary}</dd>
                </>
              )}
              {form.note && (
                <>
                  <dt>Note</dt>
                  <dd>{form.note}</dd>
                </>
              )}
            </dl>
            <div className="rsvp-review-actions">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setReviewing(false)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Confirm RSVP'}
              </button>
            </div>
          </div>

        ) : (
          /* ── Main form ── */
          <form
            className="rsvp-form reveal reveal-delay-2"
            onSubmit={handleReview}
            noValidate
            aria-label="RSVP form"
          >
            {/* 3.3.5 AAA — Help: instructions before required fields */}
            <p className="rsvp-form-hint">
              Fields marked <abbr title="required">*</abbr> are required.
            </p>

            <div className="field-group">
              <div className="field">
                <label htmlFor="fname">
                  First name <abbr title="required" aria-label="required">*</abbr>
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Your first name"
                  value={form.fname}
                  onChange={handleChange}
                  aria-invalid={errors.fname ? 'true' : 'false'}
                  aria-describedby={errors.fname ? 'fname-error' : undefined}
                  aria-required="true"
                  autoComplete="given-name"
                  required
                />
                {errors.fname && (
                  <span id="fname-error" className="field-error" role="alert">
                    First name is required.
                  </span>
                )}
              </div>
              <div className="field">
                <label htmlFor="lname">Last name</label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Your last name"
                  value={form.lname}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">
                Email <abbr title="required" aria-label="required">*</abbr>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : 'email-hint'}
                aria-required="true"
                autoComplete="email"
                required
              />
              <span id="email-hint" className="sr-only">
                We'll use this to send you the address before the event.
              </span>
              {errors.email && (
                <span id="email-error" className="field-error" role="alert">
                  Email address is required.
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="guests">Number of guests</label>
              <select
                id="guests"
                name="guests"
                value={form.guests}
                onChange={handleGuestCountChange}
                aria-describedby="guests-hint"
              >
                <option value={1}>Just me (1)</option>
                <option value={2}>2 of us</option>
                <option value={3}>3 guests</option>
              </select>
              <span id="guests-hint" className="sr-only">
                Additional guest fields will appear below when you select more than one.
              </span>
            </div>

            {/* Extra guest blocks — grouped with role="group" + aria-labelledby for semantics */}
            {extraGuests.map((g) => (
              <div
                key={g.id}
                className="guest-block"
                role="group"
                aria-labelledby={`guest-${g.id}-label`}
              >
                <p id={`guest-${g.id}-label`} className="guest-block-label">
                  Guest {g.id}
                </p>
                <div className="field-group">
                  <div className="field">
                    <label htmlFor={`guest${g.id}_name`}>Full name</label>
                    <input
                      type="text"
                      id={`guest${g.id}_name`}
                      placeholder={`Guest ${g.id} name`}
                      value={g.name}
                      autoComplete="off"
                      onChange={(e) => handleExtraChange(g.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`guest${g.id}_email`}>Email</label>
                    <input
                      type="email"
                      id={`guest${g.id}_email`}
                      placeholder="guest@example.com"
                      value={g.email}
                      autoComplete="off"
                      onChange={(e) => handleExtraChange(g.id, 'email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor={`guest${g.id}_dietary`}>Dietary notes</label>
                  <input
                    type="text"
                    id={`guest${g.id}_dietary`}
                    placeholder="e.g. vegetarian, gluten-free, allergies…"
                    value={g.dietary}
                    autoComplete="off"
                    onChange={(e) => handleExtraChange(g.id, 'dietary', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <div className="field">
              <label htmlFor="kids">Number of kids (if any)</label>
              <select id="kids" name="kids" value={form.kids} onChange={handleChange}>
                <option value={0}>None</option>
                <option value={1}>1 kid</option>
                <option value={2}>2 kids</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="dietary">
                Your dietary notes{' '}
                <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, opacity: .7 }}>
                  (optional)
                </span>
              </label>
              <input
                type="text"
                id="dietary"
                name="dietary"
                placeholder="e.g. vegetarian, gluten-free, allergies…"
                value={form.dietary}
                onChange={handleChange}
                aria-describedby="dietary-hint"
              />
              <span id="dietary-hint" className="sr-only">
                Let us know about any dietary restrictions or allergies.
              </span>
            </div>

            <div className="field">
              <label htmlFor="note">
                A little note for us{' '}
                <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, opacity: .7 }}>
                  (optional)
                </span>
              </label>
              <textarea
                id="note"
                name="note"
                placeholder="Congrats, a memory, a song request…"
                value={form.note}
                onChange={handleChange}
                aria-describedby="note-hint"
              />
              <span id="note-hint" className="sr-only">
                Share a message, song request, or anything you'd like us to know.
              </span>
            </div>

            <button type="submit" className="btn" disabled={submitting}>
              Review RSVP
            </button>
          </form>
        )}

        <p className="rsvp-deadline reveal">
          Questions? Reach us at{' '}
          <a
            href="mailto:tibety@protonmail.com"
            style={{ color: 'var(--ink)', textDecoration: 'underline' }}
            aria-label="Email us at tibety@protonmail.com"
          >
            tibety@protonmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
