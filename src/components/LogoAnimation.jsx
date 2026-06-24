import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The ONE logo for the whole page — now drawn with three rounded <div>
 * "pills" instead of SVG paths + Gaussian-blur filters. Fixed in the
 * viewport, driven by mount + scroll. Deliberately light:
 *
 *   1. LOADING — the three pills "sprout" from their shared bottom pivot
 *                (staggered scaleY) while the logo is still SMALL. This is
 *                the div-friendly stand-in for the old stroke wave-draw.
 *   2. HERO    — the assembled logo scales up and slides aside. At this BIG
 *                size it is completely static: just three gradient pills
 *                (no filters, no looping animation) plus a soft shadow.
 *   3. SCROLL  — the same logo scales/moves down into the header icon,
 *                measured from the header's #logo-slot so it lands aligned
 *                on every screen size. Only a GPU transform runs per frame.
 *
 * GEOMETRY — measured from the original 306×306 SVG. All three pills share
 * the SAME width and ONE shared bottom pivot at (50%, 81.79%); the center
 * (azure) pill is the tallest, the side pills are shorter and rotated ±45°.
 * Everything is expressed in % of the square stage, so it is pixel-correct
 * at any size — the stage just sets width/height.
 *
 * Note: we intentionally do NOT use `.glass-panel` here — its backdrop-blur
 * is very expensive when the element is scaled 5.5× at the hero size. The
 * glassy feel is faked with a gradient + a subtle inset highlight instead.
 */

const DIAMETER = 110.36 / 306; // pill width  ≈ 0.3606 of the box
const RADIUS = DIAMETER / 2; // ≈ 0.1803
const AXIS_CENTER = 195.11 / 306; // azure cap-to-cap ≈ 0.6376
const AXIS_SIDE = 137.9 / 306; // blue/green cap-to-cap ≈ 0.4507
const PIVOT_Y = 250.29 / 306; // shared bottom pivot ≈ 0.8179

const pct = (n) => `${n * 100}%`;

// One pill's static box (position + size). Anchored so its bottom cap-center
// sits exactly on the shared pivot. Rotation + grow are applied via GSAP.
const pillBox = (axis) => {
  const total = axis + DIAMETER; // tip-to-tip length
  return {
    position: "absolute",
    width: pct(DIAMETER),
    height: pct(total),
    left: pct(0.5 - RADIUS),
    top: pct(PIVOT_Y - axis - RADIUS),
    borderRadius: "9999px",
  };
};

// transformOrigin Y (within the pill box) = the shared bottom cap-center, so
// both the rotation and the scaleY "sprout" pivot around the same point.
const originY = (axis) => {
  const total = axis + DIAMETER;
  return ((total - RADIUS) / total) * 100;
};

const PILLS = [
  {
    key: "blue",
    axis: AXIS_SIDE,
    rot: 45, // up-right
    bg: "linear-gradient(135deg, #3b6cd1 0%, #264A9F80 100%)",
    glow: "#3b6cd1",
  },
  {
    key: "azure",
    axis: AXIS_CENTER,
    rot: 0, // straight up, tallest
    bg: "linear-gradient(180deg, #5a8bd880 0%, #4272B8 100%)",
    glow: "#5a8bd8",
  },
  {
    key: "green",
    axis: AXIS_SIDE,
    rot: -45, // up-left
    bg: "linear-gradient(45deg, #54BA60 0%, #7cd58a80 100%)",
    glow: "#54BA60",
  },
];

