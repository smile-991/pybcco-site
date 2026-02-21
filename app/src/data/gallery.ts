// app/src/data/gallery.ts

export type GalleryCat = "finishing" | "concrete" | "entertainment";

export type GalleryItem = { src: string; alt: string };

export const GALLERY: Record<GalleryCat, { title: string; items: GalleryItem[] }> = {
  // ============================
  // 🏗 مشاريع العظم
  // (حسب ملفاتك: concrete-1.webp ... concrete-15.webp)
  // ============================
  concrete: {
    title: "مشاريع العظم",
    items: [
      { src: "/projects/concrete/concrete-1.webp", alt: "عظم 1" },
      { src: "/projects/concrete/concrete-2.webp", alt: "عظم 2" },
      { src: "/projects/concrete/concrete-3.webp", alt: "عظم 3" },
      { src: "/projects/concrete/concrete-4.webp", alt: "عظم 4" },
      { src: "/projects/concrete/concrete-5.webp", alt: "عظم 5" },
      { src: "/projects/concrete/concrete-6.webp", alt: "عظم 6" },
      { src: "/projects/concrete/concrete-7.webp", alt: "عظم 7" },
      { src: "/projects/concrete/concrete-8.webp", alt: "عظم 8" },
      { src: "/projects/concrete/concrete-9.webp", alt: "عظم 9" },
      { src: "/projects/concrete/concrete-10.webp", alt: "عظم 10" },
      { src: "/projects/concrete/concrete-11.webp", alt: "عظم 11" },
      { src: "/projects/concrete/concrete-12.webp", alt: "عظم 12" },
      { src: "/projects/concrete/concrete-13.webp", alt: "عظم 13" },
      { src: "/projects/concrete/concrete-14.webp", alt: "عظم 14" },
      { src: "/projects/concrete/concrete-15.webp", alt: "عظم 15" },
    ],
  },

  // ============================
  // 🏡 مشاريع التشطيب
  // (حسب ملفاتك: finishing-01.webp ... finishing-22.webp)
  // ============================
  finishing: {
    title: "مشاريع التشطيب",
    items: [
      { src: "/projects/finishing/finishing-01.webp", alt: "تشطيب 1" },
      { src: "/projects/finishing/finishing-02.webp", alt: "تشطيب 2" },
      { src: "/projects/finishing/finishing-03.webp", alt: "تشطيب 3" },
      { src: "/projects/finishing/finishing-04.webp", alt: "تشطيب 4" },
      { src: "/projects/finishing/finishing-05.webp", alt: "تشطيب 5" },
      { src: "/projects/finishing/finishing-06.webp", alt: "تشطيب 6" },
      { src: "/projects/finishing/finishing-07.webp", alt: "تشطيب 7" },
      { src: "/projects/finishing/finishing-08.webp", alt: "تشطيب 8" },
      { src: "/projects/finishing/finishing-09.webp", alt: "تشطيب 9" },
      { src: "/projects/finishing/finishing-10.webp", alt: "تشطيب 10" },
      { src: "/projects/finishing/finishing-11.webp", alt: "تشطيب 11" },
      { src: "/projects/finishing/finishing-12.webp", alt: "تشطيب 12" },
      { src: "/projects/finishing/finishing-13.webp", alt: "تشطيب 13" },
      { src: "/projects/finishing/finishing-14.webp", alt: "تشطيب 14" },
      { src: "/projects/finishing/finishing-15.webp", alt: "تشطيب 15" },
      { src: "/projects/finishing/finishing-16.webp", alt: "تشطيب 16" },
      { src: "/projects/finishing/finishing-17.webp", alt: "تشطيب 17" },
      { src: "/projects/finishing/finishing-18.webp", alt: "تشطيب 18" },
      { src: "/projects/finishing/finishing-19.webp", alt: "تشطيب 19" },
      { src: "/projects/finishing/finishing-20.webp", alt: "تشطيب 20" },
      { src: "/projects/finishing/finishing-21.webp", alt: "تشطيب 21" },
      { src: "/projects/finishing/finishing-22.webp", alt: "تشطيب 22" },
    ],
  },

  // ============================
  // 🎡 مشاريع الترفيه
  // (حسب ملفاتك: entertainment-01.webp ... entertainment-19.webp)
  // ============================
  entertainment: {
    title: "مشاريع الترفيه",
    items: [
      { src: "/projects/entertainment/entertainment-01.webp", alt: "ترفيه 1" },
      { src: "/projects/entertainment/entertainment-02.webp", alt: "ترفيه 2" },
      { src: "/projects/entertainment/entertainment-03.webp", alt: "ترفيه 3" },
      { src: "/projects/entertainment/entertainment-04.webp", alt: "ترفيه 4" },
      { src: "/projects/entertainment/entertainment-05.webp", alt: "ترفيه 5" },
      { src: "/projects/entertainment/entertainment-06.webp", alt: "ترفيه 6" },
      { src: "/projects/entertainment/entertainment-07.webp", alt: "ترفيه 7" },
      { src: "/projects/entertainment/entertainment-08.webp", alt: "ترفيه 8" },
      { src: "/projects/entertainment/entertainment-09.webp", alt: "ترفيه 9" },
      { src: "/projects/entertainment/entertainment-10.webp", alt: "ترفيه 10" },
      { src: "/projects/entertainment/entertainment-11.webp", alt: "ترفيه 11" },
      { src: "/projects/entertainment/entertainment-12.webp", alt: "ترفيه 12" },
      { src: "/projects/entertainment/entertainment-13.webp", alt: "ترفيه 13" },
      { src: "/projects/entertainment/entertainment-14.webp", alt: "ترفيه 14" },
      { src: "/projects/entertainment/entertainment-15.webp", alt: "ترفيه 15" },
      { src: "/projects/entertainment/entertainment-16.webp", alt: "ترفيه 16" },
      { src: "/projects/entertainment/entertainment-17.webp", alt: "ترفيه 17" },
      { src: "/projects/entertainment/entertainment-18.webp", alt: "ترفيه 18" },
      { src: "/projects/entertainment/entertainment-19.webp", alt: "ترفيه 19" },
    ],
  },
};