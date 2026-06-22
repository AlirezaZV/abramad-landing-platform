import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The ONE logo for the whole page. Fixed in the viewport, driven by
 * mount + scroll. Kept deliberately light:
 *
 *   1. LOADING — three stroke paths wave-draw onto the backdrop while the
 *                logo is still SMALL (so the glow filter is cheap), then
 *                the colored fills bloom in.
 *   2. HERO    — the solid logo scales up and slides to the right. At this
 *                BIG size it is completely static: just the gradient fills
 *                (no SVG filters, no looping animation) plus a soft shadow.
 *   3. SCROLL  — the same solid logo scales/moves down into the header icon.
 *                Only a GPU transform animates per frame.
 *
 * What was removed for performance: the infinite three-layer "comet" orbit
 * and its animated Gaussian-blur halo/smoke layers, which re-rasterized a
 * large blurred area every frame at 5.5x hero scale.
 */

const PATHS = {
  blue: "M113.713 211.273L211.263 113.722C232.813 92.1725 267.753 92.1725 289.303 113.722C310.853 135.272 310.853 170.213 289.303 191.763L191.753 289.312C170.203 310.863 135.263 310.863 113.713 289.312C92.1625 267.762 92.1625 232.823 113.713 211.273Z",
  azure:
    "M113.712 16.1625C102.932 26.9425 97.5525 41.0625 97.5525 55.1825V250.293C97.5525 264.413 102.942 278.533 113.712 289.312C135.262 310.862 170.202 310.862 191.753 289.312C202.533 278.533 207.912 264.413 207.912 250.293V55.1825C207.912 41.0625 202.523 26.9425 191.753 16.1625C170.202 -5.3875 135.262 -5.3875 113.712 16.1625Z",
  green:
    "M113.712 289.312L16.1625 191.763C-5.3875 170.213 -5.3875 135.272 16.1625 113.722C37.7125 92.1725 72.6525 92.1725 94.2025 113.722L191.753 211.273C213.303 232.823 213.303 267.762 191.753 289.312C170.203 310.863 135.262 310.863 113.712 289.312Z",
};

