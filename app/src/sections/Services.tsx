import { useEffect, useRef, useState } from 'react';
import { Building2, Factory, Hammer, Lightbulb, Ruler, HardHat, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const services = [
  {
    icon: Building2,
    title: 'المقاولات العامة',
    shortDesc: 'بناء وتشييد المشاريع السكنية والتجارية والصناعية',
    fullDesc: 'نقدم خدمات المقاولات العامة الشاملة لجميع أنواع المشاريع، بدءاً من المباني السكنية والتجارية وصولاً إلى المنشآت الصناعية. نضمن الجودة العالية والالتزام بالمواعيد في كل مشروع.',
    features: [
      'مقاولات المباني السكنية',
      'مقاولات المباني التجارية',
      'مقاولات المنشآت الصناعية',
      'أعمال الهياكل الخرسانية',
      'أعمال المباني المعدنية',
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  },
  {
    icon: Factory,
    title: 'أعمال التشطيب',
    shortDesc: 'تشطيبات داخلية وخارجية بأعلى معايير الجودة',
    fullDesc: 'نقدم خدمات التشطيب الداخلي والخارجي بأعلى معايير الجودة، مع استخدام أفضل المواد والتقنيات الحديثة لضمان النتائج المثالية.',
    features: [
      'الدهانات والديكورات',
      'أرضيات السيراميك والباركيه',
      'أسقف معلقة وجبسية',
      'أعمال الكهرباء والسباكة',
      'الواجهات الخارجية',
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
  {
    icon: Hammer,
    title: 'هياكل الحديد',
    shortDesc: 'تصنيع وتركيب الهياكل المعدنية والأسقف',
    fullDesc: 'نوفر خدمات تصنيع وتركيب الهياكل المعدنية بجميع أنواعها، مع ورش متخصصة مجهزة بأحدث المعدات والتقنيات.',
    features: [
      'الهياكل المعدنية للمباني',
      'الأسقف المعدنية',
      'الأبواب والشبابيك المعدنية',
      'الدرجات المعدنية',
      'الأسوار والحواجز',
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    icon: Lightbulb,
    title: 'أعمدة الإنارة',
    shortDesc: 'إنتاج وتركيب أعمدة الإنارة بجميع الأنواع',
    fullDesc: 'نمتلك خط إنتاج متخصص لأعمدة الإنارة بجميع الأنواع والأحجام، مع ضمان الجودة والمتانة وفق المعايير العالمية.',
    features: [
      'أعمدة إنارة الشوارع',
      'أعمدة إنارة الحدائق',
      'أعمدة إنارة الملاعب',
      'أعمدة إنارة المشاريع الخاصة',
      'صيانة وتركيب',
    ],
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80',
  },
  {
    icon: Ruler,
    title: 'الإشراف الهندسي',
    shortDesc: 'إشراف هندسي متكامل على جميع مراحل المشروع',
    fullDesc: 'نقدم خدمات الإشراف الهندسي المتكامل من قبل مهندسين متخصصين لضمان تنفيذ المشاريع وفق المخططات والمواصفات.',
    features: [
      'إعداد المخططات التنفيذية',
      'متابعة تنفيذ الأعمال',
      'مراجعة الجودة',
      'إدارة المشاريع',
      'التنسيق بين الفرق',
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
  },
  {
    icon: HardHat,
    title: 'ورش النجارة',
    shortDesc: 'أعمال النجارة والأثاث بجودة عالية',
    fullDesc: 'نملك ورش نجارة متخصصة لتصنيع جميع أنواع الأعمال الخشبية والأثاث بجودة عالية وتصاميم مميزة.',
    features: [
      'أبواب وشبابيك خشبية',
      'الأثاث الداخلي',
      'الديكورات الخشبية',
      'المطابخ الخشبية',
      'أعمال الديكور',
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

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
      id="services"
      ref={sectionRef}
      className="section-padding bg-gray-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            خدماتنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            حلول متكاملة <span className="text-gold">لبناء المستقبل</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            نقدم مجموعة متكاملة من الخدمات الهندسية والمقاولات لتلبية جميع احتياجات مشروعك
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.shortDesc}
                </p>
                <Button
                  variant="ghost"
                  className="text-gold hover:text-gold-dark hover:bg-gold/10 p-0 h-auto font-semibold"
                  onClick={() => setSelectedService(service)}
                >
                  اكتشف المزيد
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 right-4 w-14 h-14 bg-gold rounded-xl flex items-center justify-center">
                    <selectedService.icon className="w-7 h-7 text-black" />
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {selectedService.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 text-base">
                  {selectedService.fullDesc}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <h4 className="font-bold text-gray-900 mb-3">ما نقدمه:</h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  className="flex-1 bg-gold hover:bg-gold/90 text-black font-bold"
                  onClick={() => {
                    setSelectedService(null);
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  طلب الخدمة
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedService(null)}
                >
                  إغلاق
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
