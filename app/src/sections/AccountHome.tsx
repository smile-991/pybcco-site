import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type ActivatedUser = {
  phone: string;
  activatedAt: string;
  hasProject: boolean;
  clientId: string | null;
};

type SavedItem = {
  title?: string;
  name?: string;
  label?: string;
  quantity?: number;
  qty?: number;
  unit?: string;
  total?: number;
  line_total?: number;
  amount?: number;
};

type CalculatorResult = {
  id: string;
  area?: number;
  finishing_level?: string;
  estimated_cost?: number;
  created_at?: string;
  work_type?: string;
  base_total?: number;
  extras_total?: number;
  grand_total?: number;
  items_json?: SavedItem[];
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

function normalizeSavedItems(items: any): Array<{
  title: string;
  quantity: number;
  unit: string;
  total: number;
}> {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const title = String(item?.title || item?.name || item?.label || "").trim();
      const quantity = Number(item?.quantity ?? item?.qty ?? 0);
      const unit = String(item?.unit || "").trim();
      const total = Number(item?.total ?? item?.line_total ?? item?.amount ?? 0);

      return {
        title,
        quantity,
        unit,
        total,
      };
    })
    .filter((item) => item.title && item.total > 0);
}

function workTypeLabel(value?: string) {
  if (!value) return "-";

  const v = String(value).toLowerCase();

  if (v === "finishing") return "تشطيب";
  if (v === "bone") return "عظم";
  if (v === "full") return "تشطيب كامل";
  if (v === "bone_to_finish") return "تشطيب عظم إلى تسليم";
  if (v === "renovation") return "ترميم / تجديد";
  if (v === "apartment") return "تشطيب شقة";

  return value;
}

