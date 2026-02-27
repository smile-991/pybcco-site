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

  // ✅ Desktop Links Strategy (Professional + Stable with Zoom)
  // 2XL: show all
  // LG→XL/2XL: show compact + "المزيد" dropdown to avoid shifting with zoom
  const desktopAllLinks = navLinks;

  const desktopPrimaryLinks = [
    navLinks[0], // الرئيسية
    navLinks[1], // خدماتنا
    navLinks[2], // معرض الأعمال
    navLinks[4], // تواصل معنا
  ].filter(Boolean);

  const desktopMoreLinks = navLinks.filter(
    (l) =>
      !desktopPrimaryLinks.some(
        (p) => p.href === l.href && p.name === l.name
      )
  );

  const linkClass = `px-2.5 py-1.5 text-[12px] font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 whitespace-nowrap leading-none ${
    isScrolled ? "text-gray-800" : "text-white"
  }`;

  const dropdownBtnClass = `px-2.5 py-1.5 text-[12px] font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 flex items-center gap-2 whitespace-nowrap leading-none ${
    isScrolled ? "text-gray-800" : "text-white"
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      dir="rtl"
    >
      <div className="container-custom">
        <nav className="flex items-center h-16 gap-2 min-w-0 justify-between flex-nowrap">
          {/* ===== RIGHT: Portal + Logo ===== */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              asChild
              variant="outline"
              className={`hidden xl:flex font-bold px-3 py-1.5 text-sm whitespace-nowrap ${
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

            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                goTo("#hero");
              }}
              className="flex items-center gap-2"
              aria-label="بنيان الهرم للمقاولات - PYBCCO"
            >
              <span className="sr-only">بنيان الهرم للمقاولات - PYBCCO</span>

              <img
                src="/assets/logo.png"
                alt="بنيان الهرم للمقاولات"
                className="w-10 h-10 object-contain"
                width={40}
                height={40}
                loading="eager"
                decoding="async"
              />

              <div
                className={`hidden sm:block ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                <div className="font-bold text-[15px] leading-tight whitespace-nowrap">
                  بنيان الهرم
                </div>
                <p className="text-[11px] opacity-80 whitespace-nowrap">
                  للمقاولات
                </p>
              </div>
            </a>
          </div>

          {/* ✅ Desktop Navigation (CENTER) */}
          <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center">
            {/* ===== 2XL: Full Links (Stable on wide desktop) ===== */}
            <div className="hidden 2xl:flex min-w-0 items-center gap-2">
              {/* الروابط */}
              <div className="flex items-center gap-1 min-w-0 whitespace-nowrap">
                {desktopAllLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(link.href);
                    }}
                    className={linkClass}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Dropdowns ثابتين */}
              <div className="flex items-center gap-2 shrink-0">
                {/* المتجر Dropdown */}
                <div className="relative group shrink-0">
                  <button type="button" className={dropdownBtnClass}>
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
                  <button type="button" className={dropdownBtnClass}>
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
            </div>

            {/* ===== LG→XL/2XL: Compact + More (Stable with Zoom) ===== */}
            <div className="flex 2xl:hidden min-w-0 items-center gap-2">
              {/* روابط مختصرة */}
              <div className="flex items-center gap-1 whitespace-nowrap">
                {desktopPrimaryLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(link.href);
                    }}
                    className={linkClass}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* المزيد Dropdown */}
              <div className="relative group shrink-0">
                <button type="button" className={dropdownBtnClass}>
                  المزيد <span className="text-xs">▾</span>
                </button>

                <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50">
                  {desktopMoreLinks.map((item) => (
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

              {/* المتجر Dropdown */}
              <div className="relative group shrink-0">
                <button type="button" className={dropdownBtnClass}>
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
                <button type="button" className={dropdownBtnClass}>
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
          </div>

          {/* ===== CTA Desktop (LEFT) ===== */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href="tel:+966550604837"
              aria-label="اتصل بنا"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isScrolled
                  ? "bg-black/5 hover:bg-black/10 text-gray-800"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            {/* ✅ Social (Desktop): 2x2 grid smaller */}
            <div className="hidden xl:grid grid-cols-2 gap-1.5 shrink-0">
              <a
                href="https://x.com/pybcco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                  isScrolled
                    ? "bg-black/5 hover:bg-black/10"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Twitter
                  className={`w-3.5 h-3.5 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              </a>

              <a
                href="https://www.linkedin.com/company/pybcco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                  isScrolled
                    ? "bg-black/5 hover:bg-black/10"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Linkedin
                  className={`w-3.5 h-3.5 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              </a>

              <a
                href="https://instagram.com/pybcco.decor"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                  isScrolled
                    ? "bg-black/5 hover:bg-black/10"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Instagram
                  className={`w-3.5 h-3.5 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              </a>

              <a
                href="https://www.facebook.com/pybcco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                  isScrolled
                    ? "bg-black/5 hover:bg-black/10"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Facebook
                  className={`w-3.5 h-3.5 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              </a>
            </div>

            <Button
              asChild
              variant="outline"
              className={`font-bold px-2.5 py-1.5 text-sm whitespace-nowrap ${
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
              className="bg-gold hover:bg-gold/90 text-black font-bold px-3 py-1.5 text-sm whitespace-nowrap"
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
                <div className="mb-6">
                  <div className="font-bold">بنيان الهرم</div>
                  <p className="text-xs text-white/60">للمقاولات</p>
                </div>

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

                  {/* ✅ زر المتجر */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gold text-gold hover:bg-white/10 font-bold mb-2 whitespace-nowrap"
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

                  {/* ✅ روابط المتجر داخل الموبايل */}
                  <div className="flex flex-col gap-1 mb-4">
                    <a
                      href="/decor/wood"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        goTo("/decor/wood");
                      }}
                      className="px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-gold rounded-lg transition"
                    >
                      بديل الخشب
                    </a>

                    <a
                      href="/decor/marble"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        goTo("/decor/marble");
                      }}
                      className="px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-gold rounded-lg transition"
                    >
                      بديل الرخام
                    </a>

                    <a
                      href="/decor/shipboard"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        goTo("/decor/shipboard");
                      }}
                      className="px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-gold rounded-lg transition"
                    >
                      بديل الشيبورد
                    </a>
                  </div>

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