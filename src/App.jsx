import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LogoAnimation from "./components/LogoAnimation.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import HeroPills from "./components/HeroPills.jsx";
import FeatureDetail from "./pages/FeatureDetail.jsx";

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
        <Hero />
        <Content />
        <Footer />
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
