import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Home,
  ImageIcon,
  MapPin,
  PlayCircle,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";

type JsonLd = Record<string, any>;

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (
    command: string,
    eventName: string,
    params?: Record<string, unknown>
  ) => void;
};

type MapEventParams = Record<
  string,
  string | number | boolean | null | undefined
>;

function trackMapEvent(action: string, params: MapEventParams = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event: "riyadh_projects_map_interaction",
    map_action: action,
    page_path: "/projects-in-riyadh",
    ...params,
  };

  const analyticsWindow = window as AnalyticsWindow;

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push(payload);

  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", action, {
      event_category: "riyadh_projects_map",
      ...params,
    });
  }
}

type ProjectType = "الكل" | "تشطيب" | "ترميم" | "عظم" | "تجاري" | "واجهات";
type ProjectStatus = "الكل" | "مكتمل" | "جاري التنفيذ";

type MapProject = {
  id: string;
  title: string;
  district: string;
  type: Exclude<ProjectType, "الكل">;
  status: Exclude<ProjectStatus, "الكل">;
  area?: string;
  duration?: string;
  image: string;
  hasVideo?: boolean;
  href: string;
  description: string;
  images?: string[];
  category?: string;
  scope?: string;
  highlights?: string[];
};

type DistrictPin = {
  id: string;
  name: string;
  top: string;
  left: string;
  projects: MapProject[];
};

const SITE_URL = "https://pybcco.com";
const CANONICAL = `${SITE_URL}/projects-in-riyadh`;
const MAP_IMAGE = "/images/riyadhmap.webp";

const PAGE_TITLE =
  "خريطة مشاريعنا في الرياض | مشاريع التشطيب والترميم والبناء | بنيان الهرم للمقاولات";

const PAGE_DESCRIPTION =
  "استكشف خريطة مشاريع بنيان الهرم للمقاولات داخل أحياء الرياض، مع دبابيس تفاعلية تعرض تفاصيل مشاريع التشطيب والترميم والبناء حسب الحي ونوع التنفيذ.";

