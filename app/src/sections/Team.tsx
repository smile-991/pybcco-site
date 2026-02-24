import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, Linkedin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const teamMembers = [
  {
    id: 1,
    name: 'طارق القصيباتي',
    nameEn: 'Tariq Al-Qosaibaty',
    position: 'المدير العام',
    positionEn: 'General Manager',
    image: null,
    phone: '+966550604837',
    email: 'info@pybcco.com',
    bio: 'يمتلك أكثر من 15 عاماً من الخبرة في مجال المقاولات وإدارة المشاريع الكبرى. قاد الشركة منذ تأسيسها وحقق نمواً مستمراً في حجم الأعمال والمشاريع.',
    achievements: [
      'قيادة أكثر من 90 مشروعاً ناجحاً',
      'توسيع نطاق عمل الشركة لـ 19 مدينة',
      'بناء شراكات استراتيجية مع كبرى الشركات',
    ],
  },
  {
    id: 2,
    name: 'م. محمد حسن الجباصيني',
    nameEn: 'Eng. Mohamed H. Al Jabasini',
    position: 'مدير المشاريع',
    positionEn: 'Projects Manager',
    image: null,
    phone: '+966550604837',
    email: 'm.h.jabasini@pybcco.com',
    bio: 'مهندس معماري متخصص في إدارة المشاريع الإنشائية. يمتلك خبرة واسعة في الإشراف على المشاريع الكبرى وضمان جودة التنفيذ.',
    achievements: [
      'إدارة مشاريع بقيمة تتجاوز 50 مليون ريال',
      'خبرة في جميع مراحل المشاريع الإنشائية',
      'حاصل على شهادات متخصصة في إدارة المشاريع',
    ],
  },
  {
    id: 3,
    name: 'يسرى درويش',
    nameEn: 'Yusra Darwish',
    position: 'منسقة المشاريع',
    positionEn: 'Project Coordinator',
    image: null,
    phone: '+966550604837',
    email: 'info@pybcco.com',
    bio: 'متخصصة في تنسيق العمل بين الفرق المختلفة ومتابعة سير المشاريع. تضمن التواصل الفعال بين العملاء والفريق التنفيذي.',
    achievements: [
      'تنسيق أكثر من 30 مشروعاً',
      'خبرة في إدارة العلاقات مع العملاء',
      'تطوير نظم متابعة المشاريع',
    ],
  },
  {
    id: 4,
    name: 'رغد سكر',
    nameEn: 'Raghad Sukkar',
    position: 'مهندسة معمارية',
    positionEn: 'Senior Architect',
    image: null,
    phone: '+966550604837',
    email: 'info@pybcco.com',
    bio: 'مهندسة معمارية متخصصة في التصميم الداخلي والخارجي. تقدم حلولاً إبداعية تجمع بين الجمال والوظيفة.',
    achievements: [
      'تصميم أكثر من 50 مشروعاً',
      'خبرة في التصاميم السكنية والتجارية',
      'إتقان برامج التصميم المعماري الحديثة',
    ],
  },
  {
    id: 5,
    name: 'أحمد صبيح',
    nameEn: 'Ahmed Sebaie',
    position: 'العلاقات العامة',
    positionEn: 'Public Relations',
    image: null,
    phone: '+966550604837',
    email: 'info@pybcco.com',
    bio: 'مسؤول عن إدارة العلاقات العامة والتواصل مع العملاء والشركاء. يعمل على تعزيز صورة الشركة وبناء علاقات طويلة الأمد.',
    achievements: [
      'بناء شبكة علاقات واسعة',
      'إدارة العلاقات مع كبرى الشركات',
      'تنظيم الفعاليات والمؤتمرات',
    ],
  },
  {
    id: 6,
    name: 'م. محمد عبدالله',
    nameEn: 'Mohammed Abdullah',
    position: 'مهندس أول',
    positionEn: 'Senior Engineer',
    image: null,
    phone: '+966550604837',
    email: 'info@pybcco.com',
    bio: 'مهندس إنشائي متخصص في أعمال الخرسانة والهياكل المعدنية. يمتلك خبرة عميقة في التنفيذ الإنشائي للمشاريع الكبرى.',
    achievements: [
      'إشراف على مشاريع ضخمة',
      'خبرة في الهياكل الخرسانية والمعدنية',
      'حاصل على شهادات مهنية متخصصة',
    ],
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null);

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
    <section
      id="team"
      ref={sectionRef}
      className="section-padding bg-gray-50 relative overflow-hidden"
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
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block bg-gold/10 text-gold-dark px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
            فريق العمل
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            نخبة من <span className="text-gold">المختصين والمحترفين</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            فريق عمل متخصص يضم مهندسين ومشرفين وعمال مدربين بعناية لتحقيق رؤية الشركة
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover-lift border border-gray-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              {/* Avatar */}
              <div className="relative pt-5 pb-3 bg-gradient-to-b from-gold/10 to-transparent">
                <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="text-base font-bold text-gray-900 mb-0.5 group-hover:text-gold transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-xs mb-1">{member.nameEn}</p>
                <p className="text-gold font-semibold text-sm mb-3">{member.position}</p>

                {/* Contact Buttons */}
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-full hover:bg-gold/10 hover:text-gold hover:border-gold"
                    onClick={() => window.open(`tel:${member.phone}`)}
                    aria-label={`اتصال ${member.name}`}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-full hover:bg-gold/10 hover:text-gold hover:border-gold"
                    onClick={() => window.open(`mailto:${member.email}`)}
                    aria-label={`إرسال بريد إلى ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-full hover:bg-gold/10 hover:text-gold hover:border-gold"
                    aria-label={`LinkedIn ${member.name}`}
                    onClick={() => setSelectedMember(member)}
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="mt-3 text-gold hover:text-gold-dark hover:bg-gold/10 h-9 px-3"
                  onClick={() => setSelectedMember(member)}
                >
                  المزيد
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div
          className={`mt-10 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gold/10 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-2">انضم إلى فريقنا</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              نبحث دائماً عن الكفاءات المتميزة للانضمام إلى فريقنا المتخصص
            </p>
            <Button
              className="bg-gold hover:bg-gold/90 text-black font-bold px-7"
              onClick={() =>
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </div>

      {/* Member Details Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-lg" dir="rtl">
          {selectedMember && (
            <>
              <DialogHeader className="text-center">
                <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full overflow-hidden border-4 border-gold mb-3">
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  {selectedMember.name}
                </DialogTitle>
                <DialogDescription className="text-gold font-semibold">
                  {selectedMember.position}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">نبذة عنه:</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedMember.bio}</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">إنجازاته:</h4>
                  <ul className="space-y-1">
                    {selectedMember.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                        <div className="w-2 h-2 bg-gold rounded-full" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open(`tel:${selectedMember.phone}`)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    اتصال
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open(`mailto:${selectedMember.email}`)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    بريد
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}