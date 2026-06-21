/**
 * Footer — the resolution. The logo rebuilds (strokes converge, fills bloom)
 * during this section, so we give it some breathing room.
 */
export default function Footer() {
  return (
    <footer id="footer" className="relative min-h-screen flex items-end">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
        <div>
          {/* Reassembly target — <HeroPills /> returns to the brand mark here. */}
          <div
            data-pill-anchor="footer-mark"
            className="w-[133px] h-[100px] mb-8"
          />
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3">
            Footer
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90">
            Closing line.
          </h2>
          <p className="mt-4 text-white/55 max-w-md">
            Replace with contact info, links, or a final call to action.
          </p>
          <p className="mt-10 text-xs text-white/30">
            © {new Date().getFullYear()}
          </p>
        </div>

        <div aria-hidden="true" />
      </div>
    </footer>
  );
}