export default function LogoAnimation({ onReady }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const shadowRef = useRef(null);
  const pillRefs = useRef([]);
  const glowRefs = useRef([]);

  // Keep the latest onReady in a ref so the entrance effect can call it
  // without listing onReady as a dep — otherwise every parent re-render
  // (e.g. when ready flips) would re-mount the entire timeline.
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pills = pillRefs.current;

      // Hero + icon poses are computed from the stage's current center so the
      // math stays exact at any size. Measured BEFORE the initial transforms.
      const r = stageRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const vw = window.innerWidth;
      const isMobile = vw < 768;

      const HERO_SCALE = isMobile ? 4.3 : 5.5;
      const heroTargetX = isMobile ? vw / 2 : 300;
      const heroTargetY = 0;
      const heroPose = {
        x: heroTargetX - cx,
        y: heroTargetY - cy,
        scale: HERO_SCALE,
      };

      // Header-icon pose is measured later (in onComplete) from the header's
      // reserved #logo-slot, so the icon lands exactly on the header at any
      // viewport width. The slot exists once the page is revealed, which has
      // happened by the time the entrance completes.
      const measureIconPose = () => {
        const slot =
          typeof document !== "undefined" &&
          document.getElementById("logo-slot");
        if (slot) {
          const sr = slot.getBoundingClientRect();
          return {
            x: sr.left + sr.width / 2 - cx,
            y: sr.top + sr.height / 2 - cy,
            scale: sr.width / r.width, // shrink the stage down to the slot
          };
        }
        const fScale = isMobile ? 0.3 : 0.16;
        const fx = isMobile ? 36 : 64;
        const fy = isMobile ? 32 : 40;
        return { x: fx - cx, y: fy - cy, scale: fScale };
      };

      // ---------- INITIAL ----------
      const glows = glowRefs.current;
      gsap.set(stageRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(shadowRef.current, { opacity: 0 });
      PILLS.forEach((p, i) => {
        gsap.set(pills[i], {
          transformOrigin: `50% ${originY(p.axis)}%`,
          rotation: p.rot,
          scaleY: 0, // collapsed onto the pivot
          opacity: 0,
        });
        // Glow host matches the pill's pose so its orbit traces the pill's
        // own frame. Opacity stays 0 — GSAP fades it in with the shadow halo.
        gsap.set(glows[i], {
          transformOrigin: `50% ${originY(p.axis)}%`,
          rotation: p.rot,
        });
      });

      // ---------- ENTRANCE: sprout → assemble → slide ----------
      // Runs while the logo is small, so even the back-ease overshoot is cheap.
      const enter = gsap.timeline({ delay: 0.25 });
      enter
        .to(stageRef.current, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        })
        // Each pill grows out from the shared pivot in a staggered wave.
        .to(
          pills,
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.95,
            ease: "back.out(1.7)",
            stagger: 0.16,
          },
          "<0.1",
        )
        // Hold a beat, then grow + move to the hero pose. onStart reveals the
        // page so the same logo flows continuously into its hero pose;
        // onComplete arms the lightweight scroll-driven hero→icon scale-down.
        .to(
          stageRef.current,
          {
            x: heroPose.x,
            y: heroPose.y,
            scale: heroPose.scale,
            duration: 1.25,
            ease: "power3.inOut",
            onStart: () => onReadyRef.current?.(),
            onComplete: () => {
              ctx.add(() => {
                // BIG state: shadow halo + per-pill orbiting glow loops fade
                // in together. They fade out via the scroll trigger below.
                // `.is-hero` on the stage turns on the per-pill border /
                // backdrop glow and the hover scale-up.
                stageRef.current.classList.add("is-hero");
                gsap.to([shadowRef.current, ...glows], {
                  opacity: 1,
                  duration: 0.7,
                  ease: "power2.out",
                });

                // Scroll-driven hero → icon: scale/move down only. The target
                // is measured from #logo-slot (in the DOM by now), so the icon
                // lands aligned with the header on every screen size.
                const iconPose = measureIconPose();
                const scrollTl = gsap.timeline({
                  scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.8,
                    onUpdate: (self) => {
                      // Drop `.is-hero` as soon as the user scrolls so the
                      // border/backdrop glow and hover affordance turn off
                      // before the mark visibly shrinks toward the header.
                      const isHero = self.progress < 0.04;
                      stageRef.current.classList.toggle("is-hero", isHero);
                    },
                  },
                });
                scrollTl
                  .to(
                    stageRef.current,
                    {
                      x: iconPose.x,
                      y: iconPose.y,
                      scale: iconPose.scale,
                      ease: "none",
                    },
                    0,
                  )
                  .to(
                    [shadowRef.current, ...glows],
                    { opacity: 0, ease: "none" },
                    0,
                  );
              });
              ScrollTrigger.refresh();
            },
          },
          "+=0.15",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const stageStyle = {
    width: "min(34vmin, 300px)",
    height: "min(34vmin, 300px)",
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-x-0 z-30 pointer-events-none flex justify-center "
      style={{ top: "clamp(48px, 14vh, 160px)" }}
      aria-hidden="true"
    >
      <div ref={stageRef} className="relative" style={stageStyle}>
        {/* SHADOW HALO — soft radial backdrop, only visible at hero scale */}
        <div
          ref={shadowRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "10%",
            height: "10%",
            opacity: 0,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(66, 114, 184, 0.50) 0%, rgba(66, 114, 184, 0.00) 100%)",
          }}
        />

        {/* Orbiting glow halos, one per pill — rendered BEFORE the pills so
            the colored blob leaks around the gradient instead of covering it. */}
        {PILLS.map((p, i) => (
          <div
            key={`glow-${p.key}`}
            ref={(el) => (glowRefs.current[i] = el)}
            style={{ ...pillBox(p.axis), "--pill-glow-color": p.glow }}
            className="pill-glow-host"
          >
            <span className="pill-glow" />
          </div>
        ))}

        {/* Three rounded pills make up the mark. Each: host (GSAP target)
            → halo (colored border glow) → body (glass + gradient) →
            backdrop (rotating bright spot). The halo + backdrop only
            paint when the stage carries `.is-hero`. */}
        {PILLS.map((p, i) => (
          <div
            key={p.key}
            ref={(el) => (pillRefs.current[i] = el)}
            style={{ ...pillBox(p.axis), "--pill-glow-color": p.glow }}
            className="pill-host"
          >
            {/* <div className="pill-halo" /> */}
            <div className="pill-body glass-panel" style={{ background: p.bg }}>
              {/* <span className="pill-backdrop" /> */}
            </div>
            {/* Animated rim — bright spot orbits the four corners via
                @property-interpolated --pill-border-x / --pill-border-y. */}
            <div className="pill-border-glow" />
          </div>
        ))}
      </div>
    </div>
  );
}
