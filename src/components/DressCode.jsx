const SWATCHES = [
  { color: '#7a9e7e', label: 'Sage' },
  { color: '#a8c5aa', label: 'Mint' },
  { color: '#f8f4ed', label: 'Cream' },
  { color: '#c9a86c', label: 'Champagne' },
  { color: '#e0d5c8', label: 'Linen' },
  { color: '#2c3a2e', label: 'Forest' },
];

export default function DressCode() {
  return (
    <section className="dress-strip">
      <span className="section-label reveal">Dress Code</span>
      <h3
        className="reveal reveal-delay-1"
        style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 300, color: 'var(--ink)' }}
      >
        Garden-Party Chic
      </h3>

      <div className="dress-palette reveal reveal-delay-2">
        {SWATCHES.map(({ color, label }) => (
          <div key={label} className="swatch">
            <div className="swatch-circle" style={{ background: color }} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <p className="dress-note reveal reveal-delay-3">
        Think linen, silk, and earth tones. Comfortable enough to kick your shoes off.
      </p>
    </section>
  );
}
