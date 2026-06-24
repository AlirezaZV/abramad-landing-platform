import React from "react";

export default function FeatureGrid({ features, onSelect, selectedId }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
          امکانات پلتفرم
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          <span className="shimmer-text">۹ قابلیت کلیدی ابرآمد</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
          هر کارت را برای مشاهده جزئیات انتخاب کنید
        </p>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {features.map((f) => {
          const { id, label, Icon: I } = f;
          const active = id === selectedId;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelect?.(id)}
                aria-pressed={active}
                className={`group relative w-full glass-panel rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 ${
                  active
                    ? "ring-1 ring-[#54BA60]/60 shadow-[0_10px_30px_rgba(84,186,96,0.25)]"
                    : "hover:ring-1 hover:ring-white/15"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl transition-all duration-300 ${
                    active
                      ? "text-white bg-gradient-to-br from-[#4272B8]/30 to-[#54BA60]/30"
                      : "text-[#a8c7ff] bg-white/[0.04] group-hover:bg-white/[0.08]"
                  }`}
                >
                  <I />
                </span>
                <span className="text-[11px] sm:text-sm text-white/80 leading-snug text-center font-medium">
                  {label}
                </span>
                <span
                  className={`absolute inset-x-0 bottom-2 mx-auto h-1 w-8 rounded-full bg-gradient-to-r from-[#4272B8] to-[#54BA60] transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
