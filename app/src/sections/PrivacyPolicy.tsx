import SeoHead from "@/components/SeoHead";

export default function PrivacyPolicy() {
  const SITE_URL = "https://pybcco.com";

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <SeoHead
        title="سياسة الخصوصية | بنيان الهرم للمقاولات - PYBCCO"
        description="سياسة الخصوصية الخاصة بموقع وبوابة العملاء لشركة بنيان الهرم للمقاولات (PYBCCO) في الرياض."
        canonical={`${SITE_URL}/privacy-policy`}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold mb-2">سياسة الخصوصية</h1>
        <p className="text-sm text-gray-500 mb-8">
          آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
        </p>

        <div className="space-y-6 leading-relaxed text-gray-800">

          <section>
            <h2 className="font-bold text-lg mb-2">1. المقدمة</h2>
            <p>
              تحترم شركة بنيان الهرم للمقاولات ("الشركة") خصوصية زوار موقعها
              https://pybcco.com وعملائها، وتلتزم بحماية البيانات الشخصية وفق
              الأنظمة المعمول بها في المملكة العربية السعودية.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">2. البيانات التي نقوم بجمعها</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>الاسم الكامل</li>
              <li>رقم الهاتف</li>
              <li>البريد الإلكتروني</li>
              <li>بيانات المشروع (العنوان، التفاصيل، الملاحظات)</li>
              <li>بيانات الدفعات (دون تخزين بيانات البطاقات البنكية)</li>
              <li>المستندات والصور المرتبطة بالمشروع داخل بوابة العملاء</li>
              <li>بيانات الاستخدام العامة (مثل عنوان IP ونوع الجهاز)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">3. كيفية استخدام البيانات</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>التواصل مع العملاء</li>
              <li>إدارة وتنفيذ المشاريع</li>
              <li>عرض تقدم المشروع داخل بوابة العملاء</li>
              <li>إصدار العقود والفواتير والمستندات</li>
              <li>تحسين تجربة المستخدم</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">4. تخزين البيانات وحمايتها</h2>
            <p>
              يتم تخزين البيانات عبر أنظمة إلكترونية مؤمنة تقنيًا، مع اتخاذ
              إجراءات معقولة لحمايتها من الوصول غير المصرح به أو الفقدان أو
              التسريب. ومع ذلك، لا يمكن ضمان أمان مطلق بنسبة 100%.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">5. مشاركة البيانات</h2>
            <p>
              لا تقوم الشركة ببيع أو تأجير البيانات الشخصية. قد يتم مشاركة
              البيانات فقط في حال وجود طلب نظامي من الجهات المختصة أو مع مزودي
              الخدمات التقنية بحدود التشغيل الفني.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">6. مدة الاحتفاظ بالبيانات</h2>
            <p>
              تحتفظ الشركة بالبيانات طوال مدة العلاقة التعاقدية، وقد يتم الاحتفاظ
              بها بعد انتهاء المشروع لأغراض التوثيق والالتزام النظامي وحماية
              الحقوق.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">7. حقوق المستخدم</h2>
            <p>
              يحق للعميل طلب الاطلاع على بياناته أو تصحيحها أو طلب حذفها إذا لم
              يكن هناك التزام قانوني يمنع ذلك، عبر التواصل الرسمي مع الشركة.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2">8. التعديلات</h2>
            <p>
              تحتفظ الشركة بحق تعديل سياسة الخصوصية في أي وقت، ويُعتبر استمرار
              استخدام الموقع موافقة ضمنية على التعديلات.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}