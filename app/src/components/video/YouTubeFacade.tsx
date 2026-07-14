import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { getYoutubeEmbedUrl } from "@/data/videos";

type YouTubeFacadeProps = {
  youtubeId: string;
  title: string;
  cover: string;
  priority?: boolean;
  className?: string;
};

export default function YouTubeFacade({
  youtubeId,
  title,
  cover,
  priority = false,
  className = "",
}: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = `${getYoutubeEmbedUrl(
    youtubeId,
  )}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      data-video-id={youtubeId}
    >
      {isPlaying ? (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`تشغيل فيديو: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <img
            src={cover}
            alt={title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />

          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/60 text-[#D4AF37] shadow-2xl backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black">
              <PlayCircle className="h-9 w-9" />
            </span>
          </span>

          <span className="absolute bottom-4 left-4 right-4 text-center text-sm font-bold text-white drop-shadow-lg">
            اضغط لتشغيل الفيديو
          </span>
        </button>
      )}
    </div>
  );
}