const DISTRICTS: DistrictPin[] = [
  {
    id: "qirawan",
    name: "القيروان",
    top: "24%",
    left: "30%",
    projects: [],
  },
  {
    id: "arid",
    name: "العارض",
    top: "22%",
    left: "35%",
    projects: [],
  },
  {
    id: "narjis",
    name: "النرجس",
    top: "21%",
    left: "50%",
    projects: [],
  },
  {
    id: "airport",
    name: "المطار",
    top: "21%",
    left: "60%",
    projects: [
      {
        id: "airport-admin-offices-renovation-riyadh",
        title: "مشروع تنفيذ مكاتب إدارية وترميم حمامات في المطار – الرياض",
        district: "المطار",
        type: "ترميم",
        status: "مكتمل",
        area: "مكاتب إدارية وحمامات",
        duration: "تنفيذ مكاتب إدارية وإعادة ترميم حمامات إدارية",
        image:
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-11.webp",
        images: [
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-11.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-01.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-02.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-03.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-04.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-05.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-06.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-07.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-08.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-09.webp",
          "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-10.webp",
        ],
        category: "مكاتب إدارية وترميم حمامات",
        scope: "تنفيذ مكاتب إدارية وإعادة ترميم حمامات إدارية",
        highlights: ["مكاتب إدارية", "ترميم حمامات", "أعمال داخلية", "المطار"],
        hasVideo: false,
        href: "/projects",
        description:
          "تنفيذ أعمال مكاتب إدارية وإعادة ترميم حمامات إدارية في منطقة المطار بالرياض، ضمن نطاق أعمال داخلية شملت تحسين المساحات الإدارية وتجهيزها للاستخدام النهائي.",
      },
    ],
  },
  {
    id: "malqa",
    name: "الملقا",
    top: "36%",
    left: "30%",
    projects: [
      {
        id: "villa-renovation-design-al-malqa-riyadh",
        title: "ترميم وتصميم وتشطيب فيلا سكنية في حي الملقا – الرياض",
        district: "الملقا",
        type: "ترميم",
        status: "مكتمل",
        area: "فيلا سكنية",
        duration: "ترميم وإعادة تشطيب وتصميم",
        image:
          "/projects/al-malqa/villa-renovation-design-al-malqa-riyadh-01.webp",
        images: [
          "/projects/al-malqa/villa-renovation-design-al-malqa-riyadh-01.webp",
        ],
        category: "ترميم فلل",
        scope: "ترميم وإعادة تشطيب وتصميم فيلا سكنية",
        highlights: ["ترميم فيلا", "إعادة تشطيب", "تصميم داخلي", "الملقا"],
        hasVideo: false,
        href: "/contractor-almalqa-riyadh",
        description:
          "تنفيذ أعمال ترميم وإعادة تشطيب وتصميم لفيلا سكنية في حي الملقا بالرياض، ضمن نطاق أعمال داخلية حسّنت من شكل المساحات وجودة التشطيب النهائي.",
      },
    ],
  },
  {
    id: "kafd",
    name: "مدينة الملك عبدالله المالية",
    top: "43%",
    left: "31%",
    projects: [
      {
        id: "commercial-offices-fitout-kafd-tower-303-riyadh",
        title:
          "مشروع تشطيب مكاتب تجارية في برج 303 – مدينة الملك عبدالله المالية بالرياض",
        district: "مدينة الملك عبدالله المالية",
        type: "تشطيب",
        status: "مكتمل",
        area: "مكاتب تجارية",
        duration: "تشطيب مكاتب تجارية في برج 303",
        image:
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-01.webp",
        images: [
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-01.webp",
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-02.webp",
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-03.webp",
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-04.webp",
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-05.webp",
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-06.webp",
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-07.webp",
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-08.webp",
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-09.webp",
          "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-10.webp",
        ],
        category: "تشطيب مكاتب تجارية",
        scope: "تشطيب مكاتب تجارية في برج 303",
        highlights: [
          "مكاتب تجارية",
          "برج 303",
          "مدينة الملك عبدالله المالية",
          "أعمال داخلية",
        ],
        hasVideo: false,
        href: "/projects",
        description:
          "تنفيذ أعمال تشطيب مكاتب تجارية في برج 303 ضمن مدينة الملك عبدالله المالية بالرياض، ضمن نطاق أعمال داخلية مخصصة للمساحات التجارية والإدارية الحديثة.",
      },
    ],
  },
  {
    id: "yasmin",
    name: "الياسمين",
    top: "39%",
    left: "40%",
    projects: [],
  },
  {
    id: "nakheel",
    name: "النخيل",
    top: "43%",
    left: "62%",
    projects: [],
  },
  {
    id: "hamra",
    name: "الحمراء",
    top: "49%",
    left: "56%",
    projects: [],
  },
  {
    id: "wurood",
    name: "الورود",
    top: "57%",
    left: "39%",
    projects: [],
  },
  {
    id: "olaya",
    name: "العليا",
    top: "62%",
    left: "39%",
    projects: [],
  },
  {
    id: "murabba",
    name: "المربع",
    top: "82%",
    left: "48%",
    projects: [],
  },
  {
    id: "tuwaiq",
    name: "طويق",
    top: "86%",
    left: "36%",
    projects: [],
  },
  {
    id: "farooq",
    name: "الفاروق",
    top: "74%",
    left: "63%",
    projects: [
      {
        id: "restaurant-fitout-al-farouq-riyadh",
        title: "مشروع تشطيب مطعم في حي الفاروق – الرياض",
        district: "الفاروق",
        type: "تشطيب",
        status: "مكتمل",
        area: "مطعم",
        duration: "تشطيب مطعم",
        image:
          "/projects/al-farouq/restaurant-fitout-al-farouq-riyadh-01.webp",
        images: [
          "/projects/al-farouq/restaurant-fitout-al-farouq-riyadh-01.webp",
          "/projects/al-farouq/restaurant-fitout-al-farouq-riyadh-02.webp",
          "/projects/al-farouq/restaurant-fitout-al-farouq-riyadh-03.webp",
          "/projects/al-farouq/restaurant-fitout-al-farouq-riyadh-04.webp",
        ],
        category: "تشطيب مطاعم",
        scope: "تشطيب مطعم",
        highlights: ["تشطيب مطعم", "أعمال داخلية", "مساحة تجارية", "الفاروق"],
        hasVideo: false,
        href: "/projects",
        description:
          "تنفيذ أعمال تشطيب مطعم في حي الفاروق بالرياض، ضمن نطاق أعمال داخلية وتجهيزات تشطيب مناسبة للمطاعم والمساحات التجارية.",
      },
    ],
  },
  {
    id: "sulay",
    name: "السلي",
    top: "82%",
    left: "70%",
    projects: [
      {
        id: "office-fitout-al-sulay-riyadh",
        title: "مشروع تشطيب مكاتب إدارية تسليم مفتاح في السلي – الرياض",
        district: "السلي",
        type: "تشطيب",
        status: "مكتمل",
        area: "مكاتب إدارية",
        duration: "تشطيب تسليم مفتاح",
        image: "/projects/al-sulay/office-fitout-al-sulay-riyadh-01.webp",
        images: [
          "/projects/al-sulay/office-fitout-al-sulay-riyadh-01.webp",
          "/projects/al-sulay/office-fitout-al-sulay-riyadh-02.webp",
        ],
        category: "تشطيب مكاتب إدارية",
        scope: "تشطيب تسليم مفتاح",
        highlights: ["تسليم مفتاح", "مكاتب إدارية", "أعمال داخلية", "السلي"],
        hasVideo: false,
        href: "/projects",
        description:
          "تنفيذ مشروع تشطيب مكاتب إدارية تسليم مفتاح في حي السلي بالرياض، ضمن نطاق أعمال داخلية متكاملة شملت تجهيز المساحات الإدارية للاستخدام النهائي.",
      },
    ],
  },
  {
    id: "khashm-alaan",
    name: "خشم العان",
    top: "79%",
    left: "80%",
    projects: [
      {
        id: "national-guard-villas-khashm-alaan",
        title: "مشروع تشطيب 136 فيلا في خشم العان – الرياض",
        district: "خشم العان",
        type: "تشطيب",
        status: "مكتمل",
        area: "136 فيلا",
        duration: "سيراميك، دهانات، جبس بورد",
        image: "/projects/riyadh-project-ceramic/khashm-alaan-project.webp",
        images: [
          "/projects/riyadh-project-ceramic/painting-and-finishing-labor.webp",
          "/projects/riyadh-project-ceramic/ceramic-tiles-lebors.webp",
          "/projects/riyadh-project-ceramic/ceramic-tiles.webp",
          "/projects/riyadh-project-ceramic/khashm-alaan-project.webp",
          "/projects/riyadh-project-ceramic/finishing-contract_.webp",
        ],
        category: "تشطيب فلل",
        scope: "تشطيب 136 فيلا",
        highlights: ["136 فيلا", "سيراميك", "دهانات", "جبس بورد", "خشم العان"],
        hasVideo: false,
        href: "/projects",
        description:
          "تنفيذ أعمال تشطيب لعدد 136 فيلا ضمن مشروع سكني كبير في خشم العان بالرياض، شملت أعمال السيراميك والدهانات والجبس بورد بجودة تنفيذ مناسبة للمشاريع متعددة الوحدات.",
      },
    ],
  },
];
const TYPE_FILTERS: ProjectType[] = [
  "الكل",
  "تشطيب",
  "ترميم",
  "عظم",
  "تجاري",
  "واجهات",
];

