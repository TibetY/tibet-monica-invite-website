export default function Story() {
  return (
    <section className="story">

      <svg className="story-botanical story-botanical-l" viewBox="0 0 360 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M40 380 C60 310 130 230 200 145 C240 100 300 60 340 30" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M200 145 C172 128 138 140 122 168 C106 195 116 228 138 236" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,.12)" strokeLinecap="round"/>
        <path d="M250 98 C224 82 192 90 178 115 C163 140 174 168 194 175" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,.1)" strokeLinecap="round"/>
        <path d="M300 62 C278 48 248 56 234 78 C220 100 230 126 250 132" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,.08)" strokeLinecap="round"/>
      </svg>

      <svg className="story-botanical story-botanical-r" viewBox="0 0 360 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M40 380 C60 310 130 230 200 145 C240 100 300 60 340 30" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M200 145 C172 128 138 140 122 168 C106 195 116 228 138 236" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,.12)" strokeLinecap="round"/>
        <path d="M250 98 C224 82 192 90 178 115 C163 140 174 168 194 175" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,.1)" strokeLinecap="round"/>
      </svg>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
        <span className="section-label reveal">The Sitch</span>
        <h2 className="story-heading reveal reveal-delay-1">
          We're eloping on May 12th and figured — why not throw one big party for the marriage and the new home?
        </h2>
        <p className="story-text reveal reveal-delay-3">
          We'd love nothing more than to fill our new place with the people we love most and raise a glass, or a couple.
        </p>
      </div>

    </section>
  );
}
