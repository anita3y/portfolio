import { useEffect, useState } from "react";

const PHRASES = [
  "delivering a scalable website for DFA",
  "rounding edges across the portfolio",
  "redesigning registration for World Affairs Conference",
  "exploring branches in ChatGPT",
  "polishing liquid glass on thumbnails",
  "tuning tab thumb springs",
  "spacing case study grids just right",
  "shipping taste-sharing on Our Bookshelf"
];

const ROTATE_MS = 4200;

export default function HeroCurrently() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const activePhrase = PHRASES[index];

  return (
    <p className="hero-currently">
      <span className="hero-currently__label">currently…</span>{" "}
      <span className="hero-currently__rotator" aria-live="polite">
        {reducedMotion ? (
          <span className="hero-currently__phrase is-active">{activePhrase}</span>
        ) : (
          PHRASES.map((phrase, i) => (
            <span
              key={phrase}
              className={`hero-currently__phrase${i === index ? " is-active" : ""}`}
              aria-hidden={i !== index}
            >
              {phrase}
            </span>
          ))
        )}
      </span>
    </p>
  );
}
