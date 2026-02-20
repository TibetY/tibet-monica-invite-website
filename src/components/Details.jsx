export default function Details() {
  return (
    <section className="details" id="details">
      <span className="section-label reveal" style={{ color: 'var(--sage)' }}>The Details</span>
      <h2 className="details-heading reveal reveal-delay-1">Everything you need to know</h2>
      <p className="details-sub reveal reveal-delay-2">Come as you are — we just want you there.</p>

      <div className="cards">
        <div className="card reveal reveal-delay-1">
          <span className="card-icon">📅</span>
          <div className="card-label">When</div>
          <div className="card-value">Saturday<br />16 May 2026</div>
          <div className="card-note">Come for 4:00 PM<br />Party till 11:00 PM</div>
        </div>

        <div className="card reveal reveal-delay-2">
          <span className="card-icon">📍</span>
          <div className="card-label">Where</div>
          <div className="card-value">Our New Home</div>
          <div className="card-note">
            Address shared the week of<br />
            <em style={{ fontFamily: 'var(--font-serif)', fontSize: '.95rem' }}>(It's a surprise until then)</em>
          </div>
        </div>

        <div className="card reveal reveal-delay-3">
          <span className="card-icon">🥂</span>
          <div className="card-label">Vibe</div>
          <div className="card-value">Backyard Party<br />With Cocktail Hour</div>
          <div className="card-note">Food, drinks &amp; good times</div>
        </div>
      </div>
    </section>
  );
}
