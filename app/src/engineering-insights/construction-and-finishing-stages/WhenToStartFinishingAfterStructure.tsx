import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calculator,
  ClipboardCheck,
  Hammer,
  Home,
  Layers3,
  ShieldCheck,
} from "lucide-react";

const CALCULATOR_PATH = "/villa-finishing-price-riyadh";
const ENGINEERING_INSIGHTS_PATH = "/engineering-insights";
const CLUSTER_PATH = "/engineering-insights/construction-and-finishing-stages";
const COMPANY_PATH = "/construction-company-riyadh";
const FINISHING_SERVICE_PATH = "/villa-finishing-riyadh";

const SITE_URL = "https://pybcco.com";
const CANONICAL =
  "https://pybcco.com/engineering-insights/construction-and-finishing-stages/when-to-start-finishing-after-structure";

const TITLE =
  "متى تبدأ أعمال التشطيب بعد انتهاء العظم؟ التوقيت الصحيح قبل الدخول في البنود الداخلية | بنيان الهرم للمقاولات";

const DESCRIPTION =
  "دليل عملي يشرح متى تبدأ أعمال التشطيب بعد انتهاء العظم، وما الشروط التي يجب التأكد منها قبل الدخول في البنود الداخلية، مع توضيح الأخطاء الشائعة التي تحدث عند الاستعجال في التشطيب قبل الجاهزية الفعلية للمشروع.";

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

