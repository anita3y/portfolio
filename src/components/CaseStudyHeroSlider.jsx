import { useCallback, useEffect, useRef, useState } from "react";

/*
 * Case study banner, after rghv.ca/work: flat full-bleed slides on a soft
 * grey field. The current slide is sharp; neighbours sit to the sides,
 * blurred. No 3D — just a slow eased slide between frames.
 */

const SLIDE_W = 78; // % of the field width
const GAP = 2.4; // % between slides

export default function CaseStudyHeroSlider({ items, title }) {
  const [index, setIndex] = useState(Math.floor(items.length / 2));
  const fieldRef = useRef(null);
  const drag = useRef({ active: false, x: 0, moved: false });

  const go = useCallback(
    (next) => setIndex(Math.max(0, Math.min(items.length - 1, next))),
    [items.length]
  );

  useEffect(() => {
    const onKey = (event) => {
      const field = fieldRef.current;
      if (!field || !field.contains(document.activeElement)) return;
      if (event.key === "ArrowRight") go(index + 1);
      if (event.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const onPointerDown = (event) => {
    drag.current = { active: true, x: event.clientX, moved: false };
  };
  const onPointerUp = (event) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    const dx = event.clientX - d.x;
    if (Math.abs(dx) > 40) {
      d.moved = true;
      go(index + (dx < 0 ? 1 : -1));
    }
  };

  // Centre the active slide: offset = 50% - half a slide - index * (slide + gap).
  const offset = 50 - SLIDE_W / 2 - index * (SLIDE_W + GAP);

  return (
    <div className="cs-slider">
      <div
        ref={fieldRef}
        className="cs-slider__field"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} screens`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current.active = false;
        }}
      >
        <div className="cs-slider__track" style={{ transform: `translateX(${offset}%)` }}>
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`cs-slider__slide${i === index ? " is-active" : ""}`}
              style={{ width: `${SLIDE_W}%`, marginRight: `${GAP}%` }}
              onClick={() => {
                if (drag.current.moved) {
                  drag.current.moved = false;
                  return;
                }
                if (i !== index) go(i);
              }}
              aria-label={item.title || `Screen ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              tabIndex={i === index ? 0 : -1}
            >
              <span className="cs-slider__frame">
                {item.video ? (
                  <video src={item.video} autoPlay loop muted playsInline preload="metadata" />
                ) : (
                  <img src={item.cover ?? item.src} alt={item.alt ?? ""} draggable={false} />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="play-scrubber cs-slider__ticks" role="tablist" aria-label="Screen position">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={item.title || `Screen ${i + 1}`}
            className={`play-scrubber__tick${i === index ? " is-selected" : ""}`}
            onClick={() => go(i)}
            data-cursor-hover=""
          />
        ))}
      </div>
    </div>
  );
}
