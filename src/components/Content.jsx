import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PLATFORM_FEATURES } from "../data/platformFeatures.jsx";

const INTRO_VIDEO_SRC = `${import.meta.env.BASE_URL}${encodeURI(
  "AbrAmadAi Service.mp4",
)}`;
// Append a fragment time so browsers render the first frame as a poster
// while the video is paused, without us having to ship a separate image.
const INTRO_VIDEO_PREVIEW_SRC = `${INTRO_VIDEO_SRC}#t=0.1`;

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7"
  >
    {children}
  </svg>
);

const InfraIcon = () => (
  <Icon>
    <rect x="3" y="4" width="18" height="5" rx="1.2" />
    <rect x="3" y="11" width="18" height="5" rx="1.2" />
    <rect x="3" y="18" width="18" height="3" rx="1.2" />
    <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" />
    <circle cx="6.5" cy="13.5" r="0.6" fill="currentColor" />
  </Icon>
);
const ResourceIcon = () => (
  <Icon>
    <path d="M3 20h18" />
    <rect x="5" y="12" width="3" height="6" rx="0.6" />
    <rect x="10.5" y="8" width="3" height="10" rx="0.6" />
    <rect x="16" y="4" width="3" height="14" rx="0.6" />
  </Icon>
);
const SecurityIcon = () => (
  <Icon>
    <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);
const AiIcon = () => (
  <Icon>
    <path d="M21 12c0 4-4 7-9 7-1 0-2-.1-3-.4L4 20l1.4-4C4.5 14.8 4 13.4 4 12c0-4 4-7 8-7s9 3 9 7z" />
    <path d="M12 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
  </Icon>
);
const AlertIcon = () => (
  <Icon>
    <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </Icon>
);
const CostIcon = () => (
  <Icon>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
    <path d="M12 14h4" />
  </Icon>
);
const MultiUserIcon = () => (
  <Icon>
    <circle cx="9" cy="9" r="3" />
    <path d="M3 19c.5-3.4 3-5 6-5s5.5 1.6 6 5" />
    <circle cx="17" cy="8" r="2.4" />
    <path d="M15.5 14c2.6.2 4.5 1.8 5 5" />
  </Icon>
);
const ReportIcon = () => (
  <Icon>
    <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v5h5" />
    <path d="M8 14l2.5-3 2.5 3 3-4" />
  </Icon>
);
const ObservIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="3" />
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
  </Icon>
);

/* ------------------------------------------------------------------ */
/*  Mini-dashboard previews shown inside the tooltip                  */
/* ------------------------------------------------------------------ */
const MiniWrap = ({ children, title }) => (
  <div className="w-full h-full p-2 flex flex-col gap-1.5">
    <div className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
      <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80" />
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
      <span className="ms-auto text-[9px] text-white/60">{title}</span>
    </div>
    <div className="flex-1 rounded-md bg-black/30 ring-1 ring-white/10 overflow-hidden">
      {children}
    </div>
  </div>
);

const PreviewInfra = () => (
  <MiniWrap title="Infrastructure">
    <svg viewBox="0 0 220 110" className="w-full h-full">
      <defs>
        <linearGradient id="pi1" x1="0" x2="1">
          <stop offset="0" stopColor="#4272B8" />
          <stop offset="1" stopColor="#54BA60" />
        </linearGradient>
      </defs>
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 9 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={10 + c * 22}
            y={10 + r * 18}
            width="18"
            height="14"
            rx="2"
            fill="url(#pi1)"
            opacity={0.25 + ((r + c) % 4) * 0.18}
          />
        )),
      )}
    </svg>
  </MiniWrap>
);

const PreviewResources = () => (
  <MiniWrap title="Resources">
    <svg viewBox="0 0 220 110" className="w-full h-full">
      <polyline
        points="0,80 25,60 50,68 75,40 100,52 125,30 150,42 175,22 200,32 220,18"
        fill="none"
        stroke="#54BA60"
        strokeWidth="2"
      />
      <polyline
        points="0,90 25,82 50,84 75,70 100,76 125,60 150,68 175,52 200,60 220,46"
        fill="none"
        stroke="#4272B8"
        strokeWidth="2"
        opacity="0.7"
      />
      <line x1="0" y1="100" x2="220" y2="100" stroke="#ffffff22" />
    </svg>
  </MiniWrap>
);

const PreviewSecurity = () => (
  <MiniWrap title="Security">
    <div className="grid grid-cols-1 gap-1 p-2 h-full text-[8px]">
      {[
        ["bg-rose-400/70", "Critical · brute-force"],
        ["bg-amber-300/70", "Warning · port scan"],
        ["bg-emerald-400/70", "Info · cert renewed"],
        ["bg-emerald-400/70", "Info · login OK"],
      ].map(([dot, txt], i) => (
        <div
          key={i}
          className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-white/5"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          <span className="text-white/80">{txt}</span>
        </div>
      ))}
    </div>
  </MiniWrap>
);

