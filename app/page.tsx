import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import HottestProperties from '@/components/home/HottestProperties';
import Testimonials from '@/components/home/Testimonials';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import Footer from '@/components/layout/Footer';
import { getProperties } from '@/actions/properties';

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HottestProperties properties={properties || []} />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
