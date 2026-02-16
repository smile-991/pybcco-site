import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import VillaFinishingPriceRiyadh from "./sections/VillaFinishingPriceRiyadh";
import VillaBoneConstructionRiyadh from "./sections/VillaBoneConstructionRiyadh";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Projects from "./sections/Projects";
import Team from "./sections/Team";
import Certificates from "./sections/Certificates";
import Partners from "./sections/Partners";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { Toaster } from "@/components/ui/sonner";
import VillaRenovationRiyadh from "./sections/VillaRenovationRiyadh";
import ConstructionCompanyRiyadh from "./sections/ConstructionCompanyRiyadh";
import ApartmentFinishingRiyadh from "./sections/ApartmentFinishingRiyadh";
import HomeRenovationCompanyRiyadh from "./sections/HomeRenovationCompanyRiyadh";
import ProjectsGallery from "./sections/ProjectsGallery";

<Route path="/projects" element={<ProjectsGallery />} />




import VillaFinishingRiyadh from "./sections/VillaFinishingRiyadh";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Team />
      <Certificates />
      <Partners />
      <Contact />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
        <div className="text-center">
          <img src="/assets/logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
          <p className="text-white/60">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/villa-finishing-riyadh" element={<VillaFinishingRiyadh />} />
        <Route path="/villa-renovation-riyadh" element={<VillaRenovationRiyadh />} />
        <Route path="/construction-company-riyadh" element={<ConstructionCompanyRiyadh />} />
        <Route path="/villa-finishing-price-riyadh" element={<VillaFinishingPriceRiyadh />} />
        <Route path="/villa-bone-construction-riyadh" element={<VillaBoneConstructionRiyadh />} />
        <Route path="/apartment-finishing-riyadh" element={<ApartmentFinishingRiyadh />} />
        <Route path="/home-renovation-company-riyadh" element={<HomeRenovationCompanyRiyadh />} />




      </Routes>

      <Footer />
      <Toaster />
      {/* Floating Buttons (Mobile only) */}
<div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 lg:hidden">
  {/* WhatsApp */}
  <a
    href="https://wa.me/966550604837"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full
               flex items-center justify-center shadow-lg transition-transform hover:scale-105"
  >
    <span className="text-xl">🟢</span>
  </a>

  {/* Call */}
  <a
    href="tel:+966550604837"
    aria-label="Call"
    className="w-12 h-12 bg-gold hover:bg-gold/90 text-black rounded-full
               flex items-center justify-center shadow-lg transition-transform hover:scale-105 font-bold"
  >
    📞
  </a>
</div>

    </div>
  );
}