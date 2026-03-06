import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type ActivatedSession = {
  phone: string;
  activatedAt: string;
  hasProject: boolean;
  clientId: string | null;
};

type ProjectItem = {
  id: string;
  title?: string;
  name?: string;
  status?: string;
  progress_percent?: number;
  total_amount?: number;
};

const ACTIVATED_USER_STORAGE_KEY = "pybcco_activated_user";
const CLIENT_TOKEN_STORAGE_KEY = "pybcco_client_token";

export default function PortalPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [message, setMessage] = useState("");
  const [activatedSession, setActivatedSession] =
    useState<ActivatedSession | null>(null);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const raw = localStorage.getItem(ACTIVATED_USER_STORAGE_KEY);

      if (raw) {
        const parsed: ActivatedSession = JSON.parse(raw);

        if (parsed?.phone) {
          setActivatedSession(parsed);

          if (parsed.hasProject && parsed.clientId) {
            setAuthorized(true);
            return;
          }

          if (!parsed.hasProject) {
            setAuthorized(false);
            return;
          }
        }
      }

      const res = await fetch("/api/client-session", { credentials: "include" });

      if (res.ok) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch {
      setAuthorized(false);
    }
  };

  const requestOtp = async () => {
    setMessage("");

    try {
      const res = await fetch("/api/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setMessage(data?.error || "فشل في طلب الرمز.");
        return;
      }

      setStep("code");
      setMessage("أرسل LOGIN عبر واتساب ثم أدخل الرمز الذي وصلك.");
    } catch {
      setMessage("حدث خطأ في الاتصال.");
    }
  };

  const verifyOtp = async () => {
    setMessage("");

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone, code }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setMessage(data?.error || "رمز التحقق غير صحيح.");
        return;
      }

      const token = String(data?.client_token || data?.access_token || "").trim();
      if (token) localStorage.setItem(CLIENT_TOKEN_STORAGE_KEY, token);

      setAuthorized(true);
    } catch {
      setMessage("حدث خطأ في الاتصال.");
    }
  };

  if (authorized === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        جاري التحقق من حالة الدخول...
      </div>
    );
  }

  if (activatedSession && !activatedSession.hasProject) {
    return <NoProjectDashboard />;
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
          <div className="w-full rounded-2xl border bg-white p-8 shadow-xl">
            <h1 className="mb-3 text-center text-2xl font-bold text-black">
              بوابة العملاء
            </h1>

            <p className="mb-6 text-center text-sm leading-7 text-gray-600">
              أدخل رقم الجوال ثم رمز التحقق لمتابعة مشاريعك.
            </p>

            {step === "phone" && (
              <>
                <input
                  type="text"
                  placeholder="أدخل رقم الجوال"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mb-4 w-full rounded-xl border px-4 py-3 text-right"
                />
                <button
                  onClick={requestOtp}
                  className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black transition hover:opacity-90"
                >
                  طلب رمز التحقق
                </button>
              </>
            )}

            {step === "code" && (
              <>
                <input
                  type="text"
                  placeholder="أدخل رمز التحقق"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mb-4 w-full rounded-xl border px-4 py-3 text-right"
                />
                <button
                  onClick={verifyOtp}
                  className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black transition hover:opacity-90"
                >
                  تحقق وتسجيل الدخول
                </button>
              </>
            )}

            {message && (
              <p className="mt-4 text-center text-sm text-red-500">{message}</p>
            )}

            <div className="mt-6 border-t pt-6 text-center">
              <p className="mb-3 text-sm text-gray-600">
                ليس لديك حساب أو لم تقم بالتفعيل بعد؟
              </p>
              <Link
                to="/create-account"
                className="inline-block rounded-xl border border-black px-5 py-2 font-bold text-black transition hover:bg-black hover:text-white"
              >
                إنشاء حساب جديد
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ClientProjects
      activatedSession={activatedSession}
      onLogout={() => {
        setAuthorized(false);
        setActivatedSession(null);
      }}
    />
  );
}

