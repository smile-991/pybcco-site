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
const PORTAL_LOGIN_URL = "/portal"; // 🔒 PortalPage.tsx (غير مفهرس)

// ✅ روابط الناف الأساسية
const navLinks = [
  { name: "الرئيسية", href: "#hero", type: "scroll" as const },
  { name: "من نحن", href: "#about", type: "scroll" as const },
  { name: "خدماتنا", href: "#services", type: "scroll" as const },
  { name: "معرض الأعمال", href: "#projects", type: "scroll" as const },
  { name: "فريق العمل", href: "#team", type: "scroll" as const },
  { name: "تواصل معنا", href: "#contact", type: "scroll" as const },
  { name: "جميع المشاريع", href: "/projects", type: "route" as const },

  // ✅ هذا هو المطلوب: من الهوم والناف يودّي للصفحة الدعائية وليس تسجيل الدخول
  { name: "بوابة العملاء", href: PORTAL_LANDING_URL, type: "route" as const },
];

// ✅ روابط المتجر (Navbar Dropdown)
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
    // لو رابط صفحة
    if (!href.startsWith("#")) {
      window.location.href = href;
      setIsOpen(false);
      return;
    }

    // لو نحن على الهوم → سكروول
    if (window.location.pathname === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      return;
    }

    // لو على صفحة ثانية → رجع للهوم مع الهاش
    window.location.href = `/${href}`;
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      dir="rtl"
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* ===== Logo ===== */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              goTo("#hero");
            }}
            className="flex items-center gap-3"
            aria-label="بنيان الهرم للمقاولات - PYBCCO"
          >
            {/* ✅ نص براند موجود دائماً (SEO + Accessibility) */}
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

          {/* ===== Desktop Navigation ===== */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
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

            {/* ===== المتجر Dropdown (Desktop) ===== */}
            <div className="relative group">
              <button
                type="button"
                className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 flex items-center gap-2 whitespace-nowrap leading-none ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                المتجر
                <span className="text-xs">▾</span>
              </button>

              <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
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

            {/* ===== مناطق عملنا Dropdown (Desktop) ===== */}
            <div className="relative group">
              <button
                type="button"
                className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 flex items-center gap-2 whitespace-nowrap leading-none ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                مناطق عملنا
                <span className="text-xs">▾</span>
              </button>

              <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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

            {/* ✅ (اختياري) تسجيل دخول العملاء على الديسكتوب داخل الناف
               إذا ما بدك يبين — احذف هالبلوك */}
            <a
              href={PORTAL_LOGIN_URL}
              onClick={(e) => {
                e.preventDefault();
                goTo(PORTAL_LOGIN_URL);
              }}
              className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 whitespace-nowrap leading-none ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              تسجيل دخول العملاء
            </a>
          </div>

          {/* ===== CTA Desktop ===== */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+966550604837"
              className={`flex items-center gap-2 text-sm font-medium ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr" className="whitespace-nowrap tabular-nums">
                055 060 4837
              </span>
            </a>

            {/* Social (Desktop) */}
            <div className="flex items-center gap-2">
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

              {/* ✅ Facebook */}
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
              className={`font-bold px-4 whitespace-nowrap ${
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

            {/* ✅ بوابة العملاء (المفهرسة) */}
            <Button
              asChild
              variant="outline"
              className={`font-bold px-4 whitespace-nowrap ${
                isScrolled
                  ? "border-gold text-gold hover:bg-gold/10"
                  : "border-gold text-gold bg-transparent hover:bg-white/10"
              }`}
            >
              <a href={PORTAL_LANDING_URL}>بوابة العملاء</a>
            </Button>

            <Button
              onClick={() => goTo("#contact")}
              className="bg-gold hover:bg-gold/90 text-black font-bold px-5 whitespace-nowrap"
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
                <div className="flex items-center gap-3 mb-8">
                  <img
                    src="/assets/logo.png"
                    alt="بنيان الهرم للمقاولات"
                    className="w-10 h-10 object-contain"
                    width={40}
                    height={40}
                    loading="eager"
                    decoding="async"
                  />
                  <div>
                    <div className="font-bold">بنيان الهرم</div>
                    <p className="text-xs text-white/60">للمقاولات</p>
                  </div>
                </div>

                <nav className="flex flex-col gap-1">
                  {/* ===== الروابط الرئيسية ===== */}
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

                  {/* ✅ تسجيل دخول العملاء (غير مفهرس) */}
                  <a
                    href={PORTAL_LOGIN_URL}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(PORTAL_LOGIN_URL);
                    }}
                    className="px-4 py-3 text-[15px] font-medium text-gold hover:bg-white/10 rounded-lg transition"
                  >
                    تسجيل دخول العملاء
                  </a>

                  {/* ===== Divider ===== */}
                  <div className="my-4 h-px bg-white/10" />

                  {/* ===== المتجر ===== */}
                  <div>
                    <div className="px-4 mb-2 text-xs tracking-wider text-white/50 uppercase">
                      المتجر
                    </div>

                    <div className="flex flex-col gap-1">
                      {storeLinks.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            goTo(item.href);
                          }}
                          className="px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-gold rounded-lg transition"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* ===== مناطق العمل ===== */}
                  <div className="my-4 h-px bg-white/10" />

                  <a
                    href="/contractor-almalqa-riyadh"
                    onClick={(e) => {
                      e.preventDefault();
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
                      <p dir="ltr" className="font-bold whitespace-nowrap tabular-nums">
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

                  {/* ✅ زر بوابة العملاء (المفهرسة) */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gold text-gold hover:bg-white/10 font-bold mb-3 whitespace-nowrap"
                  >
                    <a
                      href={PORTAL_LANDING_URL}
                      onClick={() => setIsOpen(false)}
                    >
                      بوابة العملاء
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

                    {/* ✅ Facebook */}
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