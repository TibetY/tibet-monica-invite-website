import { useScrollReveal } from '../hooks/useScrollReveal';
import Hero from '../components/Hero';
import Story from '../components/Story';
import Details from '../components/Details';
import DressCode from '../components/DressCode';
import Rsvp from '../components/Rsvp';
import Footer from '../components/Footer';

export default function Home() {
  useScrollReveal();

  return (
    <>
      {/* Hero sits outside <main> as a banner/landmark; main starts at content sections */}
      <Hero />
      <main id="main-content">
        <Story />
        <Details />
        <DressCode />
        <Rsvp />
      </main>
      <Footer />
    </>
  );
}
