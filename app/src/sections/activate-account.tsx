import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";

type ClientCheckResponse = {
  found: boolean;
  client: {
    id: string;
    full_name?: string;
    phone?: string;
  } | null;
};

type ActivatedSessionData = {
  phone: string;
  activatedAt: string;
  hasProject: boolean;
  clientId: string | null;
  expiresAt: number;
};

const ACTIVATED_USER_STORAGE_KEY = "pybcco_activated_user";

export default function ActivateAccountSection() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("جاري تفعيل الحساب...");
  const [success, setSuccess] = useState(false);
  const [hasProject, setHasProject] = useState<boolean | null>(null);
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    async function activate() {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setMessage("رابط التفعيل غير صالح.");
          setLoading(false);
          return;
        }

        const activateRes = await fetch(
          `/api/activate-account?token=${encodeURIComponent(token)}`
        );

        const activateData = await activateRes.json();

        if (!activateRes.ok) {
          throw new Error(activateData?.error || "فشل تفعيل الحساب.");
        }

        const phone = String(activateData?.user?.phone || "").trim();

        let projectFound = false;
        let matchedClientId: string | null = null;
        let matchedClientName = "";

        if (phone) {
          const checkRes = await fetch(
            `/api/check-user-client?phone=${encodeURIComponent(phone)}`
          );

          const checkData: ClientCheckResponse = await checkRes.json();

          if (!checkRes.ok) {
            throw new Error("تعذر التحقق من حالة المشروع.");
          }

          projectFound = !!checkData?.found;
          matchedClientId = checkData?.client?.id || null;
          matchedClientName = checkData?.client?.full_name || "";

          setHasProject(projectFound);
          setClientName(matchedClientName);
        } else {
          setHasProject(false);
        }

        const sessionData: ActivatedSessionData = {
  phone,
  activatedAt: String(
    activateData?.user?.activatedAt || new Date().toISOString()
  ),
  hasProject: projectFound,
  clientId: matchedClientId,
  expiresAt: Date.now() + 360 * 24 * 60 * 60 * 1000,
};
        localStorage.setItem(
          ACTIVATED_USER_STORAGE_KEY,
          JSON.stringify(sessionData)
        );

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
  <>
    <SeoHead
      title="تفعيل الحساب | بنيان الهرم للمقاولات"
      description="تفعيل حساب العميل."
      canonical="https://pybcco.com/activate-account"
      robots="noindex,follow"
    />


    <section className="w-full py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-yellow-500/20 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-black">تفعيل الحساب</h1>

          <p className="mb-6 leading-8 text-gray-700">{message}</p>

          {loading && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
              <p className="text-sm text-gray-600">
                يرجى الانتظار قليلًا ريثما ننهي التحقق من الحساب وحالة المشروع.
              </p>
            </div>
          )}

          {!loading && success && hasProject === true && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-center">
                <p className="mb-2 text-lg font-semibold text-black">
                  تم العثور على مشروع مرتبط بحسابك
                </p>

                {clientName ? (
                  <p className="leading-8 text-gray-700">
                    أهلاً {clientName}، يمكنك الآن الدخول إلى حسابك ومتابعة تفاصيل
                    مشروعك من بوابة العملاء.
                  </p>
                ) : (
                  <p className="leading-8 text-gray-700">
                    يمكنك الآن الدخول إلى حسابك ومتابعة تفاصيل مشروعك من بوابة
                    العملاء.
                  </p>
                )}
              </div>

              <Link
                to="/account"
                className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:opacity-90"
              >
                الدخول إلى حسابي
              </Link>
            </div>
          )}

          {!loading && success && hasProject === false && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-center">
                <p className="mb-2 text-lg font-semibold text-black">
                  تم تفعيل حسابك بنجاح
                </p>
                <p className="leading-8 text-gray-700">
                  لا يوجد مشروع مرتبط بحسابك حاليًا، ويمكنك البدء من خلال إحدى
                  الخدمات التالية:
                </p>
              </div>

              <div className="grid gap-4 text-right md:grid-cols-2">
                <Link
                  to="/#contact"
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
                >
                  <div className="mb-2 text-lg font-bold text-black">
                    طلب مشروع جديد
                  </div>
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
                  <div className="mb-2 text-lg font-bold text-black">
                    إرسال استفسار واتساب
                  </div>
                  <p className="text-sm leading-7 text-gray-600">
                    تواصل معنا مباشرة عبر واتساب لأي استفسار سريع أو طلب متابعة.
                  </p>
                </a>

                <Link
                  to="/villa-finishing-price-riyadh"
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
                >
                  <div className="mb-2 text-lg font-bold text-black">
                    التسعير اليدوي / الحاسبة
                  </div>
                  <p className="text-sm leading-7 text-gray-600">
                    احسب تكلفة مشروعك التقريبية واحفظ التقدير للرجوع إليه لاحقًا.
                  </p>
                </Link>

                <Link
                  to="/decor"
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
                >
                  <div className="mb-2 text-lg font-bold text-black">
                    طلب شراء من المتجر
                  </div>
                  <p className="text-sm leading-7 text-gray-600">
                    تصفح منتجات المتجر وابدأ طلب الشراء مباشرة من المنصة.
                  </p>
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  to="/account"
                  className="inline-block rounded-xl border border-black px-6 py-3 font-bold text-black transition hover:bg-black hover:text-white"
                >
                  الذهاب إلى حسابي
                </Link>
              </div>
            </div>
          )}

          {!loading && !success && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
                <p className="text-sm leading-7 text-red-700">
                  تعذر إكمال التفعيل. تأكد من صحة الرابط أو حاول مرة أخرى من خلال
                  طلب رابط تفعيل جديد.
                </p>
              </div>

              <Link
                to="/create-account"
                className="inline-block rounded-xl border border-black px-6 py-3 font-bold text-black transition hover:bg-black hover:text-white"
              >
                العودة إلى إنشاء الحساب
              </Link>
            </div>
          )}
        </div>
      </div>
        </section>
  </>
);
}