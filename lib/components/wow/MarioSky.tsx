import { useEffect, useRef } from "react";

const Cloud = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 120 60" aria-hidden="true" focusable="false">
    <g fill="#fff" opacity="0.9">
      <circle cx="35" cy="35" r="20" />
      <circle cx="60" cy="25" r="24" />
      <circle cx="85" cy="35" r="20" />
      <rect x="25" y="35" width="70" height="20" rx="10" />
    </g>
  </svg>
);

const QBlock = ({ className }: { className: string }) => (
  <span className={className} aria-hidden="true">?</span>
);

/** Decorative parallax sky: clouds, hills and floating ?-blocks. */
export const MarioSky = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--sy", String(Math.min(window.scrollY, 800)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="wow-sky" aria-hidden="true">
      <div className="wow-layer wow-layer-far">
        <Cloud className="wow-cloud wow-cloud-a" />
        <Cloud className="wow-cloud wow-cloud-slow wow-cloud-b" />
        <Cloud className="wow-cloud wow-cloud-c" />
      </div>
      <div className="wow-layer wow-layer-mid">
        <QBlock className="wow-qblock wow-qblock-a" />
        <QBlock className="wow-qblock wow-qblock-b" />
        <QBlock className="wow-qblock wow-qblock-c" />
      </div>
      <div className="wow-layer wow-layer-near">
        <svg className="wow-hills" viewBox="0 0 1440 160" preserveAspectRatio="none" focusable="false">
          <path d="M0 160 V110 Q180 20 360 100 T720 90 T1080 80 T1440 100 V160 Z" fill="#2f6b3a" />
          <path d="M0 160 V130 Q240 70 480 130 T960 120 T1440 125 V160 Z" fill="#1f4f2a" />
        </svg>
      </div>
      <div className="wow-glow" />
    </div>
  );
};

export default MarioSky;
