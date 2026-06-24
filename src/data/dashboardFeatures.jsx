import React from "react";

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
const ImgIcon = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
    draggable={false}
  />
);

const InfraIcon = () => (
  <ImgIcon
    src="/FEATURES/مشاهده زیرساخت در یک نگاه.png"
    alt="مشاهده زیرساخت در یک نگاه"
  />
);
const ResourceIcon = () => (
  <ImgIcon src="/FEATURES/تحلیل مصرف منابع.png" alt="تحلیل مصرف منابع" />
);
const SecurityIcon = () => (
  <ImgIcon
    src="/FEATURES/گزارش رخدادهای امنیتی.png"
    alt="گزارش رخدادهای امنیتی"
  />
);
const AiIcon = () => (
  <ImgIcon src="/FEATURES/چت با هوش مصنوعی.png" alt="چت با هوش مصنوعی" />
);
const AlertIcon = () => (
  <ImgIcon src="/FEATURES/هشدارهای لحظه‌ای.png" alt="هشدارهای لحظه‌ای" />
);
const CostIcon = () => (
  <ImgIcon src="/FEATURES/تحلیل هزینه‌ها.png" alt="تحلیل هزینه‌ها" />
);
const MultiUserIcon = () => (
  <ImgIcon src="/FEATURES/امکان چندکاربری.png" alt="امکان چندکاربری" />
);
const ReportIcon = () => (
  <ImgIcon src="/FEATURES/گزارش‌های مدیریتی.png" alt="گزارش‌های مدیریتی" />
);
const ObservIcon = () => (
  <ImgIcon src="/FEATURES/مشاهده‌پذیری کامل.png" alt="مشاهده‌پذیری کامل" />
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
export const FEATURES = [
  {
    id: "infra",
    label: "مشاهده زیرساخت در یک نگاه",
    Icon: InfraIcon,
    Preview: PreviewInfra,
    description:
      "تمام زیرساخت سازمان شما در یک داشبورد یکپارچه — سرورها، شبکه، استوریج و سرویس‌های امنیتی همگی در کنار هم. وضعیت سلامت، سطح مصرف منابع و رویدادهای کلیدی به‌صورت لحظه‌ای نمایش داده می‌شود تا تصمیم‌گیری سریع‌تر و دقیق‌تر صورت گیرد.",
    bullets: [
      "نمای جامع از سرورها، شبکه و استوریج در یک صفحه",
      "وضعیت لحظه‌ای سرویس‌های امنیتی شامل WAF و آنتی‌ویروس",
      "پایش سلامت با هشدارهای رنگی برای رخدادهای بحرانی",
    ],
  },
  {
    id: "resources",
    label: "تحلیل مصرف منابع",
    Icon: ResourceIcon,
    Preview: PreviewResources,
    description:
      "مصرف CPU، حافظه، شبکه و دیسک را با نمودارهای زنده و سری‌های زمانی دنبال کنید. الگوهای مصرف را تحلیل کنید، گلوگاه‌ها را شناسایی کنید و ظرفیت زیرساخت را پیش از بروز مشکل برنامه‌ریزی کنید.",
    bullets: [
      "نمودارهای زنده برای CPU و RAM و IOPS",
      "مقایسه دوره‌ای مصرف برای پیش‌بینی نیاز ظرفیت",
      "تفکیک مصرف به سطح ماشین، پروژه و کاربر",
    ],
  },
  {
    id: "security",
    label: "گزارش رخدادهای امنیتی",
    Icon: SecurityIcon,
    Preview: PreviewSecurity,
    description:
      "تمام رخدادهای امنیتی زیرساخت شما — از تلاش‌های ورود ناموفق تا اسکن پورت — در یک کنسول متمرکز ثبت و دسته‌بندی می‌شوند. سطح‌بندی شدت رخدادها به تیم امنیت کمک می‌کند ابتدا به موارد حیاتی پاسخ دهد.",
    bullets: [
      "ثبت تمامی رخدادهای WAF و فایروال",
      "هشدار خودکار برای الگوهای مشکوک",
      "گزارش‌های قابل صدور برای ممیزی و انطباق",
    ],
  },
  {
    id: "ai",
    label: "چت با هوش مصنوعی",
    Icon: AiIcon,
    Preview: PreviewAi,
    description:
      "دستیار هوشمند ابرآمد پاسخ سوالات شما درباره وضعیت زیرساخت، تنظیمات سرویس‌ها و راهنمایی‌های فنی را به‌سرعت در اختیار می‌گذارد. می‌توانید مستقیماً از او بخواهید نمودارها را تحلیل کند یا گزارش بسازد.",
    bullets: [
      "پاسخ سریع به سوالات فنی پلتفرم",
      "تحلیل وضعیت سرویس‌ها از طریق گفتگو",
      "ساخت گزارش‌های سفارشی با دستور متنی",
    ],
  },
  {
    id: "alerts",
    label: "هشدارهای لحظه‌ای",
    Icon: AlertIcon,
    Preview: PreviewAlerts,
    description:
      "هشدارهای هوشمند بر اساس آستانه‌های قابل تنظیم برای منابع، خطاها و رویدادهای امنیتی. هشدارها از طریق پنل، ایمیل و وب‌هوک ارسال می‌شوند تا تیم عملیات هیچ‌گاه از وضعیت زیرساخت غافل نماند.",
    bullets: [
      "تعریف آستانه برای هر منبع به‌صورت اختصاصی",
      "ارسال نوتیفیکیشن از طریق ایمیل و وب‌هوک",
      "تاریخچه کامل هشدارها برای تحلیل پس‌رویدادی",
    ],
  },
  {
    id: "cost",
    label: "تحلیل هزینه‌ها",
    Icon: CostIcon,
    Preview: PreviewCost,
    description:
      "هزینه ماهانه و روند آن را به تفکیک سرویس، پروژه و کاربر مشاهده کنید. بودجه تعریف کنید، هشدار مصرف بگیرید و فرصت‌های بهینه‌سازی هزینه را با پیشنهادهای خودکار پلتفرم کشف کنید.",
    bullets: [
      "تفکیک هزینه بر اساس سرویس و پروژه",
      "تعریف بودجه و دریافت هشدار سقف مصرف",
      "پیشنهادهای خودکار برای کاهش هزینه",
    ],
  },
  {
    id: "multi",
    label: "امکان چندکاربری",
    Icon: MultiUserIcon,
    Preview: PreviewMulti,
    description:
      "نقش‌های دقیق برای اعضای تیم تعریف کنید — از مدیر و DevOps تا حسابرس و ناظر. هر کاربر فقط به منابع و قابلیت‌های موردنیاز خود دسترسی دارد و فعالیت‌ها برای ممیزی ثبت می‌شود.",
    bullets: [
      "نقش‌های از پیش‌تعریف‌شده و سفارشی",
      "دسترسی سطح پروژه و منبع",
      "تاریخچه فعالیت کاربران برای ممیزی",
    ],
  },
  {
    id: "reports",
    label: "گزارش‌های مدیریتی",
    Icon: ReportIcon,
    Preview: PreviewReports,
    description:
      "گزارش‌های دوره‌ای از وضعیت زیرساخت، مصرف منابع، رخدادهای امنیتی و هزینه‌ها به‌صورت خودکار تولید و در دسترس مدیران قرار می‌گیرد. خروجی‌ها قابل صدور به فرمت‌های PDF و Excel هستند.",
    bullets: [
      "گزارش‌های ماهانه به‌صورت خودکار",
      "خروجی به فرمت‌های PDF و Excel",
      "قابلیت زمان‌بندی و ارسال خودکار به مدیران",
    ],
  },
  {
    id: "observ",
    label: "مشاهده‌پذیری کامل",
    Icon: ObservIcon,
    Preview: PreviewObserv,
    description:
      "لاگ‌ها، متریک‌ها و trace ها در یک پلتفرم ادغام شده‌اند تا تیم فنی بتواند ریشه مشکل را در لحظه ردیابی کند. جستجوی سریع، فیلتر پیشرفته و نمای ارتباطی سرویس‌ها به تشخیص سریع‌تر گلوگاه‌ها کمک می‌کند.",
    bullets: [
      "تجمیع لاگ‌ها از تمامی سرویس‌ها",
      "متریک‌های زنده با امکان فیلتر پیشرفته",
      "نمای ارتباطی سرویس‌ها برای ردیابی وابستگی‌ها",
    ],
  },
];
