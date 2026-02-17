import { useState, useEffect } from 'react';
import { Menu, Phone, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { name: 'الرئيسية', href: '#hero' },
  { name: 'من نحن', href: '#about' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'مشاريعنا', href: '#projects' },
  { name: 'فريق العمل', href: '#team' },
  { name: 'الشهادات', href: '#certificates' },
  { name: 'تواصل معنا', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">ب</span>
            </div>
            <div className={`hidden sm:block ${isScrolled ? 'text-black' : 'text-white'}`}>
              <h1 className="font-bold text-lg leading-tight">بنيان الهرم</h1>
              <p className="text-xs opacity-80">للمقاولات</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
  {navLinks.map((link) => (
    <a
      key={link.name}
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(link.href);
      }}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 ${
        isScrolled ? 'text-gray-800' : 'text-white'
      }`}
    >
      {link.name}
    </a>
  ))}

  {/* ===== مناطق عملنا Dropdown ===== */}
  <div className="relative group">
    <button
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gold/10 flex items-center gap-2 ${
        isScrolled ? 'text-gray-800' : 'text-white'
      }`}
    >
      مناطق عملنا
      <span className="text-xs">▾</span>
    </button>

    <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <a
        href="/contractor-almalqa-riyadh"
        className="block px-4 py-3 text-sm text-gray-800 hover:bg-gold/10 rounded-xl transition"
      >
        حي الملقا
      </a>
    </div>
  </div>
</div>

          {/* CTA Button */}
<div className="hidden lg:flex items-center gap-4">
  <a
    href="tel:+966550604837"
    className={`flex items-center gap-2 text-sm font-medium ${
      isScrolled ? 'text-gray-800' : 'text-white'
    }`}
  >
    <Phone className="w-4 h-4" />
    <span>055 060 4837</span>
  </a>

  {/* Social Icons */}
  <div className="flex items-center gap-2">
    <a
      href="https://x.com/pybcco"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="X"
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
        isScrolled ? 'bg-black/5 hover:bg-black/10' : 'bg-white/10 hover:bg-white/20'
      }`}
    >
      <Twitter className={`w-4 h-4 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
    </a>

    <a
      href="https://www.linkedin.com/company/pybcco"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
        isScrolled ? 'bg-black/5 hover:bg-black/10' : 'bg-white/10 hover:bg-white/20'
      }`}
    >
      <Linkedin className={`w-4 h-4 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
    </a>
  </div>

  <Button
    onClick={() => scrollToSection('#contact')}
    className="bg-gold hover:bg-gold/90 text-black font-bold px-6"
  >
    طلب عرض سعر
  </Button>
</div>


          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? 'text-black' : 'text-white'}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-dark border-gold/20">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold">ب</span>
                    </div>
                    <div className="text-white">
                      <h1 className="font-bold">بنيان الهرم</h1>
                      <p className="text-xs text-white/60">للمقاولات</p>
                    </div>
                  </div>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="px-4 py-3 text-white hover:bg-gold/10 hover:text-gold rounded-lg transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  ))}
                  <nav className="flex flex-col gap-2">
  {navLinks.map((link) => (
    <a
      key={link.name}
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(link.href);
      }}
      className="px-4 py-3 text-white hover:bg-gold/10 hover:text-gold rounded-lg transition-all duration-200"
    >
      {link.name}
    </a>
  ))}

  {/* ===== مناطق عملنا - الموبايل ===== */}
  <a
    href="/contractor-almalqa-riyadh"
    onClick={() => setIsOpen(false)}
    className="px-4 py-3 text-white hover:bg-gold/10 hover:text-gold rounded-lg transition-all duration-200"
  >
    مناطق عملنا – حي الملقا
  </a>
</nav>

                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <a
                    href="tel:+966550604837"
                    className="flex items-center gap-3 text-white mb-4"
                  >
                    <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">اتصل بنا</p>
                      <p className="font-bold">055 060 4837</p>
                    </div>
                  </a>
                  <Button
                  
                    onClick={() => scrollToSection('#contact')}
                    className="w-full bg-gold hover:bg-gold/90 text-black font-bold"
                  >
                    طلب عرض سعر
                  </Button>
                  <div className="flex items-center justify-center gap-3 mt-4">
  <a
    href="https://x.com/pybcco"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
  >
    <Twitter className="w-5 h-5 text-white" />
  </a>

  <a
    href="https://www.linkedin.com/company/pybcco"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
  >
    <Linkedin className="w-5 h-5 text-white" />
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
