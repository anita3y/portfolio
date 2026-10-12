import { useEffect, useRef, useState } from "react";

const LETTERS = ["A", "n", "i", "t", "a"];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Shared construction guides (viewBox 0–100) so lines meet when panels flatten. */
const GUIDE_Y = {
  cap: 18,
  xHeight: 38,
  baseline: 78,
  midline: 58
};

function LetterScaffold({ letter, connect = 0 }) {
  const edge = 6 + connect * 10;
  const left = 6 - edge;
  const right = 94 + edge;
  const guideOpacity = 0.28 + connect * 0.22;
  const letterOpacity = 0.34 + connect * 0.1;

  const shared = (
    <>
      <line
        x1={left}
        y1={GUIDE_Y.cap}
        x2={right}
        y2={GUIDE_Y.cap}
        stroke="currentColor"
        strokeWidth="0.55"
        opacity={guideOpacity}
      />
      <line
        x1={left}
        y1={GUIDE_Y.xHeight}
        x2={right}
        y2={GUIDE_Y.xHeight}
        stroke="currentColor"
        strokeWidth="0.55"
        opacity={guideOpacity * 0.9}
      />
      <line
        x1={left}
        y1={GUIDE_Y.baseline}
        x2={right}
        y2={GUIDE_Y.baseline}
        stroke="currentColor"
        strokeWidth="0.65"
        opacity={guideOpacity + 0.08}
      />
    </>
  );

  let letterLines = null;

  switch (letter) {
    case "A":
      letterLines = (
        <>
          <line x1="28" y1={GUIDE_Y.baseline} x2="50" y2={GUIDE_Y.cap} stroke="currentColor" strokeWidth="0.7" opacity={letterOpacity} />
          <line x1="72" y1={GUIDE_Y.baseline} x2="50" y2={GUIDE_Y.cap} stroke="currentColor" strokeWidth="0.7" opacity={letterOpacity} />
          <line x1="36" y1={GUIDE_Y.midline} x2="64" y2={GUIDE_Y.midline} stroke="currentColor" strokeWidth="0.65" opacity={letterOpacity} />
          <line x1="50" y1={GUIDE_Y.cap} x2="50" y2={GUIDE_Y.baseline} stroke="currentColor" strokeWidth="0.4" opacity={letterOpacity * 0.55} strokeDasharray="2 2.5" />
        </>
      );
      break;
    case "n":
      letterLines = (
        <>
          <line x1="30" y1={GUIDE_Y.xHeight} x2="30" y2={GUIDE_Y.baseline} stroke="currentColor" strokeWidth="0.7" opacity={letterOpacity} />
          <path
            d={`M 30 ${GUIDE_Y.xHeight + 10} C 36 ${GUIDE_Y.xHeight - 4}, 58 ${GUIDE_Y.xHeight - 4}, 68 ${GUIDE_Y.xHeight + 8} L 68 ${GUIDE_Y.baseline}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity={letterOpacity}
          />
          <line x1="30" y1={GUIDE_Y.xHeight} x2="68" y2={GUIDE_Y.xHeight} stroke="currentColor" strokeWidth="0.4" opacity={letterOpacity * 0.5} strokeDasharray="2 2.5" />
        </>
      );
      break;
    case "i":
      letterLines = (
        <>
          <line x1="50" y1={GUIDE_Y.xHeight} x2="50" y2={GUIDE_Y.baseline} stroke="currentColor" strokeWidth="0.75" opacity={letterOpacity} />
          <circle cx="50" cy={GUIDE_Y.cap + 4} r="2.2" fill="none" stroke="currentColor" strokeWidth="0.65" opacity={letterOpacity} />
          <line x1="42" y1={GUIDE_Y.xHeight} x2="58" y2={GUIDE_Y.xHeight} stroke="currentColor" strokeWidth="0.45" opacity={letterOpacity * 0.55} />
        </>
      );
      break;
    case "t":
      letterLines = (
        <>
          <line x1="48" y1={GUIDE_Y.cap + 6} x2="48" y2={GUIDE_Y.baseline} stroke="currentColor" strokeWidth="0.75" opacity={letterOpacity} />
          <line x1="34" y1={GUIDE_Y.xHeight - 2} x2="66" y2={GUIDE_Y.xHeight - 2} stroke="currentColor" strokeWidth="0.7" opacity={letterOpacity} />
          <path
            d={`M 48 ${GUIDE_Y.baseline - 8} Q 58 ${GUIDE_Y.baseline + 2}, 68 ${GUIDE_Y.baseline - 2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.55"
            opacity={letterOpacity * 0.75}
          />
        </>
      );
      break;
    case "a":
      letterLines = (
        <>
          <circle
            cx="48"
            cy={(GUIDE_Y.xHeight + GUIDE_Y.baseline) / 2}
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity={letterOpacity}
          />
          <line x1="64" y1={GUIDE_Y.xHeight + 4} x2="64" y2={GUIDE_Y.baseline} stroke="currentColor" strokeWidth="0.7" opacity={letterOpacity} />
          <line x1="32" y1={GUIDE_Y.midline + 4} x2="64" y2={GUIDE_Y.midline + 4} stroke="currentColor" strokeWidth="0.4" opacity={letterOpacity * 0.5} strokeDasharray="2 2.5" />
        </>
      );
      break;
    default:
      break;
  }

  return (
    <svg className="name-intro__scaffold" viewBox="0 0 100 100" aria-hidden="true">
      {shared}
      {letterLines}
    </svg>
  );
}

function panelStyle(index, count, progress, reduced) {
  const flatten = easeInOutCubic(clamp(progress / 0.38, 0, 1));
  const join = easeInOutCubic(clamp((progress - 0.32) / 0.22, 0, 1));
  const fadeOut = easeInOutCubic(clamp((progress - 0.88) / 0.12, 0, 1));

  const mid = (count - 1) / 2;
  const fromMid = index - mid;

  // Stacked: diagonal depth like Play covers + the glass stack refs
  const stackX = fromMid * 2.35 + index * 0.55;
  const stackY = -index * 1.55 + fromMid * 0.35;
  const stackZ = (count - 1 - index) * 48;
  const stackRotateY = reduced ? 0 : fromMid * -7;
  const stackRotateX = reduced ? 0 : 8 - index * 1.2;
  const stackRotateZ = reduced ? 0 : fromMid * 1.4;

  // Flat word plane — tight Inter Thin tracking
  const panelW = 7.1;
  const flatGap = 0.08;
  const flatX = fromMid * (panelW + flatGap);
  const flatY = 0;
  const flatZ = 0;

  const x = stackX + (flatX - stackX) * flatten;
  const y = stackY + (flatY - stackY) * flatten;
  const z = stackZ * (1 - flatten);
  const rotateY = stackRotateY * (1 - flatten);
  const rotateX = stackRotateX * (1 - flatten);
  const rotateZ = stackRotateZ * (1 - flatten);

  // Pull together slightly after flatten
  const pull = 1 - join * 0.12;
  const pulledX = x * pull;

  const scale = 1 - join * 0.02;

  return {
    transform: `translate(-50%, -50%) translate3d(${pulledX}rem, ${y}rem, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
    zIndex: count - index,
    opacity: 1 - fadeOut
  };
}

export default function NameIntro() {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 1;
      setProgress(1);
      return undefined;
    }

    let frame = 0;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const traveled = clamp(-rect.top, 0, scrollable);
      const next = Math.round((traveled / scrollable) * 64) / 64;

      if (next !== progressRef.current) {
        progressRef.current = next;
        setProgress(next);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const flatten = easeInOutCubic(clamp(progress / 0.38, 0, 1));
  const connect = easeInOutCubic(clamp((progress - 0.48) / 0.18, 0, 1));
  const spread = easeInOutCubic(clamp((progress - 0.66) / 0.18, 0, 1));
  const exit = easeInOutCubic(clamp((progress - 0.84) / 0.16, 0, 1));

  const stageOpacity = 1 - exit * 0.15;
  const spreadOpacity = spread * (1 - exit) * 0.55;

  return (
    <section
      className="name-intro"
      aria-label="Anita name introduction"
      style={{
        "--ni-progress": progress,
        "--ni-flatten": flatten,
        "--ni-connect": connect,
        "--ni-spread": spread,
        "--ni-exit": exit
      }}
    >
      <div className="name-intro__track" ref={trackRef}>
        <div className="name-intro__sticky">
          <div
            className="name-intro__atmosphere"
            aria-hidden="true"
            style={{ opacity: 1 - exit }}
          />

          <div
            className="name-intro__spread"
            aria-hidden="true"
            style={{
              opacity: spreadOpacity,
              transform: `scaleX(${0.35 + spread * 0.65}) scaleY(${0.55 + spread * 0.45})`
            }}
          >
            {[GUIDE_Y.cap, GUIDE_Y.xHeight, GUIDE_Y.midline, GUIDE_Y.baseline].map((y) => (
              <span
                key={y}
                className="name-intro__spread-line"
                style={{ top: `${y}%` }}
              />
            ))}
            <span className="name-intro__spread-v name-intro__spread-v--a" />
            <span className="name-intro__spread-v name-intro__spread-v--b" />
            <span className="name-intro__spread-v name-intro__spread-v--c" />
          </div>

          <div
            className="name-intro__stage"
            style={{ opacity: stageOpacity * (1 - exit * 0.85) }}
          >
            {LETTERS.map((letter, index) => (
              <div
                key={`${letter}-${index}`}
                className="name-intro__panel"
                style={panelStyle(index, LETTERS.length, progress, reducedMotion)}
              >
                <div className="name-intro__glass">
                  <LetterScaffold letter={letter} connect={connect} />
                  <span className="name-intro__letter">{letter}</span>
                </div>
              </div>
            ))}
          </div>

          <p
            className="name-intro__hint"
            style={{ opacity: (1 - flatten) * (1 - exit) * 0.55 }}
            aria-hidden="true"
          >
            scroll
          </p>
        </div>
      </div>
    </section>
  );
}
