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
    <section className="dress-strip" aria-labelledby="dresscode-heading">
      <span className="section-label reveal">Dress Code</span>
      {/* h2 keeps heading hierarchy: Hero h1 → Story h2 → Details h2 → DressCode h2 → RSVP h2 */}
      <h2
        id="dresscode-heading"
        className="reveal reveal-delay-1"
        style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 300, color: 'var(--ink)' }}
      >
        Garden-Party Chic
      </h2>

      {/* Colour palette: each swatch has a visible text label so information is not conveyed by colour alone */}
      <ul
        className="dress-palette reveal reveal-delay-2"
        aria-label="Suggested colour palette"
        style={{ listStyle: 'none' }}
      >
        {SWATCHES.map(({ color, label }) => (
          <li key={label} className="swatch">
            {/* aria-label on the circle provides context for assistive technology */}
            <div
              className="swatch-circle"
              style={{ background: color }}
              role="img"
              aria-label={`${label} colour swatch`}
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <p className="dress-note reveal reveal-delay-3">
        Think linen, silk, and earth tones. Comfortable enough to kick your shoes off.
      </p>
    </section>
  );
}
