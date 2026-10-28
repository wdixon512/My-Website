import { useEffect, useRef } from "react";

const Cloud = ({ className, style }: { className: string; style: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 120 60" aria-hidden="true" focusable="false">
    <g fill="#fff" opacity="0.9">
      <circle cx="35" cy="35" r="20" />
      <circle cx="60" cy="25" r="24" />
      <circle cx="85" cy="35" r="20" />
      <rect x="25" y="35" width="70" height="20" rx="10" />
    </g>
  </svg>
);

const QBlock = ({ style }: { style: React.CSSProperties }) => (
  <span className="wow-qblock" style={style} aria-hidden="true">?</span>
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
        <Cloud className="wow-cloud" style={{ top: "12%", left: "6%", width: 110 }} />
        <Cloud className="wow-cloud wow-cloud-slow" style={{ top: "22%", right: "8%", width: 150 }} />
        <Cloud className="wow-cloud" style={{ top: "55%", left: "62%", width: 90 }} />
      </div>
      <div className="wow-layer wow-layer-mid">
        <QBlock style={{ top: "18%", left: "18%" }} />
        <QBlock style={{ top: "30%", right: "16%", animationDelay: "1.2s" }} />
        <QBlock style={{ top: "62%", left: "8%", animationDelay: "0.6s" }} />
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
