import { useEffect } from 'react';
import Link from 'next/link';
import { SeoHead } from '@/components/SeoHead';

/**
 * الصفحة الرئيسية لقسم التجديد والترميم.
 *
 * يجمع هذا القسم مقالات حول تجديد المنازل والترميم في السوق السعودي.
 * يتم تعريف المقالات في مصفوفة localArticles مع معلومات أساسية مثل العنوان والوصف والرابط.
 * حالياً، كل المقالات غير منشورة (published: false) بحيث لا يتم فهرستها في محركات البحث
 * إلى أن يتم تدقيقها بشكل يدوي من قبل الإدارة.
 */
const EngineeringInsightsRenovationPage = () => {
  const localArticles = [
    {
      slug: 'engineering-insights/renovation/home-renovation-old-houses-riyadh',
      title: 'إعادة بناء وتحديث المنازل القديمة في الرياض',
      description: 'اكتشف كيفية تحديث وتطوير المنازل القديمة في الرياض لتحسين جودة الحياة وزيادة القيمة.',
      tags: ['تجديد', 'رياض', 'منازل قديمة'],
      published: false,
    },
    {
      slug: 'engineering-insights/renovation/kitchen-bathroom-renovation-secrets-riyadh',
      title: 'أسرار تجديد المطابخ والحمامات في الرياض',
      description: 'نصائح لاختيار التصميمات والمواد المناسبة لتجديد المطبخ والحمام وزيادة القيمة الجمالية للمسكن.',
      tags: ['مطبخ', 'حمام', 'تصميم داخلي'],
      published: false,
    },
    {
      slug: 'engineering-insights/renovation/increase-property-value-smart-renovation-riyadh',
      title: 'كيف تزيد قيمة عقارك من خلال تجديد ذكي',
      description: 'استراتيجيات ذكية للتجديد تساهم في رفع قيمة العقار في السوق السعودي.',
      tags: ['استثمار', 'قيمة العقار', 'تجديد ذكي'],
      published: false,
    },
    {
      slug: 'engineering-insights/renovation/villa-renovation-budget-planning-riyadh',
      title: 'تخطيط ميزانية لتجديد الفيلا بدون إفلاس',
      description: 'خطوات عملية لتخطيط ميزانية تجديد الفيلا وإدارة التكاليف بفعالية.',
      tags: ['فلل', 'ميزانية', 'تخطيط'],
      published: false,
    },
    {
      slug: 'engineering-insights/renovation/essential-home-renovation-guide-riyadh',
      title: 'الدليل الكامل لتجديد المنزل في السعودية',
      description: 'كل ما تحتاج لمعرفته قبل البدء في مشروع تجديد منزلك، من الخطوات الأولى حتى التنفيذ.',
      tags: ['دليل', 'تجديد', 'السعودية'],
      published: false,
    },
  ];

  // منع فهرسة الصفحة إذا كانت كل المقالات غير منشورة.
  useEffect(() => {
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <SeoHead
        title="التجديد والترميم - إنسايت الهندسة"
        description="تعرف على أحدث النصائح والاستراتيجيات لتجديد المنازل وترميمها في السوق السعودي."
      />
      <section className="mx-auto max-w-3xl py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">التجديد والترميم</h1>
        <p className="mb-8">
          في هذا القسم نستعرض مجموعة مقالات حول تجديد المنازل والترميم في السعودية. كل مقال
          يتناول موضوعاً محدداً لمساعدتك على اتخاذ قرارات مدروسة وتحقيق أفضل النتائج عند
          تجديد أو تحديث منزلك.
        </p>
        <div className="grid gap-6">
          {localArticles.map((article) => (
            <div key={article.slug} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="mb-4 text-sm text-gray-600">{article.description}</p>
              <Link href={`/${article.slug}`}>
                <a className="text-blue-600 hover:underline">اقرأ المزيد</a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default EngineeringInsightsRenovationPage;