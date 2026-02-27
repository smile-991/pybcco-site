import { useEffect, useState } from "react";
import {
  Menu,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const PORTAL_LANDING_URL = "/project-tracking-system-riyadh"; // ✅ مفهرس + للإعلانات

// ✅ روابط الناف الأساسية (✅ حذف "من نحن")
const navLinks = [
  { name: "الرئيسية", href: "#hero", type: "scroll" as const },
  { name: "خدماتنا", href: "#services", type: "scroll" as const },
  { name: "معرض الأعمال", href: "#projects", type: "scroll" as const },
  { name: "فريق العمل", href: "#team", type: "scroll" as const },
  { name: "تواصل معنا", href: "#contact", type: "scroll" as const },
  { name: "جميع المشاريع", href: "/projects", type: "route" as const },
];

// ✅ روابط المتجر
const storeLinks = [
  { name: "واجهة المتجر", href: "/decor" },
  { name: "بديل الخشب", href: "/decor/wood" },
  { name: "بديل الرخام", href: "/decor/marble" },
  { name: "بديل الشيبورد", href: "/decor/shipboard" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (href: string) => {
    if (!href.startsWith("#")) {
      window.location.href = href;
      setIsOpen(false);
      return;
    }

    if (window.location.pathname === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      return;
    }

    window.location.href = `/${href}`;
    setIsOpen(false);
  };

  // ✅ روابط الديسكتوب (بدون "المزيد") — مصفوفة واضحة بدل indexes
  const desktopLinks = navLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      dir="rtl"
    >
      <div className="container-custom">
        {/* ✅ مهم: flex-nowrap لمنع أي تراكم */}
        <nav className="flex items-center h-20 gap-3 min-w-0 justify-between flex-nowrap">
          {/* ===== RIGHT: Portal + Logo ===== */}
          <div className="flex items-center gap-3 shrink-0">
            {/* ✅ بوابة العملاء: نخليها XL وفوق لتخفيف الزحمة */}
            <Button
              asChild
              variant="outline"
              className={`hidden xl:flex font-bold px-4 whitespace-nowrap ${
                isScrolled
                  ? "border-gold text-gold hover:bg-gold/10"
                  : "border-gold text-gold bg-transparent hover:bg-white/10"
              }`}
            >
              <a
                href={PORTAL_LANDING_URL}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(PORTAL_LANDING_URL);
                }}
              >
                بوابة العملاء
              </a>
            </Button>

            {/* ===== Logo (واحد فقط) ===== */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                goTo("#hero");
              }}
              className="flex items-center gap-3"
              aria-label="بنيان الهرم للمقاولات - PYBCCO"
            >
              <span className="sr-only">بنيان الهرم للمقاولات - PYBCCO</span>

              <img
                src="/assets/logo.png"
                alt="بنيان الهرم للمقاولات"
                className="w-12 h-12 object-contain"
                width={48}
                height={48}
                loading="eager"
                decoding="async"
              />

              <div
                className={`hidden sm:block ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                <div className="font-bold text-lg leading-tight whitespace-nowrap">
                  بنيان الهرم
                </div>
                <p className="text-xs opacity-80 whitespace-nowrap">للمقاولات</p>
              </div>
            </a>
          </div>

          {/* ✅ Desktop Navigation (CENTER) */}
          {/* 🔥 الحل: نمنع التراكم عبر overflow-x-auto (سكرول أفقي) */}
          <div
            className="
              hidden lg:flex flex-1 min-w-0 items-center justify-start gap-1
              overflow-x-auto whitespace-nowrap
              [-ms-overflow-style:none] [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {desktopLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(link.href);
                }}
                className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 whitespace-nowrap leading-none ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* المتجر Dropdown */}
            <div className="relative group shrink-0">
              <button
                type="button"
                className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 flex items-center gap-2 whitespace-nowrap leading-none ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                المتجر <span className="text-xs">▾</span>
              </button>

              <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50">
                {storeLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(item.href);
                    }}
                    className="block px-4 py-3 text-sm text-gray-800 hover:bg-gold/10 transition whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* مناطق عملنا Dropdown */}
            <div className="relative group shrink-0">
              <button
                type="button"
                className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 flex items-center gap-2 whitespace-nowrap leading-none ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                مناطق عملنا <span className="text-xs">▾</span>
              </button>

              <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a
                  href="/contractor-almalqa-riyadh"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo("/contractor-almalqa-riyadh");
                  }}
                  className="block px-4 py-3 text-sm text-gray-800 hover:bg-gold/10 rounded-xl transition whitespace-nowrap"
                >
                  حي الملقا
                </a>
              </div>
            </div>
          </div>

          {/* ===== CTA Desktop (LEFT) ===== */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* ✅ تلفون */}
            <a
              href="tel:+966550604837"
              aria-label="اتصل بنا"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                isScrolled
                  ? "bg-black/5 hover:bg-black/10 text-gray-800"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* ✅ السوشيال: فقط 2XL وفوق (لتخفيف التزاحم) */}
            <div className="hidden 2xl:flex items-center gap-2">
              <a
                href="https://x.com/pybcco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isScrolled
                    ? "bg-black/5 hover:bg-black/10"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Twitter
                  className={`w-4 h-4 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              </a>

              <a
                href="https://www.linkedin.com/company/pybcco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isScrolled
                    ? "bg-black/5 hover:bg-black/10"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Linkedin
                  className={`w-4 h-4 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              </a>

              <a
                href="https://instagram.com/pybcco.decor"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isScrolled
                    ? "bg-black/5 hover:bg-black/10"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Instagram
                  className={`w-4 h-4 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              </a>

              <a
                href="https://www.facebook.com/pybcco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isScrolled
                    ? "bg-black/5 hover:bg-black/10"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Facebook
                  className={`w-4 h-4 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              </a>
            </div>

            {/* Calculator CTA */}
            <Button
              asChild
              variant="outline"
              className={`font-bold px-3 whitespace-nowrap ${
                isScrolled
                  ? "border-gold text-gold hover:bg-gold/10"
                  : "border-gold text-gold bg-transparent hover:bg-white/10"
              }`}
            >
              <a href="/villa-finishing-price-riyadh">
                <Calculator className="w-4 h-4 ml-2" />
                احسب التكلفة
              </a>
            </Button>

            <Button
              onClick={() => goTo("#contact")}
              className="bg-gold hover:bg-gold/90 text-black font-bold px-4 whitespace-nowrap"
            >
              طلب عرض سعر
            </Button>
          </div>

          {/* ===== Mobile Menu ===== */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? "text-black" : "text-white"}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-80 bg-black text-white border-white/10"
            >
              <div className="flex flex-col h-full">
                {/* ✅ حذف لوجو الموبايل نهائيًا (حتى ما يطلع لوجوين) */}
                <div className="mb-6">
                  <div className="font-bold">بنيان الهرم</div>
                  <p className="text-xs text-white/60">للمقاولات</p>
                </div>

                {/* ✅ خلي القائمة تتمدد وتسكرول صح */}
                <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(link.href);
                      }}
                      className="px-4 py-3 text-[15px] font-medium text-white hover:bg-white/10 rounded-lg transition"
                    >
                      {link.name}
                    </a>
                  ))}

                  {/* ✅ زر دخول العملاء */}
                  <Button
                    asChild
                    className="w-full bg-gold hover:bg-gold/90 text-black font-bold mt-3 mb-3 whitespace-nowrap"
                  >
                    <a
                      href={PORTAL_LANDING_URL}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        goTo(PORTAL_LANDING_URL);
                      }}
                    >
                      🔐 دخول العملاء
                    </a>
                  </Button>

                  {/* ✅ زر المتجر (واضح جدًا) */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gold text-gold hover:bg-white/10 font-bold mb-4 whitespace-nowrap"
                  >
                    <a
                      href="/decor"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        goTo("/decor");
                      }}
                    >
                      🛍 المتجر
                    </a>
                  </Button>

                  <div className="my-4 h-px bg-white/10" />

                  <a
                    href="/contractor-almalqa-riyadh"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      goTo("/contractor-almalqa-riyadh");
                    }}
                    className="px-4 py-3 text-[15px] font-medium text-white hover:bg-white/10 rounded-lg transition"
                  >
                    مناطق عملنا – حي الملقا
                  </a>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <a
                    href="tel:+966550604837"
                    className="flex items-center gap-3 mb-4 text-white"
                  >
                    <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">اتصل بنا</p>
                      <p
                        dir="ltr"
                        className="font-bold whitespace-nowrap tabular-nums"
                      >
                        055 060 4837
                      </p>
                    </div>
                  </a>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gold text-gold hover:bg-white/10 font-bold mb-3 whitespace-nowrap"
                  >
                    <a
                      href="/villa-finishing-price-riyadh"
                      onClick={() => setIsOpen(false)}
                    >
                      <Calculator className="w-5 h-5 ml-2" />
                      احسب التكلفة
                    </a>
                  </Button>

                  <Button
                    onClick={() => goTo("#contact")}
                    className="w-full bg-gold hover:bg-gold/90 text-black font-bold whitespace-nowrap"
                  >
                    طلب عرض سعر
                  </Button>

                  <div className="flex items-center justify-center gap-3 mt-4">
                    <a
                      href="https://x.com/pybcco"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition"
                    >
                      <Twitter className="w-5 h-5 text-white" />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/pybcco"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>

                    <a
                      href="https://instagram.com/pybcco.decor"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>

                    <a
                      href="https://www.facebook.com/pybcco"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}