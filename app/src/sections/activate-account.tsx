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
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function activate() {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setMessage("رابط التفعيل غير صالح.");
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/activate-account?token=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "فشل تفعيل الحساب.");
        }

        const email = data?.email || "";
        setUserEmail(email);

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
            <div className="space-y-6 text-right">
              <p className="text-center text-gray-700">
                تم تفعيل حسابك بنجاح، ولا يوجد مشروع مرتبط بحسابك حاليًا. يمكنك استخدام
                الاختصارات التالية:
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <Link
                  to="/contact"
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-semibold text-black hover:border-yellow-400"
                >
                  طلب مشروع جديد
                </Link>

                <a
                  href="https://wa.me/966550604837"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-semibold text-black hover:border-yellow-400"
                >
                  إرسال استفسار واتساب
                </a>

                <Link
                  to="/villa-finishing-price-riyadh"
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-semibold text-black hover:border-yellow-400"
                >
                  التسعير اليدوي / الحاسبة
                </Link>

                <Link
                  to="/decor"
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-semibold text-black hover:border-yellow-400"
                >
                  طلب شراء من المتجر
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}