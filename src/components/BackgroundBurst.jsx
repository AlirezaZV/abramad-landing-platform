import { useEffect, useRef } from "react";
import gsap from "gsap";
import { burstStore } from "./HeroPills.jsx";

/**
 * BackgroundBurst — a single fixed layer that, on every pill click, fires a
 * radial colored shockwave anchored at the pill's own viewport position.
 * The wave grows from 0 to fill the screen and lands as a soft persistent
 * tint matching the active pill, so the whole landing visibly "becomes"
 * that pill's color. Sits below HeroPills + section content so it tints
 * the dark grid backdrop without obscuring text.
 */
export default function BackgroundBurst() {
  const waveRef = useRef(null);
  const tintRef = useRef(null);

  useEffect(() => {
    return burstStore.subscribe(({ x, y, color }) => {
      const wave = waveRef.current;
      const tint = tintRef.current;
      if (!wave || !tint) return;

      const vmax = Math.max(window.innerWidth, window.innerHeight);
      const target = vmax * 2.4;

      // Move the shockwave's center to the clicked pill's position. The
      // wave itself is centered on this point via translate(-50%, -50%).
      gsap.killTweensOf(wave);
      gsap.set(wave, {
        left: x,
        top: y,
        width: 0,
        height: 0,
        opacity: 1,
        background: `radial-gradient(circle, ${color} 0%, ${color}cc 28%, ${color}66 55%, transparent 78%)`,
      });
      gsap.to(wave, {
        width: target,
        height: target,
        opacity: 0,
        duration: 1.55,
        ease: "expo.out",
      });

      // Persistent atmospheric tint anchored at the same point — fades the
      // page's overall color toward the active pill's hue. Cross-fades from
      // whatever the previous pill set.
      gsap.killTweensOf(tint);
      gsap.to(tint, {
        background: `radial-gradient(120% 90% at ${x}px ${y}px, ${color}38 0%, ${color}10 35%, transparent 70%)`,
        duration: 1.2,
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        ref={tintRef}
        className="absolute inset-0"
        style={{ mixBlendMode: "screen", willChange: "background" }}
      />
      <div
        ref={waveRef}
        className="absolute rounded-full"
        style={{
          transform: "translate(-50%, -50%)",
          mixBlendMode: "screen",
          willChange: "width, height, opacity",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}