const STATUS_FILTERS: ProjectStatus[] = ["الكل", "مكتمل", "جاري التنفيذ"];

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function buildPageSchema(): JsonLd[] {
  const allProjects = DISTRICTS.flatMap((district) => district.projects);

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": CANONICAL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: CANONICAL,
      inLanguage: "ar",
      about: [
        "مشاريع مقاولات في الرياض",
        "تشطيب فلل في الرياض",
        "ترميم فلل في الرياض",
        "بناء عظم في الرياض",
      ],
      spatialCoverage: {
        "@type": "Place",
        name: "الرياض، المملكة العربية السعودية",
      },
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${CANONICAL}#projects`,
      numberOfItems: allProjects.length,
      itemListElement: allProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          url: `${SITE_URL}${project.href}`,
          about: project.type,
          contentLocation: {
            "@type": "Place",
            name: `حي ${project.district}، الرياض`,
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "خريطة مشاريع الرياض",
          item: CANONICAL,
        },
      ],
    },
  ];
}

export default function RiyadhProjectsMapPage() {
  const schemas = useMemo(() => buildPageSchema(), []);

  const [selectedType, setSelectedType] = useState<ProjectType>("الكل");
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus>("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictPin | null>(
    null
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredDistricts = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(searchQuery);

    return DISTRICTS.map((district) => {
      const districtMatch = normalizeSearchValue(district.name).includes(
        normalizedQuery
      );

      const projects = district.projects.filter((project) => {
        const typeMatch =
          selectedType === "الكل" || project.type === selectedType;
        const statusMatch =
          selectedStatus === "الكل" || project.status === selectedStatus;

        const projectText = normalizeSearchValue(
          `${project.title} ${project.district} ${project.type} ${project.status} ${project.description}`
        );
        const searchMatch =
          normalizedQuery.length === 0 ||
          districtMatch ||
          projectText.includes(normalizedQuery);

        return typeMatch && statusMatch && searchMatch;
      });

      return {
        ...district,
        projects,
      };
    }).filter((district) => district.projects.length > 0);
  }, [selectedType, selectedStatus, searchQuery]);

  const allFilteredProjects = filteredDistricts.flatMap(
    (district) => district.projects
  );

  const totalDistricts = filteredDistricts.length;
  const totalProjects = allFilteredProjects.length;
  const completedProjects = allFilteredProjects.filter(
    (project) => project.status === "مكتمل"
  ).length;
  const videosCount = allFilteredProjects.filter(
    (project) => project.hasVideo
  ).length;

  const selectedVisibleDistrict = selectedDistrict
    ? filteredDistricts.find((district) => district.id === selectedDistrict.id) || null
    : null;

  const hasActiveFilters =
    selectedType !== "الكل" ||
    selectedStatus !== "الكل" ||
    searchQuery.trim().length > 0;

  useEffect(() => {
    trackMapEvent("view_projects_map_page", {
      visible_projects: totalProjects,
      visible_districts: totalDistricts,
    });
  }, []);

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDistrictPanel("escape_key");
      }
    }

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [selectedDistrict]);

  const resultsLabel = searchQuery.trim()
    ? `تم العثور على ${totalProjects} مشروع مطابق للبحث`
    : `${totalProjects} نتيجة`;

  function selectDistrict(district: DistrictPin, source: string) {
    setSelectedDistrict(district);

    if (source === "mobile_filter_drawer") {
      setIsFilterOpen(false);
    }

    trackMapEvent("select_district", {
      district: district.name,
      source,
      projects_count: district.projects.length,
    });
  }

  function closeDistrictPanel(source: string) {
    if (selectedDistrict) {
      trackMapEvent("close_district_panel", {
        district: selectedDistrict.name,
        source,
      });
    }

    setSelectedDistrict(null);
  }

  function openMobileFilters() {
    setIsFilterOpen(true);
    trackMapEvent("open_mobile_filters", {
      visible_projects: totalProjects,
      visible_districts: totalDistricts,
    });
  }

  function closeMobileFilters(source: string) {
    setIsFilterOpen(false);
    trackMapEvent("close_mobile_filters", { source });
  }

  function resetFilters() {
    trackMapEvent("reset_filters", {
      selected_type: selectedType,
      selected_status: selectedStatus,
      search_query: searchQuery.trim() || undefined,
    });

    setSelectedType("الكل");
    setSelectedStatus("الكل");
    setSearchQuery("");
    setSelectedDistrict(null);
  }

  function trackSearchUsage(source: string) {
    const query = searchQuery.trim();

    if (!query) return;

    trackMapEvent("search_projects", {
      search_query: query,
      source,
      results_count: totalProjects,
    });
  }

  return (
    <>
      <SeoHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={CANONICAL}
        robots="index,follow"
        ogImage={`${SITE_URL}/images/riyadhmap.webp`}
        ogType="website"
        jsonLd={schemas}
      />

      <main dir="rtl" className="min-h-screen bg-black text-white">
        <section className="relative h-[100dvh] min-h-[680px] w-full overflow-hidden bg-black md:h-screen md:min-h-[820px]">
          <img
            src={MAP_IMAGE}
            alt="خريطة مشاريع بنيان الهرم للمقاولات داخل أحياء الرياض"
            className="absolute inset-0 h-full w-full select-none object-cover object-[48%_50%] opacity-95 [backface-visibility:hidden] [image-rendering:auto] [transform:translateZ(0)_scale(1.08)] md:object-center md:[transform:translateZ(0)_scale(1.1)]"
            loading="eager"
          />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.13),transparent_44%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/50" />

          {selectedVisibleDistrict && (
            <div
              className="pointer-events-none absolute z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/15 blur-3xl transition-all duration-700"
              style={{
                top: selectedVisibleDistrict.top,
                left: selectedVisibleDistrict.left,
              }}
            />
          )}

          <div className="pointer-events-none absolute inset-0 opacity-35">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          </div>

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {filteredDistricts.map((district) => (
              <line
                key={district.id}
                x1="50"
                y1="50"
                x2={district.left.replace("%", "")}
                y2={district.top.replace("%", "")}
                stroke="rgba(212,175,55,0.35)"
                strokeWidth="0.08"
                strokeDasharray="1 1"
              />
            ))}
          </svg>

          <div className="absolute left-4 right-4 top-20 z-40 flex items-center justify-between gap-3 md:hidden">
            <button
              type="button"
              onClick={openMobileFilters}
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-black/72 px-4 py-2.5 text-sm font-bold text-white shadow-xl shadow-black/30 backdrop-blur-xl transition active:scale-95"
            >
              <Filter className="h-4 w-4 text-[#D4AF37]" />
              تصفية
              <span className="rounded-full bg-[#D4AF37] px-2 py-0.5 text-xs text-black">
                {totalProjects}
              </span>
            </button>

            <div className="rounded-full border border-white/10 bg-black/55 px-4 py-2 text-xs font-bold text-white/75 shadow-xl shadow-black/25 backdrop-blur-xl">
              اضغط على الدبوس لعرض المشاريع
            </div>
          </div>

          <div className="absolute right-4 top-24 z-20 hidden max-w-[460px] origin-top-right scale-[0.48] md:block md:right-8 lg:right-12 xl:max-w-[500px] xl:scale-[0.51]">
            <div className="animate-[mapFadeUp_.55s_cubic-bezier(.22,1,.36,1)_both] rounded-[2rem] border border-white/10 bg-black/52 p-5 shadow-2xl shadow-black/35 backdrop-blur-xl md:p-5 xl:p-6">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#f5deb3]">
                <MapPin className="h-4 w-4" />
                خريطة مشاريع PYBCCO داخل الرياض
              </div>

              <h1 className="text-3xl font-extrabold leading-tight md:text-4xl xl:text-[2.75rem]">
                مشاريعنا المنفذة في{" "}
                <span className="text-[#D4AF37]">أحياء الرياض</span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/75">
                استكشف مواقع المشاريع حسب الحي ونوع التنفيذ. اضغط على أي حي
                ظاهر على الخريطة لعرض تفاصيل المشاريع والصور والروابط المرتبطة.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">
                    {totalProjects}
                  </div>
                  <div className="mt-1 text-xs text-white/65">مشاريع ظاهرة</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">
                    {totalDistricts}
                  </div>
                  <div className="mt-1 text-xs text-white/65">أحياء</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">
                    {videosCount}
                  </div>
                  <div className="mt-1 text-xs text-white/65">فيديوهات</div>
                </div>
              </div>
            </div>
          </div>

          {isFilterOpen && (
            <div className="fixed inset-0 z-[90] md:hidden">
              <button
                type="button"
                aria-label="إغلاق فلتر المشاريع"
                onClick={() => closeMobileFilters("backdrop")}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              <aside className="projects-district-scroll absolute bottom-0 left-0 right-0 max-h-[82dvh] overflow-y-auto rounded-t-[2rem] border border-white/10 bg-black/90 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/60">
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/20" />

                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-lg font-extrabold text-white">
                      <Filter className="h-5 w-5 text-[#D4AF37]" />
                      تصفية المشاريع
                    </div>
                    <p className="mt-1 text-sm text-white/55">
                      ابحث باسم الحي أو المشروع
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => closeMobileFilters("x_button")}
                    className="rounded-full border border-white/15 bg-white/10 p-2 text-white/75 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                    aria-label="إغلاق الفلتر"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div
                  className="mb-4 inline-flex rounded-full border border-[#D4AF37]/30 px-3 py-1 text-xs text-[#D4AF37]"
                  aria-live="polite"
                >
                  {resultsLabel}
                </div>

                <div className="space-y-5">
                  <div className="relative">
                    <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D4AF37]" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      onBlur={() => trackSearchUsage("mobile_search_blur")}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          trackSearchUsage("mobile_search_enter");
                        }
                      }}
                      placeholder="ابحث: العليا، الملقا، تشطيب..."
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pr-12 pl-4 text-base text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37]/60 focus:bg-white/10"
                    />
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-bold text-white/75">
                      نوع المشروع
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TYPE_FILTERS.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setSelectedType(type);
                            trackMapEvent("filter_type", {
                              selected_type: type,
                              source: "mobile_filter_drawer",
                            });
                          }}
                          className={`rounded-full border px-4 py-2.5 text-sm transition duration-300 ${
                            selectedType === type
                              ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                              : "border-white/10 bg-white/5 text-white/70 active:scale-95"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-bold text-white/75">
                      حالة المشروع
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_FILTERS.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => {
                            setSelectedStatus(status);
                            trackMapEvent("filter_status", {
                              selected_status: status,
                              source: "mobile_filter_drawer",
                            });
                          }}
                          className={`rounded-full border px-4 py-2.5 text-sm transition duration-300 ${
                            selectedStatus === status
                              ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                              : "border-white/10 bg-white/5 text-white/70 active:scale-95"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="text-sm font-bold text-white/75">
                        الأحياء الظاهرة
                      </div>

                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/70 transition active:scale-95"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          إعادة ضبط
                        </button>
                      )}
                    </div>

                    {filteredDistricts.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {filteredDistricts.map((district) => (
                          <button
                            key={district.id}
                            type="button"
                            onClick={() =>
                              selectDistrict(district, "mobile_filter_drawer")
                            }
                            className={`rounded-full border px-4 py-2.5 text-sm transition duration-300 ${
                              selectedVisibleDistrict?.id === district.id
                                ? "border-[#D4AF37] bg-[#D4AF37]/25 text-[#D4AF37]"
                                : "border-white/10 bg-black/20 text-white/70 active:scale-95"
                            }`}
                          >
                            {district.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white/55">
                        لا توجد مشاريع مطابقة للبحث الحالي. جرّب إزالة بعض الفلاتر.
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          )}

          <div className="absolute left-4 top-24 z-30 hidden w-[calc(100%-2rem)] max-w-[360px] origin-top-left scale-[0.48] animate-[mapFadeLeft_.6s_cubic-bezier(.22,1,.36,1)_both] rounded-[2rem] border border-white/10 bg-black/60 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:block md:left-8 lg:left-12 xl:scale-[0.51]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Filter className="h-4 w-4 text-[#D4AF37]" />
                  تصفية المشاريع
                </div>
                <p className="mt-1 text-xs text-white/55">
                  ابحث باسم الحي أو المشروع
                </p>
              </div>

              <div
                className="rounded-full border border-[#D4AF37]/30 px-3 py-1 text-xs text-[#D4AF37]"
                aria-live="polite"
              >
                {resultsLabel}
              </div>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onBlur={() => trackSearchUsage("search_input_blur")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      trackSearchUsage("search_input_enter");
                    }
                  }}
                  placeholder="ابحث: العليا، الملقا، تشطيب..."
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pr-11 pl-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37]/60 focus:bg-white/10"
                />
              </div>

              <div>
                <div className="mb-2 text-xs font-bold text-white/70">
                  نوع المشروع
                </div>
                <div className="flex flex-wrap gap-2">
                  {TYPE_FILTERS.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedType(type);
                        trackMapEvent("filter_type", { selected_type: type });
                      }}
                      className={`rounded-full border px-3 py-2 text-xs transition duration-300 ${
                        selectedType === type
                          ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                          : "border-white/10 bg-white/5 text-white/70 hover:scale-105 hover:border-[#D4AF37]/60 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-bold text-white/70">
                  حالة المشروع
                </div>
                <div className="flex flex-wrap gap-2">
                  {STATUS_FILTERS.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setSelectedStatus(status);
                        trackMapEvent("filter_status", { selected_status: status });
                      }}
                      className={`rounded-full border px-3 py-2 text-xs transition duration-300 ${
                        selectedStatus === status
                          ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                          : "border-white/10 bg-white/5 text-white/70 hover:scale-105 hover:border-[#D4AF37]/60 hover:text-white"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-xs font-bold text-white/70">
                    الأحياء الظاهرة
                  </div>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/60 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                    >
                      <RotateCcw className="h-3 w-3" />
                      إعادة ضبط
                    </button>
                  )}
                </div>

                {filteredDistricts.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filteredDistricts.map((district) => (
                      <button
                        key={district.id}
                        type="button"
                        onClick={() => selectDistrict(district, "filter_panel")}
                        className={`rounded-full border px-3 py-2 text-xs transition duration-300 ${
                          selectedVisibleDistrict?.id === district.id
                            ? "border-[#D4AF37] bg-[#D4AF37]/25 text-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.12)]"
                            : "border-white/10 bg-black/20 text-white/65 hover:scale-105 hover:border-[#D4AF37]/60 hover:text-white"
                        }`}
                      >
                        {district.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-xs leading-6 text-white/55">
                    لا توجد مشاريع مطابقة للبحث الحالي. جرّب إزالة بعض الفلاتر.
                  </div>
                )}
              </div>
            </div>
          </div>

          {filteredDistricts.map((district, index) => {
            const isSelected = selectedVisibleDistrict?.id === district.id;
            const firstProject = district.projects[0];

            return (
              <button
                key={district.id}
                type="button"
                onClick={() => selectDistrict(district, "map_pin")}
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{
                  top: district.top,
                  left: district.left,
                  animationDelay: `${index * 80}ms`,
                }}
                aria-label={`عرض مشاريع حي ${district.name}`}
              >
                <span
                  className={`absolute inset-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition duration-500 group-hover:bg-[#D4AF37]/45 ${
                    isSelected
                      ? "h-24 w-24 bg-[#D4AF37]/35"
                      : "h-[4.5rem] w-[4.5rem] bg-[#D4AF37]/20"
                  }`}
                />
                <span
                  className={`absolute inset-0 -translate-x-1/2 -translate-y-1/2 animate-[mapPulse_2.8s_ease-in-out_infinite] rounded-full border ${
                    isSelected
                      ? "h-20 w-20 border-[#D4AF37]/80"
                      : "h-16 w-16 border-[#D4AF37]/50"
                  }`}
                />

                <span
                  className={`relative flex items-center justify-center rounded-full border shadow-2xl transition duration-500 group-hover:scale-125 ${
                    isSelected
                      ? "h-14 w-14 border-[#D4AF37] bg-[#D4AF37] text-black shadow-[#D4AF37]/40"
                      : "h-12 w-12 border-[#D4AF37]/70 bg-black/75 text-[#D4AF37] shadow-black/50"
                  }`}
                >
                  <MapPin className={isSelected ? "h-6 w-6" : "h-5 w-5"} />
                </span>

                <span className="absolute right-8 top-1/2 hidden min-w-max -translate-y-1/2 rounded-full border border-white/10 bg-black/80 px-3.5 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:border-[#D4AF37]/60 group-hover:text-[#D4AF37] md:block">
                  {district.name}
                  <span className="mr-2 text-[#D4AF37]">
                    {district.projects.length}
                  </span>
                </span>

                {firstProject && (
                  <span className="pointer-events-none absolute right-10 top-10 hidden w-56 overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-black/85 p-2 text-right opacity-0 shadow-2xl shadow-black/50 backdrop-blur-xl transition duration-300 group-hover:translate-y-2 group-hover:opacity-100 lg:block">
                    <span className="block h-24 overflow-hidden rounded-xl bg-white/5">
                      <img
                        src={firstProject.image}
                        alt={firstProject.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </span>
                    <span className="mt-2 block text-xs font-bold leading-6 text-white">
                      {firstProject.title}
                    </span>
                    <span className="block text-[11px] text-white/55">
                      اضغط لعرض التفاصيل
                    </span>
                  </span>
                )}
              </button>
            );
          })}

          <div className="absolute bottom-6 left-4 right-4 z-30 hidden origin-bottom scale-[0.54] md:block md:left-8 md:right-8 lg:left-12 lg:right-12 xl:scale-[0.58]">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-[1.5rem] border border-white/10 bg-black/60 px-5 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-xs text-white/70 md:text-sm">
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                اضغط على أي حي مضيء لعرض تفاصيل المشاريع المنفذة داخله
              </div>

              <div className="hidden items-center gap-4 md:flex">
                <div className="flex items-center gap-2 text-xs text-white/65">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                  {completedProjects} مكتمل
                </div>
                <div className="flex items-center gap-2 text-xs text-white/65">
                  <ImageIcon className="h-4 w-4 text-[#D4AF37]" />
                  صور وفيديو
                </div>
              </div>
            </div>
          </div>

          {(selectedVisibleDistrict || filteredDistricts.length === 0) && (
            <aside className="absolute bottom-0 right-0 z-40 w-full max-h-[56dvh] animate-[mapFadeUp_.5s_cubic-bezier(.22,1,.36,1)_both] overflow-hidden rounded-t-[2rem] border border-white/[0.12] bg-black/[0.86] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/50 backdrop-blur-2xl md:bottom-20 md:right-8 md:w-[calc(100%-2rem)] md:max-h-none md:max-w-[520px] md:origin-bottom-right md:scale-[0.48] md:rounded-[2rem] md:bg-black/[0.74] md:p-5 lg:right-12 xl:max-w-[560px] xl:scale-[0.51]">
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/20 md:hidden" />

              {selectedVisibleDistrict ? (
              <>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs text-[#D4AF37]">
                      <Building2 className="h-3.5 w-3.5" />
                      {selectedVisibleDistrict.projects.length} مشروع
                    </div>

                    <h2 className="text-2xl font-extrabold">
                      حي {selectedVisibleDistrict.name}
                    </h2>

                    <p className="mt-1 text-sm leading-7 text-white/60">
                      المشاريع الظاهرة حسب الفلتر الحالي داخل هذا الحي.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        trackMapEvent("view_all_districts", {
                          source: "district_panel",
                          district: selectedVisibleDistrict.name,
                        });
                        closeDistrictPanel("view_all_districts_button");
                      }}
                      className="mt-2 inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-bold text-[#D4AF37] transition duration-300 hover:scale-105 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                    >
                      عرض كل الأحياء
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => closeDistrictPanel("x_button")}
                    className="rounded-full border border-white/15 bg-white/10 p-2 text-white/75 shadow-lg shadow-black/20 transition duration-300 hover:scale-105 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                    aria-label="إغلاق تفاصيل الحي المختار"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="projects-district-scroll flex snap-x gap-3 overflow-x-auto overflow-y-hidden pb-2 pl-2 pr-1 md:block md:max-h-[330px] md:space-y-3 md:overflow-y-auto md:pb-0">
                  {selectedVisibleDistrict.projects.map((project) => (
                    <article
                      key={project.id}
                      className="group min-w-[82vw] snap-start overflow-hidden rounded-2xl border border-white/[0.12] bg-black/30 transition duration-300 hover:border-[#D4AF37]/45 hover:bg-white/[0.06] md:min-w-0"
                    >
                      <div className="grid gap-3 p-3 md:grid-cols-[145px_1fr] md:gap-4 md:p-3">
                        <div className="relative h-28 overflow-hidden rounded-xl bg-white/5 md:h-full md:min-h-[128px]">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            loading="lazy"
                          />

                          {project.hasVideo && (
                            <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/75 px-2 py-1 text-[11px] text-[#D4AF37] backdrop-blur-md">
                              <PlayCircle className="h-3 w-3" />
                              فيديو
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="mb-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#D4AF37]/10 px-2 py-1 text-[11px] text-[#D4AF37]">
                              {project.type}
                            </span>
                            <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/70">
                              {project.status}
                            </span>
                          </div>

                          <h3 className="text-base font-extrabold leading-7 md:text-lg">
                            {project.title}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/68 md:text-sm md:leading-7">
                            {project.description}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-white/62">
                            {project.area && (
                              <span className="inline-flex items-center gap-1">
                                <Home className="h-3.5 w-3.5 text-[#D4AF37]" />
                                {project.area}
                              </span>
                            )}

                            {project.duration && (
                              <span className="inline-flex items-center gap-1">
                                <Clock3 className="h-3.5 w-3.5 text-[#D4AF37]" />
                                {project.duration}
                              </span>
                            )}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button
                              asChild
                              size="sm"
                              className="bg-[#D4AF37] text-black hover:bg-[#e5c158]"
                            >
                              <Link
                                to={project.href}
                                onClick={() =>
                                  trackMapEvent("click_project_details", {
                                    project_id: project.id,
                                    project_title: project.title,
                                    district: project.district,
                                  })
                                }
                              >
                                عرض المشروع
                                <ArrowLeft className="mr-2 h-4 w-4" />
                              </Link>
                            </Button>

                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                            >
                              <Link
                                to="/villa-finishing-price-riyadh"
                                onClick={() =>
                                  trackMapEvent("click_similar_cost_calculator", {
                                    source: "project_card",
                                    project_id: project.id,
                                    district: project.district,
                                  })
                                }
                              >
                                احسب تكلفة مشابهة
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Search className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-extrabold">لا توجد نتائج ظاهرة</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-white/60">
                  غيّر البحث أو أعد ضبط الفلاتر لعرض جميع المشاريع على الخريطة.
                </p>
                <Button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 bg-[#D4AF37] text-black hover:bg-[#e5c158]"
                >
                  إعادة ضبط الفلاتر
                </Button>
              </div>
            )}
            </aside>
          )}

          <div className="fixed bottom-6 left-4 z-50 hidden origin-bottom-left scale-[0.51] flex-col gap-2 md:flex xl:scale-[0.54]">
            <Button
              asChild
              className="rounded-full bg-[#D4AF37] px-5 text-black shadow-2xl shadow-[#D4AF37]/20 hover:bg-[#e5c158]"
            >
              <Link
                to="/villa-finishing-price-riyadh"
                onClick={() =>
                  trackMapEvent("click_cost_calculator_cta", {
                    source: "sticky_cta",
                  })
                }
              >
                احسب تكلفة مشروعك
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 bg-black/65 px-5 text-white backdrop-blur-xl hover:bg-white/10"
            >
              <Link
                to="/#contact"
                onClick={() =>
                  trackMapEvent("click_free_visit_cta", { source: "sticky_cta" })
                }
              >
                طلب زيارة مجانية
              </Link>
            </Button>
          </div>
        </section>

        <section className="border-t border-white/10 bg-black px-4 py-14">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#D4AF37]">
              <Eye className="h-4 w-4" />
              من الخريطة إلى تفاصيل المشروع
            </div>

            <h2 className="text-2xl font-extrabold md:text-4xl">
              كل مشروع جديد يمكن إضافته كنقطة تفاعلية وصفحة مستقلة
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-white/65 md:text-base">
              هذه الصفحة مصممة لتكبر مع أعمال الشركة. عند إضافة مشروع جديد داخل
              أي حي في الرياض، يمكن وضعه على الخريطة وربطه بصفحة تحتوي الصور
              والفيديو وتفاصيل التنفيذ.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className="bg-[#D4AF37] text-black hover:bg-[#e5c158]"
              >
                <Link
                  to="/projects"
                  onClick={() =>
                    trackMapEvent("click_projects_gallery", {
                      source: "middle_cta",
                    })
                  }
                >
                  مشاهدة معرض المشاريع
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <Link
                  to="/videos"
                  onClick={() =>
                    trackMapEvent("click_execution_videos", {
                      source: "middle_cta",
                    })
                  }
                >
                  مشاهدة فيديوهات التنفيذ
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#050505] px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#D4AF37]">
                  <MapPin className="h-4 w-4" />
                  مشاريع مقاولات وتشطيب داخل أحياء الرياض
                </div>

                <h2 className="text-2xl font-extrabold leading-tight md:text-4xl">
                  خريطة مشاريع بنيان الهرم للمقاولات في أحياء الرياض
                </h2>

                <p className="mt-5 text-sm leading-8 text-white/65 md:text-base">
                  تعرض هذه الصفحة جزءًا من مشاريع بنيان الهرم للمقاولات داخل
                  الرياض، وتشمل أعمال التشطيب الداخلي، ترميم الفلل، بناء العظم،
                  تحسين الواجهات، وتنفيذ الأعمال السكنية والتجارية. يساعد عرض
                  المشاريع على الخريطة أصحاب الفلل والمباني على فهم نطاق عملنا
                  داخل أحياء مثل العليا، الياسمين، الملقا، النرجس، القيروان، العارض، النخيل، الحمراء،
                  والمربع.
                </p>

                <p className="mt-4 text-sm leading-8 text-white/65 md:text-base">
                  إذا كنت تبحث عن شركة مقاولات في الرياض لتنفيذ تشطيب فيلا،
                  ترميم منزل، أعمال عظم، أو تطوير واجهة، يمكنك استخدام الخريطة
                  لاستكشاف نماذج قريبة من نوع مشروعك، ثم الانتقال إلى الحاسبة أو
                  معرض المشاريع للاطلاع على تفاصيل أكثر.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-extrabold text-white">
                  الأحياء والخدمات المرتبطة
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {DISTRICTS.map((district) => (
                    <button
                      key={district.id}
                      type="button"
                      onClick={() => {
                        selectDistrict(district, "seo_section");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/70 transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                    >
                      مشاريع في حي {district.name}
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/villa-finishing-riyadh"
                    onClick={() =>
                      trackMapEvent("click_service_link", {
                        source: "seo_section",
                        service: "villa_finishing",
                      })
                    }
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-white transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                  >
                    تشطيب فلل بالرياض
                  </Link>
                  <Link
                    to="/villa-renovation-riyadh"
                    onClick={() =>
                      trackMapEvent("click_service_link", {
                        source: "seo_section",
                        service: "villa_renovation",
                      })
                    }
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-white transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                  >
                    ترميم فلل بالرياض
                  </Link>
                  <Link
                    to="/villa-bone-construction-riyadh"
                    onClick={() =>
                      trackMapEvent("click_service_link", {
                        source: "seo_section",
                        service: "villa_bone_construction",
                      })
                    }
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-white transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                  >
                    بناء عظم بالرياض
                  </Link>
                  <Link
                    to="/construction-company-riyadh"
                    onClick={() =>
                      trackMapEvent("click_service_link", {
                        source: "seo_section",
                        service: "construction_company",
                      })
                    }
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-white transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                  >
                    شركة مقاولات بالرياض
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes mapPulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.42;
            }
            50% {
              transform: translate(-50%, -50%) scale(2.15);
              opacity: 0;
            }
          }

          @keyframes mapFadeUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes mapFadeLeft {
            from {
              opacity: 0;
              transform: translateX(-18px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .projects-district-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(212, 175, 55, 0.72) rgba(255, 255, 255, 0.06);
          }

          .projects-district-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .projects-district-scroll::-webkit-scrollbar-track {
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.06);
          }

          .projects-district-scroll::-webkit-scrollbar-thumb {
            border: 1px solid rgba(0, 0, 0, 0.72);
            border-radius: 999px;
            background: linear-gradient(180deg, rgba(229, 193, 88, 0.92), rgba(145, 116, 22, 0.88));
          }

          .projects-district-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, rgba(255, 216, 99, 1), rgba(212, 175, 55, 0.95));
          }

          @media (max-width: 767px) {
            .projects-district-scroll::-webkit-scrollbar {
              height: 5px;
              width: 5px;
            }
          }
        `}</style>
      </main>
    </>
  );
}
