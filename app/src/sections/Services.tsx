import { useEffect, useRef, useState } from 'react';
import { Building2, Hammer, Home, Wallet, Wrench, Layers, ClipboardList, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Building2,
    title: 'شركة مقاولات بالرياض',
    shortDesc: 'مقاولات عامة لتنفيذ أعمال البناء والعظم والتشطيبات بإدارة هندسية.',
    href: '/construction-company-riyadh',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
  },
  {
    icon: Hammer,
    title: 'تشطيب فلل بالرياض',
    shortDesc: 'تشطيب داخلي وخارجي بجودة عالية حتى تسليم المفتاح مع إشراف هندسي.',
    href: '/villa-finishing-riyadh',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  },
  {
    icon: Wrench,
    title: 'ترميم فلل بالرياض',
    shortDesc: 'ترميم وتجديد الفلل والمنازل ومعالجة التشققات وتحديث الواجهات.',
    href: '/villa-renovation-riyadh',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
  },
  {
    icon: Home,
    title: 'تشطيب شقق بالرياض',
    shortDesc: 'تشطيب شقق سكنية بتصاميم عصرية وجودة عالية من البداية حتى النهاية.',
    href: '/apartment-finishing-riyadh',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
  },
  {
    icon: Layers,
    title: 'بناء عظم بالرياض',
    shortDesc: 'تنفيذ العظم والخرسانات وفق المخططات المعتمدة ومعايير الجودة والسلامة.',
    href: '/villa-bone-construction-riyadh',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  },
  {
    icon: Wallet,
    title: 'أسعار تشطيب فلل بالرياض',
    shortDesc: 'تقدير تكلفة التشطيب حسب المساحة والمواد مع استشارة مجانية قبل البدء.',
    href: '/villa-finishing-price-riyadh',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
  },
  {
    icon: ClipboardList,
    title: 'مقاول ترميم منازل بالرياض',
    shortDesc: 'حلول ترميم المنازل وإعادة التأهيل بإدارة هندسية متكاملة حتى التسليم.',
    href: '/home-renovation-company-riyadh',
    image: "/images/home-renovation-hero.jpg",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            خدماتنا في الرياض
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            خدمات مقاولات وتشطيبات <span className="text-gold">بجودة عالية</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            اختر الخدمة التي تبحث عنها، وتصفح صفحة الخدمة للحصول على التفاصيل وطلب معاينة مجانية.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.href}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift border border-gray-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-black" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.shortDesc}</p>

                <Button asChild variant="ghost" className="text-gold hover:text-gold-dark hover:bg-gold/10 p-0 h-auto font-semibold">
                  <a href={service.href}>
                    عرض الخدمة
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
