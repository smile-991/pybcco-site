import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

type LocationState = {
  area?: number;
  finishing_level?: string;
  estimated_cost?: number;
  source?: string;
};

export default function CreateAccountSection() {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const calculatorData = useMemo(
    () => ({
      area: state.area ?? null,
      finishing_level: state.finishing_level ?? null,
      estimated_cost: state.estimated_cost ?? null,
      source: state.source ?? "calculator",
    }),
    [state]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const cleanedName = name.trim();
      const cleanedPhone = phone.trim();
      const cleanedEmail = email.trim().toLowerCase();

      if (!cleanedName || !cleanedPhone || !cleanedEmail) {
        throw new Error("يرجى تعبئة الاسم الكامل ورقم الجوال والبريد الإلكتروني.");
      }

      const res = await fetch("/api/signup-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanedEmail,
          name: cleanedName,
          phone: cleanedPhone,
          source: calculatorData.source,
          area: calculatorData.area,
          finishing_level: calculatorData.finishing_level,
          estimated_cost: calculatorData.estimated_cost,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "حدث خطأ أثناء حفظ الطلب.");
      }

      setMessage("تم استلام طلبك بنجاح. أرسلنا رابط تفعيل الحساب إلى بريدك الإلكتروني.");
      setName("");
      setPhone("");
      setEmail("");
    } catch (error: any) {
      setMessage(error?.message || "حدث خطأ أثناء إنشاء الحساب.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-2xl border border-yellow-500/20 bg-white p-6 shadow-sm md:p-8">
          <h1 className="mb-3 text-3xl font-bold text-black md:text-4xl">
            إنشاء حساب عميل
          </h1>

          <p className="mb-6 leading-8 text-gray-700">
            أنشئ حسابك للحصول على خصم 2% على كامل عقد التشطيب، وضمان إضافي 6 أشهر،
            ومتابعة مشروعك عبر بوابة العملاء، مع حفظ تقدير التكلفة في حسابك.
          </p>

          {calculatorData.estimated_cost !== null && (
            <div className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
              <p className="mb-2 font-semibold text-black">
                تم تجهيز تقدير تكلفة مشروعك
              </p>

              <div className="space-y-1 text-sm text-gray-700 md:text-base">
                <p>المساحة: {calculatorData.area ?? "-"} م²</p>
                <p>مستوى التشطيب: {calculatorData.finishing_level ?? "-"}</p>
                <p>
                  التقدير التقريبي:{" "}
                  {Number(calculatorData.estimated_cost).toLocaleString("en-US")} ريال
                </p>
              </div>
            </div>
          )}

          <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="mb-2 font-semibold text-black">مزايا حساب العميل</p>
            <ul className="space-y-2 text-sm text-gray-700 md:text-base">
              <li>خصم 2% على كامل عقد التشطيب</li>
              <li>ضمان إضافي 6 أشهر</li>
              <li>حفظ تقدير المشروع في حسابك</li>
              <li>متابعة المشروع عبر بوابة العملاء</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
  type="text"
  name="name"
  autoComplete="name"
  placeholder="الاسم الكامل"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-yellow-500"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

            <input
  type="tel"
  name="phone"
  autoComplete="tel"
  placeholder="رقم الجوال"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-yellow-500"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

            <input
  type="email"
  name="email"
  autoComplete="email"
  placeholder="البريد الإلكتروني"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-yellow-500"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-500 px-4 py-3 font-bold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "جاري الإرسال..." : "إنشاء الحساب"}
            </button>
          </form>

          {message && (
            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-800">
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}