import { useRef, useState } from "react";

export default function AboutDottedHover({ label, hoverTag, imageSrc, imageAlt }) {
  const ref = useRef(null);
  const [tug, setTug] = useState({ x: 0, y: 0, hovering: false });

  const dotted = (
    <span className="about-inline-dotted-wrap" data-cursor-tag={hoverTag || undefined}>
      <span className="about-inline-dotted">{label}</span>
    </span>
  );

  if (!imageSrc) return dotted;

  const onPointerMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const nx = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
    const ny = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
    setTug({
      x: Math.max(-1, Math.min(1, nx)) * 8,
      y: Math.max(-1, Math.min(1, ny)) * 6,
      hovering: true
    });
  };

  return (
    <span className="about-inline-dotted-group">
      {dotted}
      <span
        ref={ref}
        className={`about-inline-dotted__img-wrap${tug.hovering ? " is-tugging" : ""}`}
        style={{
          "--tug-x": `${tug.x.toFixed(2)}px`,
          "--tug-y": `${tug.y.toFixed(2)}px`
        }}
        data-cursor-hover=""
        onPointerMove={onPointerMove}
        onPointerLeave={() => setTug({ x: 0, y: 0, hovering: false })}
      >
        <img
          className="about-inline-dotted__img"
          src={imageSrc}
          alt={imageAlt ?? ""}
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
    </span>
  );
}
