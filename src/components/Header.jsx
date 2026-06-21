import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Header — fades in as the user scrolls past the hero, in sync with the
 * LogoAnimation shrinking into its corner-icon pose.
 *
 * Left column is intentionally a reserved spacer: the actual logo is
 * rendered by the (fixed-positioned) LogoAnimation, which lands in that
 * top-left area on scroll. The right column holds the nav links — for now
 * they just point at section ids; smooth-scrolling can be wired up later.
 */
const NAV_ITEMS = [
  { label: "خانه", href: "#hero" },
  { label: "خدمات", href: "#content" },
  { label: "درباره", href: "#content" },
  { label: "تماس", href: "#footer" },
];

export default function Header() {
  const headerRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav starts invisible & a touch above; reveals as hero scrolls out.
      gsap.set(navRef.current, { opacity: 0, y: -8 });
      gsap.to(navRef.current, {
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
        {/* Reserved space for the corner-icon LogoAnimation lands in */}
        {/* <div className="w-20 h-20 shrink-0" aria-hidden="true" /> */}

        <nav
          ref={navRef}
          className="pointer-events-auto glass-panel rounded-full px-5 py-2.5 flex items-center gap-5"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
