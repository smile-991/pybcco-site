import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

type ClientCheckResponse = {
  found: boolean;
  client: {
    id: string;
    full_name?: string;
    phone?: string;
  } | null;
};

export default function ActivateAccountSection() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("جاري تفعيل الحساب...");
  const [success, setSuccess] = useState(false);
  const [hasProject, setHasProject] = useState<boolean | null>(null);

  useEffect(() => {
    async function activate() {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setMessage("رابط التفعيل غير صالح.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `/api/activate-account?token=${encodeURIComponent(token)}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "فشل تفعيل الحساب.");
        }

        const email = data?.email || "";

        if (email) {
          const checkRes = await fetch(
            `/api/check-user-client?email=${encodeURIComponent(email)}`
          );

          const checkData: ClientCheckResponse = await checkRes.json();

          if (!checkRes.ok) {
            throw new Error("تعذر التحقق من حالة المشروع.");
          }

          setHasProject(!!checkData.found);
        } else {
          setHasProject(false);
        }

        setSuccess(true);
        setMessage("تم تفعيل الحساب بنجاح.");
      } catch (error: any) {
        setMessage(error?.message || "حدث خطأ أثناء التفعيل.");
      } finally {
        setLoading(false);
      }
    }

    activate();
  }, [searchParams]);

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-yellow-500/20 bg-white p-8 shadow-sm text-center">
          <h1 className="mb-4 text-3xl font-bold text-black">تفعيل الحساب</h1>

          <p className="mb-6 text-gray-700 leading-8">{message}</p>

          {!loading && success && hasProject === true && (
            <div className="space-y-4">
              <p className="text-gray-700">
                تم العثور على مشروع مرتبط بحسابك. يمكنك الدخول الآن إلى بوابة العملاء.
              </p>

              <Link
                to="/portal"
                className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black hover:opacity-90"
              >
                الدخول إلى بوابة العملاء
              </Link>
            </div>
          )}

          {!loading && success && hasProject === false && (
  <div className="space-y-6">
    <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-center">
      <p className="text-lg font-semibold text-black mb-2">
        تم تفعيل حسابك بنجاح
      </p>
      <p className="text-gray-700 leading-8">
        لا يوجد مشروع مرتبط بحسابك حاليًا، ويمكنك البدء من خلال إحدى الخدمات التالية:
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2 text-right">
      <Link
        to="/contact"
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
      >
        <div className="text-lg font-bold text-black mb-2">طلب مشروع جديد</div>
        <p className="text-sm leading-7 text-gray-600">
          أرسل طلبك وسنتواصل معك لدراسة المشروع وتقديم العرض المناسب.
        </p>
      </Link>

      <a
        href="https://wa.me/966550604837"
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
      >
        <div className="text-lg font-bold text-black mb-2">إرسال استفسار واتساب</div>
        <p className="text-sm leading-7 text-gray-600">
          تواصل معنا مباشرة عبر واتساب لأي استفسار سريع أو طلب متابعة.
        </p>
      </a>

      <Link
        to="/villa-finishing-price-riyadh"
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
      >
        <div className="text-lg font-bold text-black mb-2">التسعير اليدوي / الحاسبة</div>
        <p className="text-sm leading-7 text-gray-600">
          احسب تكلفة مشروعك التقريبية واحفظ التقدير للرجوع إليه لاحقًا.
        </p>
      </Link>

      <Link
        to="/decor"
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
      >
        <div className="text-lg font-bold text-black mb-2">طلب شراء من المتجر</div>
        <p className="text-sm leading-7 text-gray-600">
          تصفح منتجات المتجر وابدأ طلب الشراء مباشرة من المنصة.
        </p>
      </Link>
    </div>
  </div>
)}
        </div>
      </div>
    </section>
  );
}