import { Link } from 'react-router-dom';

const REGISTRY_URL = 'https://www.myregistry.com/giftlist/the-celebration';

const gifts = [
  { emoji: '🏡', label: 'Home & Garden' },
  { emoji: '🍳', label: 'Kitchen' },
  { emoji: '✈️',  label: 'Travel Fund' },
  { emoji: '📚', label: 'Books & Art' },
];

export default function Registry() {
  return (
    <div className="registry-page">

      {/* ── Botanical corners ── */}
      <svg className="botanical registry-botanical-tl" viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M60 340 C80 280 160 200 240 120 C280 80 340 40 380 20" stroke="#4d7352" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M240 120 C210 100 170 110 150 140 C130 165 140 200 160 210" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.35)" strokeLinecap="round"/>
        <path d="M280 80 C255 65 220 72 205 98 C190 122 200 150 218 158" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.28)" strokeLinecap="round"/>
        <path d="M330 50 C310 35 278 42 265 65 C252 88 262 112 280 118" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.25)" strokeLinecap="round"/>
        <path d="M200 135 Q185 115 175 122 Q165 128 172 142" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.4)"/>
        <path d="M215 125 Q200 102 188 108 Q177 115 186 130" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.35)"/>
      </svg>

      <svg className="botanical registry-botanical-br" viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M60 340 C80 280 160 200 240 120 C280 80 340 40 380 20" stroke="#4d7352" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M240 120 C210 100 170 110 150 140 C130 165 140 200 160 210" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.35)" strokeLinecap="round"/>
        <path d="M280 80 C255 65 220 72 205 98 C190 122 200 150 218 158" stroke="#4d7352" strokeWidth="1.2" fill="rgba(122,158,126,.28)" strokeLinecap="round"/>
        <path d="M200 135 Q185 115 175 122 Q165 128 172 142" stroke="#4d7352" strokeWidth="1" fill="rgba(168,197,170,.4)"/>
      </svg>

      {/* ── Header ── */}
      <div className="registry-header">
        <span className="section-label" style={{ color: 'var(--sage)' }}>The Wishlist</span>
        <h1 className="registry-heading">Gift Registry</h1>
        <div className="registry-divider" />
        <p className="registry-sub">
          Your presence is truly the only gift we need —<br />
          but if you'd like to spoil us, here's where to start.
        </p>
      </div>

      {/* ── Card ── */}
      <div className="registry-card-wrap">
        <div className="registry-card">

          <div className="registry-card-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M32 8C24 8 18 14 18 22C18 28 22 33 32 40C42 33 46 28 46 22C46 14 40 8 32 8Z" stroke="#4d7352" strokeWidth="1.5" fill="rgba(122,158,126,.15)"/>
              <path d="M32 40V56" stroke="#4d7352" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M20 56H44" stroke="#4d7352" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M18 22C14 16 8 18 8 24C8 30 18 34 32 40" stroke="#4d7352" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              <path d="M46 22C50 16 56 18 56 24C56 30 46 34 32 40" stroke="#4d7352" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          <p className="registry-card-label">Our registry lives on</p>
          <p className="registry-card-site">MyRegistry.com</p>

          <a
            href={REGISTRY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="registry-cta"
          >
            View Our Registry
          </a>

          <p className="registry-card-hint">Opens in a new tab</p>
        </div>
      </div>

      {/* ── Back link ── */}
      <div className="registry-back">
        <Link to="/" className="registry-back-link">← Back to invitation</Link>
      </div>

    </div>
  );
}