const PreviewAi = () => (
  <MiniWrap title="AI Chat">
    <div className="p-2 flex flex-col gap-1 text-[8px]">
      <div className="self-start max-w-[80%] rounded-md bg-white/10 px-1.5 py-1 text-white/85">
        چطور می‌توانم به شما کمک کنم؟
      </div>
      <div className="self-end max-w-[80%] rounded-md bg-[#4272B8]/50 px-1.5 py-1 text-white">
        مصرف CPU سرور ۳ را نشان بده
      </div>
      <div className="self-start max-w-[85%] rounded-md bg-white/10 px-1.5 py-1 text-white/85">
        ۷۳٪ — در حال تحلیل…
      </div>
    </div>
  </MiniWrap>
);

const PreviewAlerts = () => (
  <MiniWrap title="Alerts">
    <div className="p-2 grid grid-cols-2 gap-1 text-[8px]">
      {[
        ["CPU > 90%", "bg-rose-400/30 text-rose-200"],
        ["Disk 82%", "bg-amber-300/20 text-amber-100"],
        ["Pod restart", "bg-amber-300/20 text-amber-100"],
        ["Latency", "bg-rose-400/30 text-rose-200"],
      ].map(([t, c], i) => (
        <div key={i} className={`rounded px-1.5 py-1 ${c}`}>
          {t}
        </div>
      ))}
    </div>
  </MiniWrap>
);

const PreviewCost = () => (
  <MiniWrap title="Cost">
    <svg viewBox="0 0 220 110" className="w-full h-full">
      <defs>
        <linearGradient id="pc1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#54BA60" stopOpacity="0.7" />
          <stop offset="1" stopColor="#54BA60" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,80 C40,70 60,55 90,60 C120,65 140,30 175,38 C195,42 210,28 220,30 L220,110 L0,110 Z"
        fill="url(#pc1)"
      />
      <path
        d="M0,80 C40,70 60,55 90,60 C120,65 140,30 175,38 C195,42 210,28 220,30"
        fill="none"
        stroke="#54BA60"
        strokeWidth="2"
      />
      <text x="8" y="20" fill="#ffffff90" fontSize="9">
        $ 14,260
      </text>
    </svg>
  </MiniWrap>
);

const PreviewMulti = () => (
  <MiniWrap title="Team">
    <div className="p-2 grid grid-cols-3 gap-1 text-[8px]">
      {["مدیر", "DevOps", "Security", "Finance", "Viewer", "Auditor"].map(
        (r, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 rounded bg-white/5 px-1 py-1.5"
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{
                background: `linear-gradient(135deg, #4272B8 ${(i * 30) % 100}%, #54BA60)`,
              }}
            />
            <span className="text-white/80">{r}</span>
          </div>
        ),
      )}
    </div>
  </MiniWrap>
);

const PreviewReports = () => (
  <MiniWrap title="Reports">
    <svg viewBox="0 0 220 110" className="w-full h-full">
      <circle
        cx="55"
        cy="55"
        r="32"
        fill="none"
        stroke="#4272B8"
        strokeWidth="10"
        strokeDasharray="80 200"
      />
      <circle
        cx="55"
        cy="55"
        r="32"
        fill="none"
        stroke="#54BA60"
        strokeWidth="10"
        strokeDasharray="60 200"
        strokeDashoffset="-80"
      />
      <circle
        cx="55"
        cy="55"
        r="32"
        fill="none"
        stroke="#264A9F"
        strokeWidth="10"
        strokeDasharray="60 200"
        strokeDashoffset="-140"
      />
      <g fill="#ffffff90" fontSize="8">
        <rect x="110" y="30" width="90" height="6" rx="2" fill="#ffffff22" />
        <rect x="110" y="30" width="70" height="6" rx="2" fill="#4272B8" />
        <rect x="110" y="46" width="90" height="6" rx="2" fill="#ffffff22" />
        <rect x="110" y="46" width="50" height="6" rx="2" fill="#54BA60" />
        <rect x="110" y="62" width="90" height="6" rx="2" fill="#ffffff22" />
        <rect x="110" y="62" width="35" height="6" rx="2" fill="#264A9F" />
      </g>
    </svg>
  </MiniWrap>
);

const PreviewObserv = () => (
  <MiniWrap title="Observability">
    <svg viewBox="0 0 220 110" className="w-full h-full">
      <defs>
        <radialGradient id="po1" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#54BA60" stopOpacity="0.6" />
          <stop offset="1" stopColor="#54BA60" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="55" r="50" fill="url(#po1)" />
      {[18, 32, 46].map((r) => (
        <circle key={r} cx="110" cy="55" r={r} fill="none" stroke="#ffffff22" />
      ))}
      {[
        [80, 40],
        [140, 60],
        [120, 30],
        [95, 75],
        [150, 45],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#54BA60" />
      ))}
      <line x1="60" y1="55" x2="160" y2="55" stroke="#ffffff10" />
      <line x1="110" y1="10" x2="110" y2="100" stroke="#ffffff10" />
    </svg>
  </MiniWrap>
);

