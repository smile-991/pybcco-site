import SeoHead from "@/components/SeoHead";

export default function TermsAndConditions() {
  const SITE_URL = "https://pybcco.com";

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <SeoHead
        title="الشروط والأحكام | بنيان الهرم للمقاولات - PYBCCO"
        description="الشروط والأحكام العامة للموقع + شروط بوابة العملاء + شروط المتجر + شروط حاسبة التكلفة."
        canonical={`${SITE_URL}/terms`}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold mb-2">الشروط والأحكام</h1>
        <p className="text-sm text-gray-500 mb-8">
          آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
        </p>

        <div className="space-y-6 leading-relaxed text-gray-800">

          <section>
            <h2 className="font-bold text-lg mb-2">أولًا: الشروط العامة للموقع</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>استخدام الموقع لأغراض مشروعة فقط.</li>
              <li>عدم محاولة اختراق أو تعطيل أي جزء من النظام.</li>
              <li>عدم إساءة استخدام الخدمات أو النماذج المتاحة.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">الملكية الفكرية</h2>
            <p>
              جميع المحتويات من نصوص وتصاميم وصور وشعارات وأكواد مملوكة للشركة،
              ولا يجوز استخدامها دون إذن خطي.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">حدود المسؤولية</h2>
            <p>
              لا تتحمل الشركة مسؤولية الأضرار غير المباشرة الناتجة عن استخدام
              الموقع أو توقفه المؤقت لأسباب تقنية.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">ثانيًا: شروط بوابة العملاء</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>بيانات الدخول شخصية وغير قابلة للنقل.</li>
              <li>العميل مسؤول عن الحفاظ على سرية بيانات الدخول.</li>
              <li>
                المعلومات داخل البوابة مخصصة للمتابعة فقط ولا تُعد عقدًا مستقلاً.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">ثالثًا: أحكام المتجر الإلكتروني</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>المنتجات المعروضة قد تختلف تفاصيلها البصرية حسب التصنيع.</li>
              <li>الأسعار تقديرية ولا تُعد ملزمة إلا بعرض سعر رسمي.</li>
              <li>قد يتم احتساب التركيب بشكل منفصل.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">رابعًا: أحكام حاسبة التكلفة</h2>
            <p>
              نتائج الحاسبة تقديرية فقط ولا تمثل عرض سعر رسمي. السعر النهائي
              يعتمد على المعاينة الفعلية للموقع ومتطلبات التنفيذ.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}