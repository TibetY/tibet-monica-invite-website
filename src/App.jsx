import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuestList from './pages/GuestList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guestlist" element={<GuestList />} />
      </Routes>
    </BrowserRouter>
  );
}
