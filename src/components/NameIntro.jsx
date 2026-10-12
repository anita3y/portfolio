import { useEffect, useRef, useState } from "react";

/** Anita Yan — one letter per panel; visual gap between given + surname (no empty glass). */
const LETTERS = ["A", "n", "i", "t", "a", "Y", "a", "n"];
const SURNAME_START = 5;
const WORD_GAP_REM = 1.55;

/** Shared metrics (viewBox 0–100) so guides meet when panels flatten. */
const GUIDE = {
  cap: 14,
  xHeight: 34,
  baseline: 82,
  midline: 56
};

const INK = "#141414";
const RAIL = 5.4; // hollow stroke channel width
const INK_W = 0.95; // thin black outline

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function wordGapBefore(index) {
  return index >= SURNAME_START ? WORD_GAP_REM : 0;
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

/** Closed outline for a vertical hollow stem. */
function VertRail({ x, y1, y2, w = RAIL }) {
  const h = w / 2;
  return (
    <path
      d={`M ${x - h} ${y1} H ${x + h} V ${y2} H ${x - h} Z`}
      fill="none"
      stroke={INK}
      strokeWidth={INK_W}
      strokeLinejoin="miter"
    />
  );
}

/** Closed outline for a horizontal hollow bar. */
function HorizRail({ y, x1, x2, h = RAIL }) {
  const half = h / 2;
  return (
    <path
      d={`M ${x1} ${y - half} H ${x2} V ${y + half} H ${x1} Z`}
      fill="none"
      stroke={INK}
      strokeWidth={INK_W}
      strokeLinejoin="miter"
    />
  );
}

/**
 * Hollow outlined geometric letter + light-grey construction scaffolding.
 * Horizontals intentionally overrun the panel so they join when flattened.
 */
function ConstructionLetter({ letter, connect = 0 }) {
  const overrun = 8 + connect * 36;
  const left = -overrun;
  const right = 100 + overrun;
  const guideOp = 0.38 + connect * 0.28;
  const constructOp = 0.32 + connect * 0.18;

  const { cap, xHeight, baseline, midline } = GUIDE;

  const guides = (
    <g className="name-intro__guides" opacity={guideOp}>
      {/* Cap / x-height / baseline — continuous field when panels meet */}
      <line x1={left} y1={cap} x2={right} y2={cap} stroke="currentColor" strokeWidth="0.55" />
      <line x1={left} y1={xHeight} x2={right} y2={xHeight} stroke="currentColor" strokeWidth="0.55" />
      <line x1={left} y1={baseline} x2={right} y2={baseline} stroke="currentColor" strokeWidth="0.65" />
      {/* Vertical grid */}
      <line x1="18" y1={cap - 6} x2="18" y2={baseline + 6} stroke="currentColor" strokeWidth="0.45" opacity="0.85" />
      <line x1="50" y1={cap - 6} x2="50" y2={baseline + 6} stroke="currentColor" strokeWidth="0.4" opacity="0.7" strokeDasharray="1.6 2.2" />
      <line x1="82" y1={cap - 6} x2="82" y2={baseline + 6} stroke="currentColor" strokeWidth="0.45" opacity="0.85" />
    </g>
  );

  let construct = null;
  let form = null;

  switch (letter) {
    case "A": {
      const apexX = 50;
      const apexY = cap;
      const leftFoot = 20;
      const rightFoot = 80;
      const barY = midline;
      // Dual-rail diagonals as thin closed trapezoids along each leg
      const hw = RAIL / 2;
      construct = (
        <g opacity={constructOp}>
          <line x1={leftFoot} y1={baseline} x2={apexX} y2={apexY} stroke="currentColor" strokeWidth="0.45" />
          <line x1={rightFoot} y1={baseline} x2={apexX} y2={apexY} stroke="currentColor" strokeWidth="0.45" />
          <line x1={apexX} y1={apexY} x2={apexX} y2={baseline} stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.8 2.4" />
          <line x1={28} y1={barY} x2={72} y2={barY} stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.8 2.4" />
        </g>
      );
      // Approximate dual-rail A via outer + inner triangular outlines
      form = (
        <g fill="none" stroke={INK} strokeWidth={INK_W} strokeLinejoin="miter">
          {/* Outer A */}
          <path d={`M ${leftFoot} ${baseline} L ${apexX} ${apexY} L ${rightFoot} ${baseline}`} />
          {/* Inner parallel rails — offset toward center */}
          <path
            d={`M ${leftFoot + hw * 1.35} ${baseline} L ${apexX} ${apexY + hw * 1.7} L ${rightFoot - hw * 1.35} ${baseline}`}
          />
          {/* Crossbar dual rails */}
          <line x1={34} y1={barY - hw} x2={66} y2={barY - hw} />
          <line x1={36} y1={barY + hw} x2={64} y2={barY + hw} />
          {/* Close feet */}
          <line x1={leftFoot} y1={baseline} x2={leftFoot + hw * 1.35} y2={baseline} />
          <line x1={rightFoot} y1={baseline} x2={rightFoot - hw * 1.35} y2={baseline} />
          {/* Apex join */}
          <line x1={apexX - 0.2} y1={apexY} x2={apexX + 0.2} y2={apexY} />
        </g>
      );
      break;
    }
    case "n": {
      const lx = 28;
      const rx = 70;
      const archR = (rx - lx) / 2;
      const cx = (lx + rx) / 2;
      const cy = xHeight + archR;
      construct = (
        <g opacity={constructOp}>
          <circle cx={cx} cy={cy} r={archR + RAIL / 2} fill="none" stroke="currentColor" strokeWidth="0.45" />
          <circle cx={cx} cy={cy} r={archR - RAIL / 2} fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 2.2" />
          <line x1={lx} y1={xHeight} x2={rx} y2={xHeight} stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 2.2" />
        </g>
      );
      form = (
        <g fill="none" stroke={INK} strokeWidth={INK_W} strokeLinejoin="miter">
          <VertRail x={lx} y1={xHeight} y2={baseline} />
          {/* Outer + inner arch (top semicircle; SVG y-down → sweep 0) */}
          <path
            d={`M ${lx - RAIL / 2} ${cy} A ${archR + RAIL / 2} ${archR + RAIL / 2} 0 0 0 ${rx + RAIL / 2} ${cy}`}
          />
          <path
            d={`M ${lx + RAIL / 2} ${cy} A ${archR - RAIL / 2} ${archR - RAIL / 2} 0 0 0 ${rx - RAIL / 2} ${cy}`}
          />
          {/* Right stem from arch spring to baseline */}
          <path
            d={`M ${rx - RAIL / 2} ${cy} V ${baseline} H ${rx + RAIL / 2} V ${cy} Z`}
          />
          <line x1={lx - RAIL / 2} y1={xHeight} x2={lx + RAIL / 2} y2={xHeight} />
        </g>
      );
      break;
    }
    case "i": {
      const x = 50;
      const dotCy = cap + 5;
      const dotR = 3.4;
      const slab = 9;
      construct = (
        <g opacity={constructOp}>
          <circle cx={x} cy={dotCy} r={dotR + 2.2} fill="none" stroke="currentColor" strokeWidth="0.45" />
          <line x1={x - 14} y1={xHeight} x2={x + 14} y2={xHeight} stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 2.2" />
          <line x1={x} y1={dotCy} x2={x} y2={baseline} stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 2.2" />
        </g>
      );
      form = (
        <g fill="none" stroke={INK} strokeWidth={INK_W} strokeLinejoin="miter">
          {/* Hollow tittle */}
          <circle cx={x} cy={dotCy} r={dotR} />
          <VertRail x={x} y1={xHeight} y2={baseline - RAIL / 2} />
          {/* Flat slab base */}
          <HorizRail y={baseline - RAIL / 2} x1={x - slab} x2={x + slab} h={RAIL * 0.85} />
        </g>
      );
      break;
    }
    case "t": {
      const x = 48;
      const top = cap + 4;
      const barY = xHeight + 1;
      construct = (
        <g opacity={constructOp}>
          <circle cx={x + 10} cy={baseline - 6} r="10" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <line x1={x - 18} y1={barY} x2={x + 22} y2={barY} stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 2.2" />
          <line x1={x} y1={top} x2={x} y2={baseline} stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 2.2" />
        </g>
      );
      form = (
        <g fill="none" stroke={INK} strokeWidth={INK_W} strokeLinejoin="miter">
          <VertRail x={x} y1={top} y2={baseline - 4} />
          <HorizRail y={barY} x1={x - 16} x2={x + 18} />
          {/* Small terminal hook (dual rail curve) */}
          <path
            d={`M ${x - RAIL / 2} ${baseline - 4}
                Q ${x + 8} ${baseline + 2} ${x + 18} ${baseline - 2}`}
          />
          <path
            d={`M ${x + RAIL / 2} ${baseline - 4}
                Q ${x + 10} ${baseline - 1} ${x + 18} ${baseline - 2}`}
          />
        </g>
      );
      break;
    }
    case "a": {
      const cx = 46;
      const cy = (xHeight + baseline) / 2;
      const r = 17;
      const stemX = cx + r - 1;
      construct = (
        <g opacity={constructOp}>
          <circle cx={cx} cy={cy} r={r + RAIL / 2} fill="none" stroke="currentColor" strokeWidth="0.45" />
          <circle cx={cx} cy={cy} r={r - RAIL / 2} fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 2.2" />
          <line x1={stemX} y1={xHeight} x2={stemX} y2={baseline} stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 2.2" />
        </g>
      );
      form = (
        <g fill="none" stroke={INK} strokeWidth={INK_W} strokeLinejoin="miter">
          {/* Hollow bowl = concentric circles */}
          <circle cx={cx} cy={cy} r={r + RAIL / 2} />
          <circle cx={cx} cy={cy} r={r - RAIL / 2} />
          <VertRail x={stemX} y1={xHeight + 2} y2={baseline} />
        </g>
      );
      break;
    }
    case "Y": {
      const joinY = midline - 2;
      const apex = cap;
      construct = (
        <g opacity={constructOp}>
          <line x1="22" y1={apex} x2="50" y2={joinY} stroke="currentColor" strokeWidth="0.45" />
          <line x1="78" y1={apex} x2="50" y2={joinY} stroke="currentColor" strokeWidth="0.45" />
          <line x1="50" y1={apex} x2="50" y2={baseline} stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 2.2" />
        </g>
      );
      form = (
        <g fill="none" stroke={INK} strokeWidth={INK_W} strokeLinejoin="miter">
          {/* Dual-rail V arms */}
          <path d={`M 22 ${apex} L 50 ${joinY} L 78 ${apex}`} />
          <path d={`M ${22 + RAIL * 0.95} ${apex} L 50 ${joinY - RAIL * 0.55} L ${78 - RAIL * 0.95} ${apex}`} />
          <line x1="22" y1={apex} x2={22 + RAIL * 0.95} y2={apex} />
          <line x1="78" y1={apex} x2={78 - RAIL * 0.95} y2={apex} />
          <VertRail x={50} y1={joinY} y2={baseline} />
        </g>
      );
      break;
    }
    default:
      break;
  }

  return (
    <svg
      className="name-intro__drawing"
      viewBox="0 0 100 100"
      aria-hidden="true"
      overflow="visible"
    >
      {guides}
      {construct}
      {form}
    </svg>
  );
}

function panelStyle(index, count, progress, reduced) {
  const flatten = easeInOutCubic(clamp(progress / 0.38, 0, 1));
  const join = easeInOutCubic(clamp((progress - 0.32) / 0.22, 0, 1));
  const fadeOut = easeInOutCubic(clamp((progress - 0.88) / 0.12, 0, 1));

  const mid = (count - 1) / 2;
  const fromMid = index - mid;
  const gap = wordGapBefore(index);

  // Stacked: parallel thin sheets, already at a strong three-quarter angle.
  const stackX = fromMid * 0.55 + index * 1.05 + gap * 0.95;
  const stackY = 0.55 - index * 0.78;
  const stackZ = (count - 1 - index) * 42;
  const stackRotateY = reduced ? 0 : -48;
  const stackRotateX = reduced ? 0 : 5;
  const stackRotateZ = 0;

  // Flat word plane — tight tracking + clear space before Yan
  const panelW = 5.05;
  const flatGap = 0.05;
  const flatSpan = panelW + flatGap;
  const totalWidth = count * panelW + (count - 1) * flatGap + WORD_GAP_REM;
  const flatX = -totalWidth / 2 + index * flatSpan + gap + panelW / 2;
  const flatY = 0;

  const x = stackX + (flatX - stackX) * flatten;
  const y = stackY + (flatY - stackY) * flatten;
  const z = stackZ * (1 - flatten);
  const rotateY = stackRotateY * (1 - flatten);
  const rotateX = stackRotateX * (1 - flatten);
  const rotateZ = stackRotateZ * (1 - flatten);

  const pull = 1 - join * 0.08;
  const pulledX = x * pull;
  const scale = 1 - join * 0.015;

  return {
    transform: `translate(-50%, -50%) translate3d(${pulledX}rem, ${y}rem, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
    zIndex: count - index,
    opacity: Math.max(0, 1 - fadeOut * 0.35)
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
  const connect = easeInOutCubic(clamp((progress - 0.34) / 0.28, 0, 1));
  const spread = easeInOutCubic(clamp((progress - 0.42) / 0.22, 0, 1));
  const exit = easeInOutCubic(clamp((progress - 0.78) / 0.18, 0, 1));

  const stageOpacity = 1 - exit;
  const spreadOpacity = spread * (1 - exit) * 0.7;
  const connecting = connect > 0.15;

  return (
    <section
      className="name-intro"
      aria-label="Anita Yan name introduction"
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
          {/* Continuous construction field once letters flatten */}
          <div
            className="name-intro__spread"
            aria-hidden="true"
            style={{
              opacity: spreadOpacity,
              transform: `scaleX(${0.42 + spread * 0.58}) scaleY(${0.7 + spread * 0.3})`
            }}
          >
            {[GUIDE.cap, GUIDE.xHeight, GUIDE.baseline].map((y) => (
              <span
                key={y}
                className="name-intro__spread-line"
                style={{ top: `${y}%` }}
              />
            ))}
            {[12, 24, 36, 50, 64, 76, 88].map((x) => (
              <span
                key={x}
                className="name-intro__spread-v"
                style={{ left: `${x}%` }}
              />
            ))}
          </div>

          <div className="name-intro__stage" style={{ opacity: stageOpacity }}>
            {LETTERS.map((letter, index) => (
              <div
                key={`${letter}-${index}`}
                className="name-intro__panel"
                style={panelStyle(index, LETTERS.length, progress, reducedMotion)}
              >
                <div
                  className={`name-intro__glass${connecting ? " is-connecting" : ""}`}
                >
                  <ConstructionLetter letter={letter} connect={connect} />
                  <span className="name-intro__sr">{letter}</span>
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
