import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LogoAnimation from "./components/LogoAnimation.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import HeroPills from "./components/HeroPills.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // During the LogoAnimation entrance the page is the "loading" screen:
  // dark backdrop, only the logo visible. Once the logo starts moving into
  // its hero pose, it calls onReady and we reveal the page content.
  const [ready, setReady] = useState(false);

  // Lock page scroll while loading — no scrollbar should be visible until
  // the logo has finished its entrance.
  useEffect(() => {
    if (ready) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [ready]);

  // Smooth scroll once the page is revealed.
  useEffect(() => {
    if (!ready) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [ready]);

  return (
    <>
      <LogoAnimation onReady={() => setReady(true)} />
      {ready && <Header />}
      {ready && <HeroPills />}

      <main
        className="relative bg-grid transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <Hero />
        <Content />
        <Footer />
      </main>

      {/* Loading backdrop covers everything while the logo plays its entrance */}
      <div
        className="fixed inset-0 z-20 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: ready ? 0 : 1,
          background:
            "radial-gradient(900px 600px at 50% 30%, #11244f 0%, #070B1A 70%)",
        }}
      />
    </>
  );
}
