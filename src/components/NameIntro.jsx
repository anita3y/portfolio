import { useEffect, useRef, useState } from "react";

/** Full name — one letter per card; visual gap before surname. */
const LETTERS = ["A", "n", "i", "t", "a", "Y", "a", "n"];
const SURNAME_START = 5;
const WORD_GAP_REM = 1.35;

/** Slightly varied opaque slabs (textures TBD). */
const CARD_TONES = [
  "#f4f4f2",
  "#efefed",
  "#f7f6f3",
  "#ecece8",
  "#f2f1ee",
  "#f5f4f1",
  "#eeeee9",
  "#f6f5f2"
];

const HANDLE_POS = [
  ["0%", "0%"],
  ["50%", "0%"],
  ["100%", "0%"],
  ["100%", "50%"],
  ["100%", "100%"],
  ["50%", "100%"],
  ["0%", "100%"],
  ["0%", "50%"]
];

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

/** Light-grey construction geometry that “draws” after flatten. */
function LetterSketch({ letter, draw }) {
  const len = 420;
  const dash = `${draw * len} ${len}`;

  let paths = null;
  switch (letter) {
    case "A":
      paths = (
        <>
          <path d="M22 88 L50 12 L78 88" />
          <path d="M34 58 H66" />
          <line x1="50" y1="12" x2="50" y2="88" strokeDasharray="2 3" />
        </>
      );
      break;
    case "n":
      paths = (
        <>
          <path d="M28 88 V42" />
          <path d="M28 48 A22 22 0 0 1 72 48" />
          <path d="M72 48 V88" />
          <circle cx="50" cy="48" r="22" opacity="0.55" />
        </>
      );
      break;
    case "i":
      paths = (
        <>
          <circle cx="50" cy="18" r="5.5" />
          <path d="M50 38 V82" />
          <path d="M38 88 H62" />
        </>
      );
      break;
    case "t":
      paths = (
        <>
          <path d="M48 14 V88" />
          <path d="M28 40 H72" />
          <path d="M48 88 Q68 88 72 72" />
        </>
      );
      break;
    case "a":
      paths = (
        <>
          <circle cx="50" cy="58" r="24" />
          <path d="M74 34 V88" />
          <path d="M74 58 A24 24 0 1 0 50 82" />
        </>
      );
      break;
    case "Y":
      paths = (
        <>
          <path d="M24 14 L50 48 L76 14" />
          <path d="M50 48 V88" />
          <line x1="50" y1="14" x2="50" y2="48" strokeDasharray="2 3" />
        </>
      );
      break;
    default:
      paths = <path d="M50 20 V80" />;
  }

  return (
    <svg
      className="name-intro__sketch"
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{
        opacity: 0.2 + draw * 0.55,
        ["--ni-sketch-dash"]: dash
      }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="name-intro__sketch-ink"
      >
        {paths}
      </g>
    </svg>
  );
}

function SelectionChrome({ connect, isFirst, isLast, afterGap, beforeGap }) {
  // Hide shared vertical edges once letters flatten into one selection.
  // Keep borders at the Anita | Yan word gap so the selection breaks between names.
  const hideLeftEdge = connect > 0.2 && !isFirst && !afterGap;
  const hideRightEdge = connect > 0.2 && !isLast && !beforeGap;

  return (
    <div
      className="name-intro__selection"
      aria-hidden="true"
      style={{
        opacity: 0.55 + connect * 0.35
      }}
      data-hide-left={hideLeftEdge ? "true" : "false"}
      data-hide-right={hideRightEdge ? "true" : "false"}
      data-connect={connect > 0.35 ? "true" : "false"}
    >
      <span className="name-intro__dash name-intro__dash--t" />
      <span className="name-intro__dash name-intro__dash--r" />
      <span className="name-intro__dash name-intro__dash--b" />
      <span className="name-intro__dash name-intro__dash--l" />
      {HANDLE_POS.map(([left, top], i) => {
        const isMidLeft = i === 7;
        const isMidRight = i === 3;
        if (hideLeftEdge && (i === 0 || i === 6 || isMidLeft)) return null;
        if (hideRightEdge && (i === 2 || i === 4 || isMidRight)) return null;
        return (
          <span
            key={i}
            className="name-intro__handle"
            style={{ left, top }}
          />
        );
      })}
    </div>
  );
}

