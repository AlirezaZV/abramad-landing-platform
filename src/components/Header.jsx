import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Header — fixed top bar that owns the layout for the three nav slots.
 * The visible nav buttons themselves are rendered by HeroPills, which
 * morphs the hero brand-mark pills directly into these positions. Each
 * slot just reserves space; HeroPills measures the slot rects and
 * positions a pill on top of each.
 *
 * The `logo-slot` div remains untouched — LogoAnimation lands its
 * shrunken corner-icon there on scroll.
 */
const HEADER_SLOTS = [
  { key: 0, target: "#intro-video" },
  { key: 1, target: "#features-strip" },
  { key: 2, target: "#content" },
];

export default function Header() {
  const headerRef = useRef(null);
  const navWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The nav slots fade in as the hero scrolls out, in sync with the
      // HeroPills hero→header morph.
      gsap.set(navWrapRef.current, { opacity: 0, y: -8 });
      gsap.to(navWrapRef.current, {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-40 pt-4 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Three slot anchors — HeroPills morphs the brand-mark pills into
            these positions and renders the visible, clickable nav buttons. */}
        <div
          ref={navWrapRef}
          className="flex items-center gap-2 sm:gap-3"
          aria-hidden="true"
        >
          {HEADER_SLOTS.map((slot) => (
            <div
              key={slot.key}
              data-pill-anchor={`header-slot-${slot.key}`}
              data-pill-target={slot.target}
              className="w-[96px] h-10 sm:w-[110px] sm:h-11 lg:w-[120px]"
            />
          ))}
        </div>

        {/* Landing slot for the corner-icon LogoAnimation. */}
        <div
          id="logo-slot"
          className="w-12 h-12 lg:w-14 lg:h-14 shrink-0"
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
