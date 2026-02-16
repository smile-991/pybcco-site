import { useMemo, useState } from "react";

type TabKey = "finishing" | "concrete" | "entertainment";

export default function ProjectsGallery() {
  const [tab, setTab] = useState<TabKey>("finishing");

  // ✍️ حط الروابط حسب أسماء صورك (بدون تغيير أسماء الملفات)
  const finishing = useMemo(
    () => [
      "/projects/finishing/IMG_1.webp",
      "/projects/finishing/IMG_2.webp",
    ],
    []
  );

  const concrete = useMemo(
    () => [
      "/projects/concrete/IMG_1.webp",
      "/projects/concrete/IMG_2.webp",
    ],
    []
  );

  const entertainment = useMemo(
    () => [
      "/projects/entertainment/IMG_1.webp",
      "/projects/entertainment/IMG_2.webp",
    ],
    []
  );

  const images =
    tab === "finishing" ? finishing : tab === "concrete" ? concrete : entertainment;

  const tabTitle =
    tab === "finishing"
      ? "أعمال التشطيبات"
      : tab === "concrete"
      ? "أعمال الخرسانات"
      : "أعمال الترفيه";

  return (
    <div className="min-h-screen bg-black text-white py-24" dir="rtl">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          معرض أعمال بنيان الهرم
        </h1>

        <p className="text-white/70 text-center max-w-3xl mx-auto mb-10">
          صور مختارة من أعمالنا تشمل التشطيبات والخرسانات ومشاريع الترفيه.
        </p>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <TabButton active={tab === "finishing"} onClick={() => setTab("finishing")}>
            أعمال التشطيبات
          </TabButton>
          <TabButton active={tab === "concrete"} onClick={() => setTab("concrete")}>
            أعمال الخرسانات
          </TabButton>
          <TabButton
            active={tab === "entertainment"}
            onClick={() => setTab("entertainment")}
          >
            أعمال الترفيه
          </TabButton>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">{tabTitle}</h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <a
              key={i}
              href={src}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <img
                src={src}
                alt={tabTitle}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: any;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-5 py-3 rounded-xl font-semibold transition",
        active ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
