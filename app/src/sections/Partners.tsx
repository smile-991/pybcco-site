import { useEffect, useRef, useState } from 'react';
import { Handshake, Building2, Star } from 'lucide-react';

const partners = [
  {
    name: 'AL LATIFIA TRADING',
    type: 'تجاري',
    projects: 1,
  },
  {
    name: 'Abdul Aziz Al Hajj',
    type: 'حكومي',
    projects: 1,
  },
  {
    name: 'AL KAYAN AL ARABIA TECH',
    type: 'صحي',
    projects: 1,
  },
  {
    name: 'Madara',
    type: 'سكني',
    projects: 1,
  },
  {
    name: 'Dar Alhandassa',
    type: 'سكني',
    projects: 1,
  },
  {
    name: 'KHALIF EL KHALIF',
    type: 'زراعي',
    projects: 1,
  },
  {
    name: 'Aljazeera Hyper market',
    type: 'تجاري',
    projects: 2,
  },
  {
    name: 'TOM TOM RESTAURANT',
    type: 'تجاري',
    projects: 1,
  },
  {
    name: 'SAAD EL MEGRNY',
    type: 'تجاري',
    projects: 2,
  },
  {
    name: 'Gulf Real Estate company',
    type: 'سكني',
    projects: 1,
  },
  {
    name: 'CANON',
    type: 'تجاري',
    projects: 1,
  },
  {
    name: 'HARMONI',
    type: 'ديني',
    projects: 1,
  },
  {
    name: 'Prolight',
    type: 'تجاري',
    projects: 3,
  },
  {
    name: 'AL-WATANIA PLASTICS FACTORY',
    type: 'صناعي',
    projects: 1,
  },
  {
    name: 'NAVIWAHIRE',
    type: 'تجاري',
    projects: 1,
  },
];

export default function Partners() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="section-padding bg-gray-50 relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            شركاؤنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            نفخر بـ <span className="text-gold">شراكتنا</span> مع كبرى الشركات
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            نعمل مع نخبة من الشركات والمؤسسات الرائدة في المملكة العربية السعودية
          </p>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <Handshake className="w-10 h-10 text-gold mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
            <div className="text-gray-500 text-sm">شريك نجاح</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <Building2 className="w-10 h-10 text-gold mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">90+</div>
            <div className="text-gray-500 text-sm">مشروع مشترك</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <Star className="w-10 h-10 text-gold mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
            <div className="text-gray-500 text-sm">رضا العملاء</div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`group bg-white rounded-xl p-5 text-center shadow-md hover:shadow-xl transition-all duration-500 hover-lift border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + index * 50}ms` }}
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gold transition-colors">
                <Building2 className="w-7 h-7 text-gold group-hover:text-black transition-colors" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-gold transition-colors">
                {partner.name}
              </h4>
              <p className="text-gray-500 text-xs mb-2">{partner.type}</p>
              <span className="inline-block bg-gold/10 text-gold-dark text-xs px-2 py-1 rounded-full">
                {partner.projects} مشروع
              </span>
            </div>
          ))}
        </div>

        {/* Become Partner CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-gold/20 to-gold/5 rounded-2xl p-8 max-w-2xl mx-auto border border-gold/20">
            <Handshake className="w-16 h-16 text-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              كن شريكاً في النجاح
            </h3>
            <p className="text-gray-600 mb-6">
              نرحب بالشراكات الاستراتيجية مع الشركات والمؤسسات التي تبحث عن جودة عالية وخبرة موثوقة
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-3 rounded-xl transition-colors"
            >
              تواصل معنا للشراكة
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
