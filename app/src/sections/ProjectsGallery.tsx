import { useState } from "react";
import { GALLERY, type GalleryCat } from "../data/gallery";

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

  const handleError = () => {
    if (currentSrc.endsWith(".jpg"))
      setCurrentSrc(currentSrc.replace(/\.jpg$/i, ".jpeg"));
    else if (currentSrc.endsWith(".jpeg"))
      setCurrentSrc(currentSrc.replace(/\.jpeg$/i, ".jpg"));
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      onError={handleError}
      className={className}
    />
  );
}

export default function ProjectsGallery() {
  const [cat, setCat] = useState<Cat>("entertainment");

  const title = GALLERY[cat].title;
  const items = GALLERY[cat].items;

  return (
    <main dir="rtl" className="bg-white">
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

            <div className="text-center mt-2 text-sm text-gray-600">
              {title}
            </div>
          </div>

          {/* Grid */}
          <div
            key={cat}
            className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {items.map((img, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm"
              >
                <SmartImage
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-40 md:h-52 lg:h-56 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>

          <div className="h-10" />
        </div>
      </section>
    </main>
  );
}
