import { Phone, Mail, MapPin, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { name: "الرئيسية", href: "#hero" },
  { name: "من نحن", href: "#about" },
  { name: "خدماتنا", href: "#services" },
  { name: "مشاريعنا", href: "#projects" },
  { name: "فريق العمل", href: "#team" },
  { name: "تواصل معنا", href: "#contact" },
];

const services = [
  "المقاولات العامة",
  "أعمال التشطيب",
  "هياكل الحديد",
  "أعمدة الإنارة",
  "الإشراف الهندسي",
  "ورش النجارة",
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/pybcco/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/pybcco", label: "X" },
];

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  ltrValue,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
  ltrValue?: boolean;
}) {
  const Content = (
    <div className="flex flex-row-reverse items-start gap-3 w-full">
      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>

      <div className="min-w-0 text-right flex-1">
        <p className="text-sm text-white/50 leading-5">{label}</p>
        <p
          className="font-semibold text-white/80 leading-6 break-words text-right"
          dir={ltrValue ? "ltr" : "rtl"}
          style={{ unicodeBidi: "plaintext" as any }}
        >
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <li className="w-full">
      {href ? (
        <a
          href={href}
          className="block w-full text-white/70 hover:text-gold transition-colors"
        >
          {Content}
        </a>
      ) : (
        <div className="w-full text-white/70">{Content}</div>
      )}
    </li>
  );
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-white relative overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
            backgroundSize: "40px 40px",
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

            <div className="flex gap-2">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gold">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
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
              {services.map((s, i) => (
                <li key={i}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#services");
                    }}
                    className="text-white/70 hover:text-gold transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gold">تواصل معنا</h4>

            <ul className="space-y-4">
              <ContactRow
                icon={Phone}
                label="اتصل بنا"
                value="055 060 4837"
                href="tel:+966550604837"
                ltrValue
              />
              <ContactRow
                icon={Mail}
                label="البريد الإلكتروني"
                value="info@pybcco.com"
                href="mailto:info@pybcco.com"
                ltrValue
              />
              <ContactRow
                icon={MapPin}
                label="العنوان"
                value="شارع الوشم، المعذر، الرياض"
              />
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

      {/* QR */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="text-sm text-white/70">امسح الكود لزيارة بروفايل الشركة</p>
        <img
          src="/assets/qr.png"
          alt="QR Code"
          className="w-32 h-32 object-contain rounded-md bg-white p-2"
          loading="lazy"
        />
      </div>

      {/* Scroll to Top */}
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
