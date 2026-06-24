import { useEffect, useRef } from "react";

/**
 * Reveal — a lightweight IntersectionObserver wrapper that flips a
 * `data-revealed` flag the first time the element scrolls into view. The
 * actual animation (opacity + translate + clip-path) is driven by CSS so
 * we don't pay for a GSAP tween per element. Children can opt into one of
 * several preset directions via the `from` prop.
 */
const PRESETS = {
  up: "reveal-up",
  down: "reveal-down",
  left: "reveal-left",
  right: "reveal-right",
  fade: "reveal-fade",
  clip: "reveal-clip",
};

export default function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
  once = true,
  threshold = 0.18,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.dataset.revealed = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.dataset.revealed = "true";
            if (once) io.unobserve(el);
          } else if (!once) {
            delete el.dataset.revealed;
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${PRESETS[from] || PRESETS.up} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
