import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroPills — three glass pills lifted into a fixed overlay that morph as
 * the user scrolls:
 *
 *   hero      → triangular brand-mark pose, sitting on the hero anchor
 *   video     → blue rim above the video, azure disc behind play, green rim below
 *   features  → blue/green flatten into top/bottom rules of the strip, azure
 *               becomes a thin vertical spine through the center
 *   footer    → reassemble into the brand-mark pose on the footer anchor
 *
 * Visual treatment: frosted `.glass-panel` + flat brand gradient. No outer
 * glow / box-shadow.
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
  };
}

function rectOf(selector) {
  const el = document.querySelector(selector);
  return el ? el.getBoundingClientRect() : null;
}

export default function HeroPills() {
  const blueRef = useRef(null);
  const azureRef = useRef(null);
  const greenRef = useRef(null);

  useEffect(() => {
    const refs = [blueRef, azureRef, greenRef];

    function stateAt(phase, idx) {
      const hero = rectOf('[data-pill-anchor="hero-mark"]');
      const video = rectOf('[data-pill-anchor="video-box"]');
      const play = rectOf('[data-pill-anchor="video-play"]');
      const features = rectOf('[data-pill-anchor="features-strip"]');
      const footerMark = rectOf('[data-pill-anchor="footer-mark"]');
      const FB = { x: 0, y: 0, width: 0, height: 0 };

      if (phase === "hero" || phase === "footer") {
        const r = (phase === "hero" ? hero : footerMark) || FB;
        const cx = r.x + r.width * 0.5;
        const cy = r.y + r.height * 0.5;
        // Triangular brand-mark pose. Pivots chosen to approximate the
        // original inline mark in Hero.jsx.
        if (idx === 0)
          return {
            x: cx + 12,
            y: cy - 38,
            w: 38,
            h: 96,
            rotate: 45,
            opacity: 1,
          };
        if (idx === 1)
          return {
            x: cx - 19,
            y: cy - 60,
            w: 38,
            h: 118,
            rotate: 0,
            opacity: 1,
          };
        if (idx === 2)
          return {
            x: cx - 50,
            y: cy - 38,
            w: 38,
            h: 96,
            rotate: -45,
            opacity: 1,
          };
      }

      if (phase === "video") {
        const v = video || FB;
        const p = play || FB;
        if (idx === 0)
          return {
            x: v.x,
            y: v.y - 6,
            w: v.width,
            h: 5,
            rotate: 0,
            opacity: 0.85,
          };
        if (idx === 1) {
          const size = Math.max(p.width, p.height) * 1.6 || 140;
          return {
            x: p.x + p.width / 2 - size / 2,
            y: p.y + p.height / 2 - size / 2,
            w: size,
            h: size,
            rotate: 0,
            opacity: 0.35,
          };
        }
        if (idx === 2)
          return {
            x: v.x,
            y: v.y + v.height + 1,
            w: v.width,
            h: 5,
            rotate: 0,
            opacity: 0.85,
          };
      }

      if (phase === "features") {
        const f = features || FB;
        if (idx === 0)
          return {
            x: f.x,
            y: f.y - 4,
            w: f.width,
            h: 3,
            rotate: 0,
            opacity: 0.75,
          };
        if (idx === 1)
          return {
            x: f.x + f.width / 2 - 2,
            y: f.y + 10,
            w: 4,
            h: f.height - 20,
            rotate: 0,
            opacity: 0.55,
          };
        if (idx === 2)
          return {
            x: f.x,
            y: f.y + f.height + 1,
            w: f.width,
            h: 3,
            rotate: 0,
            opacity: 0.75,
          };
      }

      return null;
    }

    function update() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const contentEl = document.getElementById("content");
      const footerEl = document.getElementById("footer");
      if (!contentEl || !footerEl) return;

      const contentTop = contentEl.offsetTop;
      const contentH = contentEl.offsetHeight;
      const footerTop = footerEl.offsetTop;

      const milestones = [
        { name: "hero", peak: 0 },
        { name: "video", peak: Math.max(0, contentTop - vh * 0.25) },
        { name: "features", peak: Math.max(0, contentTop + contentH * 0.6) },
        { name: "footer", peak: Math.max(0, footerTop - vh * 0.25) },
      ];

      let from = milestones[0];
      let to = milestones[0];
      let t = 1;
      for (let i = 0; i < milestones.length; i++) {
        if (i === milestones.length - 1) {
          from = to = milestones[i];
          t = 1;
          break;
        }
        if (scrollY <= milestones[i + 1].peak) {
          from = milestones[i];
          to = milestones[i + 1];
          const span = to.peak - from.peak || 1;
          t = (scrollY - from.peak) / span;
          break;
        }
      }
      t = Math.max(0, Math.min(1, t));
      const eased = smoothstep(t);

      refs.forEach((ref, idx) => {
        const el = ref.current;
        if (!el) return;
        const fState = stateAt(from.name, idx);
        const tState = stateAt(to.name, idx);
        if (!fState || !tState) return;
        const s = lerpState(fState, tState, eased);
        el.style.width = `${s.w}px`;
        el.style.height = `${s.h}px`;
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rotate}deg)`;
        el.style.opacity = s.opacity;
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

  // Each pill: existing `.glass-panel` for frosted inset + flat brand
  // gradient for color. No outer box-shadow.
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 15 }}
      aria-hidden="true"
    >
      <div
        ref={blueRef}
        className="glass-panel absolute rounded-full bg-gradient-to-r from-[#264A9F]/50 to-[#264A9F]/80"
        style={{
          left: -8,
          top: -10,
          transformOrigin: "center center",
          willChange: "transform, width, height, opacity",
        }}
      />
      <div
        ref={azureRef}
        className="glass-panel absolute rounded-full bg-gradient-to-r from-[#4272B8]/60 to-[#4272B8]/80"
        style={{
          left: 0,
          top: -20,
          transformOrigin: "center center",
          willChange: "transform, width, height, opacity",
        }}
      />
      <div
        ref={greenRef}
        className="glass-panel absolute rounded-full bg-gradient-to-r from-[#54BA60]/70 to-[#54BA60]/50"
        style={{
          left: 10,
          top: -10,
          transformOrigin: "center center",
          willChange: "transform, width, height, opacity",
        }}
      />
    </div>
  );
}
