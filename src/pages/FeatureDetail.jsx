import React from "react";
import { useParams, Link } from "react-router-dom";
import { PLATFORM_FEATURES } from "../data/platformFeatures.jsx";

export default function FeatureDetail() {
  const { id } = useParams();
  const feature = PLATFORM_FEATURES.find((f) => f.id === id);

  if (!feature) {
    return (
      <div
        className="min-h-screen bg-grid flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <p className="text-white/40 mb-6 text-lg">فیچر مورد نظر یافت نشد</p>
          <Link
            to="/"
            className="group glass-panel inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white/85 transition-all duration-300 hover:text-white hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, rgba(38,74,159,0.35) 0%, rgba(66,114,184,0.35) 55%, rgba(84,186,96,0.35) 100%)",
              boxShadow:
                "0 8px 24px -10px rgba(66,114,184,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    subtitle,
    shortDesc,
    descParagraphs,
    bullets,
    Illustration,
    tag,
  } = feature;

  return (
    <div className="min-h-screen bg-grid" dir="rtl">
      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-20 glass-panel border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center gap-3">
          <Link
            to="/"
            aria-label="بازگشت"
            className="group glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-white/85 transition-all duration-300 hover:text-white hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, rgba(38,74,159,0.4) 0%, rgba(66,114,184,0.4) 55%, rgba(84,186,96,0.4) 100%)",
              boxShadow:
                "0 6px 18px -8px rgba(66,114,184,0.55), inset 0 1px 0 rgba(255,255,255,0.14)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
            <span>بازگشت</span>
          </Link>
          <span className="hidden sm:inline text-white/20 text-xs">‹</span>
          <span className="hidden sm:inline text-white/45 text-sm">
            تازه‌های پلتفرم
          </span>
          <span className="hidden sm:inline text-white/20 text-xs">‹</span>
          <span className="text-white/85 text-sm font-medium truncate">
            {name}
          </span>
          <span
            className="ms-auto flex-shrink-0 text-[10px] px-2.5 py-1 rounded-full text-white/85 border border-white/15 backdrop-blur"
            style={{
              background:
                "linear-gradient(135deg, rgba(66,114,184,0.25) 0%, rgba(84,186,96,0.18) 100%)",
            }}
          >
            {tag}
          </span>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none opacity-35" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 25%, rgba(66,114,184,0.2), transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-10 sm:pt-16 sm:pb-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <span className="inline-block text-[10px] uppercase tracking-[0.35em] text-white/35 mb-5">
                {tag}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-3">
                {name}
              </h1>
              <p className="text-base sm:text-lg text-[#54BA60] font-semibold mb-5 leading-snug">
                {subtitle}
              </p>
              <p className="text-white/55 leading-relaxed text-sm sm:text-base">
                {shortDesc}
              </p>
            </div>
            {/* Illustration panel */}
            <div className="glass-panel rounded-3xl p-2 sm:p-3">
              <div className="aspect-video rounded-2xl overflow-hidden bg-[#070b1a]/70 ring-1 ring-white/[0.06]">
                <Illustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
        <div className="max-w-3xl space-y-5">
          {descParagraphs.map((p, i) => (
            <p key={i} className="text-white/65 leading-relaxed text-base">
              {p}
            </p>
          ))}
        </div>

        {/* Bullets */}
        {bullets.length > 0 && (
          <div className="glass-panel rounded-2xl p-6 mt-8 max-w-3xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/35 mb-5">
              از این صفحه می‌توانید
            </p>
            <ul className="space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#54BA60]/12 border border-[#54BA60]/25 flex items-center justify-center">
                    <svg
                      viewBox="0 0 12 12"
                      className="w-2.5 h-2.5 text-[#54BA60]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Screenshot placeholders */}
        <div className="mt-10 sm:mt-14 max-w-4xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/30 mb-5">
            تصاویر و اسکرین‌شات‌ها
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl aspect-video flex items-center justify-center ring-1 ring-white/[0.05]"
              >
                <div className="text-center text-white/20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="w-8 h-8 mx-auto mb-2 opacity-40"
                  >
                    <rect x="3" y="3" width="18" height="14" rx="2" />
                    <path d="M8 21h8m-4-4v4" />
                  </svg>
                  <p className="text-xs text-white/25">به‌زودی اضافه می‌شود</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-20">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 -z-0"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 100%, rgba(66,114,184,0.18), transparent 70%)",
            }}
          />
          <p className="relative text-white/40 text-xs uppercase tracking-[0.3em] mb-3">
            شروع کنید
          </p>
          <h3 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">
            همین حالا وارد پلتفرم شوید
          </h3>
          <a
            href="https://cloud.abramad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative btn-primary inline-flex"
            style={{
              background:
                "linear-gradient(135deg, #264A9F 0%, #4272B8 50%, #54BA60 100%)",
            }}
          >
            ورود به پلتفرم سازمانی ابرآمد
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-4 h-4"
            >
              <path d="M7 17 17 7m0 0H7m10 0v10" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Footer note ── */}
      <div className="border-t border-white/[0.05] py-6 text-center">
        <p className="text-xs text-white/18">
          © {new Date().getFullYear()} ابرآمد — پلتفرم سازمانی ابری
        </p>
      </div>
    </div>
  );
}
