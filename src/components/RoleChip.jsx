import { useEffect, useState } from "react";
import { assetUrl } from "../utils/assetUrl.js";

const CHIP = {
  track: assetUrl("/hero/v2/pd-track.png"),
  labelPill: assetUrl("/hero/v2/pd-label-pill.png"),
  glowDot: assetUrl("/hero/v2/pd-glow-dot.png")
};

const ROLE_LABELS = ["product designer", "toolmaker", "matcha-lover"];

/** Longest label — keeps chip width stable while roles slide. */
const SIZER_LABEL = ROLE_LABELS.reduce((a, b) => (a.length >= b.length ? a : b));

/** Duplicate so the marquee can loop seamlessly. */
const LOOP_LABELS = [...ROLE_LABELS, ...ROLE_LABELS];

export default function RoleChip({ chipRef, labelRef, measureOnly = false }) {
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const scrolling = !measureOnly && motionOk;

  return (
    <span
      ref={chipRef}
      className="tag-chip tag-chip--product-designer tag-chip--assets tag-chip--carousel"
      aria-label={measureOnly ? undefined : ROLE_LABELS.join(", ")}
      aria-hidden={measureOnly ? true : undefined}
    >
      <img
        className="tag-chip__track"
        src={CHIP.track}
        alt=""
        draggable={false}
        aria-hidden="true"
      />
      <img
        className="tag-chip__label-pill"
        src={CHIP.labelPill}
        alt=""
        draggable={false}
        aria-hidden="true"
      />
      <img
        className="tag-chip__glow"
        src={CHIP.glowDot}
        alt=""
        draggable={false}
        aria-hidden="true"
      />
      <span ref={labelRef} className="tag-chip-label tag-chip-label--assets">
        <span className="tag-chip__carousel" aria-hidden="true">
          <span className="tag-chip__carousel-sizer">{SIZER_LABEL}</span>
          <span
            className={`tag-chip__carousel-track${scrolling ? " is-scrolling" : ""}`}
          >
            {(scrolling ? LOOP_LABELS : [ROLE_LABELS[0]]).map((label, i) => (
              <span key={`${label}-${i}`} className="tag-chip__carousel-item">
                {label}
              </span>
            ))}
          </span>
        </span>
        {!measureOnly && (
          <span className="visually-hidden">{ROLE_LABELS.join(", ")}</span>
        )}
      </span>
    </span>
  );
}
