import React from "react";

export default function FeatureDetailInline({ feature }) {
  if (!feature) return null;
  const { label, description, bullets = [], Preview, Icon: I } = feature;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="glass-panel rounded-3xl p-5 sm:p-8 lg:p-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4272B8]/25 to-[#54BA60]/25 text-white">
                <I />
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40">
                قابلیت
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
              <span className="shimmer-text">{label}</span>
            </h3>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-5">
              {description}
            </p>

            {bullets.length > 0 && (
              <ul className="space-y-2.5">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#54BA60]/15 border border-[#54BA60]/30 flex items-center justify-center">
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
                    <span className="text-white/75 text-sm leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <div className="glass-panel rounded-2xl p-2 sm:p-3">
              <div className="aspect-video rounded-xl overflow-hidden bg-[#070b1a]/70 ring-1 ring-white/[0.06]">
                <Preview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
