import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Home,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

const CALCULATOR_PATH = "/villa-finishing-price-riyadh";
const ENGINEERING_INSIGHTS_PATH = "/engineering-insights";
const CLUSTER_PATH = "/engineering-insights/construction-and-finishing-stages";
const COMPANY_PATH = "/construction-company-riyadh";
const FINISHING_SERVICE_PATH = "/villa-finishing-riyadh";

export default function ConstructionStageInspectionChecklist() {
  const title =
    "استلام مراحل البناء بالتفصيل قبل اعتماد الدفعات: دليل عملي للمالك | بنيان الهرم للمقاولات";

  const description =
    "دليل عملي يشرح استلام مراحل البناء والتشطيب قبل اعتماد الدفعات، مع توضيح ما الذي يجب مراجعته في كل مرحلة، وكيف يربط المالك بين جودة التنفيذ والدفع، وأهم الأخطاء التي تؤدي إلى اعتماد أعمال غير مكتملة أو ضعيفة.";

  const canonical =
    "https://pybcco.com/engineering-insights/construction-and-finishing-stages/construction-stage-inspection-checklist";

  useEffect(() => {
    document.title = title;

    const setMeta = (
      attr: "name" | "property",
      key: string,
      content: string
    ) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("property", "og:type", "article");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", "بنيان الهرم للمقاولات");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setLink("canonical", canonical);

    const oldSchemas = document.querySelectorAll(
      'script[data-seo="construction-stage-inspection-checklist"]'
    );
    oldSchemas.forEach((node) => node.remove());

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://pybcco.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "الرؤى الهندسية",
          item: "https://pybcco.com/engineering-insights",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "مراحل البناء والتشطيب",
          item: "https://pybcco.com/engineering-insights/construction-and-finishing-stages",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "استلام مراحل البناء بالتفصيل قبل اعتماد الدفعات",
          item: canonical,
        },
      ],
    };

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "استلام مراحل البناء بالتفصيل قبل اعتماد الدفعات",
      description,
      inLanguage: "ar-SA",
      mainEntityOfPage: canonical,
      url: canonical,
      author: {
        "@type": "Organization",
        name: "بنيان الهرم للمقاولات",
      },
      publisher: {
        "@type": "Organization",
        name: "بنيان الهرم للمقاولات",
        url: "https://pybcco.com",
      },
      articleSection: "مراحل البناء والتشطيب",
      keywords:
        "استلام مراحل البناء, استلام أعمال التشطيب, فحص أعمال البناء, اعتماد دفعات المقاول, استلام العظم, استلام اللياسة, استلام التشطيب",
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "لماذا يجب ربط الدفع باستلام المرحلة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "لأن الدفعة يجب أن تقابل عملًا منفذًا فعليًا وبمستوى مقبول، وربط الدفع بالاستلام يقلل احتمال اعتماد أعمال ناقصة أو ضعيفة يصعب تصحيحها لاحقًا.",
          },
        },
        {
          "@type": "Question",
          name: "هل يكفي أن يبدو التنفيذ جيدًا بصريًا؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "لا، لأن بعض العيوب لا تظهر من النظرة السريعة. الاستلام الجيد يعتمد على المراجعة العملية للتفاصيل الأساسية في كل مرحلة وليس فقط على الانطباع العام.",
          },
        },
        {
          "@type": "Question",
          name: "ما أكثر خطأ يقع فيه المالك عند الاستلام؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "أكثر خطأ شائع هو الاستعجال في اعتماد الدفعة قبل إغلاق الملاحظات أو قبل التأكد من اكتمال المرحلة فعلًا، ثم اكتشاف المشاكل بعد انتقال المشروع إلى مرحلة جديدة.",
          },
        },
      ],
    };

    [breadcrumbSchema, articleSchema, faqSchema].forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(
        "data-seo",
        "construction-stage-inspection-checklist"
      );
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const schemas = document.querySelectorAll(
        'script[data-seo="construction-stage-inspection-checklist"]'
      );
      schemas.forEach((node) => node.remove());
    };
  }, [title, description, canonical]);

  return (
    <main className="bg-white text-zinc-900">
      <section className="border-b border-zinc-100 bg-gradient-to-b from-[#fff8e7] via-white to-white">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-zinc-500"
          >
            <Link to="/" className="transition hover:text-[#8a6400]">
              الرئيسية
            </Link>
            <span>/</span>
            <Link
              to={ENGINEERING_INSIGHTS_PATH}
              className="transition hover:text-[#8a6400]"
            >
              الرؤى الهندسية
            </Link>
            <span>/</span>
            <Link to={CLUSTER_PATH} className="transition hover:text-[#8a6400]">
              مراحل البناء والتشطيب
            </Link>
            <span>/</span>
            <span className="text-zinc-900">
              استلام مراحل البناء بالتفصيل
            </span>
          </nav>

          <div className="mb-5 inline-flex items-center rounded-full border border-[#ecdca9] bg-[#fff8e7] px-4 py-2 text-sm font-bold text-[#8a6400]">
            مقال تفصيلي ضمن قسم مراحل البناء والتشطيب
          </div>

          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            استلام مراحل البناء بالتفصيل قبل اعتماد الدفعات: دليل عملي للمالك
          </h1>

          <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
            كثير من الملاك يركزون على سؤال واحد فقط أثناء التنفيذ:{" "}
            <strong>هل تم إنجاز الشغل أم لا؟</strong> لكن السؤال الأهم في الحقيقة
            هو: <strong>هل تم إنجاز الشغل بشكل صحيح، وبالقدر الذي يستحق الدفعة؟</strong>
            هنا تأتي أهمية استلام مراحل البناء. لأن المشروع لا يُدار فقط بالثقة،
            ولا فقط بكثرة العمال في الموقع، بل بإغلاق كل مرحلة بطريقة واضحة قبل
            الانتقال إلى التي بعدها واعتماد قيمتها المالية.
          </p>

          <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
            المشكلة أن كثيرًا من الأخطاء لا تبدأ من التنفيذ وحده، بل من الاستلام
            الضعيف. عندما يعتمد المالك أو المشرف دفعة على أساس انطباع عام أو
            مجاملة أو استعجال، قد تنتقل عيوب المرحلة إلى ما بعدها، ثم تصبح
            معالجتها أصعب وأغلى. لهذا السبب، هذا الدليل لا يشرح فقط ماذا تنظر
            إليه في كل مرحلة، بل يشرح أيضًا كيف تربط بين الاستلام والدفعة،
            ولماذا يجب أن يكون القرار مبنيًا على اكتمال فعلي وليس على ضغط الجدول
            أو الوعود.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to={CALCULATOR_PATH}
              className="inline-flex items-center gap-2 rounded-full bg-[#f7bf00] px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5"
            >
              <Calculator className="h-4 w-4" />
              احسب تكلفة التشطيب
            </Link>

            <Link
              to={CLUSTER_PATH}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition hover:border-[#f7bf00] hover:text-[#8a6400]"
            >
              <Home className="h-4 w-4" />
              جميع مقالات القسم
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <article className="min-w-0">
            <div className="rounded-[28px] border border-zinc-100 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.05)] md:p-8">
              <h2 className="text-2xl font-extrabold md:text-3xl">
                لماذا استلام المرحلة أهم من مجرد رؤية التقدم؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                لأن التقدم الظاهري قد يكون مضللًا. أحيانًا ترى أن الجدران انتهت،
                أو أن اللياسة تبدو منجزة، أو أن الأرضيات ركبت، فتشعر أن الوقت
                مناسب للدفع. لكن الاستلام الحقيقي لا يقف عند الشكل العام، بل
                يسأل: هل المرحلة اكتملت فعلًا؟ هل نفذت بالمستوى المطلوب؟ هل
                الملاحظات الجوهرية مغلقة؟ وهل الانتقال إلى المرحلة التالية لن
                يخفي مشاكل ستظهر لاحقًا؟
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                الدفع المبكر أو الاستلام السريع قد يوفر راحة لحظية، لكنه أحيانًا
                يخلق مشكلة أكبر في المستقبل. لأن المرحلة إذا أُقفلت ماليًا وهي
                ناقصة أو ضعيفة، يصبح الضغط أقل على المعالجة، وتبدأ المشاكل
                بالانتقال إلى ما بعدها. لذلك يجب أن يكون الاستلام أداة ضبط جودة
                وضبط مالي في الوقت نفسه، لا مجرد إجراء شكلي بين دفعة وأخرى.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                القاعدة الذهبية: لا تربط الدفعة بالوقت فقط، بل بالإنجاز الفعلي
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                من الأخطاء الشائعة أن يُنظر إلى الدفعات وكأنها مرتبطة بالتاريخ
                أو بحضور المقاول أو بسرعة الحركة داخل الموقع. بينما الأصل أن
                الدفعة تقابل قيمة عمل منجز فعليًا. هذا لا يعني التعقيد أو
                التشدد غير المنطقي، لكنه يعني أن كل دفعة يجب أن تستند إلى مرحلة
                واضحة أو كمية واضحة أو نسبة تقدم واضحة يمكن التحقق منها.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                عندما يكون الربط بين الاستلام والدفع واضحًا، يصبح المشروع أكثر
                انضباطًا، وتقل مساحة الخلاف، ويعرف كل طرف ما المطلوب منه. أما
                إذا كانت الدفعات تتحرك قبل اكتمال الاستلام، فإن المالك يفقد أداة
                مهمة جدًا من أدوات ضبط المشروع. وهذا المبدأ يزداد أهمية كلما
                ارتفع مستوى التشطيب أو زادت قيمة البنود أو حساسية المرحلة.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                ما الذي يجب أن تفهمه قبل استلام أي مرحلة؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                قبل أن تدخل في تفاصيل الاستلام، يجب أن تفهم أمرين أساسيين:
                الأول أن لكل مرحلة طبيعتها الخاصة، فلا يوجد فحص واحد يصلح لكل
                شيء. والثاني أن الاستلام لا يعني البحث عن الكمال المطلق، بل
                التأكد من أن المرحلة مكتملة وظيفيًا وتنفيذيًا بالمستوى المقبول
                وأن ملاحظاتها الجوهرية ليست مفتوحة. لذلك عليك أن تسأل قبل كل
                استلام: ما الهدف من هذه المرحلة؟ وما العناصر الأساسية التي لو
                كانت فيها مشكلة فستؤثر على ما بعدها؟
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                هذا الفهم مهم جدًا لأن بعض الملاك يدخلون الاستلام بعين عامة جدًا
                أو بعين شكلية جدًا. فيركزون على تفاصيل سطحية ويغفلون ما هو أخطر،
                أو العكس. بينما الاستلام الصحيح يوازن بين اكتمال الأعمال وجودتها
                وتأثيرها على المراحل التالية.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                استلام الحفر والأساسات: البداية التي لا تحتمل التساهل
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                أولى مراحل الاستلام الحساسة تبدأ من الحفر والأساسات. هنا لا يكفي
                أن ترى أن الأرض حُفرت أو أن القواعد صُبت. الأهم أن تكون
                المناسيب، والمحاور، والأبعاد، والتسليح، وتجهيزات الصب، والتنفيذ
                العام مطابقًا لما هو معتمد للمشروع. لأن هذه المرحلة لا تُصحح
                بسهولة لاحقًا مثل بعض بنود التشطيب، بل هي أساس ما فوقها.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لذلك فإن أي اعتماد مالي هنا يجب أن يكون مبنيًا على استلام جدي،
                لا على مجرد إحساس بأن المرحلة انتهت. المالك لا يحتاج أن يكون
                مهندسًا منفذًا في كل تفصيل، لكنه يحتاج أن يعرف أن هذه المرحلة
                تحديدًا ليست مكانًا للمجاملة. لأن أي ضعف في البداية ينعكس على
                كامل المشروع، ولو ظهر أثره بعد وقت.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                استلام العظم: هل الهيكل فقط ظاهر أم منضبط؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                عندما يبدأ الهيكل الإنشائي بالظهور، يشعر كثير من الملاك براحة
                لأن المشروع أصبح مرئيًا. لكن مرحلة العظم لا تُستلم فقط على أساس
                أن الأعمدة والجسور والأسقف موجودة. يجب النظر إلى استقامة
                العناصر، أماكن الفتحات، مناسيب الأسقف، وضوح الأبعاد، وانتظام
                التنفيذ العام. لأن أي انحراف في هذه المرحلة قد يخلق سلسلة
                مشاكل لاحقًا في البلوك واللياسة والأبواب والنوافذ والتشطيبات.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                من المهم أيضًا أن لا تُعتمد دفعة العظم وكأنها نهاية الخطر. بل
                على العكس، العظم هو المرحلة التي تؤسس الدقة البصرية والوظيفية
                للمبنى. وقد يكون المقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/villa-construction-stages-saudi-arabia"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  مراحل بناء الفيلا خطوة بخطوة
                </Link>{" "}
                مفيدًا هنا لفهم تسلسل هذه المرحلة وموقعها من كامل المشروع.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                استلام البلوك والقواطع: لأن الخطأ هنا يؤذي الاستخدام اليومي
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                البلوك والقواطع ليست مجرد تعبئة فراغات، بل هي ما يحول الهيكل إلى
                غرف وممرات وخدمات ومساحات قابلة للاستخدام. لذلك عند استلام هذه
                المرحلة يجب النظر إلى الاستقامة، أبعاد الفتحات، مواقع الأبواب
                والنوافذ، منطق توزيع الجدران، ومدى توافق التنفيذ مع الاستخدام
                الفعلي للمكان. لأن الخطأ هنا لا يكون شكليًا فقط، بل قد يؤثر على
                الأثاث، الحركة، فتح الأبواب، وضوح المساحات، وحتى على رضا المالك
                بعد السكن.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كثير من الناس يتعامل مع هذه المرحلة على أنها بسيطة ويمكن تعديلها
                لاحقًا، وهذا صحيح أحيانًا من حيث الإمكانية، لكنه ليس صحيحًا من
                حيث الكلفة والسهولة. كلما اكتشفت الخطأ أبكر، كان تصحيحه أسهل.
                وكلما تأخر الاستلام أو كان سطحيًا، زادت احتمالية انتقال الخطأ إلى
                اللياسة أو التمديدات أو حتى التشطيب النهائي.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                استلام التمديدات: هذه المرحلة قد لا تُرى لاحقًا لكنها تحكم الراحة
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                من أهم مراحل الاستلام وأكثرها تعرضًا للإهمال هي مرحلة التمديدات
                الكهربائية والميكانيكية والسباكة والتكييف. السبب في خطورتها أن
                كثيرًا من عناصرها ستختفي لاحقًا خلف الجدران والأسقف والتشطيبات،
                وإذا لم تُفحص جيدًا في وقتها، قد يتحول أي نقص أو سوء توزيع أو خطأ
                إلى تكسير مباشر بعد الإغلاق.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                هنا يجب مراجعة النقاط والمواقع والمسارات وملاءمتها لاستخدام
                الفراغات، لا الاكتفاء بوجودها فقط. فوجود نقطة كهرباء في مكان غير
                مناسب لا يقل سوءًا عن غيابها. وكذلك الحال في نقاط المياه والصرف
                والتكييف. هذه المرحلة تحديدًا يجب أن تُربط باستيعاب جيد لما
                سيأتي بعدها من تشطيب، ولهذا من المفيد أيضًا قراءة{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  ترتيب مراحل التشطيب الداخلي
                </Link>{" "}
                لأن سوء ترتيب البنود يجعل استلام التمديدات أصعب أو متأخرًا.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                استلام العزل واللياسة: لا تنظر فقط إلى الشكل
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                مرحلة العزل واللياسة من أكثر المراحل التي يُخدع فيها بعض الملاك
                بالمظهر. الجدار قد يبدو مغطى والسطح قد يبدو منتهيًا، لكن
                الاستلام الحقيقي يسأل: هل العزل نُفذ في المواقع الصحيحة؟ هل
                المعالجات أُغلقت؟ هل اللياسة مستقيمة ومنضبطة؟ هل الزوايا واضحة؟
                هل السطح مهيأ فعلًا لما بعده؟
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                أي ضعف في هذه المرحلة قد يظهر لاحقًا على شكل رطوبة، تموجات،
                تشققات، ضعف في الدهانات، أو مشاكل في تركيب العناصر النهائية.
                لذلك فإن اعتماد الدفعة هنا قبل التأكد من جوهر المرحلة قد يكون من
                أكثر القرارات المكلفة لاحقًا. الجمال الظاهري لا يكفي إذا كانت
                القاعدة ضعيفة.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                استلام الأرضيات والكسوات: الدقة هنا تصنع الانطباع النهائي
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                عند الوصول إلى الأرضيات والكسوات، يبدأ المشروع يأخذ مظهره
                النهائي، ويصبح من السهل التركيز على الشكل. لكن استلام هذه
                المرحلة لا يتعلق بالجمال فقط، بل يتضمن انتظام التنفيذ، وضبط
                المناسيب، دقة التركيب، التقاء العناصر ببعضها، ونظافة المعالجات.
                لأن الأرضية أو الكسوة قد تبدو جميلة من بعيد، لكنها تكشف لاحقًا
                مشاكل مزعجة جدًا في الاستخدام أو في التناسق العام.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                من المهم كذلك التأكد من أن البنود السابقة فعلاً كانت جاهزة قبل
                اعتماد هذه المرحلة. لأن تنفيذ الأرضيات مثلًا قبل حسم بعض
                التعديلات أو الخدمات قد يفرض تكسيرًا لاحقًا. وهنا يظهر أثر
                الاستلام الجيد على الزمن والمال معًا، لا على الجودة فقط.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                استلام الدهانات والأعمال النهائية: المرحلة التي تفضح ما قبلها
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                الدهانات من البنود التي يظن البعض أن الاستلام فيها سهل لأنها
                مرئية. لكن في الحقيقة، هذه المرحلة تفضح جودة اللياسة والمعالجات
                والزوايا والإضاءة وطريقة التنفيذ. لذلك يجب ألا يكون الاستلام هنا
                قائمًا فقط على اللون أو النظافة العامة، بل على تجانس الأسطح،
                وضوح التفاصيل، وغياب العيوب المزعجة التي تظهر مع الإضاءة أو من
                زوايا مختلفة.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كما أن الأعمال النهائية مثل التركيبات، الإكسسوارات، وبعض
                التفاصيل الصغيرة يجب أن تُراجع باعتبارها جزءًا من اكتمال
                المرحلة، لا باعتبارها ملاحظات بسيطة يمكن نسيانها. لأن تراكم
                الملاحظات الصغيرة قد يخلق في النهاية استلامًا هشًا ودفعة لا
                تعكس الحقيقة.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                متى تعتمد الدفعة؟ ومتى تؤجلها؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                تعتمد الدفعة عندما تكون المرحلة المنفذة قد وصلت إلى الحد المتفق
                عليه فعلًا، وعندما تكون الملاحظات الجوهرية مغلقة أو محددة بشكل لا
                يؤثر على الانتقال للمرحلة التالية. أما إذا كانت هناك نواقص أساسية
                أو عيوب مؤثرة أو بنود غير مكتملة ولكنها ظهرت في الاستلام، فمن
                المنطقي تأجيل الاعتماد أو ربط جزء من الدفعة بإغلاق تلك الملاحظات.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                الهدف ليس تعطيل المشروع أو خلق توتر غير ضروري، بل حماية تسلسل
                التنفيذ. لأن الدفعة إذا خرجت قبل أن تُغلق المرحلة كما يجب، تقل
                قوة الاستلام، ويصبح الضغط أكبر على المالك لاحقًا. لذلك يجب أن
                يكون القرار ماليًا وفنيًا في الوقت نفسه، لا عاطفيًا ولا
                استعجاليًا.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الخطأ الأكبر: إقفال المرحلة مع وجود ملاحظات ستُدفن لاحقًا
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                من أسوأ ما يمكن أن يحدث في المشروع هو إقفال مرحلة توجد فيها
                ملاحظات ستختفي تحت الأعمال التالية. لأن بعض الملاحظات يمكن
                رؤيتها الآن فقط، وإذا انتقل المشروع فوقها فلن تعود ظاهرة إلا بعد
                أن تصبح المعالجة مكلفة أو مزعجة أو مستحيلة دون تكسير. لهذا
                السبب، يجب أن تسأل دائمًا: هل هذه الملاحظة ستبقى قابلة للتصحيح
                لاحقًا بسهولة، أم أنها ستُدفن تحت أعمال أخرى؟
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                هذه القاعدة وحدها تساعد المالك كثيرًا في تمييز ما يمكن تجاوزه
                مؤقتًا وما لا يجب تجاوزه إطلاقًا. ليست كل الملاحظات بنفس
                الخطورة، لكن بعض الملاحظات لو تُركت الآن ستتحول لاحقًا إلى
                مشكلة مضاعفة ماليًا وتنفيذيًا.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                كيف تجعل الاستلام جزءًا من إدارة المشروع لا مجرد فحص؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                أفضل طريقة هي أن تتعامل مع الاستلام كمرحلة انتقال، لا كوقفة
                عابرة. كل استلام يجب أن يجيب عن ثلاثة أسئلة: هل المرحلة اكتملت؟
                هل جودتها تسمح بالانتقال؟ وهل تستحق الاعتماد المالي؟ عندما يكون
                هذا التفكير حاضرًا، يصبح الاستلام وسيلة لحماية الزمن والميزانية
                معًا. لأنك لا تمنع فقط مرور العيوب، بل تمنع أيضًا الصرف في غير
                موضعه.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ومن المفيد كذلك أن تربط الاستلام بفهمك لمراحل المشروع كاملة،
                ولتكلفة ما يتم تنفيذه. لذلك قد يساعدك استخدام{" "}
                <Link
                  to={CALCULATOR_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  حاسبة تكلفة التشطيب
                </Link>{" "}
                أو الرجوع إلى{" "}
                <Link
                  to={COMPANY_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  صفحة شركة المقاولات
                </Link>{" "}
                و{" "}
                <Link
                  to={FINISHING_SERVICE_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  خدمة تشطيب الفلل
                </Link>{" "}
                لفهم الصورة العملية والمالية بشكل أكمل.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الخلاصة
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                استلام مراحل البناء قبل اعتماد الدفعات ليس إجراءً إداريًا فقط،
                بل هو من أهم أدوات حماية المشروع. الاستلام الجيد يمنع انتقال
                العيوب، ويعطي كل دفعة معناها الصحيح، ويجعل الانتقال بين المراحل
                قائمًا على إنجاز فعلي لا على انطباع عام. وكلما كان المالك أوضح في
                ربط الدفعة بالمرحلة المستلمة، كان المشروع أكثر توازنًا من حيث
                الجودة والمال والوقت.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لا يكفي أن يبدو الشغل منتهيًا، بل يجب أن يكون فعلًا مكتملًا
                بالمستوى الذي يسمح بإغلاقه. وهذه الفكرة وحدها تصنع فرقًا كبيرًا
                في أي مشروع، خاصة في المراحل التي ستُدفن تحت أعمال لاحقة أو في
                البنود التي يصعب تصحيحها بعد الاعتماد.
              </p>

              <div className="mt-10 rounded-[28px] border border-[#ecdca9] bg-[#fff8e7] p-6">
                <h2 className="text-2xl font-extrabold">
                  ابدأ بالخطوة العملية التالية
                </h2>
                <p className="mt-3 text-[16px] leading-8 text-zinc-700">
                  إذا كنت في مرحلة تنفيذ فعلية، فربط الاستلام بالتكلفة والمرحلة
                  القادمة مهم جدًا. ابدأ بالحاسبة أو تابع بقية مقالات القسم لفهم
                  التسلسل الزمني والتشطيب ومراقبة الجودة.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={CALCULATOR_PATH}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f7bf00] px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5"
                  >
                    <Calculator className="h-4 w-4" />
                    احسب تكلفة التشطيب الآن
                  </Link>

                  <Link
                    to={CLUSTER_PATH}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition hover:border-[#f7bf00] hover:text-[#8a6400]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    تصفح جميع مقالات القسم
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-3 inline-flex rounded-full bg-[#fff8e7] p-3 text-[#8a6400]">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold">في هذا المقال</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-700">
                <p>ربط الاستلام بالدفع</p>
                <p>استلام العظم والبلوك</p>
                <p>استلام التمديدات واللياسة</p>
                <p>استلام التشطيب النهائي</p>
                <p>متى تعتمد الدفعة</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-3 inline-flex rounded-full bg-[#fff8e7] p-3 text-[#8a6400]">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold">روابط داخلية مهمة</h2>

              <div className="mt-4 space-y-3">
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/villa-construction-stages-saudi-arabia"
                  className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-[#fff8e7] hover:text-[#8a6400]"
                >
                  مراحل بناء الفيلا خطوة بخطوة
                </Link>

                <Link
                  to="/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas"
                  className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-[#fff8e7] hover:text-[#8a6400]"
                >
                  ترتيب مراحل التشطيب الداخلي
                </Link>

                <Link
                  to={CALCULATOR_PATH}
                  className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-[#fff8e7] hover:text-[#8a6400]"
                >
                  حاسبة تكلفة التشطيب
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] bg-zinc-900 p-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
              <div className="mb-3 inline-flex rounded-full bg-white/10 p-3 text-[#f7bf00]">
                <WalletCards className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold">لا تدفع قبل أن تُقفل المرحلة</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                الدفعة ليست مكافأة على الحركة داخل الموقع، بل مقابل عمل مكتمل
                بالمستوى المقبول ويستحق الاعتماد.
              </p>

              <Link
                to={CALCULATOR_PATH}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f7bf00] px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5"
              >
                <Calculator className="h-4 w-4" />
                افتح الحاسبة
              </Link>
            </div>

            <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-3 inline-flex rounded-full bg-[#fff8e7] p-3 text-[#8a6400]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold">للمزيد</h2>
              <div className="mt-4 space-y-3">
                <Link
                  to={COMPANY_PATH}
                  className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-[#fff8e7] hover:text-[#8a6400]"
                >
                  صفحة شركة المقاولات
                </Link>
                <Link
                  to={FINISHING_SERVICE_PATH}
                  className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-[#fff8e7] hover:text-[#8a6400]"
                >
                  خدمة تشطيب الفلل
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-10 md:px-6 md:pb-14">
        <div className="rounded-[30px] border border-zinc-100 bg-zinc-50 p-6 md:p-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            أسئلة شائعة حول استلام مراحل البناء
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                هل يمكن اعتماد الدفعة مع وجود ملاحظات بسيطة؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                نعم إذا كانت الملاحظات غير جوهرية ولا تؤثر على اكتمال المرحلة أو
                على ما بعدها، لكن يجب أن تكون محددة وواضحة وألا تتحول إلى باب
                لنسيان المعالجة.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                ما الفرق بين الاستلام الشكلي والاستلام الحقيقي؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                الاستلام الشكلي يعتمد على الانطباع العام فقط، أما الاستلام
                الحقيقي فيربط اكتمال المرحلة بجودتها وتأثيرها على المراحل التالية
                واستحقاقها المالي.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                لماذا تتضاعف المشكلة إذا لم تُكتشف الملاحظات مبكرًا؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                لأن بعض العيوب تُدفن تحت أعمال لاحقة، وعندها تصبح المعالجة أصعب
                وأغلى وقد تحتاج إلى فك أو تكسير أو إعادة تنفيذ كامل.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}