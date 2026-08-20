import { useEffect, useState } from "react";

const ACTIONS = [
  { label: "cafe hopping" },
  { label: "making matcha lattes" },
  { label: "adjusting letter spacing" },
  { label: 'renaming "Frame 13849"' }
];

const ACTION_INTERVAL_MS = 2000;
const ACTION_SLIDE_MS = 520;

export default function CurrentlyBar() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const slides = [...ACTIONS, ACTIONS[0]];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => current + 1);
    }, ACTION_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index < ACTIONS.length) return undefined;

    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, ACTION_SLIDE_MS);

    return () => window.clearTimeout(timer);
  }, [index]);

  const activeAlt = ACTIONS[index % ACTIONS.length]?.label ?? ACTIONS[0].label;

  return (
    <div className="currently-bar" aria-label={`Currently ${activeAlt}`}>
      <span className="currently-bar__dot" aria-hidden="true" />
      <span className="currently-bar__label">currently...</span>
      <div className="currently-bar__actions">
        <div
          className={`currently-bar__track${animate ? " is-animating" : ""}`}
          style={{ transform: `translate3d(0, ${-index * 100}%, 0)` }}
        >
          {slides.map((action, slideIndex) => (
            <div key={`${action.label}-${slideIndex}`} className="currently-bar__action">
              <span className="currently-bar__action-text">{action.label}</span>
            </div>
          ))}
        </div>
        <span className="visually-hidden">{activeAlt}</span>
      </div>
    </div>
  );
}
