import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
      <section className="container mx-auto px-4 py-14">
  <h2 className="text-2xl sm:text-3xl font-bold text-center">
    خدماتنا في <span className="text-gold">الرياض</span>
  </h2>

  <div className="mt-8 grid md:grid-cols-3 gap-6 text-right">
    <Link
  to="/construction-company-riyadh"
  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition"
>
  <div className="text-lg font-bold text-gold">شركة مقاولات بالرياض</div>
  <p className="mt-2 text-white/70">
    تنفيذ مشاريع سكنية وتجارية بإشراف هندسي كامل.
  </p>
</Link>

    <Link
  to="/villa-finishing-riyadh"
  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition"
>
  <div className="text-lg font-bold text-gold">تشطيب فلل بالرياض</div>
  <p className="mt-2 text-white/70">
    تشطيب داخلي وخارجي وتسليم مفتاح بجودة عالية.
  </p>
</Link>

    <a
  href="/villa-renovation-riyadh"
  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition"
>
  <div className="text-lg font-bold text-gold">ترميم فلل بالرياض</div>
  <p className="mt-2 text-white/70">
    تجديد شامل وصيانة حسب المعاينة.
  </p>
</a>
  </div>
</section>

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
      <a
  href="tel:+966550604837"
  className="fixed bottom-20 right-6 bg-gold text-black px-5 py-3 rounded-full shadow-lg hover:scale-105 transition z-50 font-bold"
>
  اتصال
</a>

      <a
  href="https://wa.me/966550604837"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 left-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center gap-2"
>
  <span className="text-lg">🟢</span>
  واتساب
</a>
    </div>
  );
}