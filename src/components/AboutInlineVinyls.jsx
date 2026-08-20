import { useRef, useState } from "react";

export default function AboutInlineVinyls({ label, coverSrc, recordSrc, alt }) {
  const ref = useRef(null);
  const [tug, setTug] = useState({ x: 0, y: 0, hovering: false });

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
    <span className="about-inline-vinyls">
      <span className="about-inline-vinyls__label">{label}</span>
      <span
        ref={ref}
        className={`about-inline-vinyls__stack${tug.hovering ? " is-tugging" : ""}`}
        style={{
          "--tug-x": `${tug.x.toFixed(2)}px`,
          "--tug-y": `${tug.y.toFixed(2)}px`
        }}
        data-cursor-hover=""
        onPointerMove={onPointerMove}
        onPointerLeave={() => setTug({ x: 0, y: 0, hovering: false })}
      >
        <img
          className="about-inline-vinyls__cover"
          src={coverSrc}
          alt={alt}
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <img
          className="about-inline-vinyls__record"
          src={recordSrc}
          alt=""
          aria-hidden="true"
          width={24}
          height={48}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
    </span>
  );
}
