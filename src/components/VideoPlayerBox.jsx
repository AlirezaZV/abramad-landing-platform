import React, { useEffect, useRef, useState } from "react";

const INTRO_VIDEO_SRC = `${import.meta.env.BASE_URL}${encodeURI(
  "AbrAmadAi Service.mp4",
)}`;
const INTRO_VIDEO_PREVIEW_SRC = `${INTRO_VIDEO_SRC}#t=0.1`;

const toPersianDigits = (s) =>
  String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "۰:۰۰";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${toPersianDigits(m)}:${toPersianDigits(String(s).padStart(2, "0"))}`;
};

export default function VideoPlayerBox() {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFirstPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setHasStarted(true);
    video.currentTime = 0;
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const wrap = wrapperRef.current;
    if (!wrap) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      wrap.requestFullscreen?.();
    }
  };

  useEffect(() => {
    const onFsChange = () =>
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    video.currentTime = pct * duration;
    setCurrentTime(pct * duration);
  };

  const progressPct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
          یک نگاه به پلتفرم
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          <span className="shimmer-text">پلتفرم ابرآمد در عمل</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
          ویدیوی کوتاه زیر را تماشا کنید و با امکانات کلیدی داشبورد یکپارچه آشنا
          شوید.
        </p>
      </div>
      <div
        aria-hidden
        className="absolute -inset-4 sm:-inset-10 -z-10 rounded-[40px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(66,114,184,0.45), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(84,186,96,0.30), transparent 70%)",
        }}
      />

      <div className="glass-panel rounded-3xl p-2 sm:p-3">
        <div
          ref={wrapperRef}
          data-pill-anchor="video-box"
          className="group/player relative aspect-video w-full overflow-hidden rounded-2xl bg-[#0a1126] ring-1 ring-white/10"
        >
          <video
            ref={videoRef}
            src={INTRO_VIDEO_PREVIEW_SRC}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onClick={hasStarted ? togglePlay : undefined}
          />

          {!hasStarted && (
            <>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(70% 60% at 50% 40%, rgba(7,11,26,0.25), rgba(7,11,26,0.55) 80%), linear-gradient(180deg, rgba(7,11,26,0.15) 0%, rgba(7,11,26,0.75) 100%)",
                }}
              />

              <button
                type="button"
                onClick={handleFirstPlay}
                aria-label="پخش ویدیو معرفی"
                className="group absolute inset-0 m-auto flex items-center justify-center"
              >
                <span
                  data-pill-anchor="video-play"
                  className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full glass-bubble transition-transform duration-300 group-hover:scale-110"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full opacity-70 animate-ping"
                    style={{
                      boxShadow: "0 0 0 0 rgba(84,186,96,0.6)",
                      background:
                        "radial-gradient(closest-side, rgba(84,186,96,0.35), transparent 70%)",
                    }}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 sm:w-9 sm:h-9 translate-x-[2px] text-white drop-shadow"
                    fill="currentColor"
                  >
                    <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z" />
                  </svg>
                </span>
              </button>

              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between text-white/80 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(84,186,96,0.8)]" />
                  <span className="text-xs sm:text-sm">
                    معرفی پلتفرم ابرآمد
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-white/50">
                  {formatTime(duration)}
                </span>
              </div>
            </>
          )}

          {hasStarted && (
            <>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "توقف" : "پخش"}
                className={`absolute inset-0 m-auto flex items-center justify-center transition-opacity duration-200 ${
                  isPlaying
                    ? "opacity-0 group-hover/player:opacity-100"
                    : "opacity-100"
                }`}
              >
                <span className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full glass-bubble transition-transform duration-200 hover:scale-110">
                  {isPlaying ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="currentColor"
                    >
                      <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
                      <rect x="14" y="5" width="3.5" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7 sm:w-8 sm:h-8 translate-x-[2px] text-white"
                      fill="currentColor"
                    >
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z" />
                    </svg>
                  )}
                </span>
              </button>

              <div
                dir="ltr"
                className={`absolute inset-x-0 bottom-0 px-3 sm:px-4 pt-8 pb-3 sm:pb-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-200 ${
                  isPlaying
                    ? "opacity-0 group-hover/player:opacity-100"
                    : "opacity-100"
                }`}
              >
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="پیشرفت ویدیو"
                  aria-valuemin={0}
                  aria-valuemax={Math.floor(duration) || 0}
                  aria-valuenow={Math.floor(currentTime)}
                  onClick={handleSeek}
                  className="group/seek relative h-1.5 w-full rounded-full bg-white/15 cursor-pointer"
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progressPct}%`,
                      background:
                        "linear-gradient(90deg, #4272B8 0%, #54BA60 100%)",
                    }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(84,186,96,0.7)] opacity-0 group-hover/seek:opacity-100 transition-opacity"
                    style={{ left: `${progressPct}%` }}
                  />
                </div>

                <div className="mt-2.5 flex items-center gap-3 text-white/85">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "توقف" : "پخش"}
                    className="hover:text-white transition-colors"
                  >
                    {isPlaying ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                      >
                        <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
                        <rect x="14" y="5" width="3.5" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                      >
                        <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "صدا روشن" : "بی‌صدا"}
                    className="hover:text-white transition-colors"
                  >
                    {muted ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M11 5L6 9H3v6h3l5 4V5z" />
                        <line x1="22" y1="9" x2="16" y2="15" />
                        <line x1="16" y1="9" x2="22" y2="15" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M11 5L6 9H3v6h3l5 4V5z" />
                        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                        <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                      </svg>
                    )}
                  </button>

                  <span
                    className="text-[11px] sm:text-xs tabular-nums text-white/75"
                    dir="ltr"
                  >
                    {formatTime(currentTime)}{" "}
                    <span className="text-white/35">/</span>{" "}
                    {formatTime(duration)}
                  </span>

                  <div className="flex-1" />

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={
                      isFullscreen ? "خروج از تمام‌صفحه" : "تمام‌صفحه"
                    }
                    className="hover:text-white transition-colors"
                  >
                    {isFullscreen ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                        <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                        <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                        <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M3 8V5a2 2 0 0 1 2-2h3" />
                        <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                        <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                        <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