/* ------------------------------------------------------------------ */
/*  Feature catalogue                                                  */
/* ------------------------------------------------------------------ */
const FEATURES = [
  {
    id: "infra",
    label: "مشاهده زیرساخت در یک نگاه",
    Icon: InfraIcon,
    Preview: PreviewInfra,
  },
  {
    id: "resources",
    label: "تحلیل مصرف منابع",
    Icon: ResourceIcon,
    Preview: PreviewResources,
  },
  {
    id: "security",
    label: "گزارش رخدادهای امنیتی",
    Icon: SecurityIcon,
    Preview: PreviewSecurity,
  },
  { id: "ai", label: "چت با هوش مصنوعی", Icon: AiIcon, Preview: PreviewAi },
  {
    id: "alerts",
    label: "هشدارهای لحظه‌ای",
    Icon: AlertIcon,
    Preview: PreviewAlerts,
  },
  { id: "cost", label: "تحلیل هزینه‌ها", Icon: CostIcon, Preview: PreviewCost },
  {
    id: "multi",
    label: "امکان چندکاربری",
    Icon: MultiUserIcon,
    Preview: PreviewMulti,
  },
  {
    id: "reports",
    label: "گزارش‌های مدیریتی",
    Icon: ReportIcon,
    Preview: PreviewReports,
  },
  {
    id: "observ",
    label: "مشاهده‌پذیری کامل",
    Icon: ObservIcon,
    Preview: PreviewObserv,
  },
];

