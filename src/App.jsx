import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuestList from './pages/GuestList';
import Registry from './pages/Registry';

export default function App() {
  return (
    <BrowserRouter>
      {/* WCAG 2.4.1 A — Skip navigation link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/guestlist" element={<GuestList />} />
      </Routes>
    </BrowserRouter>
  );
}
