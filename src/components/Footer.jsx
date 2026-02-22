import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <footer>
      {/* Use <p> not <strong>; strong implies importance, not a heading-like label */}
      <p className="footer-title">Tibet &amp; Monica</p>
      <div className="footer-divider" aria-hidden="true" />
      <nav className="footer-nav" aria-label="Site navigation">
        <Link
          to="/registry"
          aria-current={pathname === '/registry' ? 'page' : undefined}
        >
          Gift Registry
        </Link>
        {/* Dot separators are purely decorative */}
        <span className="footer-nav-dot" aria-hidden="true">·</span>
        <a href="#rsvp">RSVP</a>
        <span className="footer-nav-dot" aria-hidden="true">·</span>
        <a href="#details">Details</a>
      </nav>
      <div className="footer-divider" aria-hidden="true" />
      <span>With love · May 2026</span>
    </footer>
  );
}
