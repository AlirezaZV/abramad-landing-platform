import React from "react";

/**
 * Hero — content lives on the RIGHT half. The fixed LogoAnimation occupies
 * the top-left corner (huge, half off the top + left edges).
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-64 overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12  gap-12 items-center">
        {/* Left column is empty — reserved for the fixed logo's corner pose */}
        {/* <div aria-hidden="true" /> */}

        <div className="hero-copy">
          <div className="flex items-center gap-4 mb-6">
            {/* glass abramad logo */}
            {/* <div className="w-[133px] h-[100px] relative shrink-0">
              <div className="glass-panel w-[45px] h-[101px] absolute -right-[25px] bottom-[6px] rotate-45 origin-top-left bg-gradient-to-r from-[#264A9F]/50 to-[#264A9F]/80  rounded-full" />
              <div className="glass-panel w-[45px] h-[123px] absolute left-[48px] bottom-3 bg-gradient-to-r from-[#4272B8]/60 to-[#4272B8]/80  rounded-full" />
              <div className="glass-panel w-[45px] h-[101px] absolute -left-[3px] -bottom-[28px] -rotate-45 origin-top-left bg-gradient-to-r from-[#54BA60]/70 to-[#54BA60]/50 rounded-full" />
            </div> */}
            <img
              src="/fatype.png"
              alt="ابرآمد"
              className="h-[110px] w-auto object-contain"
            />
          </div>
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
    </section>
  );
}
