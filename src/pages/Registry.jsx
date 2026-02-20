import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// To find your registry ID:
//   1. Log into myregistry.com
//   2. Go to Share Registry → Embed on Website
//   3. Copy the number after "r=" in the script src
//      e.g. //www.myregistry.com/…EmbedRegistry.ashx?r=12345678&v=2
//                                                       ^^^^^^^^
// ─────────────────────────────────────────────────────────────────────────────
const REGISTRY_ID = 'the-celebration'; // ← replace with your numeric ID if slug doesn't work

export default function Registry() {
  const embedRef = useRef(null);

  useEffect(() => {
    const container = embedRef.current;
    if (!container) return;

    // Remove any previous script / iframe from hot-reloads
    document.getElementById('script_myregistry_giftlist_iframe')?.remove();
    container.querySelectorAll('iframe').forEach((el) => el.remove());

    const script = document.createElement('script');
    script.id  = 'script_myregistry_giftlist_iframe';
    script.src = `//www.myregistry.com/Visitors/GiftList/iFrames/EmbedRegistry.ashx?r=${REGISTRY_ID}&v=2`;
    script.async = true;
    container.appendChild(script);

    return () => {
      document.getElementById('script_myregistry_giftlist_iframe')?.remove();
      container.querySelectorAll('iframe').forEach((el) => el.remove());
    };
  }, []);

  return (
    <div className="registry-page">

      {/* ── Botanical corner decorations ── */}
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
        <a
          href={`https://www.myregistry.com/giftlist/the-celebration`}
          target="_blank"
          rel="noopener noreferrer"
          className="registry-external-link"
        >
          Open on MyRegistry.com ↗
        </a>
      </div>

      {/* ── Embed ── */}
      <div className="registry-embed-outer">
        <div className="registry-embed-inner" ref={embedRef}>
          {/* myregistry script injects an iframe here */}
          <div className="registry-loading">Loading registry…</div>
        </div>
      </div>

    </div>
  );
}
