import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import Contact from "./Contact";
import Team from "./Team";
import Certificates from "./Certificates";
import Partners from "./Partners";

import { GALLERY, type GalleryCat } from "../data/gallery"; // ✅ المصدر الوحيد للصور

const WA_LINK =
  "https://wa.me/966550604837?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A3%D8%A8%D9%8A%20%D8%A3%D8%B7%D9%84%D8%A8%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9";

function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function GalleryTabs() {
  const [cat, setCat] = useState<GalleryCat>("finishing");

  // ✅ يعرض أول 6 صور فقط بالهوم
  const items = useMemo(() => GALLERY[cat].items.slice(0, 6), [cat]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {[
          { key: "concrete", label: "عظم" },
          { key: "finishing", label: "تشطيب" },
          { key: "entertainment", label: "ترفيه" },
        ].map((t) => {
          const active = cat === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setCat(t.key as GalleryCat)}
              className={[
                "px-4 py-2 rounded-full text-sm font-bold transition",
                active
                  ? "bg-gold text-black"
                  : "bg-black/5 text-gray-900 hover:bg-black/10",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-600">{GALLERY[cat].title}</div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((img, i) => (
          <div
            key={i}
            className="group rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-40 md:h-52 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const heroImage = GALLERY.finishing.items[0]?.src ?? "/projects/finishing/finishing-01.jpg";

  return (
    <main dir="rtl">
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" />
        </div>

        <div className="relative z-10 container-custom pt-24 pb-14 px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-6">
              شركة <span className="text-gold/90">بنيان الهرم</span>{" "}
              <span className="whitespace-nowrap">للمقاولات</span>
            </h1>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => window.open(WA_LINK, "_blank")}
                size="lg"
                className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 text-lg w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 ml-2" />
                اطلب معاينة
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-gold bg-transparent hover:bg-white/10 px-8 py-6 text-lg w-full sm:w-auto"
              >
                <Link to="/villa-finishing-price-riyadh#boq">
                  <Calculator className="w-5 h-5 ml-2" />
                  احسب التكلفة
                </Link>
              </Button>
            </div>

            {/* ✅ استخدمنا scrollToId بشكل فعلي */}
            <div className="mt-8 text-white/70 text-sm">
              <button
                type="button"
                onClick={() => scrollToId("#projects")}
                className="hover:text-gold transition"
              >
                شاهد معرض الأعمال ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* المعرض */}
      <section id="projects" className="section-padding bg-gray-50">
        <div className="container-custom px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                عظم / تشطيب / <span className="text-gold">ترفيه</span>
              </h2>
              <p className="mt-2 text-gray-600">
                اختر التصنيف وشاهد نماذج حقيقية من أعمالنا.
              </p>
            </div>

            <Button
              asChild
              className="bg-gold hover:bg-gold/90 text-black font-bold hidden sm:inline-flex"
            >
              <Link to="/projects">عرض جميع المشاريع</Link>
            </Button>
          </div>

          <GalleryTabs />

          {/* ✅ زر إضافي يستخدم scrollToId (لتجنب أي حذف مستقبلاً) */}
          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              variant="outline"
              className="hover:bg-black/5"
              onClick={() => scrollToId("#contact")}
            >
              تواصل معنا
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="team">
        <Team />
      </section>

      <section id="certificates">
        <Certificates />
      </section>

      <section id="partners">
        <Partners />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
