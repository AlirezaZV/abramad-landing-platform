import { useEffect, useState } from "react";
import { bubbleStore, TAB_LABELS } from "./HeroPills.jsx";
import VideoPlayerBox from "./VideoPlayerBox.jsx";
import FeatureStrip from "./FeatureStrip.jsx";
import FeatureGrid from "./FeatureGrid.jsx";
import { FEATURES } from "../data/dashboardFeatures.jsx";

/**
 * TabsSection — the middle of the page. HeroPills draws 3 bubble-shaped
 * pills at the top of this section as a clickable nav. The content panel
 * below renders whichever bubble is currently active in `bubbleStore`.
 */
export default function TabsSection() {
  const [active, setActive] = useState(() => bubbleStore.get());

  useEffect(() => bubbleStore.subscribe(setActive), []);

  return (
    <section
      id="tabs-section"
      className="relative min-h-screen pt-[200px] pb-16 overflow-hidden"
      style={{ zIndex: 2 }}
      dir="rtl"
    >
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <ContentPanel active={active} />
      </div>
    </section>
  );
}

function ContentPanel({ active }) {
  return (
    <div className="relative w-full">
      <Pane visible={active === 0}>
        <SectionHeading
          eyebrow="یک نگاه به پلتفرم"
          title="پلتفرم ابرآمد در عمل"
        />
        <VideoPlayerBox />
        <FeatureStrip />
      </Pane>

      <Pane visible={active === 1}>
        <SectionHeading
          eyebrow="امکانات پلتفرم"
          title="۹ قابلیت کلیدی ابرآمد"
        />
        <FeatureGrid
          features={FEATURES}
          selectedId={null}
          onSelect={() => {}}
        />
      </Pane>

      <Pane visible={active === 2}>
        <SectionHeading eyebrow="تماس با ما" title="در ارتباط باشیم" />
        <ContactPanel />
      </Pane>
    </div>
  );
}

function Pane({ visible, children }) {
  return (
    <div
      className={`transition-opacity duration-500 ${
        visible
          ? "opacity-100 relative pointer-events-auto"
          : "opacity-0 absolute inset-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
        {eyebrow}
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
        <span className="shimmer-text">{title}</span>
      </h2>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 100%, rgba(66,114,184,0.18), transparent 70%)",
          }}
        />
        <div className="relative grid sm:grid-cols-2 gap-6 sm:gap-10">
          <ContactRow
            label="ایمیل"
            value="info@abramad.com"
            href="mailto:info@abramad.com"
          />
          <ContactRow
            label="تلفن"
            value="۰۲۱ — ۹۱۰۰ ۰۰۰۰"
            href="tel:+982191000000"
          />
          <ContactRow
            label="ساعات پاسخگویی"
            value="شنبه تا چهارشنبه ۹ تا ۱۸"
          />
          <ContactRow label="دفتر مرکزی" value="تهران، خیابان ولیعصر" />
        </div>
        <div className="relative mt-10 flex justify-center">
          <a
            href="https://cloud.abramad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
            style={{
              background:
                "linear-gradient(135deg, #264A9F 0%, #4272B8 50%, #54BA60 100%)",
            }}
          >
            ورود به پلتفرم سازمانی ابرآمد
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-4 h-4"
            >
              <path d="M7 17 17 7m0 0H7m10 0v10" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ label, value, href }) {
  const content = (
    <>
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-1.5">
        {label}
      </p>
      <p className="text-base text-white/85">{value}</p>
    </>
  );
  if (href)
    return (
      <a
        href={href}
        className="block hover:text-[#54BA60] transition-colors"
      >
        {content}
      </a>
    );
  return <div>{content}</div>;
}
