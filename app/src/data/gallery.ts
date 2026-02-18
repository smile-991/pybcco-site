// app/src/data/gallery.ts

export type GalleryCat = "finishing" | "concrete" | "entertainment";

export type GalleryItem = { src: string; alt: string };

export const GALLERY: Record<
  GalleryCat,
  { title: string; items: GalleryItem[] }
> = {
  // ============================
  // 🏗 مشاريع العظم
  // ============================
  concrete: {
    title: "مشاريع العظم",
    items: [
      { src: "/projects/concrete/concrete-1.jpg", alt: "عظم 1" },
      { src: "/projects/concrete/concrete-2.jpg", alt: "عظم 2" },
      { src: "/projects/concrete/concrete-3.jpg", alt: "عظم 3" },
      { src: "/projects/concrete/concrete-4.jpg", alt: "عظم 4" },
      { src: "/projects/concrete/concrete-5.jpg", alt: "عظم 5" },
      { src: "/projects/concrete/concrete-6.jpg", alt: "عظم 6" },
      { src: "/projects/concrete/concrete-7.jpg", alt: "عظم 7" },
      { src: "/projects/concrete/concrete-8.jpg", alt: "عظم 8" },
      { src: "/projects/concrete/concrete-9.jpg", alt: "عظم 9" },
      { src: "/projects/concrete/concrete-10.jpg", alt: "عظم 10" },
      { src: "/projects/concrete/concrete-11.jpg", alt: "عظم 11" },
      { src: "/projects/concrete/concrete-12.jpg", alt: "عظم 12" },
      { src: "/projects/concrete/concrete-13.jpg", alt: "عظم 13" },
      { src: "/projects/concrete/concrete-14.jpg", alt: "عظم 14" },
      { src: "/projects/concrete/concrete-15.jpg", alt: "عظم 15" },
    ],
  },

  // ============================
  // 🏡 مشاريع التشطيب
  // ============================
  finishing: {
    title: "مشاريع التشطيب",
    items: [
      { src: "/projects/finishing/finishing-01.jpg", alt: "تشطيب 1" },
      { src: "/projects/finishing/finishing-02.jpg", alt: "تشطيب 2" },
      { src: "/projects/finishing/finishing-03.jpg", alt: "تشطيب 3" },
      { src: "/projects/finishing/finishing-04.jpg", alt: "تشطيب 4" },
      { src: "/projects/finishing/finishing-05.jpg", alt: "تشطيب 5" },
      { src: "/projects/finishing/finishing-06.jpg", alt: "تشطيب 6" },
      { src: "/projects/finishing/finishing-07.jpg", alt: "تشطيب 7" },
      { src: "/projects/finishing/finishing-08.jpg", alt: "تشطيب 8" },
      { src: "/projects/finishing/finishing-09.jpg", alt: "تشطيب 9" },
      { src: "/projects/finishing/finishing-10.jpg", alt: "تشطيب 10" },
      { src: "/projects/finishing/finishing-11.jpg", alt: "تشطيب 11" },
      { src: "/projects/finishing/finishing-12.jpg", alt: "تشطيب 12" },
      { src: "/projects/finishing/finishing-13.jpg", alt: "تشطيب 13" },
      { src: "/projects/finishing/finishing-14.jpg", alt: "تشطيب 14" },
      { src: "/projects/finishing/finishing-15.jpg", alt: "تشطيب 15" },
      { src: "/projects/finishing/finishing-16.jpg", alt: "تشطيب 16" },
      { src: "/projects/finishing/finishing-17.jpg", alt: "تشطيب 17" },
      { src: "/projects/finishing/finishing-18.jpg", alt: "تشطيب 18" },
      { src: "/projects/finishing/finishing-19.jpg", alt: "تشطيب 19" },
      { src: "/projects/finishing/finishing-20.jpg", alt: "تشطيب 20" },
      { src: "/projects/finishing/finishing-21.jpg", alt: "تشطيب 21" },
      { src: "/projects/finishing/finishing-22.jpg", alt: "تشطيب 22" },
    ],
  },

  // ============================
  // 🎡 مشاريع الترفيه
  // ============================
  entertainment: {
    title: "مشاريع الترفيه",
    items: [
      { src: "/projects/entertainment/entertainment-01.jpg", alt: "ترفيه 1" },
      { src: "/projects/entertainment/entertainment-02.jpg", alt: "ترفيه 2" },
      { src: "/projects/entertainment/entertainment-03.jpg", alt: "ترفيه 3" },
      { src: "/projects/entertainment/entertainment-04.jpg", alt: "ترفيه 4" },
      { src: "/projects/entertainment/entertainment-05.jpg", alt: "ترفيه 5" },
      { src: "/projects/entertainment/entertainment-06.jpg", alt: "ترفيه 6" },
      { src: "/projects/entertainment/entertainment-07.jpg", alt: "ترفيه 7" },
      { src: "/projects/entertainment/entertainment-08.jpg", alt: "ترفيه 8" },
      { src: "/projects/entertainment/entertainment-09.jpg", alt: "ترفيه 9" },
      { src: "/projects/entertainment/entertainment-10.jpg", alt: "ترفيه 10" },
      { src: "/projects/entertainment/entertainment-11.jpg", alt: "ترفيه 11" },
      { src: "/projects/entertainment/entertainment-12.jpg", alt: "ترفيه 12" },
      { src: "/projects/entertainment/entertainment-13.jpg", alt: "ترفيه 13" },
      { src: "/projects/entertainment/entertainment-14.jpg", alt: "ترفيه 14" },
      { src: "/projects/entertainment/entertainment-15.jpg", alt: "ترفيه 15" },
      { src: "/projects/entertainment/entertainment-16.jpg", alt: "ترفيه 16" },
      { src: "/projects/entertainment/entertainment-17.jpg", alt: "ترفيه 17" },
      { src: "/projects/entertainment/entertainment-18.jpg", alt: "ترفيه 18" },
      { src: "/projects/entertainment/entertainment-19.jpg", alt: "ترفيه 19" },
    ],
  },
};
