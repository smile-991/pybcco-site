import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
}