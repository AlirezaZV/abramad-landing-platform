import React from "react";
import { FEATURES } from "../data/dashboardFeatures.jsx";

export default function FeatureStrip() {
  return (
    <div className="mt-8 sm:mt-10 max-w-7xl mx-auto">
      <div data-pill-anchor="features-strip">
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
        className="feature-btn w-full h-full flex flex-col items-center gap-1.5 sm:gap-2 px-1.5 py-2.5 sm:px-3 sm:py-3 rounded-xl transition-colors duration-300 "
      >
        <span className="feature-icon relative flex items-center justify-center transition-transform duration-300">
          <I />
        </span>
        <span className="text-[14px]  text-white/70 leading-snug text-center break-words">
          {label}
        </span>
      </button>

      <div className="feature-tooltip bg-[#080D1E] rounded-2xl pointer-events-none hidden md:block absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-[260px] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="border border-white rounded-xl p-2 shadow-2xl">
          <div className="h-[150px] rounded-lg overflow-hidden">
            <Preview />
          </div>
          <div className="px-1 pt-2 pb-1 text-[11px] text-white/85 text-center">
            {label}
          </div>
        </div>
        <div
          aria-hidden
          className="absolute border-b-2 border-r-2 border-white/80 left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-[#080D1E] backdrop-blur"
        />
      </div>
    </li>
  );
}