export default function LogoAnimation({ onReady }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const shadowRef = useRef(null);

  const sBlue = useRef(null),
    sAzure = useRef(null),
    sGreen = useRef(null);
  const fBlue = useRef(null),
    fAzure = useRef(null),
    fGreen = useRef(null);

  // Keep the latest onReady in a ref so the entrance effect can call it
  // without listing onReady as a dep — otherwise every parent re-render
  // (e.g. when ready flips) would re-mount the entire timeline.
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lenB = sBlue.current.getTotalLength();
      const lenA = sAzure.current.getTotalLength();
      const lenG = sGreen.current.getTotalLength();

      // Hero + icon poses are computed from the stage's current center so
      // the math stays exact at any size. Targets differ on mobile vs
      // desktop: desktop bleeds the giant logo off the top-left edge for
      // visual drama; mobile shows it fully, centered horizontally near
      // the top, at a scale that fits the viewport.
      const r = stageRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const vw = window.innerWidth;
      const isMobile = vw < 768;

      const HERO_SCALE = isMobile ? 4.3 : 5.5;
      const heroTargetX = isMobile ? vw / 2 : 300;
      const heroTargetY = isMobile ? 0 : 0;
      const heroPose = {
        x: heroTargetX - cx,
        y: heroTargetY - cy,
        scale: HERO_SCALE,
      };

      // Header-icon "pose" is computed later (in onComplete), by measuring
      // the header's reserved #logo-slot — so the icon lands exactly on the
      // header at any viewport width instead of using fixed pixel guesses.
      // The slot only exists once the page is revealed, which has happened
      // by the time the entrance completes.
      const measureIconPose = () => {
        const slot =
          typeof document !== "undefined" &&
          document.getElementById("logo-slot");
        if (slot) {
          const sr = slot.getBoundingClientRect();
          return {
            x: sr.left + sr.width / 2 - cx,
            y: sr.top + sr.height / 2 - cy,
            // Shrink the natural stage down to the slot's width.
            scale: sr.width / r.width,
          };
        }
        // Fallback if the slot isn't in the DOM for some reason.
        const fScale = isMobile ? 0.3 : 0.16;
        const fx = isMobile ? 36 : vw - 64;
        const fy = isMobile ? 32 : 40;
        return { x: fx - cx, y: fy - cy, scale: fScale };
      };

      // ---------- INITIAL ----------
      gsap.set(stageRef.current, { opacity: 0, scale: 0.9 });
      gsap.set([fBlue.current, fAzure.current, fGreen.current], { opacity: 0 });
      gsap.set(sBlue.current, {
        strokeDasharray: lenB,
        strokeDashoffset: lenB,
        opacity: 1,
      });
      gsap.set(sAzure.current, {
        strokeDasharray: lenA,
        strokeDashoffset: lenA,
        opacity: 1,
      });
      gsap.set(sGreen.current, {
        strokeDasharray: lenG,
        strokeDashoffset: lenG,
        opacity: 1,
      });

      // ---------- ENTRANCE: wave draw → fill → slide right ----------
      // All of this runs while the logo is small, so the glow filter on the
      // strokes is cheap. By the time it scales up, only the (unfiltered)
      // fills are visible.
      const enter = gsap.timeline({ delay: 0.25 });
      enter
        .to(stageRef.current, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        })
        // Wave-style staggered stroke draw
        .to(
          sBlue.current,
          { strokeDashoffset: 0, duration: 1.6, ease: "sine.inOut" },
          "<",
        )
        .to(
          sAzure.current,
          { strokeDashoffset: 0, duration: 1.6, ease: "sine.inOut" },
          "<0.22",
        )
        .to(
          sGreen.current,
          { strokeDashoffset: 0, duration: 1.6, ease: "sine.inOut" },
          "<0.22",
        )
        // Bloom fills in, fade strokes out
        .to(
          [fBlue.current, fAzure.current, fGreen.current],
          {
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          },
          "+=0.05",
        )
        .to(
          [sBlue.current, sAzure.current, sGreen.current],
          {
            opacity: 0,
            duration: 0.35,
            ease: "power1.out",
          },
          "<",
        )
        // Hold the assembled logo for a beat, then grow + move to the hero
        // pose. onStart reveals the page so the same logo flows continuously
        // into its hero pose. onComplete arms the lightweight scroll-driven
        // hero→icon scale-down.
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
              // ctx.add() keeps these tweens tracked by the same gsap.context,
              // so unmount cleanup still works.
              ctx.add(() => {
                // BIG state = cheap state. The solid gradient fills are
                // already visible; just fade in the soft shadow halo. No
                // looping animation, no SVG filters at hero scale.
                gsap.to(shadowRef.current, {
                  opacity: 1,
                  duration: 0.7,
                  ease: "power2.out",
                });

                // Scroll-driven hero → icon: scale/move down only. The fills
                // stay solid the whole way, so the only per-frame work is a
                // GPU transform. The target is measured from the header's
                // #logo-slot now (it's in the DOM by this point), so the icon
                // lands aligned with the header on every screen size.
                const iconPose = measureIconPose();
                const scrollTl = gsap.timeline({
                  scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.8,
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
                  .to(shadowRef.current, { opacity: 0, ease: "none" }, 0);
              });
              ScrollTrigger.refresh();
            },
          },
          "+=0.15",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // No CSS `filter` and no `will-change` — both force the browser to
  // rasterize the stage and then GPU-scale the bitmap, which makes the
  // (vector) SVG blurry at the big hero scale. Without them, the browser
  // re-rasterizes the SVG at the new size every frame and stays sharp.
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
            width: "160%",
            height: "160%",
            opacity: 0,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(66, 114, 184, 0.50) 0%, rgba(66, 114, 184, 0.00) 100%)",
          }}
        />

        {/* BLUE */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 306 306"
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="lg-blue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#264A9F" />
                <stop offset="100%" stopColor="#3b6cd1" />
              </linearGradient>
              {/* Glow used ONLY by the small-scale entrance stroke draw */}
              <filter
                id="glow-blue"
                x="-150%"
                y="-150%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur stdDeviation="3" result="innerBlur" />
                <feGaussianBlur
                  stdDeviation="11"
                  result="outerBlur"
                  in="SourceGraphic"
                />
                <feMerge>
                  <feMergeNode in="outerBlur" />
                  <feMergeNode in="innerBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              ref={fBlue}
              d={PATHS.blue}
              fill="url(#lg-blue)"
              className="glass-panel"
            />
            <path
              ref={sBlue}
              d={PATHS.blue}
              fill="none"
              stroke="#7aa6e8"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#glow-blue)"
            />
          </svg>
        </div>

        {/* AZURE */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 306 306"
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="lg-azure" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5a8bd8" />
                <stop offset="100%" stopColor="#4272B8" />
              </linearGradient>
              <filter
                id="glow-azure"
                x="-150%"
                y="-150%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur stdDeviation="3" result="innerBlur" />
                <feGaussianBlur
                  stdDeviation="11"
                  result="outerBlur"
                  in="SourceGraphic"
                />
                <feMerge>
                  <feMergeNode in="outerBlur" />
                  <feMergeNode in="innerBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path ref={fAzure} d={PATHS.azure} fill="url(#lg-azure)" />
            <path
              ref={sAzure}
              d={PATHS.azure}
              fill="none"
              stroke="#8fb4ee"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#glow-azure)"
            />
          </svg>
        </div>

        {/* GREEN */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 306 306"
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="lg-green" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#54BA60" />
                <stop offset="100%" stopColor="#7cd58a" />
              </linearGradient>
              <filter
                id="glow-green"
                x="-150%"
                y="-150%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur stdDeviation="3" result="innerBlur" />
                <feGaussianBlur
                  stdDeviation="11"
                  result="outerBlur"
                  in="SourceGraphic"
                />
                <feMerge>
                  <feMergeNode in="outerBlur" />
                  <feMergeNode in="innerBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path ref={fGreen} d={PATHS.green} fill="url(#lg-green)" />
            <path
              ref={sGreen}
              d={PATHS.green}
              fill="none"
              stroke="#8ee09a"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#glow-green)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
