import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY, type GalleryCat } from "../data/gallery";
import SeoHead from "@/components/SeoHead";

type Cat = GalleryCat;

const CATS: { key: Cat; label: string }[] = [
  { key: "finishing", label: "تشطيب" },
  { key: "concrete", label: "عظم" },
  { key: "entertainment", label: "ترفيه" },
];

function toAbsoluteUrl(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `https://pybcco.com${src.startsWith("/") ? src : `/${src}`}`;
}

function buildProjectsGalleryJsonLd() {
  const allItems = CATS.flatMap((cat) =>
    GALLERY[cat.key].items.map((img, index) => ({
      catKey: cat.key,
      catLabel: cat.label,
      img,
      index,
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://pybcco.com/projects#collection",
    name: "معرض مشاريع بنيان الهرم للمقاولات | تشطيب وعظم وترفيه بالرياض",
    url: "https://pybcco.com/projects",
    description:
      "معرض مشاريع بنيان الهرم للمقاولات بالرياض ويشمل صور تشطيب وعظم وترفيه من أعمال منفذة بشكل فعلي.",
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: allItems.length,
      itemListElement: allItems.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ImageObject",
          contentUrl: toAbsoluteUrl(entry.img.src),
          url: toAbsoluteUrl(entry.img.src),
          name: entry.img.alt,
          description: `${entry.img.alt} - ${entry.catLabel}`,
          representativeOfPage: index === 0,
          creator: {
            "@type": "Organization",
            name: "بنيان الهرم للمقاولات – PYBCCO",
            url: "https://pybcco.com",
          },
        },
      })),
    },
  };
}

function SmartImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [tried, setTried] = useState<{
    webp?: boolean;
    jpg?: boolean;
    jpeg?: boolean;
  }>({});

  useEffect(() => {
    setCurrentSrc(src);
    setTried({});
  }, [src]);

  const toWebp = (s: string) => s.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const toJpg = (s: string) => s.replace(/\.(webp|jpeg|png)$/i, ".jpg");
  const toJpeg = (s: string) => s.replace(/\.(webp|jpg|png)$/i, ".jpeg");

  const handleError = () => {
    if (!tried.webp && !currentSrc.toLowerCase().endsWith(".webp")) {
      setTried((p) => ({ ...p, webp: true }));
      setCurrentSrc(toWebp(currentSrc));
      return;
    }
    if (!tried.jpg && !currentSrc.toLowerCase().endsWith(".jpg")) {
      setTried((p) => ({ ...p, jpg: true }));
      setCurrentSrc(toJpg(currentSrc));
      return;
    }
    if (!tried.jpeg && !currentSrc.toLowerCase().endsWith(".jpeg")) {
      setTried((p) => ({ ...p, jpeg: true }));
      setCurrentSrc(toJpeg(currentSrc));
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={handleError}
      className={className}
    />
  );
}

export default function ProjectsGallery() {
  const gallerySchema = useMemo(() => buildProjectsGalleryJsonLd(), []);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const sections = useMemo(
    () =>
      CATS.map((cat) => ({
        key: cat.key,
        label: cat.label,
        title: GALLERY[cat.key].title,
        items: GALLERY[cat.key].items,
      })),
    []
  );

  const allItems = useMemo(
    () =>
      sections.flatMap((section) =>
        section.items.map((img) => ({
          ...img,
          categoryLabel: section.label,
          categoryTitle: section.title,
        }))
      ),
    [sections]
  );

  const pageTitle = "معرض مشاريع بنيان الهرم | تشطيب وعظم وترفيه بالرياض";
  const pageDescription =
    "شاهد معرض مشاريع بنيان الهرم للمقاولات بالرياض: تشطيب فلل وشقق، بناء عظم، وأعمال ترفيه من مشاريع منفذة فعليًا.";
  const canonical = "https://pybcco.com/projects";
  const ogImage = "https://pybcco.com/og.jpg";

  const selectedImage = selectedIndex !== null ? allItems[selectedIndex] : null;

  const closeLightbox = () => setSelectedIndex(null);

  const showPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + allItems.length) % allItems.length);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % allItems.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, allItems.length]);

  return (
    <main dir="rtl" className="bg-white">
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
        ogImage={ogImage}
        jsonLd={gallerySchema}
      />

      <section className="pt-28 pb-12">
        <div className="container-custom px-4">
          <div className="text-center">
            <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
              معرض الأعمال
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              معرض مشاريع <span className="text-gold">بنيان الهرم</span>
            </h1>

            <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
              شاهد جميع نماذج الأعمال المنفذة فعليًا ضمن أقسام التشطيب والعظم
              والترفيه داخل صفحة واحدة واضحة وسهلة التصفح.
            </p>
          </div>

          <div className="mt-10 space-y-12">
            {sections.map((section) => {
              const sectionStartIndex = allItems.findIndex(
                (item) =>
                  item.categoryLabel === section.label &&
                  item.categoryTitle === section.title
              );

              return (
                <section key={section.key} aria-labelledby={`gallery-${section.key}`}>
                  <div className="mb-5 text-center">
                    <h2
                      id={`gallery-${section.key}`}
                      className="text-2xl sm:text-3xl font-extrabold text-gray-900"
                    >
                      {section.label}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                      {section.title}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {section.items.map((img, i) => (
                      <button
                        key={`${section.key}-${i}`}
                        type="button"
                        onClick={() => setSelectedIndex(sectionStartIndex + i)}
                        className="group rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm text-right"
                        aria-label={`فتح الصورة: ${img.alt}`}
                      >
                        <SmartImage
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-44 md:h-52 lg:h-56 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const endX = e.changedTouches[0].clientX;
              const delta = endX - touchStartX;

              if (delta > 50) showPrev();
              if (delta < -50) showNext();

              setTouchStartX(null);
            }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-3 left-3 text-white z-10"
              aria-label="إغلاق"
            >
              <X />
            </button>

            <button
              onClick={showPrev}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white z-10"
              aria-label="الصورة السابقة"
            >
              <ChevronRight />
            </button>

            <button
              onClick={showNext}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-10"
              aria-label="الصورة التالية"
            >
              <ChevronLeft />
            </button>

            <SmartImage
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full max-h-[82vh] object-contain"
            />

            <div className="text-center text-white mt-3 space-y-1">
              <div className="text-sm text-white/80">
                {selectedImage.categoryLabel}
              </div>
              <div className="font-medium">{selectedImage.alt}</div>
              <div className="text-sm">
                {selectedIndex! + 1} / {allItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}