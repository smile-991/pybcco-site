import { ArrowLeft, Clapperboard } from "lucide-react"
import { Link } from "react-router-dom"

import type { VideoItem } from "@/data/videos"

import YouTubeFacade from "./YouTubeFacade"

type RelatedVideoSectionProps = {
  video: VideoItem
  heading?: string
  description?: string
}

export default function RelatedVideoSection({
  video,
  heading = video.title,
  description = video.description,
}: RelatedVideoSectionProps) {
  return (
    <section
      aria-labelledby={`related-video-${video.slug}`}
      className="my-16 overflow-hidden rounded-[32px] border border-[#d4af37]/25 bg-[#090a0d] text-white shadow-2xl"
    >
      <div className="grid items-center gap-8 p-5 md:p-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm font-bold text-[#f3d36b]">
            <Clapperboard className="h-4 w-4" />
            فيديو مرتبط بالخدمة
          </div>

          <h2
            id={`related-video-${video.slug}`}
            className="mt-5 text-3xl font-black leading-tight md:text-4xl"
          >
            {heading}
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {video.categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/65"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={`/videos/${video.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d4af37] px-6 py-3.5 font-extrabold text-black transition hover:bg-[#efd36f]"
            >
              مشاهدة الفيديو والتفاصيل
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <Link
              to="/videos"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 font-bold text-white transition hover:border-[#d4af37]/40 hover:bg-white/10"
            >
              مكتبة الفيديو كاملة
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[340px] lg:order-2">
          <YouTubeFacade
            youtubeId={video.youtubeId}
            title={video.title}
            cover={video.cover}
            className="aspect-[9/16] rounded-[26px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          />
        </div>
      </div>
    </section>
  )
}