/* ------------------------------------------------------------------ */
/*  Video player box                                                   */
/* ------------------------------------------------------------------ */
const toPersianDigits = (s) =>
  String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "۰:۰۰";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${toPersianDigits(m)}:${toPersianDigits(String(s).padStart(2, "0"))}`;
};

function VideoPlayerBox() {
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

  React.useEffect(() => {
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
    <div className="relative mx-auto max-w-6xl">
      {/* Ambient glow behind the player */}
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
              {/* Cover overlay — darken the first frame for play-button legibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(70% 60% at 50% 40%, rgba(7,11,26,0.25), rgba(7,11,26,0.55) 80%), linear-gradient(180deg, rgba(7,11,26,0.15) 0%, rgba(7,11,26,0.75) 100%)",
                }}
              />

              {/* Big play button */}
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

              {/* Caption strip */}
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
              {/* Centered play/pause overlay (visible while paused, or on hover) */}
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

              {/* Themed control bar */}
              <div
                dir="ltr"
                className={`absolute inset-x-0 bottom-0 px-3 sm:px-4 pt-8 pb-3 sm:pb-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-200 ${
                  isPlaying
                    ? "opacity-0 group-hover/player:opacity-100"
                    : "opacity-100"
                }`}
              >
                {/* Seek bar */}
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

                {/* Buttons row */}
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

/* ------------------------------------------------------------------ */
/*  Feature strip                                                      */
/* ------------------------------------------------------------------ */
function FeatureStrip() {
  return (
    <div className="mt-8 sm:mt-10">
      <div
        data-pill-anchor="features-strip"
        className="glass-panel rounded-2xl px-1.5 sm:px-4 py-3 sm:py-4"
      >
        <ul className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1 sm:gap-2 items-stretch">
          {FEATURES.map((f) => (
            <FeatureItem key={f.id} feature={f} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function FeatureItem({ feature }) {
  const { label, Icon: I, Preview } = feature;
  return (
    <li className="feature-item group relative">
      <button
        type="button"
        className="feature-btn w-full h-full flex flex-col items-center gap-1.5 sm:gap-2 px-1.5 py-2.5 sm:px-3 sm:py-3 rounded-xl transition-colors duration-300 hover:bg-white/[0.04]"
      >
        <span className="feature-icon flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl text-[#a8c7ff] transition-all duration-300">
          <I />
        </span>
        <span className="text-[10px] sm:text-xs text-white/70 leading-snug text-center break-words">
          {label}
        </span>
      </button>

      {/* Tooltip with mini-dashboard preview. Hidden below md because
          hover-only triggers don't fire on touch and the 260px panel
          would overflow narrow viewports. */}
      <div className="feature-tooltip  bg-[#080D1E] rounded-2xl pointer-events-none  hidden md:block absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-[260px] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="border border-white rounded-xl p-2 shadow-2xl">
          <div className="h-[150px] rounded-lg overflow-hidden">
            <Preview />
          </div>
          <div className="px-1 pt-2 pb-1 text-[11px] text-white/85 text-center">
            {label}
          </div>
        </div>
        {/* Arrow */}
        <div
          aria-hidden
          className="absolute border-b-2 border-r-2 border-white/80 left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-[#080D1E]  backdrop-blur"
        />
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Platform News Cards                                               */
/* ------------------------------------------------------------------ */
function FeatureCard({ feature }) {
  const { id, name, subtitle, Illustration, tag } = feature;
  return (
    <Link
      to={`/feature/${id}`}
      className="group block glass-panel rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(66,114,184,0.22)] transition-all duration-300"
    >
      {/* Illustration */}
      <div className="relative aspect-video overflow-hidden bg-[#070b1a]/60">
        <Illustration />
        <span className="absolute top-2 end-2 text-[8px] px-2 py-0.5 rounded-full bg-black/50 text-white/45 border border-white/10 backdrop-blur">
          {tag}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      {/* Text */}
      <div className="p-4 pb-5">
        <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-[#54BA60] transition-colors duration-200">
          {name}
        </h3>
        <p className="text-[11px] text-white/45 leading-relaxed mb-3">
          {subtitle}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-[#4272B8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <span>مشاهده جزئیات</span>
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="w-2.5 h-2.5 rotate-180"
          >
            <path d="M8 2 4 6l4 4" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function PlatformNews() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 lg:pb-24">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-14 sm:mb-20" />
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          <span className="shimmer-text">تازه‌های پلتفرم سازمانی ابرآمد</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {PLATFORM_FEATURES.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Journey Banner — «این فقط شروع مسیر است»                         */
/* ------------------------------------------------------------------ */
const RELEASED = [
  "Home Dashboard",
  "Chat AI",
  "VPC Flavours",
  "Custom Image",
  "VPC Monitoring",
  "VPC Network",
  "فروش و پشتیبانی",
  "Object Storage",
];

const UPCOMING = [
  "Kubernetes",
  "Auto Scaling",
  "Cost Optimizer",
  "Backup Manager",
  "CDN Edge",
];

function JourneyBanner() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, rgba(38,74,159,0.2), rgba(7,11,26,0.97))",
        }}
      />
      {/* <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" /> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            این فقط شروع مسیر است
          </h2>
          <p className="mt-4 text-white/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            در ماه‌های آینده قابلیت‌های بیشتری به پلتفرم اضافه می‌شوند — منتظر
            باشید
          </p>
        </div>

        {/* Milestone ribbon */}
        <div className="overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hidden">
          <div className="flex items-start min-w-max mx-auto">
            {RELEASED.map((label, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-2.5 w-[88px]">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#54BA60]/12 border border-[#54BA60]/38 shadow-[0_0_14px_rgba(84,186,96,0.28)]">
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="#54BA60"
                      strokeWidth="2"
                      className="w-3.5 h-3.5"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-white/55 text-center leading-tight max-w-[80px]">
                    {label}
                  </span>
                </div>
                {i < RELEASED.length - 1 && (
                  <div className="w-10 h-px bg-gradient-to-r from-[#54BA60]/38 to-[#4272B8]/28 mt-4.5 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}

            {/* Transition node */}
            <div className="w-10 h-px bg-white/12 mt-4.5 flex-shrink-0" />
            <div className="flex flex-col items-center gap-2.5 w-8 mt-0">
              <div className="w-4 h-9 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/20 ring-2 ring-white/10 ring-offset-1 ring-offset-transparent" />
              </div>
            </div>

            {UPCOMING.map((label, i) => (
              <React.Fragment key={i}>
                <div
                  className="w-10 h-px bg-white/8 mt-4.5 flex-shrink-0"
                  style={{ borderTop: "1px dashed rgba(255,255,255,0.1)" }}
                />
                <div className="flex flex-col items-center gap-2.5 w-[88px]">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/12">
                    <svg
                      viewBox="0 0 14 16"
                      fill="none"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="1.4"
                      className="w-3.5 h-4"
                    >
                      <rect x="1" y="7" width="12" height="8" rx="2" />
                      <path d="M4 7V5a3 3 0 0 1 6 0v2" />
                    </svg>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-white/22 text-center leading-tight max-w-[80px]">
                    {label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function Content() {
  return (
    <section
      id="content"
      className="relative overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* <div className="absolute inset-0 grid-overlay pointer-events-none" /> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
            یک نگاه به پلتفرم
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            <span className="shimmer-text">پلتفرم ابرآمد در عمل</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
            ویدیوی کوتاه زیر را تماشا کنید و با امکانات کلیدی داشبورد یکپارچه
            آشنا شوید.
          </p>
        </div>

        <VideoPlayerBox />
        <FeatureStrip />
      </div>

      <PlatformNews />
      <JourneyBanner />
    </section>
  );
}
