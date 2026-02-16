import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Building2, HardHat, Ruler, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: Building2, value: '90+', label: 'مشروع منفذ' },
  { icon: HardHat, value: '12+', label: 'سنة خبرة' },
  { icon: Ruler, value: '19', label: 'مدينة' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
  const handleScroll = () => {
    const y = window.scrollY || 0;
    setScrollY(y);

    if (heroRef.current) {
      const parallaxElements =
        heroRef.current.querySelectorAll(".parallax");

      parallaxElements.forEach((el) => {
        (el as HTMLElement).style.transform =
          `translateY(${y * 0.5}px)`;
      });
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
}, []);  // ← useEffect انتهى هون

// 👇👇👇 من هون صار خارج useEffect
const progress = Math.min(scrollY / 320, 1);
const fade = 1 - progress * 0.55;
const lift = progress * 14;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 parallax">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom pt-20">
<div
  className="text-center max-w-4xl mx-auto"
  style={{
    opacity: fade,
    transform: `translateY(${lift}px)`,
    willChange: "opacity, transform",
  }}
>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-sm font-medium">
              شركة مقاولات معتمدة منذ 2013
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-white font-extrabold leading-tight tracking-wide text-4xl sm:text-5xl lg:text-6xl text-center mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
  شركة{" "}
  <span className="text-gold/90">بنيان الهرم</span>{" "}
  <span className="whitespace-nowrap">
    للمقاولات
  </span>
</h1>

          {/* Subtitle */}
          <p className="mt-6 text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-center drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
  نقدم حلول مقاولات متكاملة تشمل الأعمال الإنشائية وأعمال التشطيبات،
  وفق أعلى معايير الجودة والالتزام داخل المملكة العربية السعودية.
</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={() => scrollToSection('#contact')}
              size="lg"
              className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 text-lg w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 ml-2" />
              تواصل معنا
            </Button>
            <Button
              onClick={() => scrollToSection('#projects')}
              size="lg"
              variant="outline"
              className="border border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white transition-all duration-300 px-8 py-6 text-lg w-full sm:w-auto"
            >
              استعرض مشاريعنا
            </Button>
            <Button
  onClick={() => (window.location.href = "/villa-finishing-price-riyadh#boq")}
  size="lg"
  className="bg-gold/80 hover:bg-gold text-black font-bold px-8 py-6 text-lg w-full sm:w-auto"
>
  انشئ عرض سعرك بنفسك
</Button>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10"
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gold mx-auto mb-2" />
                <div className="text-2xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('#about')}
          className="text-white/60 hover:text-gold transition-colors"
        >
          <ArrowDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
