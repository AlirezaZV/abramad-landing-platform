import React, { useState, useEffect } from "react";

const PHRASES = [
  "به‌سادگی و در کمترین زمان",
  "با نهایت یکپارچگی",
  "متناسب با نیاز سازمانتان",
  "با زیرساختی پایدار و امن",
];

export default function Footer() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const t = setTimeout(() => {
        setIdx((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, 420);
      return () => clearTimeout(t);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="footer"
      className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden"
      dir="rtl"
    >
      {/* HeroPills logo anchor */}
      <div
        data-pill-anchor="footer-mark"
        className="absolute bottom-24 start-10 w-[133px] h-[100px]"
      />

      {/* CTA block */}
      <div className="relative text-center px-4 sm:px-8 max-w-4xl mx-auto w-full">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.38em] text-white/28 mb-7">
          شروع کنید
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
          آماده‌اید ابر دلخواه‌تان را
        </h2>

        {/* Animated phrase */}
        <div className="h-12 sm:h-14 md:h-16 lg:h-[4.5rem] flex items-center justify-center my-1 overflow-hidden">
          <span
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.42s ease, transform 0.42s ease",
              background: "linear-gradient(100deg, #4272B8 20%, #54BA60 80%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              display: "block",
            }}
          >
            {PHRASES[idx]}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-10 sm:mb-12">
          بسازید؟
        </h2>

        {/* CTA button */}
        <a
          href="https://cloud.abramad.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex"
          style={{
            background:
              "linear-gradient(135deg, #264A9F 0%, #4272B8 48%, #54BA60 100%)",
            fontSize: "1rem",
            padding: "16px 36px",
          }}
        >
          ورود به پلتفرم سازمانی ابرآمد
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-5 h-5"
          >
            <path d="M7 17 17 7m0 0H7m10 0v10" />
          </svg>
        </a>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 border-t border-white/[0.05] py-5 text-center">
        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} ابرآمد — تمامی حقوق محفوظ است
        </p>
      </div>
    </footer>
  );
}
