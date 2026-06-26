import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LogoAnimation from "./components/LogoAnimation.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Content, { VideoPlayerBox } from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import HeroPills from "./components/HeroPills.jsx";
import FeatureDetail from "./pages/FeatureDetail.jsx";
import FeatureStrip from "./components/FeatureStrip.jsx";
import LaserFlow from "./components/LaserFlow.jsx";
import Reveal from "./components/Reveal.jsx";

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  const [ready, setReady] = useState(false);

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
        <div className="relative isolate">
          {/* Laser beam background — flows from the top of the hero and
              visually "lands" on the video player box below. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-0"
            style={{ height: "calc(100vh + 360px)" }}
          >
            <LaserFlow
              color="#4272B8"
              horizontalBeamOffset={-0.1}
              verticalBeamOffset={-0.23}
              verticalSizing={1.6}
              horizontalSizing={0.55}
              wispDensity={3.2}
              wispIntensity={10.5}
              fogIntensity={0.1}
              flowSpeed={0.55}
            />
          </div>
          <div className="relative z-10">
            <Hero />
            {/* <Reveal from="up"> */}
            <section id="intro-video" className="scroll-mt-24">
              <VideoPlayerBox />
            </section>
            {/* </Reveal> */}
          </div>
        </div>
        <Reveal from="up">
          <section id="features-strip" className="scroll-mt-24">
            <FeatureStrip />
          </section>
        </Reveal>
        {/* <Content /> */}
        <Reveal from="up">
          <Footer />
        </Reveal>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feature/:id" element={<FeatureDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
