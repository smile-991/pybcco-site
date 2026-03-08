import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calculator,
  ClipboardCheck,
  Hammer,
  Home,
  Ruler,
  ShieldCheck,
} from "lucide-react";

const CALCULATOR_PATH = "/villa-finishing-price-riyadh";
const ENGINEERING_INSIGHTS_PATH = "/engineering-insights";
const CLUSTER_PATH = "/engineering-insights/construction-and-finishing-stages";
const COMPANY_PATH = "/construction-company-riyadh";
const FINISHING_SERVICE_PATH = "/villa-finishing-riyadh";

export default function VillaConstructionStagesSaudiArabia() {
  const title =
    "مراحل بناء الفيلا في السعودية خطوة بخطوة: الدليل الكامل من الحفر حتى التسليم | بنيان الهرم للمقاولات";

  const description =
    "دليل شامل يشرح مراحل بناء الفيلا في السعودية خطوة بخطوة، من استلام الأرض والحفر والقواعد إلى العظم والتشطيب والاستلام النهائي، مع توضيح ترتيب الأعمال والأخطاء الشائعة ونصائح عملية للمالك.";

  const canonical =
    "https://pybcco.com/engineering-insights/construction-and-finishing-stages/villa-construction-stages-saudi-arabia";

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
      'script[data-seo="villa-construction-stages-sa"]'
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
          name: "مراحل بناء الفيلا في السعودية خطوة بخطوة",
          item: canonical,
        },
      ],
    };

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "مراحل بناء الفيلا في السعودية خطوة بخطوة",
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
        "مراحل بناء الفيلا, خطوات بناء بيت, مراحل البناء بالترتيب, بناء فيلا في السعودية, مراحل العظم, مراحل التشطيب, مدة بناء فيلا",
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ما أول مرحلة في بناء الفيلا؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "أول مرحلة فعلية بعد اعتماد المخططات والتراخيص هي تجهيز الموقع ثم أعمال الحفر والقواعد، لأن جودة البداية تؤثر على كامل المشروع لاحقًا.",
          },
        },
        {
          "@type": "Question",
          name: "ما الفرق بين مرحلة العظم ومرحلة التشطيب؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "العظم يشمل الهيكل الإنشائي والجدران الأساسية، أما التشطيب فيشمل الأعمال الكهربائية والميكانيكية واللياسة والعزل والأرضيات والدهانات والتركيبات النهائية.",
          },
        },
        {
          "@type": "Question",
          name: "هل يمكن البدء بالتشطيب قبل اكتمال بعض الأعمال الأساسية؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "يجب الالتزام بترتيب منطقي للتنفيذ، لأن تقديم بعض بنود التشطيب على أعمال تأسيس أو عزل أو تمديدات قد يؤدي إلى تكسير وإعادة عمل وخسائر إضافية.",
          },
        },
      ],
    };

    [breadcrumbSchema, articleSchema, faqSchema].forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "villa-construction-stages-sa");
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const schemas = document.querySelectorAll(
        'script[data-seo="villa-construction-stages-sa"]'
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
              مراحل بناء الفيلا في السعودية خطوة بخطوة
            </span>
          </nav>

          <div className="mb-5 inline-flex items-center rounded-full border border-[#ecdca9] bg-[#fff8e7] px-4 py-2 text-sm font-bold text-[#8a6400]">
            مقال تفصيلي ضمن قسم مراحل البناء والتشطيب
          </div>

          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            مراحل بناء الفيلا في السعودية خطوة بخطوة: الدليل الكامل من الحفر حتى
            التسليم
          </h1>

          <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
            بناء الفيلا ليس مجرد صب خرسانة ثم الانتقال إلى التشطيب، بل هو سلسلة
            مترابطة من المراحل التي يجب أن تُنفذ بترتيب صحيح حتى لا يتحول المشروع
            لاحقًا إلى مصدر تأخير وخسائر وتعديلات متكررة. كثير من الملاك يدخلون
            المشروع وهم يعرفون العنوان العام فقط: حفر، عظم، تشطيب. لكن الواقع أن
            كل عنوان كبير يتفرع إلى تفاصيل كثيرة، وكل تفصيل منها قد يؤثر على
            الجودة والمدة والتكلفة.
          </p>

          <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
            في هذا الدليل نشرح مراحل بناء الفيلا في السعودية خطوة بخطوة بطريقة
            عملية وواضحة، حتى تكون الصورة كاملة أمامك سواء كنت في بداية التخطيط،
            أو في مرحلة اختيار المقاول، أو أثناء التنفيذ ومتابعة المشروع على
            الأرض.
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
                لماذا فهم مراحل البناء مهم قبل أن تبدأ؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                السبب بسيط: لأن سوء الفهم في البداية ينعكس على كامل المشروع.
                عندما لا يعرف المالك ما الذي يسبق ماذا، يصبح من الصعب عليه تقييم
                عرض السعر، أو فهم تأخر المقاول، أو معرفة هل ما تم تنفيذه يستحق
                الدفعة فعلًا أم لا. كما أن كثيرًا من النزاعات بين المالك والمقاول
                لا تبدأ من خطأ كبير، بل من غياب تصور واضح عن المراحل وتسلسلها
                والاعتماد على عبارات عامة دون تفاصيل تنفيذية.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لذلك فإن معرفة مراحل البناء لا تعني أن تتحول إلى مهندس منفذ، بل
                تعني أن تكون لديك رؤية عملية تساعدك على اتخاذ القرار الصحيح في
                الوقت الصحيح. ومع كل مرحلة، يجب أن تسأل: ما الهدف منها؟ ما الذي
                يجب التأكد منه قبل الانتقال إلى المرحلة التالية؟ وما الأخطاء
                الشائعة التي قد تكلفني وقتًا أو مالًا إذا لم أنتبه لها؟
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                1) ما قبل التنفيذ: الأرض، المخططات، والتجهيز الفعلي للمشروع
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                قبل أن يبدأ أي عمل ميداني، توجد مرحلة تأسيسية مهمة جدًا، وهي
                المرحلة التي تُبنى عليها سلامة التنفيذ لاحقًا. تبدأ هذه المرحلة
                بالتأكد من المخططات المعمارية والإنشائية والكهربائية والميكانيكية،
                ومراجعة مناسيب الأرض، وحدود الموقع، والدخول والخروج، وطبيعة
                الخدمات المتوفرة أو المتوقعة. في هذه النقطة تحديدًا، يقع بعض
                الملاك في خطأ التسرع، فيتعاملون مع بداية المشروع على أنها مجرد
                مباشرة بالحفر، بينما الأصل هو أن تكون الصورة واضحة قبل دخول
                المعدات والعمال.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كذلك من المهم تحديد نطاق التنفيذ بوضوح: هل العقد يشمل العظم فقط؟
                أم العظم مع التشطيب؟ هل التوريد على المقاول أم على المالك؟ هل
                هناك مواد مختارة مسبقًا أم ستُحدد لاحقًا؟ هذه الأمور ليست تفاصيل
                ثانوية، بل تؤثر مباشرة على الجدول الزمني وعلى ترتيب شراء المواد
                وعلى طريقة مراقبة المصروفات.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                2) تجهيز الموقع وأعمال الحفر
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بعد اعتماد ما سبق، تبدأ أول مرحلة ميدانية فعلية وهي تجهيز الموقع.
                يشمل ذلك تنظيف الأرض، تحديد المحاور، وضبط حدود العمل، ثم البدء
                بالحفر حسب المخططات والمناسيب المطلوبة. هذه المرحلة تبدو للبعض
                بسيطة، لكنها في الحقيقة مرحلة حساسة لأن أي خطأ في تحديد المحاور أو
                الأعماق أو المناسيب قد ينعكس على كامل الهيكل الإنشائي.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                الهدف من الحفر ليس فقط إزالة التربة، بل الوصول إلى منسوب يسمح
                بتنفيذ القواعد واللبشة أو أي نظام إنشائي معتمد للمشروع. وفي بعض
                الحالات قد تظهر ظروف ميدانية مختلفة عن المتوقع، مثل اختلاف طبيعة
                التربة أو الحاجة إلى معالجة إضافية. لذلك يجب ألا يتم النظر إلى
                الحفر كمرحلة سريعة وعابرة، بل كجزء من تأسيس المشروع بشكل صحيح منذ
                اليوم الأول.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                3) القواعد والأساسات: البداية التي لا تحتمل المجاملة
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بعد الحفر تأتي مرحلة الأساسات، وهي من أهم مراحل البناء على
                الإطلاق. هنا نتحدث عن القواعد المنفصلة أو الشريطية أو اللبشة حسب
                التصميم الإنشائي، إضافة إلى طبقات النظافة والعزل إن وجدت، ثم
                التسليح والشدات والصب والمعالجة. ما يجعل هذه المرحلة شديدة
                الحساسية هو أن أي ضعف فيها لا يمكن التعامل معه لاحقًا بسهولة مثل
                بعض أخطاء التشطيب؛ بل قد يصبح تأثيره ممتدًا على كامل المشروع.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                في هذه المرحلة يجب التركيز على مطابقة المقاسات والتسليح والمناسيب
                لما هو معتمد، والتأكد من نظافة القاعدة قبل الصب، وجودة الشدة،
                وطريقة الصب والمعالجة. كثير من الناس يهتمون بالشكل النهائي للفيلا
                أكثر من بدايتها، مع أن الحقيقة أن متانة البداية هي التي تضمن
                استقرار ما فوقها. لذلك لا ينبغي التهاون في الاستلام أو الاعتماد
                على الانطباعات العامة فقط.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                4) الميدات، الأعمدة، والجسور: بداية صعود الهيكل
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بعد تأسيس القواعد تبدأ عناصر الربط والرفع، مثل الميدات والأعمدة
                والجسور. هنا يبدأ شكل المبنى بالظهور تدريجيًا، وتبدأ الفراغات
                المعمارية بالاتضاح على أرض الواقع. لكن هذه المرحلة ليست مجرد
                انتقال بصري من تحت الأرض إلى فوقها، بل هي اختبار حقيقي لدقة
                التنفيذ. استقامة الأعمدة، أماكن الفتحات، مناسيب الجسور، والتزام
                الأبعاد، كلها أمور تؤثر لاحقًا على أعمال البلوك واللياسة والأبواب
                والنوافذ وحتى التشطيبات النهائية.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كثير من المشاكل التي تظهر لاحقًا في الأبواب أو الجدران أو
                الأسقف، يكون أصلها من هذه المرحلة تحديدًا. لذلك فإن أي انحراف
                بسيط يتم تجاهله مبكرًا قد يتحول لاحقًا إلى سلسلة معالجات وتعديلات
                وتنازلات في الجودة أو الشكل النهائي.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                5) الأسقف وصب البلاطات
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                تأتي بعد ذلك مرحلة الأسقف أو البلاطات، سواء كانت هوردي أو مصمتة
                أو أي نظام إنشائي آخر معتمد في المشروع. في هذه المرحلة تزداد أهمية
                التنسيق بين الأعمال الإنشائية وبين ما سيأتي بعدها من تمديدات
                كهربائية وميكانيكية ومواقع فتحات وخدمات. كما أن الشدة والتسليح
                والدعائم وطريقة الصب والمعالجة كلها عناصر لا يجوز التعامل معها
                باستخفاف.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ومع اكتمال الأسقف لكل دور، يبدأ المشروع بأخذ شكل أكثر وضوحًا.
                وهنا يظن بعض الملاك أن الجزء الأصعب قد انتهى، لكن الصحيح أن كل
                مرحلة لها حساسيتها، وأن الانتقال السليم بين المراحل هو ما يحدد
                جودة المشروع ككل، لا مجرد إنهاء كل جزء منفصلًا عن الآخر.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                6) البلوك والقواطع وتحديد الفراغات
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بعد اكتمال الهيكل الإنشائي الأساسي تبدأ أعمال البلوك، وهنا تنتقل
                الفيلا من شكل إنشائي عام إلى فراغات قابلة للفهم والمعاينة. تبدأ
                الغرف، الممرات، الصالات، الخدمات، ومواقع الأبواب والنوافذ بالظهور
                بشكل عملي. هذه المرحلة مهمة لأنها تربط بين التصميم المعماري وبين
                الواقع التنفيذي، وأي خطأ فيها قد يؤثر على الاستخدام اليومي
                للمساحات.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                يجب الانتباه في هذه المرحلة إلى استقامة الجدران، أماكن الفتحات،
                أبعاد الغرف، وملاءمة التنفيذ لما هو معتمد. كما ينبغي عدم التسرع
                في الانتقال إلى اللياسة أو التمديدات قبل التأكد من أن جميع
                الجدران والقواطع في أماكنها الصحيحة، لأن معالجة الأخطاء بعد
                التقدم في العمل تصبح أكثر تكلفة وتعقيدًا.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                7) التمديدات الأساسية قبل الإغلاق: كهرباء، سباكة، وتكييف
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                هذه من أكثر المراحل التي تؤثر على راحة المالك لاحقًا، لأنها تمثل
                البنية الخفية للمبنى. هنا تبدأ التمديدات الكهربائية والميكانيكية
                والسباكة وأنظمة التكييف والاتصالات، وكلها أعمال يجب أن تُنفذ قبل
                إغلاق الجدران والأسقف بالتشطيبات النهائية. المشكلة أن هذه المرحلة
                قد لا تكون جذابة بصريًا، ولذلك يهملها بعض الملاك مقارنة بما
                سيظهر لاحقًا من دهانات وأرضيات وواجهات، لكنها في الحقيقة أخطر
                منها جميعًا.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                جودة التمديدات تعني أقل مشاكل مستقبلية، وأقل تكسير، وأفضل أداء
                للخدمات. لذلك يجب مراجعة المخارج والمفاتيح ونقاط الإنارة ونقاط
                المياه والصرف ومسارات التكييف بعناية، لأن التعديل بعد الإنهاء
                أصعب بكثير من التعديل في وقت التأسيس. وإذا كنت في مرحلة تقدير
                الميزانية، فمن الأفضل دائمًا ربط هذه المرحلة مع{" "}
                <Link
                  to={CALCULATOR_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  حاسبة تكلفة التشطيب
                </Link>{" "}
                حتى تكون لديك صورة أقرب للواقع المالي.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                8) العزل واللياسة: حماية المبنى وتهيئته للتشطيب
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بعد استكمال التمديدات الأساسية تأتي مراحل العزل واللياسة. العزل
                ليس بندًا ثانويًا، بل هو خط دفاع رئيسي ضد مشاكل الرطوبة وتسربات
                المياه وتلف بعض عناصر التشطيب لاحقًا. أما اللياسة فهي المرحلة التي
                تهيئ الجدران والأسطح لاستقبال الدهانات والكسوات وتؤثر مباشرة على
                جودة الشكل النهائي.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                من الأخطاء الشائعة الانتقال السريع بين البنود دون إعطاء هذه
                المرحلة حقها من الفحص والاستلام. لأن أي ضعف في اللياسة أو أي
                خلل في العزل سيظهر لاحقًا بشكل أوضح وأكثر كلفة. ولهذا السبب من
                المهم جدًا فهم{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/construction-stage-inspection-checklist"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  طريقة استلام مراحل البناء
                </Link>{" "}
                قبل اعتماد الدفعات والانتقال للبنود التالية.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                9) بداية مرحلة التشطيب
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بعد اكتمال البنية الأساسية والتأكد من جاهزية الموقع، تبدأ مرحلة
                التشطيب الفعلي، وهي المرحلة التي يتطلع إليها معظم الملاك لأنها
                تمثل التحول من الهيكل الخام إلى المنزل القابل للسكن. تشمل هذه
                المرحلة بنودًا متعددة مثل الأسقف الجبسية، الأرضيات، الجدران،
                الدهانات، الأبواب، الخزائن، التركيبات الكهربائية والسباكة،
                الإضاءة، وبعض التفاصيل الجمالية النهائية.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لكن الخطأ الشائع هنا هو التعامل مع التشطيب على أنه بند واحد، مع
                أنه في الحقيقة سلسلة مترابطة تحتاج إلى ترتيب دقيق. ولهذا من
                المهم الرجوع أيضًا إلى مقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  ترتيب مراحل التشطيب الداخلي للفلل
                </Link>{" "}
                حتى لا يحدث تضارب بين البنود أو إعادة عمل غير ضرورية.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                10) الأعمال النهائية والاستلام قبل السكن
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                مع اقتراب المشروع من نهايته تبدأ الأعمال النهائية مثل تركيب
                الإكسسوارات، الفحوصات النهائية، المعالجات البسيطة، التنظيف، وضبط
                الملاحظات. وهنا يجب أن يكون المالك أكثر وعيًا لا أقل، لأن بعض
                المشاريع تبدو مكتملة بصريًا بينما ما زالت تحتوي على نواقص أو
                مشاكل صغيرة إذا أُهملت تحولت لاحقًا إلى مصدر إزعاج دائم.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                الاستلام النهائي لا يعني أن كل شيء جميل فقط، بل يعني أن الأعمال
                نُفذت حسب المتفق عليه، وأن الخدمات تعمل، وأن الملاحظات الجوهرية
                أُغلقت، وأن ما تم اعتماده ماليًا يقابله تنفيذ فعلي بالمستوى
                المطلوب. لذلك لا تتعامل مع آخر المشروع على أنه مرحلة مجاملة أو
                استعجال، بل مرحلة حسم وضبط جودة.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الأخطاء الشائعة التي تربك تسلسل البناء
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                من أكثر الأخطاء انتشارًا: البدء قبل وضوح كامل المخططات، ضعف
                التنسيق بين البنود، اعتماد قرارات متأخرة تؤثر على التمديدات،
                التسرع في اعتماد الدفعات، الانتقال إلى التشطيب قبل التأكد من
                اكتمال التأسيس والعزل، وعدم مراجعة الأعمال على مراحل. كما أن بعض
                الملاك يركزون على تخفيض السعر في البداية دون النظر إلى أثر ذلك
                على الجودة أو على احتمالية التعديلات اللاحقة.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                إذا أردت تقليل هذه الأخطاء، فالمطلوب ليس التعقيد، بل الوضوح:
                وضوح نطاق العمل، وضوح المواد، وضوح الترتيب، وضوح طريقة الاستلام،
                ووضوح العلاقة بين كل مرحلة وما بعدها. وكلما كان المشروع منظمًا
                من البداية، قلت مساحة الارتباك لاحقًا.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                كيف تتعامل مع المشروع كمالك بطريقة ذكية؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                أفضل طريقة هي أن ترى المشروع على شكل مراحل واضحة، لا على شكل
                دفعات متفرقة أو قرارات لحظية. اسأل دائمًا: ما المرحلة الحالية؟
                ما الذي يجب أن يكتمل فيها؟ ما الذي يجب فحصه؟ وما الذي سيأتي
                بعدها؟ هذا التفكير وحده يرفع مستوى السيطرة على المشروع حتى لو لم
                تكن صاحب خلفية هندسية تفصيلية.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ومن الناحية المالية، لا تنتظر حتى تتفاجأ بالمصاريف أثناء
                التشطيب. الأفضل أن تبني تصورًا مبكرًا عبر الخدمات المتاحة على
                الموقع، مثل{" "}
                <Link
                  to={FINISHING_SERVICE_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  صفحة خدمة تشطيب الفلل
                </Link>{" "}
                أو{" "}
                <Link
                  to={COMPANY_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  صفحة شركة المقاولات
                </Link>{" "}
                أو البدء مباشرة من{" "}
                <Link
                  to={CALCULATOR_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  حاسبة التكلفة
                </Link>{" "}
                لفهم الصورة المالية قبل التقدم في التنفيذ.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الخلاصة
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                مراحل بناء الفيلا في السعودية تبدأ فعليًا قبل أول حفرة في الأرض،
                وتستمر عبر سلسلة مترابطة من التجهيز، الحفر، الأساسات، الهيكل
                الإنشائي، البلوك، التمديدات، العزل، اللياسة، التشطيب، ثم
                الاستلام النهائي. النجاح في المشروع لا يعتمد على إنهاء كل مرحلة
                بسرعة فقط، بل على إنهائها بالشكل الصحيح وفي توقيتها المناسب
                وبالربط الذكي بينها وبين ما يليها.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كلما فهمت تسلسل البناء مبكرًا، أصبحت قراراتك أوضح، وملاحظاتك
                أدق، وقدرتك على متابعة المقاول أعلى، واحتمالية الوقوع في الأخطاء
                أقل. لهذا صممنا هذا القسم ليكون مرجعًا عمليًا يساعدك على قراءة
                المشروع بشكل منظم، لا بشكل مشتت أو عشوائي.
              </p>

              <div className="mt-10 rounded-[28px] border border-[#ecdca9] bg-[#fff8e7] p-6">
                <h2 className="text-2xl font-extrabold">
                  ابدأ بالخطوة العملية التالية
                </h2>
                <p className="mt-3 text-[16px] leading-8 text-zinc-700">
                  إذا أصبحت الصورة أوضح لديك الآن، فالخطوة المنطقية التالية هي
                  تقدير التكلفة أو متابعة بقية مقالات القسم لفهم الاستلام
                  والتشطيب والجودة بشكل أعمق.
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
                <p>ما قبل التنفيذ</p>
                <p>الحفر والأساسات</p>
                <p>الهيكل الإنشائي</p>
                <p>البلوك والتمديدات</p>
                <p>العزل واللياسة</p>
                <p>التشطيب والاستلام</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-3 inline-flex rounded-full bg-[#fff8e7] p-3 text-[#8a6400]">
                <Hammer className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold">روابط داخلية مهمة</h2>

              <div className="mt-4 space-y-3">
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas"
                  className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-[#fff8e7] hover:text-[#8a6400]"
                >
                  ترتيب مراحل التشطيب الداخلي
                </Link>

                <Link
                  to="/engineering-insights/construction-and-finishing-stages/construction-stage-inspection-checklist"
                  className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-[#fff8e7] hover:text-[#8a6400]"
                >
                  استلام مراحل البناء بالتفصيل
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
                <Ruler className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold">قبل أن تبدأ ماليًا</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                لا تجعل فهم المراحل منفصلًا عن فهم التكلفة. رتّب تصورك الفني ثم
                اربطه مباشرة بتقدير أولي واقعي.
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
            أسئلة شائعة حول مراحل بناء الفيلا
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                ما أول مرحلة حقيقية في بناء الفيلا؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                أول مرحلة حقيقية تبدأ بعد اكتمال الترتيب المسبق للمخططات والتجهيز
                هي تجهيز الموقع ثم الحفر، لأن هذه البداية هي التي تحدد انطلاقة
                المشروع على أسس صحيحة.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                هل مرحلة العظم أهم من التشطيب؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                كل مرحلة لها أهميتها، لكن العظم يمثل قاعدة المبنى واستقراره،
                بينما التشطيب يمثل الراحة والاستخدام والشكل النهائي. لا يمكن
                الاستغناء عن جودة أي منهما.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                كيف أقلل الأخطاء أثناء البناء؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                بتقسيم المشروع إلى مراحل واضحة، ومراجعة كل مرحلة قبل الانتقال
                لما بعدها، وعدم التسرع في اعتماد الدفعات أو تعديل القرارات بعد
                تنفيذ الأعمال الأساسية.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}