export default function AccountHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState<ActivatedUser | null>(null);
  const [checking, setChecking] = useState(true);

  const [latestResult, setLatestResult] = useState<CalculatorResult | null>(null);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [deletingEstimate, setDeletingEstimate] = useState(false);
  const [deletingItemIndex, setDeletingItemIndex] = useState<number | null>(null);

  const loadLatestResult = useCallback(async (phone: string) => {
    setResultsLoading(true);

    try {
      const res = await fetch("/api/get-user-calculator-results", {
        method: "GET",
        headers: {
          "x-user-phone": phone,
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
  }, []);

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
    loadLatestResult(user.phone);
  }, [user?.phone, loadLatestResult]);

  const accountStatus = useMemo(() => {
    if (!user) return "غير معروف";
    return user.hasProject ? "يوجد مشروع مرتبط" : "الحساب مفعل بدون مشروع";
  }, [user]);

  const savedItems = useMemo(() => {
    return normalizeSavedItems(latestResult?.items_json);
  }, [latestResult?.items_json]);

  const baseTotal = Number(latestResult?.base_total || 0);
  const extrasTotal = Number(latestResult?.extras_total || 0);
  const grandTotal =
    Number(latestResult?.grand_total || 0) > 0
      ? Number(latestResult?.grand_total || 0)
      : Number(latestResult?.estimated_cost || 0);

  const handleLogout = async () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("pybcco_client_token");

    await fetch("/api/client-logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});

    navigate("/portal", { replace: true });
  };

  const handleDeleteEstimate = async () => {
    if (!latestResult || !user?.phone || deletingEstimate) return;

    const confirmed = window.confirm("هل تريد حذف هذا التقدير بالكامل؟");
    if (!confirmed) return;

    try {
      setDeletingEstimate(true);

      const res = await fetch("/api/delete-calculator-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          result_id: latestResult.id,
          phone: user.phone,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        alert(data?.error || "تعذر حذف التقدير.");
        return;
      }

      setLatestResult(null);
    } catch {
      alert("حدث خطأ أثناء حذف التقدير.");
    } finally {
      setDeletingEstimate(false);
    }
  };

  const handleDeleteItem = async (itemIndex: number) => {
    if (!latestResult || !user?.phone) return;

    const confirmed = window.confirm("هل تريد حذف هذا البند من التقدير؟");
    if (!confirmed) return;

    try {
      setDeletingItemIndex(itemIndex);

      const res = await fetch("/api/update-calculator-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          result_id: latestResult.id,
          phone: user.phone,
          item_index: itemIndex,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        alert(data?.error || "تعذر حذف البند.");
        return;
      }

      const updated = data?.result || null;

      if (updated) {
        setLatestResult(updated);
      } else {
        await loadLatestResult(user.phone);
      }
    } catch {
      alert("حدث خطأ أثناء حذف البند.");
    } finally {
      setDeletingItemIndex(null);
    }
  };

  const handleDownloadPdf = () => {
    if (!latestResult || !user) return;

    const quoteDate = formatDate(latestResult.created_at);
    const itemsRows = savedItems.length
      ? savedItems
          .map(
            (item, index) => `
              <tr>
                <td style="padding:10px;border:1px solid #d4d4d4;text-align:center;">${index + 1}</td>
                <td style="padding:10px;border:1px solid #d4d4d4;">${item.title}</td>
                <td style="padding:10px;border:1px solid #d4d4d4;text-align:center;">${item.quantity}</td>
                <td style="padding:10px;border:1px solid #d4d4d4;text-align:center;">${item.unit || "-"}</td>
                <td style="padding:10px;border:1px solid #d4d4d4;text-align:center;">${money(item.total)} ريال</td>
              </tr>
            `
          )
          .join("")
      : `
        <tr>
          <td colspan="5" style="padding:14px;border:1px solid #d4d4d4;text-align:center;">
            لا توجد بنود إضافية محفوظة داخل هذا التقدير.
          </td>
        </tr>
      `;

    const html = `
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8" />
          <title>عرض سعر تقديري - بنيان الهرم للمقاولات</title>
          <style>
            body{
              font-family: Arial, sans-serif;
              margin:0;
              padding:32px;
              color:#111827;
              background:#ffffff;
            }
            .sheet{
              max-width:1100px;
              margin:0 auto;
            }
            .header{
              display:flex;
              justify-content:space-between;
              align-items:flex-start;
              gap:20px;
              border-bottom:2px solid #d4af37;
              padding-bottom:18px;
              margin-bottom:24px;
            }
            .brand-title{
              font-size:28px;
              font-weight:700;
              margin:0 0 6px 0;
              color:#111827;
            }
            .brand-sub{
              font-size:14px;
              color:#4b5563;
              line-height:1.9;
            }
            .quote-box{
              text-align:left;
              min-width:260px;
            }
            .quote-title{
              font-size:24px;
              font-weight:700;
              color:#111827;
              margin-bottom:10px;
            }
            .meta{
              margin:18px 0 24px 0;
              display:grid;
              grid-template-columns:repeat(2, minmax(0, 1fr));
              gap:12px;
            }
            .meta-card{
              border:1px solid #e5e7eb;
              border-radius:10px;
              padding:12px 14px;
              background:#fafafa;
            }
            .meta-label{
              font-size:12px;
              color:#6b7280;
              margin-bottom:6px;
            }
            .meta-value{
              font-size:16px;
              font-weight:700;
              color:#111827;
            }
            table{
              width:100%;
              border-collapse:collapse;
              margin-top:18px;
              font-size:14px;
            }
            thead th{
              background:#111827;
              color:#ffffff;
              padding:12px 10px;
              border:1px solid #111827;
            }
            .totals{
              margin-top:24px;
              width:360px;
              margin-right:auto;
              border:1px solid #e5e7eb;
              border-radius:12px;
              overflow:hidden;
            }
            .total-row{
              display:flex;
              justify-content:space-between;
              padding:12px 14px;
              border-bottom:1px solid #e5e7eb;
              background:#fff;
            }
            .total-row:last-child{
              border-bottom:none;
            }
            .grand{
              background:#fff8db;
              font-weight:700;
              font-size:16px;
            }
            .note{
              margin-top:26px;
              padding:14px 16px;
              background:#fffbeb;
              border:1px solid #fde68a;
              border-radius:10px;
              line-height:1.9;
              font-size:13px;
              color:#374151;
            }
            .footer{
              margin-top:28px;
              border-top:1px solid #e5e7eb;
              padding-top:14px;
              font-size:13px;
              color:#4b5563;
              line-height:1.9;
            }
            @media print {
              body{
                padding:14px;
              }
              .sheet{
                max-width:none;
              }
            }
          </style>
        </head>
        <body>
          <div class="sheet">
            <div class="header">
              <div>
                <h1 class="brand-title">بنيان الهرم للمقاولات</h1>
                <div class="brand-sub">
                  عرض سعر تقديري مبدئي لأعمال التشطيب والبناء<br />
                  الرياض - المملكة العربية السعودية<br />
                  الجوال: 0550604837<br />
                  البريد: info@pybcco.com
                </div>
              </div>

              <div class="quote-box">
                <div class="quote-title">عرض سعر تقديري</div>
                <div class="brand-sub">
                  التاريخ: ${quoteDate}<br />
                  رقم الجوال: ${user.phone}<br />
                  الموقع: pybcco.com
                </div>
              </div>
            </div>

            <div class="meta">
              <div class="meta-card">
                <div class="meta-label">نوع العمل</div>
                <div class="meta-value">${workTypeLabel(latestResult.work_type)}</div>
              </div>

              <div class="meta-card">
                <div class="meta-label">مستوى التشطيب</div>
                <div class="meta-value">${latestResult.finishing_level || "-"}</div>
              </div>

              <div class="meta-card">
                <div class="meta-label">المساحة</div>
                <div class="meta-value">${latestResult.area || 0} م²</div>
              </div>

              <div class="meta-card">
                <div class="meta-label">تاريخ حفظ التقدير</div>
                <div class="meta-value">${quoteDate}</div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th style="width:60px;">#</th>
                  <th>البند</th>
                  <th style="width:120px;">الكمية</th>
                  <th style="width:120px;">الوحدة</th>
                  <th style="width:180px;">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>

            <div class="totals">
              <div class="total-row">
                <span>التكلفة الأساسية</span>
                <strong>${money(baseTotal)} ريال</strong>
              </div>
              <div class="total-row">
                <span>إجمالي البنود الإضافية</span>
                <strong>${money(extrasTotal)} ريال</strong>
              </div>
              <div class="total-row grand">
                <span>الإجمالي النهائي</span>
                <strong>${money(grandTotal)} ريال</strong>
              </div>
            </div>

            <div class="note">
              هذا عرض سعر تقديري أولي مبني على البيانات المُدخلة في الحاسبة، والغرض منه إعطاء تصور مبدئي عن تكلفة المشروع.
              السعر النهائي الفعلي يخضع للمخططات، المعاينة، المواصفات النهائية، الموقع، وكميات التنفيذ الفعلية.
            </div>

            <div class="footer">
              بنيان الهرم للمقاولات — pybcco.com<br />
              لأعمال التشطيب، البناء، الترميم، ومتابعة المشاريع.
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) {
      alert("تعذر فتح نافذة تحميل عرض السعر. يرجى السماح بالنوافذ المنبثقة.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 500);
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
      <div className="mx-auto max-w-6xl space-y-8">
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
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-black">آخر تقدير محفوظ</h2>
              <p className="mt-1 text-sm text-gray-500">
                نسخة محفوظة من آخر عرض سعر تقديري داخل حسابك.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/villa-finishing-price-riyadh"
                className="rounded-xl border border-black px-4 py-2 text-sm font-bold text-black transition hover:bg-black hover:text-white"
              >
                فتح الحاسبة
              </Link>

              {latestResult && (
                <>
                  <button
                    onClick={handleDownloadPdf}
                    className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-300"
                  >
                    تحميل عرض السعر PDF
                  </button>

                  <button
                    onClick={() =>
                      navigate("/request-project", {
                        state: {
                          calculator_result_id: latestResult.id,
                          work_type: latestResult.work_type,
                          finishing_level: latestResult.finishing_level,
                          area: latestResult.area,
                          items_json: latestResult.items_json || [],
                          grand_total:
                            Number(latestResult.grand_total || 0) > 0
                              ? Number(latestResult.grand_total || 0)
                              : Number(latestResult.estimated_cost || 0),
                        },
                      })
                    }
                    className="rounded-xl bg-black px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
                  >
                    طلب تنفيذ هذا المشروع
                  </button>

                  <button
                    onClick={handleDeleteEstimate}
                    disabled={deletingEstimate}
                    className="rounded-xl border border-red-500 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                  >
                    {deletingEstimate ? "جاري الحذف..." : "حذف التقدير بالكامل"}
                  </button>
                </>
              )}
            </div>
          </div>

          {resultsLoading ? (
            <p className="text-sm text-gray-500">جاري تحميل آخر التقديرات...</p>
          ) : latestResult ? (
            <div className="space-y-5">
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
                  <div className="mb-2 text-sm text-gray-500">نوع العمل</div>
                  <div className="font-semibold text-black">
                    {workTypeLabel(latestResult.work_type)}
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-2 text-sm text-gray-500">تاريخ الحفظ</div>
                  <div className="font-semibold text-black">
                    {formatDate(latestResult.created_at)}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border">
                <table className="min-w-full text-right">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-4 py-3 text-sm font-bold">البند</th>
                      <th className="px-4 py-3 text-sm font-bold">الكمية</th>
                      <th className="px-4 py-3 text-sm font-bold">الوحدة</th>
                      <th className="px-4 py-3 text-sm font-bold">الإجمالي</th>
                      <th className="px-4 py-3 text-sm font-bold">إجراء</th>
                    </tr>
                  </thead>

                  <tbody>
                    {savedItems.length > 0 ? (
                      savedItems.map((item, index) => (
                        <tr
                          key={`${item.title}-${index}`}
                          className="border-t bg-white"
                        >
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {item.title}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-black">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {item.unit || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm font-bold text-black">
                            {money(item.total)} ريال
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleDeleteItem(index)}
                              disabled={deletingItemIndex === index}
                              className="text-sm font-bold text-red-600 transition hover:underline disabled:opacity-60"
                            >
                              {deletingItemIndex === index ? "جاري الحذف..." : "حذف"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-t bg-white">
                        <td
                          colSpan={5}
                          className="px-4 py-6 text-center text-sm text-gray-500"
                        >
                          لا توجد بنود إضافية محفوظة داخل هذا التقدير.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-2 text-sm text-gray-500">التكلفة الأساسية</div>
                  <div className="font-bold text-black">
                    {money(baseTotal)} ريال
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-2 text-sm text-gray-500">
                    إجمالي البنود الإضافية
                  </div>
                  <div className="font-bold text-black">
                    {money(extrasTotal)} ريال
                  </div>
                </div>

                <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4">
                  <div className="mb-2 text-sm text-gray-600">الإجمالي النهائي</div>
                  <div className="text-lg font-extrabold text-black">
                    {money(grandTotal)} ريال
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-sm leading-8 text-gray-700">
                  هذا التقدير محفوظ داخل حسابك كمرجع مبدئي. تم إخفاء أسعار الوحدات
                  والاكتفاء بإظهار إجمالي كل بند والإجمالي النهائي بشكل أوضح وأقرب
                  لعرض السعر الاحترافي.
                </p>
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
              to="/#contact"
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