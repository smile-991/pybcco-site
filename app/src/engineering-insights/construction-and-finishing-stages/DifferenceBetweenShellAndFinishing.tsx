import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calculator,
  ClipboardCheck,
  Home,
  Layers3,
  Ruler,
  ShieldCheck,
} from "lucide-react";

const CALCULATOR_PATH = "/villa-finishing-price-riyadh";
const ENGINEERING_INSIGHTS_PATH = "/engineering-insights";
const CLUSTER_PATH = "/engineering-insights/construction-and-finishing-stages";
const COMPANY_PATH = "/construction-company-riyadh";
const FINISHING_SERVICE_PATH = "/villa-finishing-riyadh";

export default function DifferenceBetweenShellAndFinishing() {
  const title =
    "الفرق بين العظم والتشطيب في البناء: شرح واضح للمالك قبل بدء المشروع | بنيان الهرم للمقاولات";

  const description =
    "شرح عملي يوضح الفرق بين العظم والتشطيب في البناء، وما الذي يدخل ضمن كل مرحلة، وكيف يؤثر كل منهما على الجودة والتكلفة والمدة، مع توضيح العلاقة بين المرحلتين وأهم الأخطاء الشائعة في فهمهما.";

  const canonical =
    "https://pybcco.com/engineering-insights/construction-and-finishing-stages/difference-between-shell-and-finishing";

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
      'script[data-seo="difference-between-shell-and-finishing"]'
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
          name: "الفرق بين العظم والتشطيب في البناء",
          item: canonical,
        },
      ],
    };

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "الفرق بين العظم والتشطيب في البناء",
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
        "الفرق بين العظم والتشطيب, ما هو العظم, ما هو التشطيب, مراحل البناء, عظم وتشطيب, بناء فيلا, تشطيب فيلا",
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ما المقصود بالعظم في البناء؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "العظم هو المرحلة التي تشمل الهيكل الإنشائي الأساسي للمبنى مثل الأساسات والقواعد والأعمدة والجسور والأسقف والبلوك، قبل الدخول في تفاصيل التشطيب الداخلي والخارجي.",
          },
        },
        {
          "@type": "Question",
          name: "ما المقصود بالتشطيب؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "التشطيب هو المرحلة التي تجهز المبنى للاستخدام والسكن أو التشغيل، وتشمل التمديدات والعزل واللياسة والجبس والأرضيات والدهانات والتركيبات والأعمال النهائية المختلفة.",
          },
        },
        {
          "@type": "Question",
          name: "هل العظم أهم من التشطيب؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "المرحلتان مهمتان، لكن العظم يمثل القاعدة الإنشائية والدقة الأساسية للمبنى، بينما التشطيب يمثل الراحة والجودة البصرية والعملية في الاستخدام النهائي. نجاح المشروع يحتاج الاثنين معًا.",
          },
        },
      ],
    };

    [breadcrumbSchema, articleSchema, faqSchema].forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(
        "data-seo",
        "difference-between-shell-and-finishing"
      );
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const schemas = document.querySelectorAll(
        'script[data-seo="difference-between-shell-and-finishing"]'
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
              الفرق بين العظم والتشطيب في البناء
            </span>
          </nav>

          <div className="mb-5 inline-flex items-center rounded-full border border-[#ecdca9] bg-[#fff8e7] px-4 py-2 text-sm font-bold text-[#8a6400]">
            مقال تفصيلي ضمن قسم مراحل البناء والتشطيب
          </div>

          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            الفرق بين العظم والتشطيب في البناء: شرح واضح للمالك قبل بدء المشروع
          </h1>

          <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
            كثير من الناس يسمعون في بداية أي مشروع عبارة{" "}
            <strong>عظم وتشطيب</strong>، لكن ليس الجميع يفهم بدقة ما الذي يدخل
            ضمن كل مرحلة، وما الفرق الحقيقي بينهما، وكيف يؤثر كل منهما على
            المشروع من ناحية الجودة والمدة والتكلفة. أحيانًا يكون عند المالك
            تصور عام فقط: العظم هو الخرسانة، والتشطيب هو الشكل النهائي. هذا
            صحيح جزئيًا، لكنه غير كافٍ لاتخاذ قرارات جيدة أثناء التنفيذ.
          </p>

          <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
            فهم الفرق بين العظم والتشطيب مهم جدًا لأن كثيرًا من القرارات
            الخاطئة تأتي من الخلط بين المرحلتين، أو من الاعتقاد أن التشطيب يمكن
            أن يعوض ضعف العظم، أو أن العظم وحده يكفي لضمان جودة المشروع. في هذا
            المقال نشرح الفرق بين المرحلتين بطريقة عملية وواضحة، ونوضح ما الذي
            يدخل في كل واحدة، وكيف ترتبطان ببعض، ولماذا لا يمكن الحكم على
            المشروع من خلال إحداهما فقط.
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
                ما هو العظم في البناء؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                العظم هو المرحلة التي تُنشئ الهيكل الأساسي للمبنى. بمعنى آخر،
                هو الجزء الذي يعطي المشروع شكله الإنشائي العام ويكوّن عناصره
                الحاملة وحدوده الأساسية قبل أن يبدأ العمل على التفاصيل الجمالية
                والوظيفية الدقيقة. عندما نتحدث عن العظم، فنحن نتحدث عن الأرضية
                التي سيُبنى عليها كل شيء لاحقًا.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                يدخل ضمن العظم عادةً الحفر، والأساسات، والقواعد، والميدات،
                والأعمدة، والجسور، والأسقف، ثم البلوك أو القواطع الأساسية بحسب
                طبيعة المشروع وطريقة تقسيم المراحل. لذلك فالعظم ليس مجرد صبة
                خرسانية أو أعمدة فقط، بل هو منظومة متكاملة تحدد دقة المشروع
                واستقامته واستقراره منذ البداية.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                وقد شرحنا هذه الصورة بشكل أعمق في مقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/structural-shell-construction-stages"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  مراحل العظم في البناء من القواعد حتى السقف
                </Link>
                ، لأنه يوضح تسلسل هذه المرحلة ومكانة كل جزء منها داخل المشروع.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                ما هو التشطيب في البناء؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                التشطيب هو المرحلة التي تجهز المبنى للاستخدام الفعلي. بعد أن
                يكون الهيكل الأساسي قائمًا، تبدأ الأعمال التي تحول المكان من
                فراغ إنشائي خام إلى فيلا أو مبنى صالح للسكن أو التشغيل. هذه
                المرحلة تشمل عادة التمديدات الكهربائية والميكانيكية والسباكة،
                والعزل، واللياسة، والجبس، والأرضيات، والدهانات، والأبواب،
                والخزائن، والإضاءة، والأدوات الصحية، والتركيبات النهائية.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                إذا كان العظم هو جسم المبنى الأساسي، فإن التشطيب هو ما يمنحه
                الراحة، والوظيفة، والهوية البصرية، والتفاصيل التي يتعامل معها
                المستخدم يوميًا. التشطيب هو ما يجعل المشروع قابلًا للعيش أو
                الاستعمال فعلًا، لكنه لا يبدأ من فراغ، بل يعتمد بشكل مباشر على
                جودة ما قبله.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ولهذا من المفيد أيضًا الرجوع إلى مقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  ترتيب مراحل التشطيب الداخلي للفلل
                </Link>
                ، لأنه يشرح كيف تتسلسل أعمال التشطيب داخليًا بعد اكتمال الجاهزية
                المناسبة.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الفرق الأساسي بين العظم والتشطيب
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                الفرق الأساسي أن العظم يبني{" "}
                <strong>الهيكل والقاعدة والفراغات الأساسية</strong>، بينما
                التشطيب يبني <strong>الجاهزية للاستخدام والجودة النهائية</strong>.
                العظم يتعلق بما يحمل المبنى ويحدد شكله العام ودقته الأولى، أما
                التشطيب فيتعلق بما يعيشه المستخدم ويراه ويلامسه ويستخدمه يوميًا.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لكن هذا الفرق لا يعني أنهما مرحلتان منفصلتان تمامًا. بل على
                العكس، التشطيب يعتمد على العظم، والعظم ينعكس أثره مباشرة على
                التشطيب. فإذا كان العظم منضبطًا ومستقيمًا وواضحًا، دخل التشطيب
                بشكل أسهل وأنتج نتيجة أفضل. وإذا كان العظم ضعيفًا أو مليئًا
                بالتفاوتات، اضطر التشطيب إلى المعالجة والترقيع والتكيف مع أخطاء
                كان الأفضل منعها مبكرًا.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                هل العظم يحدد جودة المشروع أكثر من التشطيب؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                العظم يحدد جزءًا شديد الأهمية من جودة المشروع، لأنه يمثل
                الاستقرار والدقة الأساسية. لكن لا يمكن القول إن المشروع ممتاز
                فقط لأن العظم جيد. إذا كان التشطيب ضعيفًا أو غير منظم أو مليئًا
                بالمشاكل، فإن النتيجة النهائية لن تكون مريحة ولا عملية ولا
                مرضية. لذلك فالمقارنة هنا ليست منافسة، بل تكامل.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ما يمكن قوله بدقة هو أن أخطاء العظم غالبًا تكون أعمق أثرًا
                وأصعب تصحيحًا، بينما أخطاء التشطيب غالبًا تكون أقرب إلى العين
                وأوضح للمستخدم. ولهذا يحتاج المشروع إلى دقة في العظم، وانضباط
                في التشطيب، لا إلى الاكتفاء بإحداهما على حساب الأخرى.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                هل التشطيب يستطيع تعويض ضعف العظم؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                هذا من أكثر المفاهيم الخاطئة شيوعًا. بعض الناس يظن أن التشطيب
                الجيد يمكنه إخفاء مشاكل العظم أو تعويضها بالكامل. الواقع أن
                التشطيب قد يغطي بعض العيوب البسيطة بصريًا، لكنه لا يعالج أصل
                المشكلة إذا كانت جوهرية. الانحرافات، ضعف الدقة، مشاكل الفتحات،
                أو بعض التفاوتات في المناسيب قد تظهر لاحقًا في الأبواب،
                الأرضيات، الجبس، الدهانات، وحتى في الإحساس العام بجودة المكان.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لذلك، الاعتماد على التشطيب كوسيلة "لإصلاح" ضعف العظم غالبًا
                يؤدي إلى زيادة في المعالجات والتكلفة والوقت، وقد ينتهي إلى
                نتيجة أقل من المتوقع. التشطيب الجيد يحتاج قاعدة جيدة، لا مهمة
                إنقاذ مستمرة لما قبله.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                هل يمكن الحكم على المشروع من مرحلة العظم فقط؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                لا، لأنه حتى لو كان العظم ممتازًا، ما زال أمام المشروع مرحلة
                طويلة مليئة بالتفاصيل الدقيقة والاعتمادات والمواد والقرارات
                التنفيذية. كثير من المشاريع تبدأ بشكل ممتاز في العظم، ثم تتعثر
                في التشطيب بسبب سوء ترتيب البنود أو ضعف التمديدات أو التسرع في
                القرارات أو انخفاض مستوى الإشراف.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                وفي المقابل، لا يمكن أيضًا تجاهل العظم والتركيز فقط على ما يراه
                الناس في النهاية. لأن الحكم على المشروع من التشطيب فقط قد يخفي
                مشاكل أعمق. المشروع الناجح هو الذي تُقرأ جودته عبر مراحله كلها،
                لا عبر لقطة واحدة من النهاية أو من المنتصف.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                من ناحية الزمن: أيهما يأخذ وقتًا أكثر؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                يعتمد ذلك على حجم المشروع ومستوى التشطيب وطريقة الإدارة، لكن في
                كثير من الحالات يأخذ التشطيب وقتًا أطول أو يبدو أكثر تعقيدًا من
                العظم. السبب أن التشطيب يحتوي على عدد أكبر من البنود والتداخلات
                والقرارات واعتمادات المواد، بينما العظم رغم أهميته يكون غالبًا
                أوضح من ناحية التسلسل. وقد شرحنا هذا الجانب بتفصيل أكبر في مقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/how-long-does-it-take-to-build-villa-riyadh"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  كم تستغرق مدة بناء فيلا في الرياض؟
                </Link>
                .
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                هذا لا يقلل من أهمية العظم، بل يوضح فقط أن التشطيب ليس مرحلة
                بسيطة أو قصيرة كما يتصور بعض الملاك. بل هو مرحلة تحتاج تنظيمًا
                عاليًا حتى لا تتحول إلى مصدر تأخير أو هدر.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                من ناحية التكلفة: أين يكون التأثير الأكبر؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                التكلفة في العظم غالبًا ترتبط بالهيكل والمواد الأساسية والتنفيذ
                الإنشائي. أما في التشطيب، فالتكلفة تتأثر بشكل كبير بمستوى
                الخامات، والتفاصيل، وعدد البنود، ونوعية الاختيارات، وحجم
                المعالجات. لذلك من الشائع أن تكون مرحلة التشطيب أكثر مرونة
                وتفاوتًا من ناحية السعر مقارنة بالعظم، لأن قرارات المالك فيها
                تلعب دورًا كبيرًا.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ولهذا من المهم جدًا أن يربط المالك فهمه للفرق بين المرحلتين مع
                تصور مالي واضح. ويمكن فعل ذلك عبر{" "}
                <Link
                  to={CALCULATOR_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  حاسبة تكلفة التشطيب
                </Link>
                ، لأنها تساعد على تقريب الصورة المالية في مرحلة تكون فيها
                القرارات والبدائل كثيرة.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                متى ينتقل المشروع من العظم إلى التشطيب؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                الانتقال لا يتم فقط عندما ينتهي آخر جزء من الهيكل، بل عندما
                يصبح المشروع جاهزًا فعلًا للدخول في البنود الداخلية دون ارتباك أو
                إعادة عمل. لذلك فإن نهاية العظم لا تعني تلقائيًا أن الوقت حان
                للتشطيب، بل يجب التأكد من إغلاق الملاحظات الجوهرية، ووضوح
                الفتحات، واستقرار بعض القرارات الأساسية. وقد شرحنا ذلك بوضوح في
                مقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/when-to-start-finishing-after-structure"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  متى تبدأ أعمال التشطيب بعد انتهاء العظم؟
                </Link>
                .
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                هذا الانتقال حساس جدًا، لأن كثيرًا من الأخطاء تظهر عندما
                يُفترض أن التشطيب مجرد استمرار تلقائي لما قبله، بينما هو في
                الحقيقة مرحلة جديدة تحتاج جاهزية خاصة وترتيبًا مختلفًا.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                أين يقع الخطأ الأكثر شيوعًا في فهم المرحلتين؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                الخطأ الأكثر شيوعًا هو الاعتقاد أن العظم أهم لدرجة تجعل
                التشطيب مسألة ثانوية، أو العكس: أن التشطيب هو كل شيء لأن الناس
                تراه في النهاية. الحقيقة أن المشروع الجيد لا يُبنى بهذه
                الثنائية السطحية. العظم مهم لأنه الأساس، والتشطيب مهم لأنه
                التحويل الفعلي للمبنى إلى مكان صالح ومريح وعملي.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كما يقع الخطأ أيضًا عندما يُفصل الذهن بين المرحلتين بشكل مبالغ
                فيه. بينما الواقع أن كل واحدة تؤثر على الأخرى. العظم الرديء
                يربك التشطيب، والتشطيب غير المنظم يضيع قيمة العظم الجيد. لذلك
                التفكير الصحيح ليس: أيهما أهم؟ بل: كيف أجعل الاثنين يعملان
                بتكامل ومنطق؟
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                كيف يفيد هذا الفهم المالك عمليًا؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                عندما يفهم المالك الفرق بين العظم والتشطيب، يصبح أقدر على قراءة
                عروض الأسعار، وفهم نطاق العمل، ومتابعة المشروع، وتقدير أين هو
                الآن، وما الذي يجب أن يستعد له لاحقًا. كما يصبح أقدر على طرح
                الأسئلة الصحيحة: هل نحن ما زلنا في مرحلة الهيكل؟ هل ما نفعله الآن
                تأسيس أم تشطيب نهائي؟ هل هذه المرحلة تُغلق أم ما زالت تحتاج
                قرارات؟
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كذلك يساعد هذا الفهم على تقليل الارتباك عند ربط المشروع بالخدمة
                المناسبة، مثل{" "}
                <Link
                  to={FINISHING_SERVICE_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  خدمة تشطيب الفلل
                </Link>{" "}
                أو الرجوع إلى{" "}
                <Link
                  to={COMPANY_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  صفحة شركة المقاولات
                </Link>
                ، لأن وضوح المصطلحات يعني وضوحًا أفضل في القرار والتنفيذ.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الخلاصة
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                العظم هو المرحلة التي تبني الهيكل الأساسي للمبنى وتحدد دقته
                واستقراره وشكله الأولي، بينما التشطيب هو المرحلة التي تحول هذا
                الهيكل إلى مكان قابل للاستخدام عبر التمديدات والعزل واللياسة
                والأرضيات والدهانات والتركيبات النهائية. الفرق بينهما واضح من
                حيث الوظيفة، لكنه لا يعني الانفصال. لأن نجاح التشطيب يعتمد على
                جودة العظم، ونجاح المشروع كله يعتمد على تكامل المرحلتين.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لذلك، لا ينبغي أن ينظر المالك إلى العظم على أنه كل شيء، ولا إلى
                التشطيب على أنه مجرد تجميل. كلاهما جزء أساسي من المشروع، وكل
                مرحلة تحتاج وعيًا مختلفًا وطريقة متابعة مختلفة. وكلما كان هذا
                الفهم أوضح من البداية، كانت القرارات أفضل، والتكلفة أوضح،
                والتنفيذ أكثر هدوءًا وانضباطًا.
              </p>

              <div className="mt-10 rounded-[28px] border border-[#ecdca9] bg-[#fff8e7] p-6">
                <h2 className="text-2xl font-extrabold">
                  ابدأ بالخطوة العملية التالية
                </h2>
                <p className="mt-3 text-[16px] leading-8 text-zinc-700">
                  إذا اتضحت لك الآن الصورة بين العظم والتشطيب، فالخطوة التالية
                  المنطقية هي فهم جدول تنفيذ المشروع أو ربط مرحلة التشطيب بتقدير
                  مالي واضح عبر الحاسبة.
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
                <p>ما هو العظم</p>
                <p>ما هو التشطيب</p>
                <p>الفرق بين المرحلتين</p>
                <p>الزمن والتكلفة</p>
                <p>كيف يفيد هذا الفهم المالك</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-3 inline-flex rounded-full bg-[#fff8e7] p-3 text-[#8a6400]">
                <Layers3 className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold">روابط داخلية مهمة</h2>

              <div className="mt-4 space-y-3">
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/structural-shell-construction-stages"
                  className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-[#fff8e7] hover:text-[#8a6400]"
                >
                  مراحل العظم في البناء
                </Link>

                <Link
                  to="/engineering-insights/construction-and-finishing-stages/when-to-start-finishing-after-structure"
                  className="block rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-[#fff8e7] hover:text-[#8a6400]"
                >
                  متى تبدأ أعمال التشطيب بعد العظم؟
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
              <h2 className="text-lg font-extrabold">المرحلتان متكاملتان</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                العظم يعطي المشروع أساسه، والتشطيب يمنحه جاهزيته الفعلية. ضعف
                واحدة منهما ينعكس على النتيجة كلها.
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
            أسئلة شائعة حول الفرق بين العظم والتشطيب
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                هل يمكن تنفيذ العظم بدون تشطيب؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                يمكن أن يتوقف المشروع عند العظم كمرحلة تنفيذية، لكن المبنى لا
                يكون جاهزًا للسكن أو الاستخدام العملي الكامل قبل الدخول في مراحل
                التشطيب.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                لماذا يبدو التشطيب أغلى أحيانًا من المتوقع؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                لأن التشطيب يتأثر بمستوى الخامات والتفاصيل والاختيارات والمواد
                بشكل أكبر، كما أن عدد بنوده وتنوعها يرفع مساحة التفاوت في
                التكلفة.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                هل التشطيب الجيد يغني عن الدقة في العظم؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                لا، لأن التشطيب يعتمد على قاعدة منضبطة، وإذا كان العظم ضعيفًا أو
                غير دقيق فسيظهر أثر ذلك لاحقًا حتى مع وجود تشطيب جيد.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}