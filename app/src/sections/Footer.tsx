import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { name: 'الرئيسية', href: '#hero' },
  { name: 'من نحن', href: '#about' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'مشاريعنا', href: '#projects' },
  { name: 'فريق العمل', href: '#team' },
  { name: 'تواصل معنا', href: '#contact' },
];

const services = [
  'المقاولات العامة',
  'أعمال التشطيب',
  'هياكل الحديد',
  'أعمدة الإنارة',
  'الإشراف الهندسي',
  'ورش النجارة',
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main Footer */}
      <div className="container-custom relative z-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
<div className="w-14 h-14 bg-gold rounded-xl flex items-center justify-center overflow-hidden">
  <img
    src="/assets/logo.png"
    alt="بنيان الهرم للمقاولات"
    className="w-full h-full object-contain"
  />
</div>

              <div>
                <h3 className="font-bold text-xl">بنيان الهرم</h3>
                <p className="text-white/60 text-sm">للمقاولات</p>
              </div>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              نبني المستقبل بإتقان وجودة عالية. خبرة تمتد لأكثر من 12 عاماً في مجال
              المقاولات والتشطيبات حول المملكة العربية السعودية.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gold">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gold">خدماتنا</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#services');
                    }}
                    className="text-white/70 hover:text-gold transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gold">تواصل معنا</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+966550604837"
                  className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">اتصل بنا</p>
                    <p className="font-semibold">055 060 4837</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:m.h.jabasini@pybcco.com"
                  className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">البريد الإلكتروني</p>
                    <p className="font-semibold">info@pybcco.com</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">العنوان</p>
                    <p className="font-semibold">شارع الوشم، المعذر، الرياض</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-right">
              © 2026 بنيان الهرم للمقاولات. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/50 hover:text-gold text-sm transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-white/50 hover:text-gold text-sm transition-colors">
                الشروط والأحكام
              </a>
            </div>
          </div>
        </div>
      </div>
{/* QR Code */}
<div className="mt-10 flex flex-col items-center gap-3">
  <p className="text-sm text-white/70">امسح الكود لزيارة بروفايل الشركة</p>

  <img
    src="/assets/qr.png"
    alt="QR Code"
    className="w-32 h-32 object-contain rounded-md bg-white p-2"
    loading="lazy"
  />
</div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-6 left-6 w-12 h-12 bg-gold hover:bg-gold/90 text-black rounded-full shadow-lg z-50"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </footer>
  );
}
