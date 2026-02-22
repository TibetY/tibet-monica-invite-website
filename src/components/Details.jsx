export default function Details() {
  return (
    <section className="details" id="details" aria-labelledby="details-heading">
      <span className="section-label reveal" style={{ color: 'var(--ink)' }}>The Details</span>
      <h2 id="details-heading" className="details-heading reveal reveal-delay-1">Everything you need to know</h2>
      <p className="details-sub reveal reveal-delay-2">Come as you are — we just want you there.</p>

      <div className="cards" role="list">
        <div className="card reveal reveal-delay-1" role="listitem">
          {/* Emoji is decorative; the card label "When" conveys the same meaning */}
          <span className="card-icon" aria-hidden="true">📅</span>
          <div className="card-label" id="card-when">When</div>
          <div className="card-value" aria-labelledby="card-when">
            Saturday<br />
            <time dateTime="2026-05-16">16 May 2026</time>
          </div>
          <div className="card-note">
            Come for <time dateTime="16:00">4:00 PM</time><br />
            Party till <time dateTime="23:00">11:00 PM</time>
          </div>
        </div>

        <div className="card reveal reveal-delay-2" role="listitem">
          <span className="card-icon" aria-hidden="true">📍</span>
          <div className="card-label" id="card-where">Where</div>
          <div className="card-value" aria-labelledby="card-where">Our New Home</div>
          <div className="card-note">
            Address shared the week of<br />
            <em style={{ fontFamily: 'var(--font-serif)', fontSize: '.95rem' }}>(It's a surprise until then)</em>
          </div>
        </div>

        <div className="card reveal reveal-delay-3" role="listitem">
          <span className="card-icon" aria-hidden="true">🥂</span>
          <div className="card-label" id="card-vibe">Vibe</div>
          <div className="card-value" aria-labelledby="card-vibe">Backyard Party<br />With Cocktail Hour</div>
          <div className="card-note">Food, drinks &amp; good times</div>
        </div>
      </div>
    </section>
  );
}
