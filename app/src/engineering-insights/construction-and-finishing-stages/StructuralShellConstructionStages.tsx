import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calculator,
  Building2,
  ClipboardCheck,
  Hammer,
  Home,
  ShieldCheck,
} from "lucide-react";

const CALCULATOR_PATH = "/villa-finishing-price-riyadh";
const ENGINEERING_INSIGHTS_PATH = "/engineering-insights";
const CLUSTER_PATH = "/engineering-insights/construction-and-finishing-stages";
const COMPANY_PATH = "/construction-company-riyadh";
const FINISHING_SERVICE_PATH = "/villa-finishing-riyadh";

const SITE_URL = "https://pybcco.com";
const CANONICAL =
  "https://pybcco.com/engineering-insights/construction-and-finishing-stages/structural-shell-construction-stages";

const TITLE =
  "مراحل العظم في البناء من القواعد حتى السقف: الدليل العملي الكامل | بنيان الهرم للمقاولات";

const DESCRIPTION =
  "دليل عملي يشرح مراحل العظم في البناء من الحفر والقواعد والميدات والأعمدة والجسور حتى الأسقف والبلوك، مع توضيح أهمية كل مرحلة والأخطاء الشائعة التي تؤثر على جودة الهيكل الإنشائي وتسلسل المشروع.";

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${CANONICAL}#article`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": CANONICAL,
  },
  headline: TITLE,
  description: DESCRIPTION,
  inLanguage: "ar-SA",
  author: {
    "@type": "Organization",
    name: "بنيان الهرم للمقاولات",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "بنيان الهرم للمقاولات",
    url: SITE_URL,
  },
};

