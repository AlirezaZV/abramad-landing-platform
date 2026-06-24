import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero — content lives on the RIGHT half. The fixed LogoAnimation occupies
 * the top-left corner (huge, half off the top + left edges). On scroll,
 * the inner copy fades + lifts away while the brand-mark anchor stays put
 * so HeroPills can keep measuring it.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const faderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(faderRef.current, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-64 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 gap-12 items-center">
        <div className="hero-copy">
          {/* Brand-mark row stays outside the fader so HeroPills always
              measures a stable anchor. The visible mark is drawn by the
              fixed pill overlay — this div is just a measurement target. */}
          <div className="flex items-center gap-4 mb-6">
            <div
              data-pill-anchor="hero-mark"
              className="w-[133px] h-[100px] relative shrink-0"
            />
            <img
              src="/fatype.png"
              alt="ابرآمد"
              className="h-[110px] w-auto object-contain"
            />
          </div>
          {/* Only the text + CTA fade on scroll. */}
          <div ref={faderRef}>
            <h1 className="text-sm md:text-7xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              <span className="shimmer-text">شریک فناوری سازمان شما</span>
              <br />
            </h1>
            <p className="mt-6 text-lg text-white/60 max-w-3xl leading-relaxed">
              پلتفرم سازمانی ابرآمد برای مدیریت، پایش و توسعه زیرساخت‌های ابری
              سازمانی
            </p>
            <div className="mt-10 flex gap-4">
              <button className="btn-primary glass-panel bg-gradient-to-r from-[#4272B8]/10 to-[#4272B8]/80">
                <span>تجربه یکپارچگی با پلتفرم سازمانی ابرآمد</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
