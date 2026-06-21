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
        ))
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
        )
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
        <circle
          key={r}
          cx="110"
          cy="55"
          r={r}
          fill="none"
          stroke="#ffffff22"
        />
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
  { id: "infra", label: "مشاهده زیرساخت در یک نگاه", Icon: InfraIcon, Preview: PreviewInfra },
  { id: "resources", label: "تحلیل مصرف منابع", Icon: ResourceIcon, Preview: PreviewResources },
  { id: "security", label: "گزارش رخدادهای امنیتی", Icon: SecurityIcon, Preview: PreviewSecurity },
  { id: "ai", label: "چت با هوش مصنوعی", Icon: AiIcon, Preview: PreviewAi },
  { id: "alerts", label: "هشدارهای لحظه‌ای", Icon: AlertIcon, Preview: PreviewAlerts },
  { id: "cost", label: "تحلیل هزینه‌ها", Icon: CostIcon, Preview: PreviewCost },
  { id: "multi", label: "امکان چندکاربری", Icon: MultiUserIcon, Preview: PreviewMulti },
  { id: "reports", label: "گزارش‌های مدیریتی", Icon: ReportIcon, Preview: PreviewReports },
  { id: "observ", label: "مشاهده‌پذیری کامل", Icon: ObservIcon, Preview: PreviewObserv },
];

/* ------------------------------------------------------------------ */
/*  Video player box                                                   */
/* ------------------------------------------------------------------ */
function VideoPlayerBox() {
  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Ambient glow behind the player */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[40px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(66,114,184,0.45), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(84,186,96,0.30), transparent 70%)",
        }}
      />

      <div className="glass-panel rounded-3xl p-2 sm:p-3">
        <div
          data-pill-anchor="video-box"
          className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#0a1126] ring-1 ring-white/10"
        >
          {/* Poster */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 40%, rgba(66,114,184,0.35), transparent 70%), linear-gradient(180deg, #0c1633 0%, #070b1a 100%)",
            }}
          />
          {/* Soft grid overlay */}
          <div className="absolute inset-0 grid-overlay opacity-50" />

          {/* Play button */}
          <button
            type="button"
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
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between text-white/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(84,186,96,0.8)]" />
              <span className="text-xs sm:text-sm">معرفی پلتفرم ابرآمد</span>
            </div>
            <span className="text-[10px] sm:text-xs text-white/50">۲ : ۳۴</span>
          </div>
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
    <div className="mt-10">
      <div
        data-pill-anchor="features-strip"
        className="glass-panel rounded-2xl px-2 sm:px-4 py-4"
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
        className="feature-btn w-full h-full flex flex-col items-center gap-2 px-3 py-3 rounded-xl transition-colors duration-300 hover:bg-white/[0.04]"
      >
        <span className="feature-icon flex items-center justify-center w-12 h-12 rounded-2xl text-[#a8c7ff] transition-all duration-300">
          <I />
        </span>
        <span className="text-[11px] sm:text-xs text-white/70 leading-snug text-center whitespace-nowrap">
          {label}
        </span>
      </button>

      {/* Tooltip with mini-dashboard preview */}
      <div className="feature-tooltip pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-[260px] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="glass-strong rounded-xl p-2 shadow-2xl">
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
          className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-3 h-3 rotate-45 bg-white/10 ring-1 ring-white/10 backdrop-blur"
        />
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function Content() {
  return (
    <section id="content" className="relative">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
            یک نگاه به پلتفرم
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            <span className="shimmer-text">پلتفرم ابرآمد در عمل</span>
          </h2>
          <p className="mt-4 text-white/55 max-w-2xl mx-auto leading-relaxed">
            ویدیوی کوتاه زیر را تماشا کنید و با امکانات کلیدی داشبورد
            یکپارچه آشنا شوید.
          </p>
        </div>

        <VideoPlayerBox />
        <FeatureStrip />
      </div>
    </section>
  );
}
