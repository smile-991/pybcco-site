import { useEffect } from "react";
import { Link } from "react-router-dom";

function setMeta(
  name: string,
  content: string,
  attr: "name" | "property" = "name"
) {
  let element = document.head.querySelector(
    `meta[${attr}="${name}"]`
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

export default function FinalHandoverMistakesChecklist() {
  useEffect(() => {
    const title =
      "أخطاء الاستلام النهائي بعد التشطيب: Checklist عملي لاكتشاف العيوب قبل التسليم | بنيان الهرم للمقاولات";

    const description =
      "مقال عملي وعميق يشرح أخطاء الاستلام النهائي بعد التشطيب في الفلل والمشاريع السكنية بالرياض، مع checklist واضح يساعد على اكتشاف العيوب قبل التسليم النهائي وتجنب الدفعة الأخيرة قبل إغلاق الملاحظات المهمة.";

    const canonical =
      "https://pybcco.com/engineering-insights/common-mistakes/final-handover-mistakes-checklist";

    document.title = title;

    setMeta("description", description);
    setMeta(
      "keywords",
      "أخطاء الاستلام النهائي, استلام التشطيب, فحص التشطيب قبل التسليم, checklist الاستلام النهائي, عيوب التشطيب, استلام الفيلا بعد التشطيب, فحص المشروع قبل التسليم"
    );
    setMeta("robots", "index, follow, max-image-preview:large");
    setCanonical(canonical);

    setMeta("og:type", "article", "property");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:image", "https://pybcco.com/og-image.jpg", "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", "https://pybcco.com/og-image.jpg");

    const oldSchemas = document.querySelectorAll(
      'script[data-final-handover-mistakes-schema="true"]'
    );
    oldSchemas.forEach((script) => script.remove());

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "أخطاء الاستلام النهائي بعد التشطيب: Checklist عملي لاكتشاف العيوب قبل التسليم",
      description,
      inLanguage: "ar",
      mainEntityOfPage: canonical,
      author: {
        "@type": "Organization",
        name: "بنيان الهرم للمقاولات",
      },
      publisher: {
        "@type": "Organization",
        name: "بنيان الهرم للمقاولات",
        logo: {
          "@type": "ImageObject",
          url: "https://pybcco.com/logo.png",
        },
      },
      image: "https://pybcco.com/og-image.jpg",
      articleSection: "الأخطاء الشائعة",
      keywords: [
        "الاستلام النهائي",
        "فحص التشطيب",
        "checklist التشطيب",
        "عيوب الاستلام",
        "تسليم الفيلا",
      ],
    };

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
          name: "الأخطاء الشائعة",
          item: "https://pybcco.com/engineering-insights/common-mistakes",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "أخطاء الاستلام النهائي",
          item: canonical,
        },
      ],
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ما أكبر خطأ في الاستلام النهائي بعد التشطيب؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "أكبر خطأ هو التعامل مع الاستلام النهائي كإجراء شكلي أو سريع من دون فحص تفصيلي منظم، ثم تسديد الدفعة الأخيرة قبل إغلاق الملاحظات الجوهرية والتأكد من تشغيل البنود الحساسة فعليًا.",
          },
        },
        {
          "@type": "Question",
          name: "هل يكفي أن يكون شكل التشطيب جميلًا للاستلام؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "لا يكفي. الاستلام النهائي يجب أن يشمل الشكل والجودة والتشغيل والمطابقة ووظائف الأبواب والأدوات الصحية والكهرباء والميول والعزل والدهانات واللمسات النهائية، وليس المظهر فقط.",
          },
        },
        {
          "@type": "Question",
          name: "متى أدفع الدفعة الأخيرة للمقاول؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "بعد الاستلام المنظم، وتوثيق الملاحظات، وإغلاق البنود الجوهرية، والتأكد من تشغيل العناصر الأساسية، ووضوح أي ملاحظات متبقية وآلية معالجتها ضمن اتفاق واضح.",
          },
        },
      ],
    };

    [articleSchema, breadcrumbSchema, faqSchema].forEach((schemaObj) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-final-handover-mistakes-schema", "true");
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      const schemas = document.querySelectorAll(
        'script[data-final-handover-mistakes-schema="true"]'
      );
      schemas.forEach((script) => script.remove());
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1f1f1f]">
      <section className="border-b border-black/5 bg-gradient-to-b from-[#111111] via-[#181818] to-[#222222]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4">
            <Link
              to="/engineering-insights/common-mistakes"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/85 transition hover:bg-white/10"
            >
              العودة إلى قسم الأخطاء الشائعة
            </Link>
          </div>

          <div className="inline-flex rounded-full border border-[#d4a017]/30 bg-[#d4a017]/10 px-4 py-2 text-sm font-bold text-[#f3d77a]">
            مقال 10 من قسم الأخطاء الشائعة
          </div>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            أخطاء الاستلام النهائي بعد التشطيب: Checklist عملي لاكتشاف العيوب
            قبل التسليم
          </h1>

          <p className="mt-6 text-base leading-8 text-white/80 sm:text-lg">
            الاستلام النهائي هو اللحظة التي يظن فيها كثير من أصحاب المشاريع أن
            كل شيء انتهى تقريبًا، وأن الدور المتبقي مجرد جولة أخيرة ثم استلام
            المفاتيح وإنهاء الدفعات. لكن الحقيقة أن هذه المرحلة من أخطر مراحل
            المشروع كله، لأن أي ملاحظة تمر هنا من دون انتباه قد تنتقل معك إلى
            مرحلة السكن أو التشغيل، وعندها تصبح المعالجة أبطأ وأكثر إزعاجًا،
            وأحيانًا أضعف بكثير مما لو تم اكتشافها قبل التسليم النهائي.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/villa-finishing-price-riyadh"
              className="rounded-2xl bg-[#d4a017] px-5 py-3 text-sm font-extrabold text-[#111111] transition hover:bg-[#c59600]"
            >
              احسب تكلفة التشطيب
            </Link>
            <Link
              to="/engineering-insights/common-mistakes/mistakes-finishing-contract"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              أخطاء عقد التشطيب
            </Link>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.05)] sm:p-8 lg:p-10">
          <div className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-headings:text-[#111111] prose-p:text-[#4d4d4d] prose-p:leading-8 prose-li:text-[#4d4d4d] prose-li:leading-8">
            <p>
              كثير من مشاكل ما بعد التشطيب لا تبدأ بعد السكن فعلًا، بل تبدأ في
              يوم الاستلام النهائي عندما يمر المالك على المشروع بعين عامة، أو
              تحت ضغط الرغبة في الانتهاء، أو بسبب شعور طبيعي بالارتياح بعد أشهر
              من المتابعة والتعب. في هذه اللحظة بالذات يصبح الإنسان أكثر قابلية
              لتجاوز التفاصيل الصغيرة، مع أن بعض هذه “التفاصيل” قد يكون هو ما
              يحدد لاحقًا جودة التجربة داخل المشروع كله.
            </p>

            <p>
              الاستلام النهائي ليس جولة ذوقية فقط، وليس لحظة للتأكد أن كل شيء
              يبدو جميلًا في الصور. هو مرحلة فحص شاملة تجمع بين المظهر، والجودة،
              والتشغيل، والمطابقة، والإنهاء، وإغلاق الملاحظات، والتأكد من أن
              البنود التي تم تنفيذها تعمل فعلًا كما يجب. وإذا تم اختزال هذه
              المرحلة في نظرة عامة أو كلام مطمئن من المنفذ، فإنك قد تستلم
              المشروع شكليًا قبل أن تستلمه فعليًا.
            </p>

            <p>
              لهذا فإن أفضل طريقة للتعامل مع الاستلام النهائي هي أن تعتبره
              مرحلة مستقلة تحتاج تركيزًا وتنظيمًا، لا مجرد نهاية طبيعية لكل ما
              سبقها. وفي هذا المقال سنراجع أهم أخطاء الاستلام النهائي، ثم نضع
              checklist عمليًا يساعدك على المرور على المشروع بطريقة أدق قبل
              التسليم وإغلاق الدفعة الأخيرة.
            </p>

            <h2>لماذا الاستلام النهائي مرحلة حساسة جدًا؟</h2>

            <p>
              لأن هذه آخر فرصة مريحة نسبيًا لاكتشاف الملاحظات قبل انتقال
              المشروع إلى وضع مختلف. قبل الاستلام، ما زالت المسؤوليات أوضح،
              والفرق قريبة، والمقاول ما زال داخل دائرة الإنهاء، والدفعات لم
              تُقفل بالكامل، والتعديلات أو المعالجات لا تزال منطقية أكثر. أما
              بعد الاستلام النهائي، فإن أي ملاحظة قد تدخل في نقاشات أطول حول
              هل هي ملاحظة استلام أم استخدام؟ وهل هي معالجة فورية أم ضمان؟
              وهل تُعد جوهرية أم ثانوية؟
            </p>

            <p>
              لذلك فإن الاستلام النهائي ليس مجرد توثيق للنهاية، بل أداة لحماية
              المالك من انتقال العيوب من مرحلة المشروع إلى مرحلة المعيشة. وكلما
              كان هذا الاستلام أضعف، زادت احتمالات أن تنتقل المشاكل إلى ما بعد
              التسليم.
            </p>

            <h2>الخطأ الأول: التعامل مع الاستلام النهائي كإجراء شكلي</h2>

            <p>
              هذا هو الخطأ الأكبر. بعض الناس يمرون على المشروع مرورًا سريعًا،
              أو يكتفون بأن “المظهر العام جيد”، أو يعتمدون على أن المقاول سيعالج
              أي شيء لاحقًا إن ظهر. هذه الطريقة خطيرة لأنها تمنح المشكلات فرصة
              للمرور تحت عنوان الاطمئنان أو المجاملة أو الرغبة في إنهاء الملف.
            </p>

            <p>
              الاستلام الشكلي لا يميز بين اللمسات البسيطة وبين العيوب المؤثرة،
              ولا يختبر التشغيل، ولا يتأكد من المطابقة، ولا يربط الملاحظات
              بآلية إغلاق. النتيجة أن المشروع قد يُسلَّم رسميًا بينما يبقى عمليًا
              ناقصًا أو غير محكوم بما يكفي.
            </p>

            <h2>الخطأ الثاني: التركيز على المظهر وإهمال التشغيل</h2>

            <p>
              قد يبدو كل شيء جميلًا بصريًا: دهانات نظيفة، بلاط لامع، جبس مرتب،
              وإنارة مبهرة. لكن الاستلام النهائي لا يقتصر على ما تراه العين.
              يجب أن تُفحص الأشياء كما تُستخدم فعلًا: هل الأبواب تغلق بشكل
              صحيح؟ هل الخزائن والأدراج تعمل بسلاسة؟ هل المياه تصرف كما يجب؟
              هل نقاط الكهرباء تؤدي وظائفها؟ هل المفاتيح تعمل بالمنطق الصحيح؟
            </p>

            <p>
              هذا النوع من الاختبار مهم لأن بعض العيوب لا تظهر في السكون، بل
              في الحركة والتشغيل. والمشروع لا يُستلم ليُشاهد فقط، بل ليُستخدم.
            </p>

            <h2>الخطأ الثالث: عدم مراجعة البنود بندًا بندًا</h2>

            <p>
              من الأخطاء الشائعة أن تتم جولة الاستلام بشكل عام من دون تقسيم
              ذهني واضح للبنود. يُنظر إلى المشروع ككل، وهذا مفيد للانطباع العام،
              لكنه غير كافٍ للفحص الحقيقي. الأفضل أن يتم المرور على البنود
              الأساسية واحدًا واحدًا: الأرضيات، الجدران، الأسقف، الأبواب،
              الأدوات الصحية، الكهرباء، الإكسسوارات، الأعمال الخشبية، الأعمال
              المعدنية، الواجهات الداخلية، والعناصر التشغيلية.
            </p>

            <p>
              عندما تُراجع المشروع بهذه الطريقة، يصبح احتمال اكتشاف الملاحظات
              أعلى بكثير. أما الجولة العامة، فغالبًا تُخفي الملاحظات لأنها تذيبها
              داخل الانطباع الكلي.
            </p>

            <h2>الخطأ الرابع: عدم توثيق الملاحظات بوضوح</h2>

            <p>
              حتى إذا اكتشفت الملاحظات، فإن عدم توثيقها جيدًا قد يفقد الاستلام
              جزءًا كبيرًا من قيمته. الملاحظة التي تُقال شفهيًا فقط قد تُنسى أو
              تُفهم جزئيًا أو يُختلف لاحقًا على ما إذا كانت قد أُبلغت أصلًا.
              لذلك لا بد من توثيق الملاحظات بصورة واضحة ومفهومة وقابلة للمتابعة.
            </p>

            <p>
              التوثيق هنا لا يعني التعقيد، بل الوضوح: ما هي الملاحظة؟ أين
              موقعها؟ هل هي ملاحظة جوهرية أم لمسة نهائية؟ ومن المسؤول عن
              معالجتها؟ ومتى سيتم إغلاقها؟ كلما كان هذا واضحًا، كان الاستلام
              أكثر قوة وانضباطًا.
            </p>

            <h2>الخطأ الخامس: الخلط بين الملاحظات الجوهرية واللمسات البسيطة</h2>

            <p>
              ليس كل ما يُلاحظ في الاستلام النهائي له الوزن نفسه. هناك فرق بين
              لمسات تجميلية بسيطة يمكن إغلاقها بسرعة، وبين ملاحظات تؤثر على
              الجودة أو الاستخدام أو السلامة أو عمر البند. من الخطأ أن تُعامل
              جميع الملاحظات بنفس المستوى، لأن ذلك قد يضيع التركيز على المهم،
              أو بالعكس يجعل الناس تتساهل في ملاحظة جوهرية لأنها ضمن قائمة طويلة
              من التفاصيل الصغيرة.
            </p>

            <p>
              الاستلام الجيد يفرّق بين الفئات: ما يجب ألا يُستلم قبل معالجته،
              وما يمكن استلامه مع تحفظ واضح عليه، وما يُعد لمسة نهائية لا تمنع
              الاستلام لكنها تحتاج إغلاقًا منظمًا.
            </p>

            <h2>الخطأ السادس: دفع الدفعة الأخيرة قبل إغلاق الملاحظات الجوهرية</h2>

            <p>
              هذه من أكثر الأخطاء حساسية. بعض الملاك يدفعون الدفعة الأخيرة بدافع
              حسن النية أو الرغبة في إنهاء العلاقة بسلاسة، ثم يكتشفون لاحقًا أن
              بعض الملاحظات المهمة لا تزال قائمة أو أن وتيرة المعالجة تباطأت.
              عندما تُقفل الورقة المالية قبل أن تُقفل الملاحظات الجوهرية، فإنك
              تضعف ورقة المتابعة لديك من دون داعٍ.
            </p>

            <p>
              لا يعني هذا الدخول في تشدد غير منطقي، بل يعني فقط أن تكون العلاقة
              بين الاستلام والدفع مدروسة. ما دام هناك بند مؤثر لم يُغلق أو لم
              يُختبر أو لم يُعتمد بشكل نهائي، فمن الحكمة ألا تتعامل مع الاستلام
              وكأنه انتهى بالكامل.
            </p>

            <h2>الخطأ السابع: عدم اختبار المياه والصرف والأدوات الصحية بشكل فعلي</h2>

            <p>
              بعض العيوب لا تظهر إلا عند التشغيل. لذلك لا يكفي أن تبدو الأدوات
              الصحية مركبة جيدًا أو أن السباكة مخفية بشكل نظيف. يجب التأكد من
              أن المياه تعمل كما يجب، وأن الصرف طبيعي، وأنه لا توجد ملاحظات
              في الميول أو التسريب أو سرعة التصريف أو ثبات القطع أو الإغلاق.
            </p>

            <p>
              ولهذا من المفيد جدًا أن تربط هذا المقال بمقال{" "}
              <Link
                to="/engineering-insights/common-mistakes/plumbing-mistakes-before-closing-walls"
                className="font-extrabold text-[#111111] underline decoration-[#d4a017] underline-offset-4"
              >
                أخطاء السباكة قبل الإقفال
              </Link>
              ، لأن كثيرًا من مشاكل الاستلام النهائي هي في الحقيقة نتائج متأخرة
              لأخطاء لم تُكتشف مبكرًا.
            </p>

            <h2>الخطأ الثامن: عدم اختبار الكهرباء والإنارة والتحكم بشكل كامل</h2>

            <p>
              من الخطأ أن تكتفي برؤية الإنارة تعمل بشكل عام. الاستلام الجيد يجب
              أن يشمل تجربة المفاتيح، ومنطق التحكم، وعمل الأفياش، وثبات الواجهات،
              ووضوح التشغيل، وأي نقاط خاصة مرتبطة بالأجهزة أو الداتا أو
              الأنظمة الخفيفة. بعض الأخطاء الكهربائية لا تظهر إلا عند التجربة
              العملية، خصوصًا إذا كان هناك توزيع تحكم أو نقاط عديدة في الفراغ.
            </p>

            <p>
              ومن هنا أيضًا تأتي أهمية مراجعة{" "}
              <Link
                to="/engineering-insights/common-mistakes/electrical-mistakes-before-finishing"
                className="font-extrabold text-[#111111] underline decoration-[#d4a017] underline-offset-4"
              >
                أخطاء الكهرباء قبل التشطيب
              </Link>
              ، لأن الاستلام النهائي هو آخر فرصة مريحة لاكتشاف ما قد يكون مر
              من قبل.
            </p>

            <h2>الخطأ التاسع: تجاهل العيوب البسيطة المتكررة في الدهانات والجبس واللمسات النهائية</h2>

            <p>
              بعض الملاحظات قد تبدو صغيرة جدًا منفردة: ضربة خفيفة، خط فصل غير
              نظيف، فرق بسيط في معجون، لمسة دهان ناقصة، سيليكون غير مرتب، حافة
              تحتاج تشطيبًا أدق. لكن عندما تتكرر هذه التفاصيل في أكثر من مكان،
              فإنها تعكس مستوى إنهاء أقل من المطلوب. لذلك لا ينبغي تجاهلها
              بالكامل بحجة أنها بسيطة، بل يجب النظر إلى نمط تكرارها وتأثيرها على
              الصورة النهائية للمشروع.
            </p>

            <p>
              الاستلام النهائي ليس فقط لاكتشاف العيوب الكبيرة، بل أيضًا لضبط
              مستوى الإنهاء العام. لأن المشروع الجيد لا يُقاس فقط بخلوه من
              الكوارث، بل أيضًا بنظافة تفاصيله النهائية.
            </p>

            <h2>الخطأ العاشر: عدم مراجعة الاستقامة والمحاذاة والفتحات والحواف</h2>

            <p>
              في الأعمال النهائية تظهر قيمة التفاصيل البصرية الدقيقة: استقامة
              الفواصل، اتساق الحواف، محاذاة الأبواب، انتظام السدات والفتحات،
              مستوى الإكسسوارات، نظافة التقاء المواد، وغيرها من العناصر التي
              تصنع الإحساس بأن المشروع متقن فعلًا. إذا أُهملت هذه النقاط، فقد
              يبدو كل شيء “مقبولًا” لكن من دون ذلك الإحساس بالنظافة والضبط.
            </p>

            <p>
              وهذه ليست كماليات فارغة، لأن العين تلتقط عدم الانضباط في هذه
              التفاصيل بسرعة حتى لو لم يعرف الشخص سبب شعوره أن هناك شيئًا غير
              مريح في المكان.
            </p>

            <h2>الخطأ الحادي عشر: عدم التمييز بين الاستلام المبدئي والاستلام النهائي الحقيقي</h2>

            <p>
              بعض المشاريع تحتاج فعليًا إلى جولة مبدئية ثم جولة نهائية بعد
              إغلاق الملاحظات. لكن الخطأ أن تُخلط المرحلتان ببعضهما، فيُتعامل
              مع الجولة الأولى وكأنها الاستلام النهائي نفسه، أو تُقفل الإجراءات
              والدفعات رغم أن الملاحظات ما زالت تحتاج عودة. وجود هذه التفرقة
              الذهنية مهم جدًا، لأنه يمنع التسرع ويعطي كل مرحلة معناها.
            </p>

            <p>
              أحيانًا يكون من الأفضل أن تُسجل الملاحظات في جولة أولى، ثم تُعطى
              فرصة معقولة للإغلاق، ثم تتم جولة أخيرة مركزة على التأكد من أن ما
              سُجل قد عولج فعلًا. بهذه الطريقة يكون الاستلام النهائي نتيجة،
              لا مجرد إعلان مبكر عن النهاية.
            </p>

            <h2>الخطأ الثاني عشر: عدم استخدام checklist واضح أثناء الاستلام</h2>

            <p>
              الذاكرة وحدها لا تكفي في مشروع مليء بالتفاصيل. حتى الشخص الخبير قد
              ينسى بنودًا أو ينشغل بعناصر واضحة وينسى عناصر تشغيلية أقل حضورًا.
              لذلك فإن وجود checklist بسيط ومنظم يرفع جودة الاستلام كثيرًا.
              ليس لأنه يعقّد العملية، بل لأنه يحولها من جولة انطباعية إلى فحص
              منهجي.
            </p>

            <p>
              وكلما كان المشروع أكبر أو أكثر تفصيلًا، أصبحت الحاجة إلى هذه
              القائمة أوضح. لأن ما لا يُسأل عنه غالبًا لا يُفحص بما يكفي.
            </p>

            <h2>Checklist عملي للاستلام النهائي بعد التشطيب</h2>

            <p>
              قبل التسليم النهائي، مر على المشروع بهذه المنهجية:
            </p>

            <ul>
              <li>افحص الأرضيات: الاستواء، الفواصل، النظافة، وعدم وجود كسر أو صوت غير طبيعي أو ميول غير مبررة.</li>
              <li>افحص الجدران والدهانات: التجانس، النظافة، عدم وجود تموجات واضحة أو آثار معالجة ناقصة أو اختلاف لون غير مقصود.</li>
              <li>افحص الأسقف والجبس: الاستقامة، نظافة الزوايا، الفواصل، والإنهاء حول الإنارة والفتحات.</li>
              <li>افحص الأبواب والخزائن: الفتح والإغلاق، الاستقامة، الملحقات، والاحتكاك أو الخلل في الحركة.</li>
              <li>افحص الأدوات الصحية: التثبيت، التشغيل، الصرف، عدم التسرب، ونظافة الإنهاء حولها.</li>
              <li>افحص الكهرباء: المفاتيح، الأفياش، منطق التحكم، الإنارة، وأي نقاط خاصة.</li>
              <li>افحص الإكسسوارات والأعمال المعدنية والخشبية: الثبات، المحاذاة، ونظافة التركيب.</li>
              <li>راجع اللمسات النهائية: سيليكون، حواف، أغطية، مقابض، وأي عناصر صغيرة يظهر فيها الفرق بين العمل العادي والعمل المتقن.</li>
              <li>سجّل كل الملاحظات بوضوح، وحدد ما هو جوهري وما هو تجميلي.</li>
              <li>لا تعتبر الاستلام نهائيًا قبل إغلاق الملاحظات الجوهرية واختبار البنود الحساسة فعليًا.</li>
            </ul>

            <h2>كيف تجعل الاستلام النهائي أقوى عمليًا؟</h2>

            <p>
              الأفضل أن يتم الاستلام في وقت تكون فيه الإضاءة جيدة، ومن دون
              استعجال، ومع قائمة واضحة، ويفضل المرور على المشروع أكثر من مرة:
              مرة بانطباع عام، ثم مرة تفصيلية بندًا بندًا. وإذا كنت قد تابعت
              المشروع خلال مراحله، فارجع ذهنيًا إلى البنود التي كانت حساسة أو
              شهدت ملاحظات سابقة، لأنها غالبًا تستحق تدقيقًا أعلى في النهاية.
            </p>

            <p>
              كما أن هذا المقال يرتبط مباشرة بمقال{" "}
              <Link
                to="/engineering-insights/common-mistakes/scheduling-and-execution-mistakes"
                className="font-extrabold text-[#111111] underline decoration-[#d4a017] underline-offset-4"
              >
                أخطاء الجدول الزمني والتنفيذ
              </Link>{" "}
              وبمقال{" "}
              <Link
                to="/engineering-insights/common-mistakes/mistakes-site-supervision"
                className="font-extrabold text-[#111111] underline decoration-[#d4a017] underline-offset-4"
              >
                أخطاء الإشراف والمتابعة
              </Link>
              ، لأن جودة الاستلام النهائي غالبًا تعكس جودة ما سبقه من إشراف
              وتسلسل واستلامات مرحلية.
            </p>

            <p>
              وإذا كنت ما زلت في بداية التخطيط وتريد تصورًا ماليًا أوضح قبل
              الدخول في هذه الرحلة من الأصل، فابدأ من{" "}
              <Link
                to="/villa-finishing-price-riyadh"
                className="font-extrabold text-[#111111] underline decoration-[#d4a017] underline-offset-4"
              >
                حاسبة تكلفة التشطيب في الرياض
              </Link>{" "}
              حتى تبني قراراتك على تصور أقرب للواقع.
            </p>

            <h2>الخلاصة</h2>

            <p>
              الاستلام النهائي ليس نهاية شكلية للمشروع، بل آخر خط دفاع قبل أن
              تنتقل كل التفاصيل من مرحلة التنفيذ إلى مرحلة الاستخدام اليومي.
              وكل ملاحظة تُترك هنا من دون انتباه قد ترافقك لاحقًا كصيانة أو
              إزعاج أو تكلفة أو حتى إحساس دائم بأن المشروع لم يُغلق كما يجب.
            </p>

            <p>
              لذلك فإن أفضل ما يمكنك فعله في هذه المرحلة هو أن تبطئ قليلًا بدل
              أن تتعجل، وأن تنظم فحصك بدل أن تعتمد على الانطباع، وأن تربط
              الاستلام بإغلاق الملاحظات لا بمجرد الرغبة في إنهاء الملف. بهذه
              الطريقة يصبح التسليم النهائي لحظة اطمئنان حقيقي، لا مجرد إعلان
              متفائل عن نهاية قد تعود بعدها المشاكل من أبواب أخرى.
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-[28px] border border-[#d4a017]/20 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-8">
          <h2 className="text-2xl font-extrabold text-[#111111]">
            روابط مهمة تكمل هذا المقال
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Link
              to="/engineering-insights/common-mistakes/mistakes-site-supervision"
              className="rounded-2xl border border-black/5 bg-[#faf8f3] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
            >
              <div className="text-lg font-extrabold text-[#111111]">
                أخطاء الإشراف والمتابعة
              </div>
              <p className="mt-2 text-sm leading-7 text-[#5a5a5a]">
                لأن جودة الاستلام النهائي تعكس غالبًا جودة المتابعة خلال المشروع.
              </p>
            </Link>

            <Link
              to="/engineering-insights/common-mistakes/scheduling-and-execution-mistakes"
              className="rounded-2xl border border-black/5 bg-[#faf8f3] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
            >
              <div className="text-lg font-extrabold text-[#111111]">
                أخطاء الجدول الزمني والتنفيذ
              </div>
              <p className="mt-2 text-sm leading-7 text-[#5a5a5a]">
                لأن التسرع في الإنهاء أو سوء التسلسل يظهر أثره بقوة وقت الاستلام.
              </p>
            </Link>

            <Link
              to="/engineering-insights/common-mistakes/plumbing-mistakes-before-closing-walls"
              className="rounded-2xl border border-black/5 bg-[#faf8f3] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
            >
              <div className="text-lg font-extrabold text-[#111111]">
                أخطاء السباكة قبل الإقفال
              </div>
              <p className="mt-2 text-sm leading-7 text-[#5a5a5a]">
                لأن كثيرًا من ملاحظات الاستلام النهائي تكون آثارًا متأخرة لأعمال
                مخفية لم تُراجع كما يجب.
              </p>
            </Link>

            <Link
              to="/engineering-insights/common-mistakes/electrical-mistakes-before-finishing"
              className="rounded-2xl border border-black/5 bg-[#faf8f3] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
            >
              <div className="text-lg font-extrabold text-[#111111]">
                أخطاء الكهرباء قبل التشطيب
              </div>
              <p className="mt-2 text-sm leading-7 text-[#5a5a5a]">
                لأن اختبار التشغيل في الاستلام هو آخر فرصة مريحة لاكتشاف
                الملاحظات الكهربائية قبل الإغلاق الكامل.
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-8">
          <h2 className="text-2xl font-extrabold text-[#111111]">أسئلة شائعة</h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-2xl border border-black/5 bg-[#faf8f3] p-5">
              <summary className="cursor-pointer list-none text-base font-extrabold text-[#111111]">
                هل يمكن الاستلام النهائي مع وجود ملاحظات؟
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#5b5b5b]">
                يمكن ذلك فقط إذا كانت الملاحظات غير جوهرية، وكانت موثقة بوضوح،
                وآلية إغلاقها متفقًا عليها، ولا تؤثر على الجودة الأساسية أو
                التشغيل أو السلامة.
              </p>
            </details>

            <details className="rounded-2xl border border-black/5 bg-[#faf8f3] p-5">
              <summary className="cursor-pointer list-none text-base font-extrabold text-[#111111]">
                هل أحتاج أكثر من جولة استلام؟
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#5b5b5b]">
                في كثير من المشاريع نعم، لأن جولة أولى لتسجيل الملاحظات ثم جولة
                ثانية للتأكد من إغلاقها تعطي نتيجة أدق بكثير من اعتبار الجولة
                الأولى استلامًا نهائيًا مكتملًا.
              </p>
            </details>

            <details className="rounded-2xl border border-black/5 bg-[#faf8f3] p-5">
              <summary className="cursor-pointer list-none text-base font-extrabold text-[#111111]">
                ما أهم قاعدة في يوم الاستلام النهائي؟
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#5b5b5b]">
                ألا تستعجل، وألا تعتمد على الانطباع العام فقط، وألا تُقفل
                المشروع ماليًا قبل أن تُغلق الملاحظات الجوهرية فنيًا.
              </p>
            </details>
          </div>
        </section>
      </article>
    </main>
  );
}