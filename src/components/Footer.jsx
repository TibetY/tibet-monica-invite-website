import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <strong>Tibet &amp; Monica</strong>
      <div className="footer-divider" />
      <nav className="footer-nav">
        <Link to="/registry">Gift Registry</Link>
        <span className="footer-nav-dot">·</span>
        <a href="#rsvp">RSVP</a>
        <span className="footer-nav-dot">·</span>
        <a href="#details">Details</a>
      </nav>
      <div className="footer-divider" />
      <span>With love · May 2026</span>
    </footer>
  );
}
