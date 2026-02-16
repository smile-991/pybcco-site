import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type TabKey = "finishing" | "concrete" | "entertainment";

export default function ProjectsGallery() {
  const [tab, setTab] = useState<TabKey>("finishing");
  const [open, setOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string>("");

  const finishing = useMemo(
    () => [
      "/projects/finishing/20200711_101116.jpg",
      "/projects/finishing/20201111_223855.jpg",
      "/projects/finishing/20210207_153016.jpg",
      "/projects/finishing/20210223_213643.jpg",
      "/projects/finishing/20210223_213725.jpg",
      "/projects/finishing/20210223_214106.jpg",
      "/projects/finishing/20210302_141220_001.jpg",
      "/projects/finishing/20210302_141227.jpg",
      "/projects/finishing/20210403_164435.jpg",
      "/projects/finishing/20211003_205456.jpg",
      "/projects/finishing/20211003_205520.jpg",
      "/projects/finishing/20211003_205526.jpg",
      "/projects/finishing/20211003_205543.jpg",
      "/projects/finishing/6.jpg",
      "/projects/finishing/99_001.png",
      "/projects/finishing/IMG-20230924-WA0013.jpg",
      "/projects/finishing/IMG-20250814-WA0024.jpg",
      "/projects/finishing/IMG-20250905-WA0038.jpg",
      "/projects/finishing/IMG-20250906-WA0039.jpg",
      "/projects/finishing/IMG-20250916-WA0097.jpg",
      "/projects/finishing/IMG-20250921-WA0166.jpg",
      "/projects/finishing/IMG_20200804_052340.jpg",
    ],
    []
  );

  const entertainment = useMemo(
    () => [
      "/projects/entertainment/20201226_162127.jpg",
      "/projects/entertainment/20201227_165443.jpg",
      "/projects/entertainment/20231126_024030.jpg",
      "/projects/entertainment/IMG-20230915-WA0021.jpg",
      "/projects/entertainment/IMG-20230915-WA0022.jpg",
      "/projects/entertainment/IMG-20230915-WA0023.jpg",
      "/projects/entertainment/IMG-20231117-WA0119.jpg",
      "/projects/entertainment/IMG-20231117-WA0136.jpg",
      "/projects/entertainment/IMG-20231117-WA0161.jpg",
      "/projects/entertainment/IMG-20231119-WA0157.jpg",
      "/projects/entertainment/IMG-20231126-WA0059.jpg",
      "/projects/entertainment/IMG-20231128-WA0053.jpg",
      "/projects/entertainment/IMG-20231202-WA0001.jpg",
      "/projects/entertainment/IMG-20251020-WA0020.jpeg",
      "/projects/entertainment/IMG-20251023-WA0142.jpeg",
      "/projects/entertainment/IMG-20251023-WA0148.jpeg",
      "/projects/entertainment/IMG-20251023-WA0181.jpeg",
      "/projects/entertainment/IMG-20251026-WA0064.jpeg",
      "/projects/entertainment/صور_001.png",
    ],
    []
  );

  const concrete = useMemo(
    () => [
      "/projects/concrete/20250426_103629.jpg",
      "/projects/concrete/20250426_103637.jpg",
      "/projects/concrete/20250426_103643.jpg",
      "/projects/concrete/20250426_104512.jpg",
      "/projects/concrete/20250426_104515.jpg",
      "/projects/concrete/20250426_104711.jpg",
      "/projects/concrete/20250426_222103631.jpg",
      "/projects/concrete/20251104_145343.jpg",
      "/projects/concrete/20251104_145346.jpg",
      "/projects/concrete/20251104_145348.jpg",
      "/projects/concrete/20251104_145352.jpg",
      "/projects/concrete/IMG_20200804_051327_130.jpg",
      "/projects/concrete/خخخخ_001.png",
      "/projects/concrete/خخخخخخخخخ_001.png",
      "/projects/concrete/خخخخخخخخخخخخ_001.png",
    ],
    []
  );

  const images =
    tab === "finishing" ? finishing : tab === "concrete" ? concrete : entertainment;

  const tabTitle =
    tab === "finishing" ? "أعمال التشطيبات" : tab === "concrete" ? "أعمال الخرسانات" : "أعمال الترفيه";

  return (
    <div className="mb-10">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <Button
          size="sm"
          variant={tab === "finishing" ? "default" : "outline"}
          onClick={() => setTab("finishing")}
          className={tab === "finishing" ? "bg-gold text-black hover:bg-gold/90" : "hover:bg-gold/10 hover:text-gold"}
        >
          التشطيبات
        </Button>

        <Button
          size="sm"
          variant={tab === "concrete" ? "default" : "outline"}
          onClick={() => setTab("concrete")}
          className={tab === "concrete" ? "bg-gold text-black hover:bg-gold/90" : "hover:bg-gold/10 hover:text-gold"}
        >
          الخرسانات
        </Button>

        <Button
          size="sm"
          variant={tab === "entertainment" ? "default" : "outline"}
          onClick={() => setTab("entertainment")}
          className={tab === "entertainment" ? "bg-gold text-black hover:bg-gold/90" : "hover:bg-gold/10 hover:text-gold"}
        >
          الترفيه
        </Button>
      </div>

      {/* Title */}
      <div className="text-center mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          معرض صور <span className="text-gold">{tabTitle}</span>
        </h3>
        <p className="text-gray-600 mt-2">صور حقيقية من أعمال بنيان الهرم</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, idx) => {
          const safeSrc = encodeURI(src);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveSrc(safeSrc);
                setOpen(true);
              }}
              className="group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all bg-white"
              aria-label="Open image"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
  src={safeSrc}
  alt={`project-${idx + 1}`}
  loading="lazy"
  style={{ imageOrientation: "from-image" }}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>

              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20" />
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black" dir="rtl">
          {activeSrc ? (
            <img
  src={activeSrc}
  alt="Preview"
  style={{ imageOrientation: "from-image" }}
  className="w-full h-auto max-h-[85vh] object-contain"
/>

          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}