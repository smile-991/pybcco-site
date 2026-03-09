import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type ActivatedSession = {
  phone: string;
  activatedAt: string;
  expiresAt?: number;
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

export default function PortalPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [activatedSession, setActivatedSession] =
    useState<ActivatedSession | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    checkAccess();
  }, []);
  const checkAccess = async () => {
    try {
      const raw = localStorage.getItem(ACTIVATED_USER_STORAGE_KEY);

      if (!raw) {
        setAuthorized(false);
        return;
      }

      try {
        const parsed: ActivatedSession = JSON.parse(raw);

        if (!parsed?.phone) {
          localStorage.removeItem(ACTIVATED_USER_STORAGE_KEY);
          setAuthorized(false);
          return;
        }

        if (
          parsed?.expiresAt &&
          Number(parsed.expiresAt) > 0 &&
          Number(parsed.expiresAt) < Date.now()
        ) {
          localStorage.removeItem(ACTIVATED_USER_STORAGE_KEY);
          setAuthorized(false);
          return;
        }

        setActivatedSession(parsed);

        const resClient = await fetch(
          `/api/check-user-client?phone=${encodeURIComponent(parsed.phone)}`
        );

        const clientData = await resClient.json().catch(() => null);

        if (
          resClient.ok &&
          clientData?.found &&
          clientData?.client?.id &&
          Number(clientData?.projectsCount || 0) > 0
        ) {
          setClientId(String(clientData.client.id));
          setAuthorized(true);
          return;
        }

        navigate("/account", { replace: true });
        return;
      } catch {
        localStorage.removeItem(ACTIVATED_USER_STORAGE_KEY);
        setAuthorized(false);
      }
    } catch {
      setAuthorized(false);
    }
  };

  const getAccountLink = () => {
    try {
      const raw = localStorage.getItem(ACTIVATED_USER_STORAGE_KEY);

      if (!raw) return "/create-account";

      const parsed = JSON.parse(raw);

      if (!parsed?.phone) return "/create-account";

      if (
        parsed?.expiresAt &&
        Number(parsed.expiresAt) > 0 &&
        Number(parsed.expiresAt) < Date.now()
      ) {
        localStorage.removeItem(ACTIVATED_USER_STORAGE_KEY);
        return "/create-account";
      }

      return "/account";
    } catch {
      localStorage.removeItem(ACTIVATED_USER_STORAGE_KEY);
      return "/create-account";
    }
  };

  if (authorized === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        جاري التحقق من حالة الدخول...
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
          <div className="w-full rounded-2xl border bg-white p-8 shadow-xl">
            <h1 className="mb-3 text-center text-2xl font-bold text-black">
              بوابة العملاء
            </h1>

            <p className="mb-6 text-center text-sm leading-8 text-gray-600">
              للوصول إلى حسابك ومشاريعك، يرجى إنشاء حسابك وتفعيله عبر البريد
              الإلكتروني أولًا.
            </p>

            <div className="space-y-3">
              <Link
                to="/create-account"
                className="block w-full rounded-xl bg-yellow-500 py-3 text-center font-bold text-black transition hover:opacity-90"
              >
                إنشاء حساب جديد
              </Link>

              <Link
                to={getAccountLink()}
                className="block w-full rounded-xl border border-black py-3 text-center font-bold text-black transition hover:bg-black hover:text-white"
              >
                الذهاب إلى حسابي
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
      clientId={clientId}
      onLogout={() => {
        setAuthorized(false);
        setActivatedSession(null);
        setClientId(null);
      }}
    />
  );
}

function ClientProjects({
  activatedSession,
  clientId,
  onLogout,
}: {
  activatedSession: ActivatedSession | null;
  clientId: string | null;
  onLogout: () => void;
}) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setErr("");
      setLoading(true);

      try {
        if (!clientId) {
          setProjects([]);
          setLoading(false);
          return;
        }

        const res = await fetch(
          `/api/get-projects-by-client?clientId=${encodeURIComponent(clientId)}`
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
      } catch {
        setErr("حدث خطأ في الاتصال أثناء تحميل المشاريع.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [clientId]);

  const handleLogout = async () => {
    localStorage.removeItem(ACTIVATED_USER_STORAGE_KEY);

    await fetch("/api/client-logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});

    onLogout();
    navigate("/portal", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        جاري تحميل المشاريع...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24 md:p-10 md:pt-28">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-2xl border bg-white p-6 shadow-xl space-y-4">
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
      <Link to="/account" className="hover:text-black transition">
        حسابي
      </Link>

      <span className="text-gray-300">/</span>

      <span className="font-medium text-black">مشاريعي</span>
    </div>

    <button
      onClick={handleLogout}
      className="rounded-xl bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
    >
      تسجيل الخروج
    </button>
  </div>

  <div>
    <h1 className="text-2xl font-bold text-black">مشاريعي</h1>
    <p className="mt-1 text-sm text-gray-500">
      تابع التقدم والدفعات والتحديثات الخاصة بمشروعك.
    </p>
    {activatedSession?.phone ? (
      <p className="mt-2 text-xs text-gray-400">
        رقم الجوال المرتبط بالحساب: {activatedSession.phone}
      </p>
    ) : null}
  </div>
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