import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function ActivateAccountSection() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("جاري تفعيل الحساب...");
  const [success, setSuccess] = useState(false);

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
      <div className="mx-auto max-w-xl px-4">
        <div className="rounded-2xl border border-yellow-500/20 bg-white p-8 shadow-sm text-center">
          <h1 className="mb-4 text-3xl font-bold text-black">تفعيل الحساب</h1>

          <p className="mb-6 text-gray-700 leading-8">{message}</p>

          {!loading && success && (
            <Link
              to="/create-account"
              className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black hover:opacity-90"
            >
              تم التفعيل
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}