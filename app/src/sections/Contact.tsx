import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// ✅ NAP موحّد رسمي (لا تغيّر الصيغ بين الصفحات والمنصات)
const PHONE_LOCAL = "055 060 4837";
const PHONE_INTL = "+966 55 060 4837";
const PHONE_TEL = "+966550604837";

const EMAIL_PUBLIC = "info@pybcco.com";

// ✅ العنوان مطابق (مع حي + دولة لرفع دقة الخرائط والتطابق مع GBP)
const ADDRESS_EN = "Al Washm St, Al Murabba, Riyadh 12345, Saudi Arabia";
const ADDRESS_AR =
  "شارع الوشم، حي المربع، الرياض 12345، المملكة العربية السعودية";

// رابط خريطة يعتمد على العنوان (بدل دبوس مختلف)
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_EN
)}`;

// Embed يعتمد على query (آمن ويطابق العنوان)
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS_EN
)}&output=embed`;

const contactInfo = [
  {
    icon: Phone,
    title: "اتصل بنا",
    value: PHONE_LOCAL,
    subValue: PHONE_INTL,
    href: `tel:${PHONE_TEL}`,
    dir: "ltr" as const,
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: EMAIL_PUBLIC,
    subValue: "للاستفسارات والعروض",
    href: `mailto:${EMAIL_PUBLIC}`,
    dir: "ltr" as const,
  },
  {
    icon: MapPin,
    title: "العنوان",
    value: ADDRESS_AR,
    subValue: "الرياض، المملكة العربية السعودية",
    href: MAPS_LINK,
    dir: "rtl" as const,
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    value: "السبت - الخميس",
    subValue: "8:00 ص - 5:00 م",
    href: null as string | null,
    dir: "rtl" as const,
  },
];

const serviceTypes = [
  "المقاولات العامة",
  "أعمال التشطيب",
  "بناء عظم",
  "ترميم وصيانة",
  "الإشراف الهندسي",
  "أخرى",
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ✅ تصحيح الهيدر
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "فشل إرسال الرسالة. حاول مرة أخرى.");
      }

      toast.success("تم إرسال رسالتك بنجاح!", {
        description: "سنقوم بالتواصل معك في أقرب وقت ممكن.",
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err: any) {
      toast.error("تعذّر إرسال الرسالة", {
        description: err?.message || "تحقق من الاتصال وحاول مجدداً.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #000 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            تواصل معنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            دعنا <span className="text-gold">نبني معاً</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            نحن هنا لمساعدتك في تحقيق مشاريعك. تواصل معنا للحصول على استشارة مجانية
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div
            className={`lg:col-span-1 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-5 hover:bg-gold/5 transition-colors border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-gold" />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>

                      <p
                        dir={info.dir ?? "rtl"}
                        className="text-gray-700 font-medium text-right"
                        style={{ unicodeBidi: "plaintext" }}
                      >
                        {info.value}
                      </p>

                      <p
                        dir={info.dir ?? "rtl"}
                        className="text-gray-500 text-sm text-right"
                        style={{ unicodeBidi: "plaintext" }}
                      >
                        {info.subValue}
                      </p>

                      {info.href && (
                        <a
                          href={info.href}
                          className="inline-block mt-2 text-gold hover:text-gold-dark text-sm font-semibold"
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            info.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {info.href.startsWith("tel")
                            ? "اتصل الآن"
                            : info.href.startsWith("mailto")
                            ? "أرسل بريد"
                            : "عرض على الخريطة"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/966550604837"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl text-center transition-colors px-3 py-3 sm:p-4"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2" />
                <span className="font-bold text-xs sm:text-sm">واتساب</span>
              </a>

              <a
                href={`tel:${PHONE_TEL}`}
                className="bg-gold hover:bg-gold/90 text-black rounded-xl text-center transition-colors px-3 py-3 sm:p-4"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2" />
                <span className="font-bold text-xs sm:text-sm">اتصال مباشر</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                أرسل لنا رسالتك
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      الاسم الكامل <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="أدخل اسمك الكامل"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-white border-gray-200 focus:border-gold focus:ring-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      رقم الجوال <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="bg-white border-gray-200 focus:border-gold focus:ring-gold"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-white border-gray-200 focus:border-gold focus:ring-gold"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-gray-700">
                      نوع الخدمة
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData({ ...formData, service: value })
                      }
                    >
                      <SelectTrigger
  aria-label="اختر نوع الخدمة"
  className="bg-white border-gray-200 focus:border-gold focus:ring-gold"
>
  <SelectValue placeholder="اختر نوع الخدمة" />
</SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700">
                    الرسالة <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="اكتب رسالتك هنا..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="bg-white border-gray-200 focus:border-gold focus:ring-gold resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      إرسال الرسالة
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div
          className={`mt-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center border border-gray-200 overflow-hidden">
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع الشركة على الخريطة"
            />
          </div>

          <div className="mt-3 text-center">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dark font-semibold text-sm"
            >
              فتح الموقع على خرائط Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
