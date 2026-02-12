import { useEffect, useRef, useState } from 'react';
import { Target, Eye, Award, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'رسالتنا',
    description:
      'تقديم خدمات مقاولات عالية الجودة تلبي تطلعات عملائنا وتساهم في بناء مستقبل مزدهر للمملكة',
  },
  {
    icon: Eye,
    title: 'رؤيتنا',
    description:
      'أن نكون الشركة الرائدة في مجال المقاولات والتشطيبات في المملكة العربية السعودية',
  },
  {
    icon: Award,
    title: 'قيمنا',
    description:
      'الجودة، الاحترافية، الشفافية، الالتزام بالمواعيد، والابتكار في كل مشروع ننفذه',
  },
];

const achievements = [
  'أكثر من 90 مشروع منفذ بنجاح',
  'تغطية 19 مدينة حول المملكة',
  'فريق عمل متخصص ومحترف',
  'شهادات وتراخيص معتمدة',
  'شراكات استراتيجية مع كبرى الشركات',
  'التزام تام بمعايير الجودة والسلامة',
];

export default function About() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            من نحن
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            شريكك الموثوق في <span className="text-gold">البناء والتطوير</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            شركة بنيان الهرم للمقاولات، نبني الثقة قبل البناء
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Image */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                  alt="Construction site"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gold rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-bold text-black">12+</div>
                <div className="text-black/80 text-sm">سنة خبرة</div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-gold/30 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 left-1/4 w-16 h-16 bg-gold/20 rounded-full -z-10" />
          </div>

          {/* Right - Content */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              نحن نبني المستقبل بإتقان وجودة عالية
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              بدأت شركة بنيان الهرم للمقاولات كمؤسسة في عام 2013، وتطورت لتصبح
              شركة رائدة في مجال المقاولات والتشطيبات في المملكة العربية السعودية.
              نعمل بفريق متخصص من المهندسين والمشرفين والعمال المدربين بعناية.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              نقدم خدمات متكاملة تشمل المقاولات العامة، أعمال التشطيب، هياكل
              الحديد، النجارة، وإنتاج أعمدة الإنارة. نفخر بتنفيذ أكثر من 90 مشروعاً
              ناجحاً في 19 مدينة حول المملكة.
            </p>

            {/* Achievements List */}
            <div className="grid sm:grid-cols-2 gap-3">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gray-50 rounded-2xl p-8 hover:bg-gold/5 transition-all duration-500 hover-lift border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
