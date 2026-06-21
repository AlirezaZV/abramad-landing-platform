import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The ONE logo for the whole page. Fixed in the viewport, morphs through
 * four phases driven by mount + scroll:
 *
 *   1. LOADING  — three stroke paths wave-draw onto a dark backdrop,
 *                 then the colored fills bloom in.
 *   2. HERO     — solid logo scales up and slides to the right side.
 *   3. CONTENT  — fills swap back to strokes; each path drifts on its
 *                 own sine wave, driven by scroll progress.
 *   4. FOOTER   — paths converge, strokes fade, fills return: rebuilt.
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

  const wBlue = useRef(null),
    wAzure = useRef(null),
    wGreen = useRef(null);
  const sBlue = useRef(null),
    sAzure = useRef(null),
    sGreen = useRef(null);
  const fBlue = useRef(null),
    fAzure = useRef(null),
    fGreen = useRef(null);
  // Hero-loop only: faded full-path "ghost" and soft "smoke" trail that
  // sits behind the bright bubble (which reuses the existing s* stroke).
  const gBlue = useRef(null),
    gAzure = useRef(null),
    gGreen = useRef(null);
  const tBlue = useRef(null),
    tAzure = useRef(null),
    tGreen = useRef(null);
  // Outer wide halo layer — very blurry, breathes in/out like the glow-button aura
  const hBlue = useRef(null),
    hAzure = useRef(null),
    hGreen = useRef(null);

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

      // Header-icon "pose" — same logo, shrunk to a ~40px mark in the
      // top-left corner. Mobile uses a larger relative scale because the
      // stage starts smaller, so 0.13 would render an unreadably tiny icon.
      const ICON_SCALE = isMobile ? 0.3 : 0.13;
      const iconTargetX = isMobile ? 36 : 400;
      const iconTargetY = isMobile ? 32 : 40;
      const iconPose = {
        x: iconTargetX - cx,
        y: iconTargetY - cy,
        scale: ICON_SCALE,
      };

      // ---------- INITIAL ----------
      gsap.set(stageRef.current, { opacity: 0, scale: 0.9 });
      gsap.set([fBlue.current, fAzure.current, fGreen.current], { opacity: 0 });
      gsap.set(
        [
          gBlue.current,
          gAzure.current,
          gGreen.current,
          tBlue.current,
          tAzure.current,
          tGreen.current,
          hBlue.current,
          hAzure.current,
          hGreen.current,
        ],
        { opacity: 0 },
      );
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
        // Hold the assembled logo for a beat, then grow + move into the
        // top-left corner. onStart reveals the page so the same logo flows
        // continuously into its hero pose — no re-animation.
        // onComplete arms the scroll-driven hero→icon transition, capturing
        // the current heroPose as the "from" state.
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
              // ctx.add() keeps these inner tweens tracked by the same gsap.context,
              // so unmount cleanup still works.
              ctx.add(() => {
                // Three-layer comet per path, inspired by the glow-button's
                // multi-layer shine: halo (wide aura) → smoke tail → bright core.
                // Each layer orbits the path in lockstep; the halo breathes
                // with a sine-wave pulse and the core flares its width.
                const HEAD_DASH = 3;
                const TAIL_DASH = 120;
                const HALO_DASH = 220;
                const lanes = [
                  {
                    head: sBlue.current,
                    tail: tBlue.current,
                    halo: hBlue.current,
                    len: lenB,
                    headColor: "#c4dcff",
                    tailColor: "#5a8bd8",
                  },
                  {
                    head: sAzure.current,
                    tail: tAzure.current,
                    halo: hAzure.current,
                    len: lenA,
                    headColor: "#e2eeff",
                    tailColor: "#4272B8",
                  },
                  {
                    head: sGreen.current,
                    tail: tGreen.current,
                    halo: hGreen.current,
                    len: lenG,
                    headColor: "#c6f5cc",
                    tailColor: "#54BA60",
                  },
                ];
                lanes.forEach(
                  ({ head, tail, halo, len, headColor, tailColor }) => {
                    gsap.set(head, {
                      strokeDasharray: `${HEAD_DASH} ${len - HEAD_DASH}`,
                      strokeDashoffset: 0,
                      stroke: headColor,
                      strokeWidth: "6",
                    });
                    gsap.set(tail, {
                      strokeDasharray: `${TAIL_DASH} ${len - TAIL_DASH}`,
                      strokeDashoffset: TAIL_DASH - HEAD_DASH,
                      stroke: tailColor,
                      strokeWidth: "8",
                    });
                    gsap.set(halo, {
                      strokeDasharray: `${HALO_DASH} ${len - HALO_DASH}`,
                      strokeDashoffset: HALO_DASH - HEAD_DASH,
                      stroke: tailColor,
                      strokeWidth: "20",
                    });
                  },
                );

                gsap.to([fBlue.current, fAzure.current, fGreen.current], {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power1.out",
                });
                gsap.to([sBlue.current, sAzure.current, sGreen.current], {
                  opacity: 1,
                  duration: 0.5,
                  ease: "power1.out",
                });
                gsap.to([tBlue.current, tAzure.current, tGreen.current], {
                  opacity: 0.65,
                  duration: 0.7,
                  ease: "power1.out",
                });
                gsap.to([hBlue.current, hAzure.current, hGreen.current], {
                  opacity: 0.42,
                  duration: 1.0,
                  ease: "power1.out",
                });
                gsap.to([gBlue.current, gAzure.current, gGreen.current], {
                  opacity: 0.13,
                  duration: 0.7,
                  ease: "power1.out",
                });
                gsap.to(shadowRef.current, {
                  opacity: 1,
                  duration: 0.7,
                  ease: "power2.out",
                });

                // All three layers orbit each path in lockstep. Staggered
                // phase delays keep the colors from marching in unison.
                // The halo breathes (opacity yoyo) for an organic pulse;
                // the core flares its strokeWidth like a glowing flare.
                lanes.forEach(({ head, tail, halo, len }, i) => {
                  const duration = 3.5 + i * 0.25;
                  const delay = i * 0.45;
                  gsap.to(head, {
                    strokeDashoffset: -len,
                    duration,
                    ease: "none",
                    repeat: -1,
                    delay,
                  });
                  gsap.to(tail, {
                    strokeDashoffset: TAIL_DASH - HEAD_DASH - len,
                    duration,
                    ease: "none",
                    repeat: -1,
                    delay,
                  });
                  gsap.to(halo, {
                    strokeDashoffset: HALO_DASH - HEAD_DASH - len,
                    duration,
                    ease: "none",
                    repeat: -1,
                    delay,
                  });
                  // Outer halo breathes — mimics the glow-button's radial aura bloom
                  gsap.to(halo, {
                    opacity: 0.12,
                    duration: 1.3 + i * 0.3,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: 1.1 + i * 0.5,
                  });
                  // Core dot flares its width — like the button's glowing shine burst
                  gsap.to(head, {
                    strokeWidth: "3",
                    duration: 0.85 + i * 0.2,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: 0.6 + i * 0.35,
                  });
                });

                // Scroll-driven hero → icon: scale down AND crossfade strokes
                // + halo away while fills return, all bound to the same
                // ScrollTrigger so they stay in sync with the scale.
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
                  .to(
                    [fBlue.current, fAzure.current, fGreen.current],
                    { opacity: 1, ease: "none" },
                    0,
                  )
                  .to(
                    [sBlue.current, sAzure.current, sGreen.current],
                    { opacity: 0, ease: "none" },
                    0,
                  )
                  .to(
                    [tBlue.current, tAzure.current, tGreen.current],
                    { opacity: 0, ease: "none" },
                    0,
                  )
                  .to(
                    [hBlue.current, hAzure.current, hGreen.current],
                    { opacity: 0, ease: "none" },
                    0,
                  )
                  .to(
                    [gBlue.current, gAzure.current, gGreen.current],
                    { opacity: 0, ease: "none" },
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
        <div ref={wBlue} className="absolute inset-0  ">
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
              {/* Double-layer glow: tight inner bloom + wide outer corona */}
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
              <filter
                id="smoke-blue"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="15" />
              </filter>
              <filter
                id="halo-blue"
                x="-250%"
                y="-250%"
                width="600%"
                height="600%"
              >
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </defs>
            <path
              ref={fBlue}
              d={PATHS.blue}
              fill="url(#lg-blue)"
              className="glass-panel"
            />
            <path
              ref={gBlue}
              d={PATHS.blue}
              fill="#7aa6e8"
              stroke="#7aa6e8"
              strokeWidth="1.5"
              opacity="0"
            />
            {/* Outer halo — widest, most diffuse layer */}
            <path
              ref={hBlue}
              d={PATHS.blue}
              fill="none"
              stroke="#5a8bd8"
              strokeWidth="20"
              strokeLinecap="round"
              filter="url(#halo-blue)"
              opacity="0"
            />
            <path
              ref={tBlue}
              d={PATHS.blue}
              fill="none"
              stroke="#a8c8f3"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#smoke-blue)"
              opacity="0"
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
        <div ref={wAzure} className="absolute inset-0">
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
              <filter
                id="smoke-azure"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="9" />
              </filter>
              <filter
                id="halo-azure"
                x="-250%"
                y="-250%"
                width="600%"
                height="600%"
              >
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </defs>
            <path ref={fAzure} d={PATHS.azure} fill="url(#lg-azure)" />
            <path
              ref={gAzure}
              d={PATHS.azure}
              fill="#8fb4ee"
              stroke="#8fb4ee"
              strokeWidth="1.5"
              opacity="0"
            />
            <path
              ref={hAzure}
              d={PATHS.azure}
              fill="none"
              stroke="#4272B8"
              strokeWidth="20"
              strokeLinecap="round"
              filter="url(#halo-azure)"
              opacity="0"
            />
            <path
              ref={tAzure}
              d={PATHS.azure}
              fill="none"
              stroke="#b8d2f5"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#smoke-azure)"
              opacity="0"
            />
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
        <div ref={wGreen} className="absolute inset-0">
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
              <filter
                id="smoke-green"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="9" />
              </filter>
              <filter
                id="halo-green"
                x="-250%"
                y="-250%"
                width="600%"
                height="600%"
              >
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </defs>
            <path ref={fGreen} d={PATHS.green} fill="url(#lg-green)" />
            <path
              ref={gGreen}
              d={PATHS.green}
              fill="#8ee09a"
              stroke="#8ee09a"
              strokeWidth="1.5"
              opacity="0"
            />
            <path
              ref={hGreen}
              d={PATHS.green}
              fill="none"
              stroke="#54BA60"
              strokeWidth="20"
              strokeLinecap="round"
              filter="url(#halo-green)"
              opacity="0"
            />
            <path
              ref={tGreen}
              d={PATHS.green}
              fill="none"
              stroke="#b6ecbf"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#smoke-green)"
              opacity="0"
            />
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
