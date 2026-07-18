import importedVideos from "./videos.json";

export const VIDEO_CATEGORIES = [
  "التشطيب",
  "الترميم",
  "قبل وبعد",
  "إدارة المشاريع",
  "البناء",
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

export type VideoItem = {
  slug: string;
  youtubeId: string;
  title: string;
  shortTitle: string;
  description: string;
  cover: string;
  uploadDate: string;
  duration: string;
  categories: VideoCategory[];
  keywords: string[];
  featured: boolean;
  relatedPage: string;
  relatedLabel: string;
};

const categorySet = new Set<string>(VIDEO_CATEGORIES);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isVideoItem(value: unknown): value is VideoItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const video = value as Record<string, unknown>;

  return (
    typeof video.slug === "string" &&
    typeof video.youtubeId === "string" &&
    typeof video.title === "string" &&
    typeof video.shortTitle === "string" &&
    typeof video.description === "string" &&
    typeof video.cover === "string" &&
    typeof video.uploadDate === "string" &&
    typeof video.duration === "string" &&
    Array.isArray(video.categories) &&
    video.categories.length > 0 &&
    video.categories.every(
      (category) =>
        typeof category === "string" && categorySet.has(category),
    ) &&
    isStringArray(video.keywords) &&
    typeof video.featured === "boolean" &&
    typeof video.relatedPage === "string" &&
    typeof video.relatedLabel === "string"
  );
}

const rawVideos: unknown = importedVideos;

if (!Array.isArray(rawVideos) || !rawVideos.every(isVideoItem)) {
  throw new Error("بيانات videos.json غير صحيحة أو تحتوي على حقول ناقصة.");
}

function assertUniqueValues(
  items: readonly VideoItem[],
  field: "slug" | "youtubeId",
): void {
  const values = new Set<string>();

  items.forEach((video) => {
    const value = video[field];

    if (values.has(value)) {
      throw new Error(`يوجد تكرار في حقل ${field}: ${value}`);
    }

    values.add(value);
  });
}

assertUniqueValues(rawVideos, "slug");
assertUniqueValues(rawVideos, "youtubeId");

export const videos: readonly VideoItem[] = Object.freeze(rawVideos);

export const featuredVideo =
  videos.find((video) => video.featured) ?? videos[0];

export function getVideoBySlug(slug: string): VideoItem | undefined {
  return videos.find((video) => video.slug === slug);
}

export function getYoutubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}`;
}

export function getYoutubeWatchUrl(youtubeId: string): string {
  return `https://youtube.com/shorts/${youtubeId}`;
}