function ClientProjects({
  activatedSession,
  onLogout,
}: {
  activatedSession: ActivatedSession | null;
  onLogout: () => void;
}) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const hasActivatedClientId = useMemo(() => {
    return !!activatedSession?.clientId;
  }, [activatedSession]);

  useEffect(() => {
    (async () => {
      setErr("");

      try {
        if (hasActivatedClientId && activatedSession?.clientId) {
          const res = await fetch(
            `/api/get-projects-by-client?clientId=${encodeURIComponent(
              activatedSession.clientId
            )}`
          );

          const data = await res.json().catch(() => null);

          if (!res.ok) {
            setErr(data?.error || "تعذر تحميل المشاريع.");
            setProjects([]);
            return;
          }

          if (!Array.isArray(data)) {
            setErr(data?.error || "استجابة غير متوقعة من الخادم.");
            setProjects([]);
            return;
          }

          setProjects(data);
          return;
        }

        const res = await fetch("/api/get-client-projects", {
          credentials: "include",
        });

        if (res.status === 401 || res.status === 403) {
          onLogout();
          return;
        }

        const data = await res.json().catch(() => null);

        if (!Array.isArray(data)) {
          setErr(data?.error || "استجابة غير متوقعة من الخادم.");
          setProjects([]);
        } else {
          setProjects(data);
        }
      } catch {
        setErr("حدث خطأ في الاتصال أثناء تحميل المشاريع.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [activatedSession, hasActivatedClientId, onLogout]);

  const handleLogout = async () => {
    await fetch("/api/client-logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});

    localStorage.removeItem(CLIENT_TOKEN_STORAGE_KEY);
    localStorage.removeItem(ACTIVATED_USER_STORAGE_KEY);

    onLogout();
    window.location.href = "/portal";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        جاري تحميل المشاريع...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-start justify-between gap-4 rounded-2xl border bg-white p-6 shadow-xl">
          <div>
            <h1 className="text-2xl font-bold text-black">مشاريعي</h1>
            <p className="mt-1 text-sm text-gray-500">
              تابع التقدم والدفعات والتحديثات الخاصة بمشروعك.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
          >
            تسجيل الخروج
          </button>
        </div>

        {err && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            {err}
          </div>
        )}

        {projects.length === 0 && !err && (
          <div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow-md">
            لا توجد مشاريع مرتبطة بحسابك حاليًا.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const projectTitle =
              project.title || project.name || "مشروع بدون اسم";

            return (
              <div
                key={project.id}
                className="rounded-xl border bg-white p-6 shadow-md"
              >
                <h2 className="text-lg font-semibold text-black">
                  {projectTitle}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  الحالة: {project.status || "غير محددة"}
                </p>

                <div className="mt-4">
                  <div className="h-3 w-full rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-yellow-500 transition-all"
                      style={{ width: `${project.progress_percent || 0}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {project.progress_percent || 0}% نسبة الإنجاز
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  إجمالي المشروع: {project.total_amount || 0} ريال
                </div>

                <button
                  onClick={() => navigate(`/portal/projects/${project.id}`)}
                  className="mt-4 w-full rounded-lg bg-black py-2 text-sm text-white transition hover:bg-gray-800"
                >
                  عرض التفاصيل
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NoProjectDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-2xl border bg-white p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-black">حسابي</h1>
          <p className="mt-2 leading-8 text-gray-600">
            تم تفعيل حسابك بنجاح، ولكن لا يوجد مشروع مرتبط بحسابك حتى الآن.
            يمكنك البدء من إحدى الخطوات التالية.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/contact"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
          >
            <div className="mb-2 text-lg font-bold text-black">
              طلب مشروع جديد
            </div>
            <p className="text-sm leading-7 text-gray-600">
              أرسل تفاصيل مشروعك وسنتواصل معك لدراسته وتقديم العرض المناسب.
            </p>
          </Link>

          <a
            href="https://wa.me/966550604837"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
          >
            <div className="mb-2 text-lg font-bold text-black">
              تواصل عبر واتساب
            </div>
            <p className="text-sm leading-7 text-gray-600">
              للاستفسارات السريعة أو المتابعة المباشرة مع فريقنا.
            </p>
          </a>

          <Link
            to="/villa-finishing-price-riyadh"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
          >
            <div className="mb-2 text-lg font-bold text-black">
              الحاسبة / التسعير
            </div>
            <p className="text-sm leading-7 text-gray-600">
              احسب التكلفة التقريبية لمشروعك واحتفظ بالتقدير داخل حسابك.
            </p>
          </Link>

          <Link
            to="/decor"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
          >
            <div className="mb-2 text-lg font-bold text-black">
              زيارة المتجر
            </div>
            <p className="text-sm leading-7 text-gray-600">
              تصفح منتجات الديكور وابدأ طلب الشراء مباشرة.
            </p>
          </Link>
        </div>

        <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
          <Link
            to="/create-account"
            className="inline-block rounded-xl border border-black px-6 py-3 font-bold text-black transition hover:bg-black hover:text-white"
          >
            إنشاء حساب آخر
          </Link>
        </div>
      </div>
    </div>
  );
}