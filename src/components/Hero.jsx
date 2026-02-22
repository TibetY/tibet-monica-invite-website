export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">

      <svg className="botanical hero-botanical-tl" viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M60 340 C80 280 160 200 240 120 C280 80 340 40 380 20" stroke="#4d7352" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M240 120 C210 100 170 110 150 140 C130 165 140 200 160 210" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.35)" strokeLinecap="round"/>
        <path d="M280 80 C255 65 220 72 205 98 C190 122 200 150 218 158" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.28)" strokeLinecap="round"/>
        <path d="M330 50 C310 35 278 42 265 65 C252 88 262 112 280 118" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.25)" strokeLinecap="round"/>
        <path d="M180 170 C160 145 125 148 112 174 C100 198 112 228 132 234" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.2)" strokeLinecap="round"/>
        <path d="M290 100 C320 80 360 90 370 115 C380 140 360 165 338 165" stroke="#4d7352" strokeWidth="1.1" fill="rgba(122,158,126,.18)" strokeLinecap="round"/>
        <path d="M200 135 Q185 115 175 122 Q165 128 172 142" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.4)"/>
        <path d="M215 125 Q200 102 188 108 Q177 115 186 130" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.35)"/>
        <path d="M140 200 Q122 182 112 192 Q103 200 114 215" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.35)"/>
        <path d="M120 260 Q100 248 94 260 Q88 272 100 280" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.3)"/>
        <path d="M90 300 Q72 290 68 302 Q64 314 76 320" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.25)"/>
      </svg>

      <svg className="botanical hero-botanical-br" viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M60 340 C80 280 160 200 240 120 C280 80 340 40 380 20" stroke="#4d7352" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M240 120 C210 100 170 110 150 140 C130 165 140 200 160 210" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.35)" strokeLinecap="round"/>
        <path d="M280 80 C255 65 220 72 205 98 C190 122 200 150 218 158" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.28)" strokeLinecap="round"/>
        <path d="M330 50 C310 35 278 42 265 65 C252 88 262 112 280 118" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.25)" strokeLinecap="round"/>
        <path d="M290 100 C320 80 360 90 370 115 C380 140 360 165 338 165" stroke="#4d7352" strokeWidth="1.1" fill="rgba(122,158,126,.18)" strokeLinecap="round"/>
        <path d="M200 135 Q185 115 175 122 Q165 128 172 142" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.4)"/>
        <path d="M215 125 Q200 102 188 108 Q177 115 186 130" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.35)"/>
        <path d="M140 200 Q122 182 112 192 Q103 200 114 215" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.35)"/>
      </svg>

      <span className="hero-eyebrow">You're invited to celebrate</span>

      <h1 id="hero-heading" className="hero-names">
        <em>Tibet</em>
        <span className="hero-ampersand" aria-hidden="true">&amp;</span>
        <em>Monica</em>
      </h1>

      {/* Decorative divider — hidden from assistive technology */}
      <div className="hero-divider" aria-hidden="true" />

      <p className="hero-tagline">
        We are saying "I do" — now come see where we do life.
        <br />Join us for a housewarming &amp; elopement celebration.
      </p>

      <div className="hero-date-badge">
        <time dateTime="2026-05-16T16:00">Saturday · 16 May 2026 · 4:00 PM</time>
      </div>

      {/* Decorative scroll indicator — hidden from assistive technology */}
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

    </section>
  );
}
