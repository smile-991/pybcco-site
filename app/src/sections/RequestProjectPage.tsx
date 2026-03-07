import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type ActivatedUser = {
  phone: string;
  activatedAt: string;
  hasProject: boolean;
  clientId: string | null;
};

type SavedItem = {
  title?: string;
  quantity?: number;
  unit?: string;
  total?: number;
};

type RequestProjectState = {
  calculator_result_id?: string;
  work_type?: string;
  finishing_level?: string;
  area?: number;
  items_json?: SavedItem[];
  grand_total?: number;
};

const STORAGE_KEY = "pybcco_activated_user";

function money(value: any) {
  const x = Number(value || 0);
  return new Intl.NumberFormat("ar-SA").format(x);
}

function workTypeLabel(value?: string) {
  if (!value) return "-";
  if (value === "finishing") return "تشطيب";
  if (value === "bone") return "عظم";
  return value;
}

function levelLabel(value?: string) {
  if (!value) return "-";
  if (value === "commercial") return "تجاري";
  if (value === "standard") return "قياسي";
  if (value === "luxury") return "فاخر";
  return value;
}

export default function RequestProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state || {}) as RequestProjectState;

  const [activatedUser, setActivatedUser] = useState<ActivatedUser | null>(null);
  const [checkingUser, setCheckingUser] = useState(true);

  const [fullName, setFullName] = useState("");
  const [district, setDistrict] = useState("");
  const [preferredStartDate, setPreferredStartDate] = useState("");
  const [hasDrawings, setHasDrawings] = useState(false);
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setActivatedUser(null);
        setCheckingUser(false);
        return;
      }

      const parsed = JSON.parse(raw) as ActivatedUser;

      if (parsed?.phone) {
        setActivatedUser(parsed);
      } else {
        setActivatedUser(null);
      }
    } catch {
      setActivatedUser(null);
    } finally {
      setCheckingUser(false);
    }
  }, []);

  const itemsCount = useMemo(() => {
    return Array.isArray(state.items_json) ? state.items_json.length : 0;
  }, [state.items_json]);

  const canSubmit = useMemo(() => {
    return (
      !!activatedUser?.phone &&
      !!state.calculator_result_id &&
      !!district.trim()
    );
  }, [activatedUser?.phone, state.calculator_result_id, district]);

  const handleSubmit = async () => {
    setMessage("");

    if (!activatedUser?.phone) {
      setMessage("يجب تسجيل الدخول أو تفعيل الحساب أولًا.");
      return;
    }

    if (!state.calculator_result_id) {
      setMessage("لا يوجد تقدير محفوظ مرتبط بهذا الطلب.");
      return;
    }

    if (!district.trim()) {
      setMessage("يرجى إدخال الحي أو الموقع التقريبي.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/create-project-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          calculator_result_id: state.calculator_result_id,
          phone: activatedUser.phone,
          full_name: fullName.trim(),
          district: district.trim(),
          preferred_start_date: preferredStartDate || "",
          has_drawings: hasDrawings,
          notes: notes.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setMessage(data?.error || "تعذر إرسال طلب المشروع.");
        return;
      }

      setMessage("تم إرسال طلب المشروع بنجاح. سنتواصل معك قريبًا.");
      setTimeout(() => {
        navigate("/account", { replace: true });
      }, 1200);
    } catch {
      setMessage("حدث خطأ أثناء إرسال الطلب.");
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        جاري التحقق من الحساب...
      </div>
    );
  }

  if (!activatedUser) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 shadow-sm text-right">
          <h1 className="text-2xl font-bold text-black">طلب مشروع</h1>
          <p className="mt-3 leading-8 text-gray-600">
            يجب تسجيل الدخول أو تفعيل الحساب أولًا قبل إرسال طلب المشروع.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/create-account"
              className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black"
            >
              إنشاء حساب
            </Link>

            <Link
              to="/portal"
              className="rounded-xl border border-black px-5 py-3 text-sm font-bold text-black"
            >
              العودة
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!state.calculator_result_id) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 shadow-sm text-right">
          <h1 className="text-2xl font-bold text-black">طلب مشروع</h1>
          <p className="mt-3 leading-8 text-gray-600">
            لم يتم العثور على تقدير محفوظ مرتبط بهذا الطلب. ابدأ من صفحة الحساب واختر
            “طلب تنفيذ هذا المشروع”.
          </p>

          <div className="mt-6">
            <Link
              to="/account"
              className="rounded-xl border border-black px-5 py-3 text-sm font-bold text-black"
            >
              العودة إلى حسابي
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-black">طلب تنفيذ هذا المشروع</h1>
          <p className="mt-2 leading-8 text-gray-600">
            أنت الآن ترسل طلبًا مبنيًا على آخر تقدير محفوظ داخل حسابك، وهذا يساعدنا
            على فهم مشروعك بشكل أسرع وأدق.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-black">ملخص التقدير المختار</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="mb-2 text-sm text-gray-500">نوع العمل</div>
              <div className="font-bold text-black">
                {workTypeLabel(state.work_type)}
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <div className="mb-2 text-sm text-gray-500">المستوى</div>
              <div className="font-bold text-black">
                {levelLabel(state.finishing_level)}
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <div className="mb-2 text-sm text-gray-500">المساحة</div>
              <div className="font-bold text-black">
                {Number(state.area || 0)} م²
              </div>
            </div>

            <div className="rounded-xl bg-yellow-50 p-4 border border-yellow-200">
              <div className="mb-2 text-sm text-gray-600">الإجمالي التقديري</div>
              <div className="font-extrabold text-black">
                {money(state.grand_total)} ريال
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <div className="text-sm text-gray-500">عدد البنود التفصيلية</div>
            <div className="mt-1 font-bold text-black">{itemsCount} بند</div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-black">بيانات الطلب</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                الاسم الكامل
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="الاسم الكامل"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                رقم الجوال
              </label>
              <input
                value={activatedUser.phone}
                disabled
                className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-gray-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                الحي / الموقع التقريبي <span className="text-red-500">*</span>
              </label>
              <input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="مثال: الملقا / الياسمين / النرجس"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                موعد التنفيذ المتوقع
              </label>
              <input
                type="date"
                value={preferredStartDate}
                onChange={(e) => setPreferredStartDate(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="mt-4 rounded-xl border p-4">
            <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={hasDrawings}
                onChange={(e) => setHasDrawings(e.target.checked)}
              />
              يوجد مخططات / رسومات / ملفات جاهزة للمشروع
            </label>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              ملاحظات إضافية
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي تفاصيل إضافية عن المشروع، الموقع، المواد، أو المواعيد..."
              rows={5}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black disabled:opacity-60"
            >
              {submitting ? "جاري إرسال الطلب..." : "إرسال طلب المشروع"}
            </button>

            <Link
              to="/account"
              className="rounded-xl border border-black px-5 py-3 text-sm font-bold text-black"
            >
              العودة إلى حسابي
            </Link>
          </div>

          {message && (
            <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}