export default function StructuralShellConstructionStages() {

  return (
    <>
      <SeoHead
        title={TITLE}
        description={DESCRIPTION}
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        ogType="article"
        jsonLd={ARTICLE_SCHEMA}
      />
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
              مراحل العظم في البناء من القواعد حتى السقف
            </span>
          </nav>

          <div className="mb-5 inline-flex items-center rounded-full border border-[#ecdca9] bg-[#fff8e7] px-4 py-2 text-sm font-bold text-[#8a6400]">
            مقال تفصيلي ضمن قسم مراحل البناء والتشطيب
          </div>

          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            مراحل العظم في البناء من القواعد حتى السقف: الدليل العملي الكامل
          </h1>

          <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
            عندما يبدأ المالك مشروعه، يسمع كثيرًا كلمة{" "}
            <strong>العظم</strong>. لكن في الواقع، هذه الكلمة العامة تخفي داخلها
            سلسلة من المراحل الدقيقة التي تشكل الهيكل الحقيقي للمبنى. فالعظم ليس
            مجرد أعمدة وأسقف فقط، بل يبدأ من الحفر والأساسات، ثم ينتقل إلى
            القواعد والميدات، ثم الأعمدة والجسور والأسقف، ثم البلوك والقواطع
            الأساسية التي ترسم شكل الفراغات. وكل مرحلة من هذه المراحل تؤثر
            مباشرة على جودة المشروع كله لاحقًا.
          </p>

          <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
            لهذا السبب، فهم مراحل العظم ليس مهمًا فقط للمقاول أو المهندس، بل
            مهم أيضًا للمالك الذي يريد أن يعرف أين يقف مشروعه، وما الذي يجب أن
            يتأكد منه قبل الانتقال من مرحلة إلى أخرى، ولماذا بعض الأخطاء في
            العظم تكون مكلفة جدًا إذا تم اكتشافها متأخرًا. في هذا المقال نشرح
            تسلسل مرحلة العظم من البداية حتى اكتمال السقف والبلوك، بطريقة عملية
            وواضحة وبدون حشو.
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
                ما المقصود بالعظم فعلًا؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                المقصود بمرحلة العظم هو الجزء الأساسي الذي يُنشئ شكل المبنى
                ويحمل أحماله ويحدد هندسته العامة قبل الدخول في التشطيبات
                التفصيلية. هذه المرحلة تمثل القاعدة الإنشائية والدقة المعمارية
                الأولى معًا. لذلك لا يصح النظر إليها على أنها مجرد مرحلة سريعة
                نريد تجاوزها للوصول إلى التشطيب، بل هي المرحلة التي إذا أُنجزت
                بإتقان صار المشروع كله أكثر استقرارًا وسهولة لاحقًا.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                في كثير من المشاريع، يشعر المالك بالطمأنينة عندما يرى الهيكل
                يرتفع، لكن هذه الثقة يجب أن تكون مبنية على فهم، لا على المشهد
                فقط. لأن بعض الأخطاء في العظم لا تظهر مباشرة من النظرة السريعة،
                لكنها تترك أثرًا على الأبواب والفتحات والجدران والأسقف وأعمال
                التشطيب كلها فيما بعد. ولهذا السبب ترتبط مرحلة العظم ارتباطًا
                مباشرًا بما شرحناه أيضًا في مقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/villa-construction-stages-saudi-arabia"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  مراحل بناء الفيلا خطوة بخطوة
                </Link>
                ، لأن العظم هو قلب ذلك التسلسل.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                البداية الصحيحة: تجهيز الموقع وضبط المحاور
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                قبل أول صبة وقبل أول عمود، توجد خطوة تأسيسية لا يراها كثير من
                الناس بالقدر الذي تستحقه، وهي تجهيز الموقع وضبط المحاور
                والمناسيب. هذه الخطوة تبدو بسيطة في ظاهرها، لكنها في الحقيقة
                تحدد دقة المشروع كله. لأن أي خطأ في المحاور أو الحدود أو
                المناسيب قد ينتقل إلى القواعد ثم إلى الأعمدة ثم إلى كامل الهيكل.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لهذا فإن بداية العظم ليست الحفر فقط، بل الحفر بعد وضوح الاتجاهات
                والأبعاد والتموضع الصحيح للمبنى داخل الأرض. عندما يكون هذا الضبط
                دقيقًا، يصبح ما بعده أكثر أمانًا. أما إذا كان فيه تساهل أو
                ارتباك، فقد تُبنى المراحل التالية كلها على انحراف صغير يتحول إلى
                مشكلة أكبر بمرور الوقت.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الحفر: أول عمل ميداني لكن ليس مجرد إزالة تربة
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                الحفر هو أول ظهور حقيقي للمشروع على الأرض، لكنه ليس مجرد مرحلة
                ميكانيكية لإزالة التراب والوصول إلى عمق معين. بل هو خطوة مرتبطة
                مباشرة بنظام الأساسات المعتمد وبطبيعة الأرض وبالمناسيب المطلوبة
                للمشروع. في هذه المرحلة، تبدأ العلاقة بين الرسومات النظرية
                والواقع الميداني، وقد تظهر أحيانًا فروقات أو ظروف تستدعي
                انتباهًا إضافيًا.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ما يجعل الحفر مرحلة حساسة هو أنه يهيئ لما بعدها مباشرة. أي خطأ
                في العمق أو التموضع أو المناسيب لن يبقى معزولًا، بل سيؤثر على
                القواعد والأساسات وما بعدها. لذلك لا يجب النظر إلى الحفر على أنه
                جزء سريع يمكن تجاوزه بلا متابعة، بل هو جزء من تأسيس سلامة
                المشروع من أول يوم.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                القواعد والأساسات: القاعدة التي تحمل كل شيء فوقها
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بعد الحفر تبدأ مرحلة القواعد والأساسات، وهي من أهم مراحل العظم
                على الإطلاق. هنا يدخل المشروع إلى منطقة لا تحتمل المجاملة، لأن
                ما يُنفذ في هذه المرحلة سيبقى يحمل كل ما فوقه من أدوار وجدران
                وأسقف واستخدام يومي لسنوات طويلة. سواء كان النظام الإنشائي
                يعتمد على قواعد منفصلة أو غيرها، فإن جوهر الموضوع يبقى واحدًا:
                البداية هنا يجب أن تكون دقيقة ومطابقة لما هو معتمد.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                في هذه المرحلة، يصبح الانتباه للتفاصيل مهمًا جدًا، مثل ضبط
                الأبعاد والمناسيب وتجهيزات الصب والتسليح والشدات والمعالجة. وقد
                شرحنا في مقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/construction-stage-inspection-checklist"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  استلام مراحل البناء بالتفصيل
                </Link>{" "}
                لماذا يجب ألا تُعتمد هذه المرحلة إلا بعد استلام جدي، لأن الخطأ
                هنا ليس من نوع الأخطاء التي تُرمم بسهولة لاحقًا.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الميدات والربط الأفقي: المرحلة التي تمنح الهيكل اتزانه
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بعد القواعد تأتي الميدات أو عناصر الربط الأفقية التي تجمع النظام
                الإنشائي وتربط أجزاءه بطريقة تحقق الاستقرار المطلوب. هذه المرحلة
                قد لا تكون ملفتة بصريًا للمالك مثل الأعمدة والأسقف، لكنها مهمة
                جدًا من ناحية التسلسل الإنشائي والدقة التنفيذية. لأنها تمثل
                الانتقال من القاعدة الأرضية إلى بداية ارتفاع المبنى.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                وغالبًا ما تتطلب هذه المرحلة عناية في المناسيب والتموضع والدقة
                العامة، لأن أي خلل فيها سينعكس على الأعمدة والجدران التي ستقوم
                فوقها. وكلما كانت هذه المرحلة منضبطة، كان ما بعدها أكثر سلاسة.
                أما إذا كان فيها تهاون أو تفاوت، فقد يظهر أثرها لاحقًا في أعمال
                البلوك والفتحات وحتى التشطيب النهائي.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الأعمدة: العمود ليس عنصرًا رأسيًا فقط بل مرجع دقة كامل
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                عندما تبدأ الأعمدة بالظهور، يبدأ المشروع بأخذ شكله الفعلي في
                الموقع. وهذه المرحلة لها وزن بصري كبير عند المالك، لكنها أيضًا
                ذات أهمية عالية جدًا من ناحية الدقة. لأن الأعمدة ليست فقط عناصر
                تحمل الأحمال، بل هي أيضًا مرجع بصري وتنفيذي لما يليها من جسور
                وأسقف وبلوك وفتحات.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                إذا كانت الأعمدة غير منضبطة من حيث الاستقامة أو التموضع أو
                التوافق مع المحاور، فإن المشروع كله يبدأ بالانحراف تدريجيًا حتى
                لو بدا مقبولًا في اللحظة الأولى. من هنا تأتي أهمية المتابعة
                والاستلام وعدم الاكتفاء بفكرة أن العمود "واقف" وانتهى. ما يهم هو
                أن يكون واقفًا في مكانه الصحيح وبالشكل الصحيح.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الجسور: ربط العناصر وتهيئة المبنى للارتفاع الحقيقي
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بعد الأعمدة تأتي الجسور، وهي من العناصر التي تربط الهيكل ببعضه
                وتستعد لحمل الأسقف وما فوقها. هذه المرحلة مهمة لأنها تمثل جزءًا
                من الانتقال من الهيكل الأولي إلى النظام المتكامل للدور. وكلما
                كانت الجسور دقيقة في التموضع والمناسيب والربط، كان السقف وما
                فوقه أكثر استقرارًا ووضوحًا في التنفيذ.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كما أن الجسور تؤثر لاحقًا على الفراغات والمظهر العام وبعض
                الترتيبات الداخلية، لذلك لا ينبغي التعامل معها كأمر إنشائي بعيد
                عن المعمار والاستخدام، بل كمرحلة تؤثر على الاثنين معًا. ولهذا
                السبب تظهر أهمية التنسيق المبكر وعدم الفصل الذهني بين العظم
                والتشطيب، لأنهما مرتبطان أكثر مما يتصور كثير من الناس.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الأسقف: مرحلة مفصلية بين الهيكل والفراغ
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                مرحلة الأسقف أو البلاطات هي من أكثر مراحل العظم تأثيرًا على
                شكل المشروع وتقدمه. هنا يبدأ الدور بالتشكل الكامل، وتصبح
                الفراغات الداخلية أكثر وضوحًا. لكن أهمية السقف لا تتعلق فقط
                بإغلاق الدور، بل أيضًا بكونه نقطة تنسيق بين العناصر الإنشائية
                وبين ما سيأتي لاحقًا من خدمات وتمديدات وتشطيب.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                وفي هذه المرحلة، يجب أن يكون الانتباه عاليًا إلى مناسيب السقف،
                وجهوزية الفتحات، وتناسق التنفيذ مع المتطلبات التالية. لأن أي خطأ
                هنا لا يبقى في حدود العظم فقط، بل يؤثر لاحقًا على الأسقف
                الداخلية، التكييف، الإنارة، والارتفاعات الصافية داخل الفراغات.
                وهذا ما يجعل السقف مرحلة مفصلية فعلًا، لا مجرد صبة جديدة.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                التكرار بين الأدوار لا يعني أن المخاطر تقل
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                في المشاريع متعددة الأدوار، قد يشعر البعض أن تكرار الأعمدة
                والجسور والأسقف يجعل العملية أسهل أو روتينية. لكن في الحقيقة،
                تكرار المراحل لا يعني أن هامش الخطأ انتهى. أحيانًا الخطأ الصغير
                إذا تكرر من دور إلى آخر يتحول إلى مشكلة أوضح وأصعب في النهاية.
                لذلك يجب أن يبقى التركيز حاضرًا في كل دور كما لو أنه أول دور.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كما أن الانتقال بين الأدوار يحتاج إلى استلام كل مرحلة قبل
                الاستمرار، حتى لا تتراكم الملاحظات. لأن التراكم في العظم قد لا
                يبدو كارثيًا لحظيًا، لكنه يخلق آثارًا هندسية وبصرية وتشغيلية في
                كل ما بعده. ولهذا فإن الانضباط في كل دور أهم من الحماس لإنهاء
                العظم بسرعة فقط.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                البلوك والقواطع: هل هي ضمن العظم أم بعده؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                في الاستخدام العملي اليومي، كثير من الناس يعتبرون البلوك جزءًا
                من مرحلة العظم أو امتدادًا مباشرًا لها، لأنه هو الذي يحول الهيكل
                إلى فراغات مفهومة وجدران فعلية. ومن ناحية منطق التنفيذ، هذا
                صحيح إلى حد كبير، لأن البلوك يأتي بعد اكتمال الهيكل الأساسي
                ليحدد شكل الغرف والممرات والخدمات والفتحات.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                أهمية هذه المرحلة أنها تربط الإنشائي بالمعماري. هنا تبدأ
                المساحات الحقيقية في الظهور، وتبدأ العلاقة بين التصميم الورقي
                والاستخدام الفعلي. لذلك فإن البلوك ليس مجرد ملء فراغات، بل جزء
                من الدقة العامة للمشروع. أي خطأ فيه قد يؤثر لاحقًا على اللياسة،
                الأبواب، التمديدات، والأثاث. ولهذا يجب ألا يُتعامل معه بتساهل
                لأنه "ليس خرسانة".
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                لماذا مرحلة العظم تحدد سهولة التشطيب لاحقًا؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                لأن التشطيب الناجح لا يبدأ فعليًا من الدهان أو الأرضيات، بل يبدأ
                من عظم منضبط. إذا كانت الأعمدة والجدران والفتحات والمناسيب
                والأسقف واضحة ومستقيمة ومنفذة بشكل جيد، يصبح التشطيب أكثر
                سلاسة، وتقل المعالجات، ويصبح الوصول إلى نتيجة نظيفة أسهل بكثير.
                أما إذا كان العظم مليئًا بالانحرافات الصغيرة، فإن التشطيب يتحول
                إلى سلسلة حلول تصحيحية ومحاولات تغطية وتأقلم.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ولهذا من المهم جدًا فهم العلاقة بين العظم وبين{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  ترتيب مراحل التشطيب الداخلي
                </Link>
                ، لأن من يظن أن المرحلتين منفصلتان تمامًا يفوته جزء مهم من صورة
                المشروع. الدقة المبكرة توفر وقتًا ومالًا وجودة لاحقًا.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الأخطاء الشائعة في مرحلة العظم
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                من أكثر الأخطاء التي تظهر في مرحلة العظم: التسرع في بعض المراحل
                بدون مراجعة كافية، ضعف ضبط المحاور والمناسيب، التساهل في
                الاستقامة العامة للعناصر، عدم التنسيق الجيد مع الفتحات والخدمات،
                والانتقال من مرحلة إلى أخرى قبل إغلاق الملاحظات الأساسية. كما أن
                بعض المشاريع تتأثر بقرارات متأخرة تغير أماكن أو متطلبات كان يجب
                حسمها قبل التنفيذ.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                المشكلة في هذه الأخطاء أنها لا تبقى محصورة داخل مرحلة العظم،
                بل تمتد إلى ما بعدها. لذلك فإن استيعاب الأخطاء المحتملة مبكرًا
                يساعد على منعها، أو على الأقل على اكتشافها قبل أن تكبر. ولهذا
                يكون الاستلام في كل مرحلة جزءًا ضروريًا من إدارة العظم، لا مجرد
                وقفة شكلية بين دفعة وأخرى.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                كيف يتابع المالك مرحلة العظم بذكاء؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                المالك لا يحتاج أن يدخل في كل تفصيلة تنفيذية دقيقة، لكنه يحتاج
                أن يفكر بطريقة منظمة. يسأل: هل المرحلة الحالية اكتملت فعليًا؟ هل
                ما نُفذ الآن سيؤثر على ما بعده؟ هل تم استلامها؟ هل الانتقال
                للمرحلة التالية منطقي؟ بهذا التفكير، يصبح عنده تصور حقيقي عن
                المشروع، بدل الاكتفاء بسؤال عام مثل: كم صبة خلصت؟
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ومن الذكاء أيضًا ربط فهم العظم بفهم التكلفة والزمن. لأن كثيرًا
                من القرارات في هذه المرحلة تؤثر لاحقًا على المصاريف والمدة
                الإجمالية للمشروع. لذلك قد يكون من المفيد استخدام{" "}
                <Link
                  to={CALCULATOR_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  حاسبة تكلفة التشطيب
                </Link>{" "}
                مع متابعة مراحل التنفيذ، أو مراجعة{" "}
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
                لفهم الصورة الكاملة للمشروع.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الخلاصة
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                مراحل العظم في البناء تبدأ من ضبط الموقع والحفر، ثم القواعد
                والأساسات، ثم الميدات، ثم الأعمدة والجسور، ثم الأسقف، ثم البلوك
                والقواطع الأساسية. هذه المراحل ليست مجرد تسلسل إنشائي فقط، بل هي
                المراحل التي تصنع الهيكل الحقيقي للمشروع وتحدد مقدار سهولة أو
                صعوبة ما بعدها. وكلما كانت منضبطة، كان التشطيب أسهل، والجودة
                أعلى، والمفاجآت أقل.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لهذا السبب، لا يجب النظر إلى العظم على أنه مجرد محطة مؤقتة قبل
                الجماليات. بل هو الجزء الذي يعطي المبنى توازنه ودقته وهيبته
                الأساسية. ومن يفهم هذه المرحلة جيدًا، يتعامل مع مشروعه بوعي أكبر
                منذ البداية، ويقلل كثيرًا من المشاكل التي تظهر لاحقًا في الزمن
                والمال والجودة.
              </p>

              <div className="mt-10 rounded-[28px] border border-[#ecdca9] bg-[#fff8e7] p-6">
                <h2 className="text-2xl font-extrabold">
                  ابدأ بالخطوة العملية التالية
                </h2>
                <p className="mt-3 text-[16px] leading-8 text-zinc-700">
                  إذا أصبحت صورة العظم أوضح لديك الآن، فالخطوة التالية هي فهم
                  أخطاء ترتيب التشطيب أو ربط المشروع بتقدير مالي أوضح عبر الحاسبة
                  والمقالات المرتبطة ضمن نفس القسم.
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
                <p>الحفر والأساسات</p>
                <p>الميدات والأعمدة</p>
                <p>الجسور والأسقف</p>
                <p>البلوك والقواطع</p>
                <p>أخطاء العظم الشائعة</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-100 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-3 inline-flex rounded-full bg-[#fff8e7] p-3 text-[#8a6400]">
                <Building2 className="h-5 w-5" />
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
                <Hammer className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold">العظم هو أساس كل ما بعده</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                كل دقة مبكرة في العظم توفر معالجة لاحقة في التشطيب، وتقلل الوقت
                والهدر والمفاجآت غير المرغوبة.
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
            أسئلة شائعة حول مراحل العظم في البناء
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                هل البلوك يعتبر من مرحلة العظم؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                في الاستخدام العملي كثيرًا ما يُعتبر البلوك جزءًا من العظم أو
                امتدادًا مباشرًا له، لأنه يرسم الفراغات الأساسية بعد اكتمال
                الهيكل الإنشائي.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                لماذا يصعب تصحيح بعض أخطاء العظم لاحقًا؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                لأن العظم يمثل القاعدة الإنشائية والدقة الأساسية للمبنى، وأي
                انحراف أو ضعف فيه قد ينعكس على مراحل متعددة ويتطلب معالجات أكبر
                أو حلولًا تعويضية لاحقًا.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                هل إنهاء العظم بسرعة يعني أن المشروع يسير ممتازًا؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                ليس دائمًا، لأن المهم ليس السرعة وحدها بل الدقة والاستلام وضبط
                الانتقال بين المراحل. السرعة بدون انضباط قد تُنتج مشاكل تظهر
                بقوة أثناء التشطيب.
              </p>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}