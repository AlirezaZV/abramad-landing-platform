import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroPills — three glass pills lifted into a fixed overlay that morph from
 * the hero brand-mark triangular pose directly into the header nav slots.
 *
 *   hero    → triangular brand-mark, sitting on the hero anchor
 *   header  → each pill lands on its corresponding [data-pill-anchor=
 *             "header-slot-N"] in the Header bar, becomes a clickable nav
 *             button labeled for one of: VideoPlayerBox, FeatureStrip,
 *             Content.
 *
 * The transition is scrubbed by scroll position between scrollY=0 (hero
 * pose) and scrollY ≈ 50% viewport (fully docked into header).
 */

function smoothstep(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpState(a, b, t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    w: lerp(a.w, b.w, t),
    h: lerp(a.h, b.h, t),
    rotate: lerp(a.rotate, b.rotate, t),
    opacity: lerp(a.opacity, b.opacity, t),
    label: lerp(a.label ?? 0, b.label ?? 0, t),
  };
}

function rectOf(selector) {
  const el = document.querySelector(selector);
  return el ? el.getBoundingClientRect() : null;
}

const PILLS = [
  { label: "ویدیو", target: "#intro-video" },
  { label: "امکانات", target: "#features-strip" },
  { label: "پلتفرم", target: "#content" },
];

export default function HeroPills() {
  const blueRef = useRef(null);
  const azureRef = useRef(null);
  const greenRef = useRef(null);

  useEffect(() => {
    const refs = [blueRef, azureRef, greenRef];

    function stateAt(phase, idx) {
      const hero = rectOf('[data-pill-anchor="hero-mark"]');
      const slot = rectOf(`[data-pill-anchor="header-slot-${idx}"]`);
      const FB = { x: 0, y: 0, width: 0, height: 0 };

      if (phase === "hero") {
        const r = hero || FB;
        const cx = r.x + r.width * 0.5;
        const cy = r.y + r.height * 0.5;
        // Final positions match the original layout exactly. The original
        // file applied a per-pill static (left, top) offset on the element
        // itself (blue: -8/-10, azure: 0/-20, green: 10/-10); we fold those
        // offsets into the state values so left/top can stay at 0/0.
        if (idx === 0)
          return {
            x: cx + 4,
            y: cy - 48,
            w: 38,
            h: 96,
            rotate: 45,
            opacity: 1,
            label: 0,
          };
        if (idx === 1)
          return {
            x: cx - 19,
            y: cy - 80,
            w: 38,
            h: 118,
            rotate: 0,
            opacity: 1,
            label: 0,
          };
        if (idx === 2)
          return {
            x: cx - 40,
            y: cy - 48,
            w: 38,
            h: 96,
            rotate: -45,
            opacity: 1,
            label: 0,
          };
      }

      if (phase === "header") {
        const r = slot || FB;
        return {
          x: r.x,
          y: r.y,
          w: r.width || 110,
          h: r.height || 44,
          rotate: 0,
          opacity: 1,
          label: 1,
        };
      }

      return null;
    }

    function update() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Pills are fully docked into the header by ~50% viewport scroll.
      const headerPeak = Math.max(vh * 0.5, 1);
      const t = Math.max(0, Math.min(1, scrollY / headerPeak));
      const eased = smoothstep(t);

      refs.forEach((ref, idx) => {
        const el = ref.current;
        if (!el) return;
        const fState = stateAt("hero", idx);
        const tState = stateAt("header", idx);
        if (!fState || !tState) return;
        const s = lerpState(fState, tState, eased);
        el.style.width = `${s.w}px`;
        el.style.height = `${s.h}px`;
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rotate}deg)`;
        el.style.opacity = s.opacity;
        // Clickable only once the pill is mostly settled into its header slot.
        el.style.pointerEvents = eased > 0.85 ? "auto" : "none";

        const labelEl = el.querySelector("[data-pill-label]");
        if (labelEl) labelEl.style.opacity = s.label;
      });
    }

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      update();
    });

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      onUpdate: update,
      onRefresh: update,
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = (target) => {
    const el = document.querySelector(target);
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const baseBtnStyle = {
    left: 0,
    top: 0,
    transformOrigin: "center center",
    willChange: "transform, width, height, opacity",
    padding: 0,
    border: 0,
    cursor: "pointer",
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 30 }}>
      <button
        ref={blueRef}
        type="button"
        aria-label={PILLS[0].label}
        onClick={() => scrollTo(PILLS[0].target)}
        className="glass-panel absolute rounded-full bg-gradient-to-r from-[#264A9F]/50 to-[#264A9F]/80 flex items-center justify-center"
        style={baseBtnStyle}
      >
        <span
          data-pill-label
          className="text-xs sm:text-sm font-medium text-white whitespace-nowrap select-none"
          style={{ opacity: 0 }}
        >
          {PILLS[0].label}
        </span>
      </button>
      <button
        ref={azureRef}
        type="button"
        aria-label={PILLS[1].label}
        onClick={() => scrollTo(PILLS[1].target)}
        className="glass-panel absolute rounded-full bg-gradient-to-r from-[#4272B8]/60 to-[#4272B8]/80 flex items-center justify-center"
        style={baseBtnStyle}
      >
        <span
          data-pill-label
          className="text-xs sm:text-sm font-medium text-white whitespace-nowrap select-none"
          style={{ opacity: 0 }}
        >
          {PILLS[1].label}
        </span>
      </button>
      <button
        ref={greenRef}
        type="button"
        aria-label={PILLS[2].label}
        onClick={() => scrollTo(PILLS[2].target)}
        className="glass-panel absolute rounded-full bg-gradient-to-r from-[#54BA60]/70 to-[#54BA60]/50 flex items-center justify-center"
        style={baseBtnStyle}
      >
        <span
          data-pill-label
          className="text-xs sm:text-sm font-medium text-white whitespace-nowrap select-none"
          style={{ opacity: 0 }}
        >
          {PILLS[2].label}
        </span>
      </button>
    </div>
  );
}
