import { useMemo, useState } from "react";
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
    id: "olaya",
    name: "العليا",
    top: "48%",
    left: "47%",
    projects: [
      {
        id: "olaya-luxury-finishing",
        title: "تشطيب داخلي فاخر في العليا",
        district: "العليا",
        type: "تشطيب",
        status: "مكتمل",
        area: "مساحات داخلية مختارة",
        duration: "حسب نطاق العمل",
        image: "/projects/finishing/finishing-01.webp",
        hasVideo: true,
        href: "/projects",
        description:
          "نموذج تشطيب داخلي فاخر يبرز جودة التفاصيل النهائية وتناسق المواد والتنفيذ.",
      },
    ],
  },
  {
    id: "yasmin",
    name: "الياسمين",
    top: "31%",
    left: "47%",
    projects: [
      {
        id: "yasmin-villa-renovation",
        title: "ترميم فيلا سكنية في حي الياسمين",
        district: "الياسمين",
        type: "ترميم",
        status: "مكتمل",
        area: "فيلا سكنية",
        duration: "حسب مراحل الترميم",
        image: "/projects/finishing/finishing-02.webp",
        hasVideo: true,
        href: "/case-study-villa-renovation-riyadh",
        description:
          "أعمال ترميم وتحسين للمساحات الداخلية والخارجية مع رفع جودة الاستخدام قبل التسليم.",
      },
    ],
  },
  {
    id: "malqa",
    name: "الملقا",
    top: "30%",
    left: "40%",
    projects: [
      {
        id: "malqa-finishing",
        title: "مشروع تشطيب في حي الملقا",
        district: "الملقا",
        type: "تشطيب",
        status: "مكتمل",
        area: "مشروع سكني",
        duration: "حسب نطاق البنود",
        image: "/projects/finishing/finishing-03.webp",
        hasVideo: false,
        href: "/contractor-almalqa-riyadh",
        description:
          "تنفيذ أعمال تشطيب سكنية ضمن حي الملقا مع التركيز على جودة التفاصيل والتسليم المنظم.",
      },
    ],
  },
  {
    id: "qirawan",
    name: "القيروان",
    top: "25%",
    left: "35%",
    projects: [
      {
        id: "qirawan-shell",
        title: "أعمال بناء عظم في القيروان",
        district: "القيروان",
        type: "عظم",
        status: "جاري التنفيذ",
        area: "فيلا سكنية",
        duration: "مرحلة تنفيذ",
        image: "/projects/concrete/concrete-01.webp",
        hasVideo: false,
        href: "/projects",
        description:
          "أعمال بناء عظم تشمل مراحل التنفيذ الإنشائي الأساسية وفق متطلبات المشروع.",
      },
    ],
  },
  {
    id: "murabba",
    name: "المربع",
    top: "55%",
    left: "49%",
    projects: [
      {
        id: "murabba-bathroom-finishing",
        title: "تشطيب حمامات فاخرة في المربع",
        district: "المربع",
        type: "تشطيب",
        status: "مكتمل",
        area: "حمامات فاخرة",
        duration: "تنفيذ مختار",
        image: "/projects/finishing/finishing-04.webp",
        hasVideo: true,
        href: "/videos",
        description:
          "تنفيذ تشطيب حمامات فاخرة بتفاصيل نهائية راقية تناسب المشاريع السكنية والمعارض.",
      },
    ],
  },
  {
    id: "narjis",
    name: "النرجس",
    top: "22%",
    left: "50%",
    projects: [
      {
        id: "narjis-facade",
        title: "أعمال واجهات في حي النرجس",
        district: "النرجس",
        type: "واجهات",
        status: "مكتمل",
        area: "واجهة سكنية",
        duration: "حسب الأعمال",
        image: "/projects/finishing/finishing-05.webp",
        hasVideo: false,
        href: "/projects",
        description:
          "أعمال تحسين واجهات ومعالجات خارجية لرفع جودة المظهر النهائي للمبنى.",
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
        name: project.title,
        url: `${SITE_URL}${project.href}`,
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
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictPin>(
    DISTRICTS[0]
  );

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

  const selectedVisibleDistrict =
    filteredDistricts.find((district) => district.id === selectedDistrict.id) ||
    filteredDistricts[0] ||
    null;

  const hasActiveFilters =
    selectedType !== "الكل" ||
    selectedStatus !== "الكل" ||
    searchQuery.trim().length > 0;

  const resultsLabel = searchQuery.trim()
    ? `تم العثور على ${totalProjects} مشروع مطابق للبحث`
    : `${totalProjects} نتيجة`;

  function resetFilters() {
    setSelectedType("الكل");
    setSelectedStatus("الكل");
    setSearchQuery("");
    setSelectedDistrict(DISTRICTS[0]);
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
        <section className="relative h-screen min-h-[820px] w-full overflow-hidden bg-black">
          <img
            src={MAP_IMAGE}
            alt="خريطة مشاريع بنيان الهرم للمقاولات داخل أحياء الرياض"
            className="absolute inset-0 h-full w-full select-none object-cover opacity-95 [backface-visibility:hidden] [image-rendering:auto] [transform:translateZ(0)_scale(1.1)]"
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

          <div className="absolute right-4 top-24 z-20 max-w-[460px] origin-top-right scale-[0.60] md:right-8 lg:right-12 xl:max-w-[500px] xl:scale-[0.64]">
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

          <div className="absolute left-4 top-24 z-30 w-[calc(100%-2rem)] max-w-[360px] origin-top-left scale-[0.60] animate-[mapFadeLeft_.6s_cubic-bezier(.22,1,.36,1)_both] rounded-[2rem] border border-white/10 bg-black/60 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:left-8 lg:left-12 xl:scale-[0.64]">
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

              <div className="rounded-full border border-[#D4AF37]/30 px-3 py-1 text-xs text-[#D4AF37]">
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
                      onClick={() => setSelectedType(type)}
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
                      onClick={() => setSelectedStatus(status)}
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
                        onClick={() => setSelectedDistrict(district)}
                        className={`rounded-full border px-3 py-2 text-xs transition duration-300 ${
                          selectedVisibleDistrict?.id === district.id
                            ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]"
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
                onClick={() => setSelectedDistrict(district)}
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

                <span className="absolute right-8 top-1/2 min-w-max -translate-y-1/2 rounded-full border border-white/10 bg-black/80 px-3.5 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:border-[#D4AF37]/60 group-hover:text-[#D4AF37]">
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

          <div className="absolute bottom-6 left-4 right-4 z-30 hidden origin-bottom scale-[0.68] md:block md:left-8 md:right-8 lg:left-12 lg:right-12 xl:scale-[0.72]">
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

          <aside className="absolute bottom-0 right-0 z-40 w-full max-h-[72vh] animate-[mapFadeUp_.5s_cubic-bezier(.22,1,.36,1)_both] overflow-hidden rounded-t-[2rem] border border-white/10 bg-black/72 p-4 shadow-2xl shadow-black/45 backdrop-blur-2xl md:bottom-20 md:right-8 md:w-[calc(100%-2rem)] md:max-h-none md:max-w-[520px] md:origin-bottom-right md:scale-[0.60] md:rounded-[2rem] md:p-5 lg:right-12 xl:max-w-[560px] xl:scale-[0.64]">
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
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDistrict(filteredDistricts[0])}
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:border-[#D4AF37]/50 hover:text-white"
                    aria-label="إعادة ضبط الحي المختار"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-[46vh] space-y-3 overflow-y-auto pr-1 md:max-h-[330px]">
                  {selectedVisibleDistrict.projects.map((project) => (
                    <article
                      key={project.id}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
                    >
                      <div className="grid gap-4 p-3 md:grid-cols-[145px_1fr] md:p-3">
                        <div className="relative h-32 overflow-hidden rounded-xl bg-white/5 md:h-full md:min-h-[128px]">
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

                          <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/60 md:text-sm md:leading-7">
                            {project.description}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-white/55">
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
                              <Link to={project.href}>
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
                              <Link to="/villa-finishing-price-riyadh">
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

          <div className="fixed bottom-6 left-4 z-50 hidden origin-bottom-left scale-[0.64] flex-col gap-2 md:flex xl:scale-[0.68]">
            <Button
              asChild
              className="rounded-full bg-[#D4AF37] px-5 text-black shadow-2xl shadow-[#D4AF37]/20 hover:bg-[#e5c158]"
            >
              <Link to="/villa-finishing-price-riyadh">
                احسب تكلفة مشروعك
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 bg-black/65 px-5 text-white backdrop-blur-xl hover:bg-white/10"
            >
              <Link to="/#contact">طلب زيارة مجانية</Link>
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
                <Link to="/projects">
                  مشاهدة معرض المشاريع
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <Link to="/videos">مشاهدة فيديوهات التنفيذ</Link>
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
                  داخل أحياء مثل العليا، الياسمين، الملقا، النرجس، القيروان،
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
                        setSelectedDistrict(district);
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
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-white transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                  >
                    تشطيب فلل بالرياض
                  </Link>
                  <Link
                    to="/villa-renovation-riyadh"
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-white transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                  >
                    ترميم فلل بالرياض
                  </Link>
                  <Link
                    to="/villa-bone-construction-riyadh"
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-white transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                  >
                    بناء عظم بالرياض
                  </Link>
                  <Link
                    to="/construction-company-riyadh"
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
        `}</style>
      </main>
    </>
  );
}
