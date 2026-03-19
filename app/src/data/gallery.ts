import rawGallery from "./gallery.json";

export type GalleryCat = "finishing" | "concrete" | "entertainment";

export type GalleryItem = {
  src: string;
  alt: string;
};

type GalleryData = Record<
  GalleryCat,
  {
    title: string;
    items: GalleryItem[];
  }
>;

export const GALLERY = rawGallery as GalleryData;