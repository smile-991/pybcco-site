import { useEffect, useState } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Team from './sections/Team';
import Certificates from './sections/Certificates';
import Partners from './sections/Partners';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { Toaster } from '@/components/ui/sonner';
import VillaFinishingRiyadh from "./sections/VillaFinishingRiyadh";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

if (isLoading) {
  return (
    <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
      <div className="text-center animate-fadeIn">
        <div className="w-28 h-28 mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl"></div>
          <img
            src="/assets/logo.png"
            alt="Bunian AlHaram Logo"
            className="relative w-full h-full object-contain"
          />
        </div>

        <h2 className="text-gold text-xl font-bold mb-2">بنيان الهرم</h2>
        <p className="text-white/60 text-sm">جاري التحميل...</p>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Team />
        <Certificates />
        <Partners />
        <Contact />
        <VillaFinishingRiyadh />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