function panelStyle(index, count, progress, reduced) {
  const flatten = easeInOutCubic(clamp(progress / 0.4, 0, 1));
  const join = easeInOutCubic(clamp((progress - 0.3) / 0.25, 0, 1));
  const exit = easeInOutCubic(clamp((progress - 0.86) / 0.14, 0, 1));

  const mid = (count - 1) / 2;
  const fromMid = index - mid;
  const gap = wordGapBefore(index);

  // Already-angled parallel slabs (no separate tinted stage).
  const stackX = fromMid * 0.42 + index * 0.92 + gap * 0.9;
  const stackY = 0.35 - index * 0.62;
  const stackZ = (count - 1 - index) * 38;
  const stackRotateY = reduced ? 0 : -46;
  const stackRotateX = reduced ? 0 : 4;

  const panelW = 4.55;
  const flatGap = 0.04;
  const flatSpan = panelW + flatGap;
  const totalWidth = count * panelW + (count - 1) * flatGap + WORD_GAP_REM;
  const flatX = -totalWidth / 2 + index * flatSpan + gap + panelW / 2;
  const flatY = 0;

  const x = stackX + (flatX - stackX) * flatten;
  const y = stackY + (flatY - stackY) * flatten;
  const z = stackZ * (1 - flatten);
  const rotateY = stackRotateY * (1 - flatten);
  const rotateX = stackRotateX * (1 - flatten);
  const pull = 1 - join * 0.06;
  const scale = 1 - join * 0.02;

  return {
    transform: `translate(-50%, -50%) translate3d(${x * pull}rem, ${y}rem, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
    zIndex: count - index,
    opacity: Math.max(0, 1 - exit)
  };
}

/**
 * Sticky name intro: opaque Geist letter cards with Preview selection chrome.
 * Scroll flattens the stack, joins borders, then draws light-grey sketches out.
 */
export default function NameIntro({ onProgress } = {}) {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 1;
      setProgress(1);
      onProgress?.(1);
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
        onProgress?.(next);
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
  }, [reducedMotion, onProgress]);

  const flatten = easeInOutCubic(clamp(progress / 0.4, 0, 1));
  const connect = easeInOutCubic(clamp((progress - 0.32) / 0.28, 0, 1));
  const draw = easeInOutCubic(clamp((progress - 0.52) / 0.28, 0, 1));
  // Exit before the shell covers so Preview chrome never sits on the Work stage.
  const exit = easeInOutCubic(clamp((progress - 0.72) / 0.14, 0, 1));

  return (
    <section
      className="name-intro"
      aria-label="Anita Yan name introduction"
      style={{
        "--ni-progress": progress,
        "--ni-flatten": flatten,
        "--ni-connect": connect,
        "--ni-draw": draw,
        "--ni-exit": exit
      }}
    >
      <div className="name-intro__track" ref={trackRef}>
        <div className="name-intro__sticky">
          <header className="name-intro__top" aria-hidden="true">
            <span className="name-intro__logo">AY</span>
            <NameIntroClock />
          </header>

          <div
            className="name-intro__stage"
            style={{ opacity: Math.max(0, 1 - exit) }}
          >
            {LETTERS.map((letter, index) => {
              const afterGap = index === SURNAME_START;
              const beforeGap = index + 1 === SURNAME_START;
              return (
                <div
                  key={`${letter}-${index}`}
                  className="name-intro__panel"
                  style={panelStyle(
                    index,
                    LETTERS.length,
                    progress,
                    reducedMotion
                  )}
                >
                  <div
                    className={`name-intro__card${connect > 0.35 ? " is-connecting" : ""}`}
                    style={{ background: CARD_TONES[index] }}
                  >
                    <SelectionChrome
                      connect={connect}
                      isFirst={index === 0}
                      isLast={index === LETTERS.length - 1}
                      afterGap={afterGap}
                      beforeGap={beforeGap}
                    />
                    <LetterSketch letter={letter} draw={draw} />
                    <span
                      className="name-intro__glyph"
                      style={{
                        opacity: 0.35 + flatten * 0.45 - draw * 0.15
                      }}
                    >
                      {letter}
                    </span>
                    <span className="name-intro__sr">{letter}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p
            className="name-intro__hint"
            style={{ opacity: (1 - flatten) * (1 - exit) * 0.5 }}
            aria-hidden="true"
          >
            SCROLL
          </p>
        </div>
      </div>
    </section>
  );
}

function NameIntroClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const label = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  return <span className="name-intro__time">{label}</span>;
}
