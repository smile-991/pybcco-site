import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY, type GalleryCat } from "../data/gallery";
import SeoHead from "@/components/SeoHead";

type Cat = GalleryCat;

const CATS: { key: Cat; label: string }[] = [
  { key: "finishing", label: "تشطيب" },
  { key: "concrete", label: "عظم" },
  { key: "entertainment", label: "ترفيه" },
];

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
  const [tried, setTried] = useState<{ webp?: boolean; jpg?: boolean; jpeg?: boolean }>({});

  // 🔹 هذا هو الإصلاح
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
      return;
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
  const [cat, setCat] = useState<Cat>("finishing");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const title = GALLERY[cat].title;
  const items = GALLERY[cat].items;

  const pageTitle = "معرض مشاريع بنيان الهرم | تشطيب وعظم وترميم بالرياض";
  const pageDescription =
    "شاهد معرض مشاريع بنيان الهرم للمقاولات بالرياض: تشطيب فلل وشقق، بناء عظم، وأعمال ترفيه.";
  const canonical = "https://pybcco.com/projects";
  const ogImage = "https://pybcco.com/og.jpg";

  const selectedImage = selectedIndex !== null ? items[selectedIndex] : null;

  const closeLightbox = () => setSelectedIndex(null);

  const showPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % items.length);
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
  }, [selectedIndex]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [cat]);

  return (
    <main dir="rtl" className="bg-white">
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
        ogImage={ogImage}
      />

      <section className="pt-28 pb-10">
        <div className="container-custom px-4">
          <div className="text-center">
            <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
              معرض الأعمال
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              عظم / تشطيب / <span className="text-gold">ترفيه</span>
            </h1>

            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              اختر القسم وشاهد نماذج حقيقية من أعمال بنيان الهرم.
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-8 sticky top-[90px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {CATS.map((t) => {
                const active = cat === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setCat(t.key)}
                    className={[
                      "px-4 py-2 rounded-xl text-sm font-bold transition border",
                      active
                        ? "bg-gold text-black border-gold"
                        : "bg-white text-gray-900 border-gray-200 hover:bg-gold/10 hover:border-gold/40",
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="text-center mt-2 text-sm text-gray-600">{title}</div>
          </div>

          {/* Grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {items.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className="group rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm text-right"
              >
                <SmartImage
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-44 md:h-52 lg:h-56 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
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
              className="absolute top-3 left-3 text-white"
            >
              <X />
            </button>

            <button
              onClick={showPrev}
              className="absolute right-3 top-1/2 text-white"
            >
              <ChevronRight />
            </button>

            <button
              onClick={showNext}
              className="absolute left-3 top-1/2 text-white"
            >
              <ChevronLeft />
            </button>

            <SmartImage
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full max-h-[82vh] object-contain"
            />

            <div className="text-center text-white mt-3">
              {selectedIndex! + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}