import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Audience from '../components/Audience/Audience';
import Process from '../components/Process/Process';
import Properties from '../components/Properties/Properties';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';
import { useSmoothScrollLinks } from '../hooks/useSmoothScrollLinks';

export default function HomePage() {
  useSmoothScrollLinks();

  return (
    <>
      <Hero />
      <Stats />
      <Audience />
      <Process />
      <Properties />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
