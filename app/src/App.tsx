import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import ProjectsGallery from "./sections/ProjectsGallery";
import ScrollToTop from "./ScrollToTop";

import VillaFinishingRiyadh from "./sections/VillaFinishingRiyadh";
import VillaRenovationRiyadh from "./sections/VillaRenovationRiyadh";
import ConstructionCompanyRiyadh from "./sections/ConstructionCompanyRiyadh";
import VillaFinishingPriceRiyadh from "./sections/VillaFinishingPriceRiyadh";
import VillaBoneConstructionRiyadh from "./sections/VillaBoneConstructionRiyadh";
import ApartmentFinishingRiyadh from "./sections/ApartmentFinishingRiyadh";
import HomeRenovationCompanyRiyadh from "./sections/HomeRenovationCompanyRiyadh";
import ContractorAlMalqaRiyadh from "./sections/ContractorAlMalqaRiyadh";

import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
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

      {/* مهم جداً لحل مشكلة النزول بنص الصفحة */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsGallery />} />

        <Route path="/villa-finishing-riyadh" element={<VillaFinishingRiyadh />} />
        <Route path="/villa-renovation-riyadh" element={<VillaRenovationRiyadh />} />
        <Route path="/construction-company-riyadh" element={<ConstructionCompanyRiyadh />} />
        <Route path="/villa-finishing-price-riyadh" element={<VillaFinishingPriceRiyadh />} />
        <Route path="/villa-bone-construction-riyadh" element={<VillaBoneConstructionRiyadh />} />
        <Route path="/apartment-finishing-riyadh" element={<ApartmentFinishingRiyadh />} />
        <Route path="/home-renovation-company-riyadh" element={<HomeRenovationCompanyRiyadh />} />
        <Route path="/contractor-almalqa-riyadh" element={<ContractorAlMalqaRiyadh />} />
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
          className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full
                     flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        >
          🟢
        </a>

        {/* Call */}
        <a
          href="tel:+966550604837"
          className="w-12 h-12 bg-gold hover:bg-gold/90 text-black rounded-full
                     flex items-center justify-center shadow-lg transition-transform hover:scale-105 font-bold"
        >
          📞
        </a>
      </div>
    </div>
  );
}
