import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type ActivatedUser = {
  phone: string;
  activatedAt: string;
  hasProject: boolean;
  clientId: string | null;
};

type CalculatorResult = {
  id: string;
  area?: number;
  finishing_level?: string;
  estimated_cost?: number;
  created_at?: string;
};

const STORAGE_KEY = "pybcco_activated_user";

function formatDate(value?: string) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function money(value: any) {
  const x = Number(value || 0);
  return new Intl.NumberFormat("ar-SA").format(x);
}

export default function AccountHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState<ActivatedUser | null>(null);
  const [checking, setChecking] = useState(true);

  const [latestResult, setLatestResult] = useState<CalculatorResult | null>(null);
  const [resultsLoading, setResultsLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      navigate("/portal", { replace: true });
      return;
    }

    try {
      const parsed = JSON.parse(raw) as ActivatedUser;

      if (!parsed?.phone) {
        localStorage.removeItem(STORAGE_KEY);
        navigate("/portal", { replace: true });
        return;
      }

      setUser(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      navigate("/portal", { replace: true });
    } finally {
      setChecking(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!user?.phone) return;

    (async () => {
      setResultsLoading(true);

      try {
        const res = await fetch("/api/get-user-calculator-results", {
          method: "GET",
          headers: {
            "x-user-phone": user.phone,
          },
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          setLatestResult(null);
          return;
        }

        const results = Array.isArray(data?.results) ? data.results : [];
        setLatestResult(results.length > 0 ? results[0] : null);
      } catch {
        setLatestResult(null);
      } finally {
        setResultsLoading(false);
      }
    })();
  }, [user?.phone]);

  const accountStatus = useMemo(() => {
    if (!user) return "غير معروف";
    return user.hasProject ? "يوجد مشروع مرتبط" : "الحساب مفعل بدون مشروع";
  }, [user]);

  const handleLogout = async () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("pybcco_client_token");

    await fetch("/api/client-logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});

    navigate("/portal", { replace: true });
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        جاري التحقق من الحساب...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-2xl border bg-white p-6 shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-black">حسابي</h1>
              <p className="mt-2 leading-8 text-gray-600">
                تم تسجيل دخولك تلقائيًا لأن حسابك مفعل على هذا الجهاز.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-black px-4 py-2 text-sm font-bold text-black transition hover:bg-black hover:text-white"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-2 text-sm text-gray-500">رقم الجوال</div>
            <div className="font-semibold text-black">{user.phone}</div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-2 text-sm text-gray-500">حالة الحساب</div>
            <div className="font-semibold text-black">{accountStatus}</div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-2 text-sm text-gray-500">تاريخ التفعيل</div>
            <div className="font-semibold text-black">
              {formatDate(user.activatedAt)}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-black">آخر تقدير محفوظ</h2>
            <Link
              to="/villa-finishing-price-riyadh"
              className="rounded-xl border border-black px-4 py-2 text-sm font-bold text-black transition hover:bg-black hover:text-white"
            >
              فتح الحاسبة
            </Link>
          </div>

          {resultsLoading ? (
            <p className="text-sm text-gray-500">جاري تحميل آخر التقديرات...</p>
          ) : latestResult ? (
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-2 text-sm text-gray-500">المساحة</div>
                <div className="font-semibold text-black">
                  {latestResult.area || 0} م²
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-2 text-sm text-gray-500">مستوى التشطيب</div>
                <div className="font-semibold text-black">
                  {latestResult.finishing_level || "-"}
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-2 text-sm text-gray-500">التكلفة التقريبية</div>
                <div className="font-semibold text-black">
                  {money(latestResult.estimated_cost)} ريال
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-2 text-sm text-gray-500">تاريخ الحفظ</div>
                <div className="font-semibold text-black">
                  {formatDate(latestResult.created_at)}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-gray-600">
              لا يوجد تقدير محفوظ حتى الآن. يمكنك استخدام الحاسبة لحفظ أول تقدير
              داخل حسابك.
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {user.hasProject ? (
            <button
              onClick={() => navigate("/portal")}
              className="rounded-2xl border bg-white p-5 text-right shadow-sm transition hover:border-yellow-400 hover:shadow-md"
            >
              <div className="mb-2 text-lg font-bold text-black">
                دخول بوابة العملاء
              </div>
              <p className="text-sm leading-7 text-gray-600">
                تابع المشاريع، الدفعات، المستندات، التحديثات، والصور من مكان واحد.
              </p>
            </button>
          ) : (
            <Link
              to="/contact"
              className="rounded-2xl border bg-white p-5 text-right shadow-sm transition hover:border-yellow-400 hover:shadow-md"
            >
              <div className="mb-2 text-lg font-bold text-black">
                طلب مشروع جديد
              </div>
              <p className="text-sm leading-7 text-gray-600">
                لا يوجد مشروع مرتبط بحسابك حاليًا. ابدأ من هنا بإرسال طلبك.
              </p>
            </Link>
          )}

          <Link
            to="/villa-finishing-price-riyadh"
            className="rounded-2xl border bg-white p-5 text-right shadow-sm transition hover:border-yellow-400 hover:shadow-md"
          >
            <div className="mb-2 text-lg font-bold text-black">
              الحاسبة / التسعير
            </div>
            <p className="text-sm leading-7 text-gray-600">
              احسب تكلفة مشروعك التقريبية أو ارجع إلى التسعير في أي وقت.
            </p>
          </Link>

          <a
            href="https://wa.me/966550604837"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border bg-white p-5 text-right shadow-sm transition hover:border-yellow-400 hover:shadow-md"
          >
            <div className="mb-2 text-lg font-bold text-black">
              التواصل عبر واتساب
            </div>
            <p className="text-sm leading-7 text-gray-600">
              للاستفسارات السريعة أو المتابعة المباشرة مع فريقنا.
            </p>
          </a>

          <Link
            to="/decor"
            className="rounded-2xl border bg-white p-5 text-right shadow-sm transition hover:border-yellow-400 hover:shadow-md"
          >
            <div className="mb-2 text-lg font-bold text-black">
              زيارة المتجر
            </div>
            <p className="text-sm leading-7 text-gray-600">
              تصفح منتجات الديكور وابدأ طلب الشراء مباشرة من المنصة.
            </p>
          </Link>
        </div>

        {!user.hasProject && (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
            <p className="text-sm leading-8 text-gray-700">
              حسابك مفعل بنجاح، لكن لا يوجد مشروع مرتبط به حاليًا. يمكنك البدء
              بطلب مشروع جديد أو استخدام الحاسبة أو التواصل معنا مباشرة.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}