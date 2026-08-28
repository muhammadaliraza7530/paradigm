import { useEffect, useRef } from "react";

/** Keeps project walkthrough videos silent while preserving default audio elsewhere. */
export function ShowcaseVideo({
  className,
  src = "/showcase.mp4",
  poster = "/showcase-poster.jpg",
  controls = false,
  unmuted = false,
  loop = true,
  autoPlay = true,
}: {
  className?: string;
  src?: string;
  poster?: string;
  controls?: boolean;
  unmuted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const isProjectVideo =
    src.includes("/project-videos/") || src.includes("/public/project-videos/");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isProjectVideo) {
      el.muted = true;
      el.volume = 0;
    }

    let inView = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && autoPlay) {
          void el.play().catch(() => {});
        } else {
          if (isProjectVideo) {
            el.muted = true;
            el.volume = 0;
          }
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    if (controls) {
      return () => io.disconnect();
    }

    return () => {
      io.disconnect();
    };
  }, [autoPlay, controls, isProjectVideo]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      autoPlay={autoPlay}
      muted={isProjectVideo}
      loop={loop}
      playsInline
      preload="metadata"
      controls={controls}
      controlsList="nodownload"
      onPlay={() => {
        if (isProjectVideo) {
          const video = ref.current;
          if (video) {
            video.muted = true;
            video.volume = 0;
          }
        }
      }}
      onVolumeChange={() => {
        if (isProjectVideo) {
          const video = ref.current;
          if (video) {
            video.muted = true;
            video.volume = 0;
          }
        }
      }}
    />
  );
}
