import { useEffect, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  Shield,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const certificates = [
  {
    id: 1,
    title: "السجل التجاري",
    titleEn: "Commercial Registration",
    issuer: "وزارة التجارة",
    number: "7008158516",
    date: "07/10/2020",
    expiry: "07/10/2025",
    status: "ساري",
    icon: Building,
    description: "سجل تجاري معتمد من وزارة التجارة السعودية لممارسة أعمال المقاولات",
    file: "/certificates/CRara.webp",
    features: [
      "رقم السجل: 7008158516",
      "النشاط: مقاولات عامة",
      "الفرع الرئيسي: الرياض",
      "الحالة: نشط",
    ],
  },
  {
    id: 2,
    title: "شهادة الضريبة المضافة",
    titleEn: "VAT Registration Certificate",
    issuer: "الهيئة العامة للزكاة والدخل",
    number: "310774608000003",
    date: "01/11/2020",
    expiry: "ساري",
    status: "ساري",
    icon: FileCheck,
    description: "شهادة تسجيل في ضريبة القيمة المضافة معتمدة من الهيئة العامة للزكاة والدخل",
    file: "/certificates/vat.webp",
    features: [
      "رقم التسجيل: 310774608000003",
      "تاريخ التسجيل: 01/11/2020",
      "الحالة: مسجل ومفعل",
      "الالتزام: كامل",
    ],
  },
  {
    id: 3,
    title: "التأمينات الاجتماعية",
    titleEn: "Social Insurance",
    issuer: "المؤسسة العامة للتأمينات الاجتماعية",
    number: "601875632",
    date: "01/01/2020",
    expiry: "ساري",
    status: "ساري",
    icon: Shield,
    description: "شهادة اشتراك في التأمينات الاجتماعية لجميع العاملين في الشركة",
    // ✅ لا صورة للتأمينات (كما طلبت)
    file: null as string | null,
    features: [
      "رقم الاشتراك: 601875632",
      "عدد العمال: 50+",
      "التغطية: شاملة",
      "الالتزام: منتظم",
    ],
  },
  {
    id: 4,
    title: "عضوية غرفة الرياض",
    titleEn: "Riyadh Chamber Membership",
    issuer: "غرفة الرياض",
    number: "588671",
    date: "08/10/2020",
    expiry: "05/09/2024",
    status: "ساري",
    icon: Award,
    description: "عضوية معتمدة في غرفة الرياض للأعمال التجارية والصناعية",
    file: "/certificates/champer.webp",
    features: [
      "رقم العضوية: 588671",
      "درجة العضوية: الثانية",
      "النشاط: المقاولات",
      "الحالة: عضو فعال",
    ],
  },
  {
    id: 5,
    title: "منشآت",
    titleEn: "Monshaat Certificate",
    issuer: "هيئة المنشآت الصغيرة والمتوسطة",
    number: "26116304878",
    date: "26/01/2026",
    expiry: "ساري",
    status: "ساري",
    icon: CheckCircle2,
    description: "شهادة معتمدة من هيئة المنشآت الصغيرة والمتوسطة كمنشأة وطنية",
    file: "/certificates/monshaat.webp",
    features: [
      "رقم الشهادة: 26116304878",
      "التصنيف: منشأة وطنية",
      "الدعم: مؤهل للبرامج",
      "الحالة: معتمد",
    ],
  },
  {
    id: 6,
    title: "وزارة الاستثمار",
    titleEn: "Ministry of Investment",
    issuer: "وزارة الاستثمار",
    number: "24926246905",
    date: "01/01/2026",
    expiry: "ساري",
    status: "ساري",
    icon: Building,
    description: "شهادة تسجيل الاستثمار معتمدة من وزارة الاستثمار السعودية",
    file: "/certificates/investment-cr.webp",
    features: [
      "رقم التسجيل: 24926246905",
      "رأس المال: 100,000 ريال",
      "الكيان: شركة ذات مسؤولية محدودة",
      "الحالة: نشط",
    ],
  },
];

type Cert = (typeof certificates)[0];

export default function Certificates() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Cert | null>(
    null
  );

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
      id="certificates"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gold/5 skew-x-12 -translate-x-1/4" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            الشهادات والتراخيص
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            معتمدون و<span className="text-gold">مرخصون رسمياً</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            نحمل جميع التراخيص والشهادات اللازمة لممارسة أعمال المقاولات في المملكة
            العربية السعودية
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift border border-gray-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                <cert.icon className="w-8 h-8 text-gold group-hover:text-black transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gold transition-colors">
                {cert.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{cert.titleEn}</p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الجهة المصدرة:</span>
                  <span className="font-semibold text-gray-900">{cert.issuer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">رقم الشهادة:</span>
                  <span className="font-semibold text-gray-900" dir="ltr">
                    {cert.number}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">تاريخ الإصدار:</span>
                  <span className="font-semibold text-gray-900">{cert.date}</span>
                </div>
              </div>

              {/* Status + Action */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    cert.status === "ساري"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {cert.status}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gold hover:text-gold-dark hover:bg-gold/10"
                  onClick={() => setSelectedCertificate(cert)}
                >
                  عرض الشهادة
                  <ExternalLink className="w-4 h-4 mr-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-4 bg-gray-50 rounded-2xl px-8 py-6 border border-gray-100">
            <div className="w-16 h-16 bg-gold rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                شركة موثوقة ومعتمدة
              </h3>
              <p className="text-gray-600">
                جميع شهاداتنا وتراخيصنا محدثة ومعتمدة من الجهات الرسمية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={!!selectedCertificate}
        onOpenChange={() => setSelectedCertificate(null)}
      >
        <DialogContent className="max-w-3xl" dir="rtl">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center">
                    <selectedCertificate.icon className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold text-gray-900">
                      {selectedCertificate.title}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                      {selectedCertificate.titleEn}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* ✅ إذا في صورة → اعرضها | إذا لا → اعرض التفاصيل النصية فقط */}
              {selectedCertificate.file ? (
                <div className="rounded-xl overflow-hidden border bg-white">
                  <img
                    src={selectedCertificate.file}
                    alt={selectedCertificate.title}
                    className="w-full h-auto object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h4 className="font-bold text-gray-900">تفاصيل الشهادة:</h4>
                  {selectedCertificate.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      {feature}
                    </div>
                  ))}
                </div>
              )}

              {/* Description + Features (تبقى للجميع) */}
              <div className="space-y-4 mt-4">
                <p className="text-gray-600">{selectedCertificate.description}</p>

                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h4 className="font-bold text-gray-900">معلومات مختصرة:</h4>
                  {selectedCertificate.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 bg-gold hover:bg-gold/90 text-black font-bold"
                    onClick={() => setSelectedCertificate(null)}
                  >
                    إغلاق
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