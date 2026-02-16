import { useEffect, useRef, useState } from 'react';
import { MapPin, CheckCircle2, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import ProjectsGallery from "./ProjectsGallery";


const projects = [
  {
    id: 1,
    name: 'GARANADA BUSINESS PARK',
    category: 'تجاري',
    location: 'الرياض',
    client: 'AL LATIFIA TRADING',
    scope: 'توريد وتركيب الإضاءة',
    value: '1,120,000 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  },
  {
    id: 2,
    name: 'مشروع NAZAHA',
    category: 'حكومي',
    location: 'الرياض',
    client: 'Abdul Aziz Al Hajj',
    scope: 'توريد وتركيب الإضاءة',
    value: '1,875,804 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80',
  },
  {
    id: 3,
    name: 'مستشفى نبأ الصحة',
    category: 'صحي',
    location: 'الرياض',
    client: 'AL KAYAN AL ARABIA TECH',
    scope: 'توريد وتركيب الإضاءة',
    value: '1,498,785 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80',
  },
  {
    id: 4,
    name: 'فيلات مدارا',
    category: 'سكني',
    location: 'الرياض / العليا',
    client: 'Madara',
    scope: 'مقاول رئيسي (تشطيب)',
    value: '4,000,000 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  },
  {
    id: 5,
    name: 'فيلات الحمراء',
    category: 'سكني',
    location: 'الرياض / الحمراء',
    client: 'Dar Alhandassa',
    scope: 'مقاول رئيسي',
    value: '4,000,000 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  },
  {
    id: 6,
    name: 'مزارع الزلفي',
    category: 'زراعي',
    location: 'الرياض / الزلفي',
    client: 'KHALIF EL KHALIF',
    scope: 'مقاول رئيسي (المباني الرئيسية)',
    value: '1,910,523 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
  },
  {
    id: 7,
    name: 'ستاربكس',
    category: 'تجاري',
    location: 'الرياض / السليمانية',
    client: 'Aljazeera Hyper market',
    scope: 'مقاول رئيسي (إنشاء وتشطيب)',
    value: '1,023,439 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
  },
  {
    id: 8,
    name: 'مطاعم توم توم',
    category: 'تجاري',
    location: 'الرياض',
    client: 'TOM TOM RESTAURANT',
    scope: 'مقاول رئيسي (أعمال التشطيب)',
    value: '11,000,000 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
  },
  {
    id: 9,
    name: 'مبنى 4 أدوار',
    category: 'تجاري',
    location: 'الرياض / السليمانية',
    client: 'SAAD EL MEGRNY',
    scope: 'مقاول رئيسي (إنشاء وتشطيب)',
    value: '10,000,000 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
  {
    id: 10,
    name: 'مجمع 40 فيلا و20 مبنى',
    category: 'سكني',
    location: 'الرياض / الملقا',
    client: 'Gulf Real Estate company',
    scope: 'مقاول رئيسي (تنسيق المواقع)',
    value: '1,800,000 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
  },
  {
    id: 11,
    name: 'محل كانون',
    category: 'تجاري',
    location: 'الرياض وجدة',
    client: 'CANON',
    scope: 'مقاول رئيسي (أعمال التشطيب)',
    value: '1,085,000 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
  },
  {
    id: 12,
    name: 'مسجد النهضة',
    category: 'ديني',
    location: 'الرياض',
    client: 'HARMONI',
    scope: 'توريد الإضاءة',
    value: '594,508 ريال',
    status: 'منتهي',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80',
  },
];

const categories = ['الكل', 'سكني', 'تجاري', 'حكومي', 'صحي', 'ديني', 'زراعي'];

const cities = [
  'الرياض',
  'جدة',
  'الدمام',
  'الأحساء',
  'مكة المكرمة',
  'المدينة المنورة',
  'أبها',
  'جازان',
  'شروة',
  'ظهران الجنوب',
  'الحقو-بيش',
  'ينبع',
  'العلا',
  'بريدة',
  'الطائف',
  'حائل',
  'تبوك',
  'نجران',
  'عرعر',
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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

  const filteredProjects = selectedCategory === 'الكل'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <ProjectsGallery />
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            مشاريعنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            أعمالنا <span className="text-gold">حول المملكة</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            نفخر بتنفيذ أكثر من 90 مشروعاً ناجحاً في 19 مدينة حول المملكة العربية السعودية
          </p>
        </div>

        {/* Cities Map */}
        <div className={`mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              نغطي مشاريعنا <span className="text-gold">19 مدينة</span> حول المملكة
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {cities.map((city, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white hover:bg-gold/10 hover:text-gold transition-colors cursor-default px-4 py-2"
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {city}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'bg-gold text-black hover:bg-gold/90' : 'hover:bg-gold/10 hover:text-gold'}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + index * 50}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gold text-black font-semibold">
                    {project.category}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gold transition-colors line-clamp-1">
                  {project.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-1">
                  {project.scope}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gold font-bold text-sm">{project.value}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gold p-0 h-auto"
                    onClick={() => setSelectedProject(project)}
                  >
                    التفاصيل
                    <ArrowLeft className="w-4 h-4 mr-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button
            size="lg"
            className="bg-gold hover:bg-gold/90 text-black font-bold px-8"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            اطلب مشروعك الآن
          </Button>
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg" dir="rtl">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gold text-black font-semibold">
                      {selectedProject.category}
                    </Badge>
                  </div>
                </div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {selectedProject.name}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {selectedProject.scope}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">الموقع</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gold" />
                    {selectedProject.location}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">العميل</span>
                  <span className="font-semibold text-gray-900">{selectedProject.client}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">قيمة المشروع</span>
                  <span className="font-semibold text-gold">{selectedProject.value}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-500">الحالة</span>
                  <span className="font-semibold text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-gold hover:bg-gold/90 text-black font-bold"
                onClick={() => {
                  setSelectedProject(null);
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                طلب مشروع مماثل
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
