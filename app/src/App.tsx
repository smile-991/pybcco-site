import { Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import ProjectsGallery from "./sections/ProjectsGallery";
import ScrollToTop from "./ScrollToTop";
import DecorMarble from "@/sections/DecorMarble";
import VillaFinishingRiyadh from "./sections/VillaFinishingRiyadh";
import VillaRenovationRiyadh from "./sections/VillaRenovationRiyadh";
import ConstructionCompanyRiyadh from "./sections/ConstructionCompanyRiyadh";
import VillaFinishingPriceRiyadh from "./sections/VillaFinishingPriceRiyadh";
import VillaBoneConstructionRiyadh from "./sections/VillaBoneConstructionRiyadh";
import ApartmentFinishingRiyadh from "./sections/ApartmentFinishingRiyadh";
import HomeRenovationCompanyRiyadh from "./sections/HomeRenovationCompanyRiyadh";
import ContractorAlMalqaRiyadh from "./sections/ContractorAlMalqaRiyadh";
import Decor from "@/sections/Decor";
import DecorWood from "@/sections/DecorWood";
import NotFound from "./sections/NotFound";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />

      {/* مهم جداً لحل مشكلة النزول بنص الصفحة */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsGallery />} />
        <Route path="/decor" element={<Decor />} />
        <Route path="/decor/wood" element={<DecorWood />} />
<Route path="/decor/marble" element={<DecorMarble />} />
        <Route path="/villa-finishing-riyadh" element={<VillaFinishingRiyadh />} />
        <Route path="/villa-renovation-riyadh" element={<VillaRenovationRiyadh />} />
        <Route path="/construction-company-riyadh" element={<ConstructionCompanyRiyadh />} />
        <Route path="/villa-finishing-price-riyadh" element={<VillaFinishingPriceRiyadh />} />
        <Route path="/villa-bone-construction-riyadh" element={<VillaBoneConstructionRiyadh />} />
        <Route path="/apartment-finishing-riyadh" element={<ApartmentFinishingRiyadh />} />
        <Route path="/home-renovation-company-riyadh" element={<HomeRenovationCompanyRiyadh />} />
        <Route path="/contractor-almalqa-riyadh" element={<ContractorAlMalqaRiyadh />} />

        {/* ✅ 404 حقيقي بدل ما نرجع Home (لتجنب Soft 404 وتشويش جوجل) */}
        <Route path="*" element={<NotFound />} />
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
          aria-label="WhatsApp"
        >
          🟢
        </a>

        {/* Call */}
        <a
          href="tel:+966550604837"
          className="w-12 h-12 bg-gold hover:bg-gold/90 text-black rounded-full
                     flex items-center justify-center shadow-lg transition-transform hover:scale-105 font-bold"
          aria-label="Call"
        >
          📞
        </a>
      </div>
    </div>
  );
}