export default function WhenToStartFinishingAfterStructure() {

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
              متى تبدأ أعمال التشطيب بعد انتهاء العظم؟
            </span>
          </nav>

          <div className="mb-5 inline-flex items-center rounded-full border border-[#ecdca9] bg-[#fff8e7] px-4 py-2 text-sm font-bold text-[#8a6400]">
            مقال تفصيلي ضمن قسم مراحل البناء والتشطيب
          </div>

          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            متى تبدأ أعمال التشطيب بعد انتهاء العظم؟ التوقيت الصحيح قبل الدخول
            في البنود الداخلية
          </h1>

          <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
            من أكثر الأسئلة التي تتكرر في مشاريع الفلل والمباني السكنية:{" "}
            <strong>متى يبدأ التشطيب بعد انتهاء العظم؟</strong> والسؤال يبدو
            بسيطًا، لكن الجواب العملي ليس مجرد: بعد آخر صبة مباشرة. لأن الانتقال
            من العظم إلى التشطيب ليس زرًا يتم تشغيله، بل هو نقطة تحول حساسة جدًا
            في المشروع. وإذا تم الدخول في التشطيب قبل الجاهزية الحقيقية، تبدأ
            المشاكل التي تظهر لاحقًا على شكل تكسير، وتأخير، وتعارض بين البنود،
            وضعف في النتيجة النهائية.
          </p>

          <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
            لهذا السبب، التوقيت الصحيح لبداية التشطيب لا يُقاس فقط بانتهاء
            الخرسانة أو اكتمال الهيكل، بل بمدى اكتمال مجموعة من الشروط العملية
            التي تجعل البنود الداخلية تدخل بطريقة منطقية وآمنة. في هذا المقال
            نشرح متى تكون الفيلا أو المشروع جاهزًا فعلًا للتشطيب، وما الذي يجب
            مراجعته قبل هذه النقلة، وما الأخطاء التي يقع فيها كثير من الملاك
            والمقاولين عندما يستعجلون الانتقال من العظم إلى التشطيب.
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
                انتهاء العظم لا يعني تلقائيًا أن المشروع جاهز للتشطيب
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                هذه أول نقطة يجب تثبيتها بوضوح. كثير من الناس يتعامل مع العظم
                والتشطيب على أنهما مرحلتان متتاليتان مباشرة بلا منطقة انتقال.
                ينتهي العظم، إذًا ندخل التشطيب. لكن في الواقع، هناك فرق كبير بين
                <strong> انتهاء العظم شكليًا </strong> وبين{" "}
                <strong> جاهزية المشروع فعليًا للتشطيب </strong>. قد يكون الهيكل
                مكتملًا، لكن ما زالت هناك ملاحظات في البلوك، أو فتحات غير محسومة،
                أو مراجعات لم تُقفل، أو قرارات مهمة في التمديدات لم تتضح بعد.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                إذا دخلت أعمال التشطيب في هذه المرحلة غير الناضجة، تبدأ البنود
                تبني فوق أرضية غير مستقرة. وقد يبدو المشروع سريعًا في البداية،
                لكنه يدفع لاحقًا ثمن هذا الاستعجال. لذلك فالسؤال الصحيح ليس:
                هل انتهى العظم؟ بل: هل المشروع صار جاهزًا للانتقال المنظم إلى
                التشطيب؟
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                ما المقصود بجاهزية المشروع للتشطيب؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                الجاهزية تعني أن المشروع وصل إلى نقطة يمكن فيها إدخال بنود
                التشطيب من غير أن تتعرض لاحقًا إلى إعادة عمل أو تداخلات مربكة.
                وهذا يتطلب أن تكون العناصر الأساسية واضحة ومستقرة: الفراغات،
                الفتحات، الجدران، المواقع التي ستخدمها التمديدات، والملاحظات
                الجوهرية في العظم والبلوك. كما يتطلب أيضًا أن تكون القرارات
                المرتبطة ببعض البنود الحساسة بدأت تتحدد، لا أن تدخل فرق التشطيب
                والمشروع ما زال في مرحلة التجربة والتردد.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                بكلمات أبسط: المشروع يكون جاهزًا للتشطيب عندما يصبح ما سيبنى
                عليه التشطيب واضحًا بما يكفي، وما سيؤثر عليه التشطيب محسومًا
                بما يكفي. الجاهزية ليست تاريخًا في الجدول، بل حالة تنفيذية
                منضبطة تسمح ببدء الأعمال الداخلية بالطريقة الصحيحة.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                أول شرط: إغلاق الملاحظات الجوهرية في العظم والبلوك
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                لا يصح الدخول في التشطيب بينما ما زالت هناك ملاحظات أساسية في
                العظم أو البلوك. لأن التشطيب بطبيعته يغطي، ويخفي، ويبني فوق ما
                قبله. فإذا كانت هناك انحرافات مهمة، أو مشاكل في الفتحات، أو
                أمور تؤثر على الاستقامة أو الأبعاد أو الاستخدام، فإن تجاهلها في
                هذه المرحلة سيجعل معالجتها لاحقًا أصعب وأغلى. وهذا ما يجعل
                مرحلة الاستلام بين العظم والتشطيب مهمة جدًا.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                وهنا يصبح الرجوع إلى مقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/construction-stage-inspection-checklist"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  استلام مراحل البناء بالتفصيل قبل اعتماد الدفعات
                </Link>{" "}
                مفيدًا جدًا، لأن الانتقال إلى التشطيب يجب أن يكون مبنيًا على
                استلام واضح، لا على انطباع عام بأن الهيكل انتهى. ما لم يُغلق
                الآن، قد يُدفن لاحقًا تحت اللياسة أو الجبس أو الأرضيات أو
                التركيبات.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                ثاني شرط: أن تكون الفراغات والفتحات واضحة ومستقرة
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                من أهم ما يجب التأكد منه قبل بدء التشطيب أن تكون الغرف والممرات
                والحمامات والمطابخ والفتحات الرئيسية قد استقرت من حيث المقاسات
                والمواقع. لأن التشطيب يعتمد بشكل مباشر على هذه العناصر. مواقع
                الأبواب، النوافذ، ارتفاعات بعض الفتحات، أماكن الخدمات، واتجاهات
                الاستخدام، كلها أمور يجب أن تكون واضحة قبل أن تبدأ الأعمال
                الداخلية المنظمة.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                إذا بدأت بالتشطيب بينما ما زالت بعض هذه العناصر قابلة للتعديل أو
                غير محسومة بالكامل، فإنك غالبًا ستدفع لاحقًا ثمن ذلك على شكل
                إعادة توزيع، أو نقل نقاط، أو تعديل بنود، أو معالجة شكلية لا
                تعطي أفضل نتيجة. لهذا السبب، وضوح الفراغات ليس موضوعًا معماريًا
                فقط، بل شرط تشغيلي لدخول التشطيب.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                ثالث شرط: وجود تصور واضح للتمديدات قبل الإغلاق
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                بداية التشطيب لا تعني القفز مباشرة إلى البنود الجمالية. بل
                عادةً تبدأ داخليًا بمرحلة تأسيسية مرتبطة بالتمديدات والخدمات. من
                هنا، يجب أن تكون لديك صورة واضحة نسبيًا عن الكهرباء والسباكة
                والتكييف والاتصالات وما شابه، حتى تدخل هذه الأعمال في وقتها
                الصحيح. لأن أكبر خطأ هنا هو أن يبدأ المشروع في إغلاق الجدران أو
                الأسقف ثم يكتشف أن بعض النقاط أو المسارات لم تُحسم بعد.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ليس المطلوب أن تكون كل قطعة مختارة، لكن المطلوب أن تكون متطلبات
                الاستخدام ومسارات الخدمات واضحة. وهذا يرتبط مباشرة بمقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  ترتيب مراحل التشطيب الداخلي للفلل
                </Link>{" "}
                لأن التشطيب يبدأ عمليًا من قرارات تأسيسية غير ظاهرة، وليس من
                اللون أو الكسوة أو الأرضية فقط.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                رابع شرط: ألا تدخل البنود النهائية قبل مرحلة التأسيس
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                عندما يسأل البعض: متى نبدأ التشطيب؟ يكون المقصود في ذهنهم غالبًا
                الأرضيات أو الجبس أو الدهانات أو الشكل النهائي. لكن عمليًا،
                بداية التشطيب الصحيحة لا تكون بهذه البنود، بل بما يسبقها من
                أعمال تأسيسية وتحضيرية. لذلك من المهم جدًا التفريق بين{" "}
                <strong>بدء التشطيب</strong> و<strong>بدء التشطيب النهائي</strong>.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                الخطأ الشائع أن يشعر المالك بأن الوقت حان ليرى نتيجة بصرية، فيتم
                تقديم بعض البنود النهائية قبل اكتمال ما تحتها. وهذا ما شرحناه
                بالتفصيل في مقال{" "}
                <Link
                  to="/engineering-insights/construction-and-finishing-stages/common-finishing-sequence-mistakes"
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  أخطاء ترتيب أعمال التشطيب التي تسبب مشاكل لاحقًا
                </Link>
                . فالتوقيت الصحيح يعني أن تدخل البنود بالترتيب، لا أن تدخل كل
                البنود تحت عنوان واحد اسمه التشطيب.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                لماذا الاستعجال في التشطيب بعد العظم خطأ شائع؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                لأن نهاية العظم تعطي شعورًا نفسيًا بأن المشروع تجاوز الجزء
                الأصعب، وأن الوقت حان "للنتيجة". هنا يبدأ الضغط على المشروع كي
                يبدو متقدمًا بسرعة، فيتم إدخال بعض فرق التشطيب قبل أن تكون
                الأرضية التنفيذية جاهزة. وهذا يحصل كثيرًا عندما يكون التركيز على
                المشهد أكثر من المنطق، أو عندما يُراد اختصار الجدول بطريقة غير
                مدروسة.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                لكن ما يبدو اختصارًا في البداية قد يتحول لاحقًا إلى تأخير أكبر.
                لأن الفرق ستعود لتعديل، أو ستنتظر قرارات، أو ستعمل فوق مرحلة
                غير مستقرة. لذلك فإن الاستعجال هنا لا يختصر دائمًا، بل كثيرًا ما
                يربك المشروع. التوقيت الصحيح أكثر قيمة من البداية المبكرة إذا
                كانت هذه البداية غير ناضجة.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                كيف تعرف عمليًا أن الوقت مناسب للانتقال؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                اسأل هذه الأسئلة الخمسة قبل أن تعتبر المشروع دخل في التشطيب:
                هل العظم والبلوك مستلمان بشكل مقبول؟ هل الفتحات والمقاسات
                الرئيسية واضحة؟ هل الملاحظات الجوهرية أُغلقت؟ هل خطة التمديدات
                الأساسية جاهزة؟ وهل الدخول الآن سيمنع الحاجة إلى إعادة فتح أو
                تكسير في المدى القريب؟ إذا كانت الإجابات مطمئنة، فأنت غالبًا في
                توقيت مناسب لبدء المرحلة التالية.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                أما إذا كانت بعض هذه النقاط ما زالت معلقة، فالأفضل أن تعالجها
                أولًا. لأن أي يوم إضافي قبل بدء التشطيب في الوقت الصحيح، قد
                يكون أفضل من أسبوع أو شهر من المعالجة اللاحقة بسبب بداية
                متسرعة. المشروع لا يُقاس فقط بسرعة الدخول في المرحلة، بل بسلامة
                استمراره داخلها.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                هل كل أجزاء المشروع تبدأ التشطيب في نفس اللحظة؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                ليس بالضرورة. في بعض المشاريع، قد تكون هناك مرونة في التدرج بين
                المناطق أو الأدوار أو الجبهات، بشرط أن يكون ذلك منظمًا ومبنيًا
                على جاهزية فعلية، لا على ارتباك. فبعض الأجزاء قد تصبح جاهزة قبل
                أجزاء أخرى، لكن هذا لا يعني أن يفتح المشروع عدة اتجاهات بلا
                تنسيق. الفكرة ليست أن يبدأ كل شيء مرة واحدة، بل أن يبدأ كل جزء
                عندما يكون جاهزًا فعلًا.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                هنا يظهر الفرق بين التدرج الذكي وبين الفوضى. التدرج الذكي يعني
                أن الانتقال محسوب، وأن كل منطقة دخلت التشطيب بعد اكتمال ما
                تحتاجه. أما الفوضى فتعني أن البنود تختلط لمجرد إظهار حركة داخل
                الموقع، من غير أن يكون هناك أساس منطقي لهذا التداخل.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                ما علاقة هذا التوقيت بالميزانية؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                العلاقة مباشرة جدًا. كل مرة يدخل فيها التشطيب قبل أوانه، يرتفع
                احتمال إعادة العمل أو تعديل بعض المواد أو تأخير بعض البنود أو
                هدر جزء من التنفيذ. وهذا كله ينعكس ماليًا حتى لو لم يظهر كرقم
                واضح في نفس اللحظة. لذلك فإن التوقيت الصحيح لبداية التشطيب ليس
                قرارًا فنيًا فقط، بل قرار مالي أيضًا.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ومن هنا تأتي أهمية ربط هذا الفهم مع أدوات تقدير الكلفة مثل{" "}
                <Link
                  to={CALCULATOR_PATH}
                  className="font-bold text-[#8a6400] underline decoration-[#e0c16f] underline-offset-4"
                >
                  حاسبة تكلفة التشطيب
                </Link>
                . لأن من يفهم متى يبدأ التشطيب وماذا يسبقه، يكون أقدر على قراءة
                التكلفة بشكل واقعي، لا على شكل رقم منفصل عن التسلسل التنفيذي.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                كيف يتعامل المالك بذكاء في هذه المرحلة الانتقالية؟
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                أفضل شيء يفعله المالك هنا هو أن لا يستعجل فقط لأنه متحمس لرؤية
                الشكل النهائي. بل يسأل نفسه: هل لو بدأت الآن سأرتاح لاحقًا أم
                سأرجع للتعديل؟ هل الفتحات والخدمات والغرف مستقرة؟ هل يوجد شيء
                أساسي ما زال يمكن أن يتغير؟ هل تم استلام المرحلة السابقة فعلًا؟
                هذا النوع من الأسئلة يحمي المشروع كثيرًا من القرارات الانفعالية.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                ومن المهم أيضًا أن يبقي الصورة الكاملة للخدمة واضحة أمامه عبر{" "}
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
                </Link>
                ، لأن فهم نطاق العمل يساعد كثيرًا على اتخاذ قرار التوقيت
                المناسب للدخول في التشطيب.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">
                الخلاصة
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-zinc-700">
                أعمال التشطيب لا تبدأ تلقائيًا بمجرد انتهاء العظم، بل تبدأ عندما
                يصبح المشروع جاهزًا فعليًا للانتقال: الملاحظات الجوهرية في
                العظم والبلوك مغلقة، الفراغات والفتحات واضحة، خطة التمديدات
                الأساسية حاضرة، والقرارات المؤثرة على البنود التالية أصبحت
                مستقرة بما يكفي. هذه هي الجاهزية الحقيقية التي تحمي المشروع من
                الاستعجال المكلف.
              </p>

              <p className="mt-4 text-[17px] leading-8 text-zinc-700">
                كلما فهمت أن بداية التشطيب هي بداية مرحلة دقيقة وليست مجرد
                استمرار آلي لما قبلها، أصبحت قراراتك أفضل، ومشروعك أكثر هدوءًا،
                وهدر الوقت والمال أقل. التوقيت الصحيح هنا لا يؤخر المشروع، بل
                يحميه من تأخير أكبر لاحقًا.
              </p>

              <div className="mt-10 rounded-[28px] border border-[#ecdca9] bg-[#fff8e7] p-6">
                <h2 className="text-2xl font-extrabold">
                  ابدأ بالخطوة العملية التالية
                </h2>
                <p className="mt-3 text-[16px] leading-8 text-zinc-700">
                  إذا اتضحت لك نقطة الانتقال من العظم إلى التشطيب، فالخطوة
                  التالية المنطقية هي فهم الفرق بين العظم والتشطيب أو ربط هذه
                  المرحلة بتقدير مالي أولي عبر الحاسبة.
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
                <p>مفهوم الجاهزية للتشطيب</p>
                <p>إغلاق ملاحظات العظم</p>
                <p>وضوح الفتحات والخدمات</p>
                <p>متى تبدأ البنود الداخلية</p>
                <p>أخطاء الاستعجال الشائعة</p>
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
                <Hammer className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold">التوقيت الصحيح يوفر كثيرًا</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                يوم إضافي في التحضير الصحيح قد يكون أفضل من أسابيع من إعادة
                العمل بعد بداية متسرعة.
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
            أسئلة شائعة حول بداية التشطيب بعد العظم
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                هل يمكن أن أبدأ بعض بنود التشطيب قبل اكتمال كل شيء؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                نعم أحيانًا ضمن تدرج منظم ومدروس، لكن بشرط أن تكون المنطقة أو
                المرحلة التي ستبدأ فيها جاهزة فعلًا، وألا يؤدي ذلك إلى تعارض أو
                إعادة عمل لاحقًا.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                ما أول شيء يجب التأكد منه قبل دخول التشطيب؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                أول شيء هو أن الملاحظات الجوهرية في العظم والبلوك أُغلقت، وأن
                الفراغات والفتحات والخدمات الأساسية أصبحت واضحة بما يكفي للبدء
                المنظم.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-5">
              <h3 className="text-lg font-extrabold">
                هل الاستعجال هنا يختصر مدة المشروع؟
              </h3>
              <p className="mt-2 text-[16px] leading-8 text-zinc-700">
                ليس دائمًا، بل كثيرًا ما يؤدي إلى إعادة عمل أو تداخلات أو انتظار
                قرارات لاحقة، وبالتالي يسبب تأخيرًا أكبر بدل أن يختصر الزمن.
              </p>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}