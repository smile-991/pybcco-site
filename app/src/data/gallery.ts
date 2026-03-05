// app/src/data/gallery.ts

export type GalleryCat = "finishing" | "concrete" | "entertainment";

export type GalleryItem = { src: string; alt: string };

const CITY = "الرياض";

const altConcrete = (n: number) => `مشروع عظم فيلا سكنية في ${CITY} — صورة ${n}`;
const altFinishing = (n: number) => `مشروع تشطيب فيلا سكنية في ${CITY} — صورة ${n}`;
const altEntertainment = (n: number) => `مشروع ترفيهي (تنفيذ وتجهيز) في ${CITY} — صورة ${n}`;

export const GALLERY: Record<GalleryCat, { title: string; items: GalleryItem[] }> = {
  // ============================
  // 🏗 مشاريع العظم
  // ============================
  concrete: {
    title: "مشاريع العظم",
    items: [
      { src: "/projects/concrete/concrete-1.webp", alt: altConcrete(1) },
      { src: "/projects/concrete/concrete-2.webp", alt: altConcrete(2) },
      { src: "/projects/concrete/concrete-3.webp", alt: altConcrete(3) },
      { src: "/projects/concrete/concrete-4.webp", alt: altConcrete(4) },
      { src: "/projects/concrete/concrete-5.webp", alt: altConcrete(5) },
      { src: "/projects/concrete/concrete-6.webp", alt: altConcrete(6) },
      { src: "/projects/concrete/concrete-7.webp", alt: altConcrete(7) },
      { src: "/projects/concrete/concrete-8.webp", alt: altConcrete(8) },
      { src: "/projects/concrete/concrete-9.webp", alt: altConcrete(9) },
      { src: "/projects/concrete/concrete-10.webp", alt: altConcrete(10) },
      { src: "/projects/concrete/concrete-11.webp", alt: altConcrete(11) },
      { src: "/projects/concrete/concrete-12.webp", alt: altConcrete(12) },
      { src: "/projects/concrete/concrete-13.webp", alt: altConcrete(13) },
      { src: "/projects/concrete/concrete-14.webp", alt: altConcrete(14) },
      { src: "/projects/concrete/concrete-15.webp", alt: altConcrete(15) },
    ],
  },

  // ============================
  // 🏡 مشاريع التشطيب
  // ============================
  finishing: {
    title: "مشاريع التشطيب",
    items: [
      { src: "/projects/finishing/finishing-01.webp", alt: altFinishing(1) },
      { src: "/projects/finishing/finishing-02.webp", alt: altFinishing(2) },
      { src: "/projects/finishing/finishing-03.webp", alt: altFinishing(3) },
      { src: "/projects/finishing/finishing-04.webp", alt: altFinishing(4) },
      { src: "/projects/finishing/finishing-05.webp", alt: altFinishing(5) },
      { src: "/projects/finishing/finishing-06.webp", alt: altFinishing(6) },
      { src: "/projects/finishing/finishing-07.webp", alt: altFinishing(7) },
      { src: "/projects/finishing/finishing-08.webp", alt: altFinishing(8) },
      { src: "/projects/finishing/finishing-09.webp", alt: altFinishing(9) },
      { src: "/projects/finishing/finishing-10.webp", alt: altFinishing(10) },
      { src: "/projects/finishing/finishing-11.webp", alt: altFinishing(11) },
      { src: "/projects/finishing/finishing-12.webp", alt: altFinishing(12) },
      { src: "/projects/finishing/finishing-13.webp", alt: altFinishing(13) },
      { src: "/projects/finishing/finishing-14.webp", alt: altFinishing(14) },
      { src: "/projects/finishing/finishing-15.webp", alt: altFinishing(15) },
      { src: "/projects/finishing/finishing-16.webp", alt: altFinishing(16) },
      { src: "/projects/finishing/finishing-17.webp", alt: altFinishing(17) },
      { src: "/projects/finishing/finishing-18.webp", alt: altFinishing(18) },
      { src: "/projects/finishing/finishing-19.webp", alt: altFinishing(19) },
      { src: "/projects/finishing/finishing-20.webp", alt: altFinishing(20) },
      { src: "/projects/finishing/finishing-21.webp", alt: altFinishing(21) },
      { src: "/projects/finishing/finishing-22.webp", alt: altFinishing(22) },
    ],
  },

  // ============================
  // 🎡 مشاريع الترفيه
  // ============================
  entertainment: {
    title: "مشاريع الترفيه",
    items: [
      { src: "/projects/entertainment/entertainment-01.webp", alt: altEntertainment(1) },
      { src: "/projects/entertainment/entertainment-02.webp", alt: altEntertainment(2) },
      { src: "/projects/entertainment/entertainment-03.webp", alt: altEntertainment(3) },
      { src: "/projects/entertainment/entertainment-04.webp", alt: altEntertainment(4) },
      { src: "/projects/entertainment/entertainment-05.webp", alt: altEntertainment(5) },
      { src: "/projects/entertainment/entertainment-06.webp", alt: altEntertainment(6) },
      { src: "/projects/entertainment/entertainment-07.webp", alt: altEntertainment(7) },
      { src: "/projects/entertainment/entertainment-08.webp", alt: altEntertainment(8) },
      { src: "/projects/entertainment/entertainment-09.webp", alt: altEntertainment(9) },
      { src: "/projects/entertainment/entertainment-10.webp", alt: altEntertainment(10) },
      { src: "/projects/entertainment/entertainment-11.webp", alt: altEntertainment(11) },
      { src: "/projects/entertainment/entertainment-12.webp", alt: altEntertainment(12) },
      { src: "/projects/entertainment/entertainment-13.webp", alt: altEntertainment(13) },
      { src: "/projects/entertainment/entertainment-14.webp", alt: altEntertainment(14) },
      { src: "/projects/entertainment/entertainment-15.webp", alt: altEntertainment(15) },
      { src: "/projects/entertainment/entertainment-16.webp", alt: altEntertainment(16) },
      { src: "/projects/entertainment/entertainment-17.webp", alt: altEntertainment(17) },
      { src: "/projects/entertainment/entertainment-18.webp", alt: altEntertainment(18) },
      { src: "/projects/entertainment/entertainment-19.webp", alt: altEntertainment(19) },
    ],
  },
};