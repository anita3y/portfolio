import { play } from "cuelume";
import { useRef, useState } from "react";
import { PLAYGROUND_CAPTIONS, PLAYGROUND_STACK, PLAYGROUND_STICKERS } from "../data/play/sticker-collection.js";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function PlayMetaHeader({ project }) {
  return <h2 className="cs-title">{project.headline || project.title}</h2>;
}

function PlaygroundSticker({
  sticker,
  x,
  y,
  z,
  onMove,
  onFront
}) {
  const ref = useRef(null);
  const drag = useRef(null);
  const [tug, setTug] = useState({ x: 0, y: 0, hovering: false });
  const [dragging, setDragging] = useState(false);
  const [ripple, setRipple] = useState(null);
  const lifted = tug.hovering || dragging;
  const maskSrc =
    sticker.type === "swap" ? (lifted ? sticker.openSrc : sticker.closedSrc) : sticker.src;

  const onPointerDown = (event) => {
    if (event.button != null && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const board = event.currentTarget.closest(".sticker-board");
    if (!board) return;
    const box = board.getBoundingClientRect();
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      origX: x,
      origY: y,
      boardW: box.width,
      boardH: box.height,
      moved: false
    };
    setDragging(true);
    onFront(sticker.id);
  };

  const onPointerMove = (event) => {
    const el = ref.current;
    if (drag.current) {
      const dx = ((event.clientX - drag.current.startX) / drag.current.boardW) * 100;
      const dy = ((event.clientY - drag.current.startY) / drag.current.boardH) * 100;
      if (Math.abs(dx) + Math.abs(dy) > 0.4) drag.current.moved = true;
      onMove(sticker.id, clamp(drag.current.origX + dx, -4, 86), clamp(drag.current.origY + dy, -4, 78));
      return;
    }

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

  const endDrag = (event) => {
    const wasDragging = Boolean(drag.current);
    if (drag.current && event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
    setDragging(false);

    if (!wasDragging) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const box = event.currentTarget.getBoundingClientRect();
    const rx = box.width ? ((event.clientX - box.left) / box.width) * 100 : 50;
    const ry = box.height ? ((event.clientY - box.top) / box.height) * 100 : 50;
    setRipple({
      id: Date.now(),
      x: Math.max(8, Math.min(92, rx)),
      y: Math.max(8, Math.min(92, ry))
    });
    play("sparkle", { volume: 0.45 });
  };

  const onPointerLeave = () => {
    if (drag.current) return;
    setTug({ x: 0, y: 0, hovering: false });
  };

  const body =
    sticker.type === "swap" ? (
      <span className={`hero-sticker ${sticker.stickerClass}`}>
        <img
          className="hero-sticker__img hero-sticker__img--closed"
          src={sticker.closedSrc}
          alt=""
          draggable={false}
        />
        <img
          className="hero-sticker__img hero-sticker__img--open"
          src={sticker.openSrc}
          alt=""
          draggable={false}
        />
      </span>
    ) : (
      <img className="hero-stamp__img" src={sticker.src} alt="" draggable={false} />
    );

  return (
    <button
      ref={ref}
      type="button"
      className={`hero-stamp sticker-piece ${sticker.stampClass}${lifted ? " is-tugging" : ""}${
        dragging ? " is-dragging" : ""
      }${ripple ? " is-rippling" : ""}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: z,
        "--tug-x": `${tug.x.toFixed(2)}px`,
        "--tug-y": `${tug.y.toFixed(2)}px`,
        "--ripple-x": ripple ? `${ripple.x}%` : "50%",
        "--ripple-y": ripple ? `${ripple.y}%` : "50%"
      }}
      aria-label={`Move ${sticker.label} sticker`}
      data-cursor-hover=""
      data-cuelume-hover="tick"
      data-cuelume-press="press"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={onPointerLeave}
    >
      <span className="sticker-piece__body">
        {body}
        {ripple && (
          <span
            key={ripple.id}
            className="sticker-piece__ripple"
            aria-hidden="true"
            style={{
              maskImage: `url("${maskSrc}")`,
              WebkitMaskImage: `url("${maskSrc}")`
            }}
          >
            <span className="sticker-piece__ripple-wave sticker-piece__ripple-wave--1" />
            <span className="sticker-piece__ripple-wave sticker-piece__ripple-wave--2" />
            <span
              className="sticker-piece__ripple-wave sticker-piece__ripple-wave--3"
              onAnimationEnd={() => setRipple(null)}
            />
          </span>
        )}
      </span>
    </button>
  );
}

function PlaygroundCaption({ caption, x, y, z, onMove, onFront }) {
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (event) => {
    if (event.button != null && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const board = event.currentTarget.closest(".sticker-board");
    if (!board) return;
    const box = board.getBoundingClientRect();
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      origX: x,
      origY: y,
      boardW: box.width,
      boardH: box.height
    };
    setDragging(true);
    onFront(caption.id);
  };

  const onPointerMove = (event) => {
    if (!drag.current) return;
    const dx = ((event.clientX - drag.current.startX) / drag.current.boardW) * 100;
    const dy = ((event.clientY - drag.current.startY) / drag.current.boardH) * 100;
    onMove(
      caption.id,
      clamp(drag.current.origX + dx, -2, 92),
      clamp(drag.current.origY + dy, -2, 92)
    );
  };

  const endDrag = (event) => {
    if (drag.current && event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
    setDragging(false);
  };

  return (
    <button
      type="button"
      className={`sticker-board__caption ${caption.className}${dragging ? " is-dragging" : ""}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: z
      }}
      aria-label={`Move ${caption.label}`}
      data-cursor-hover=""
      data-cuelume-hover="tick"
      data-cuelume-press="press"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {caption.text}
    </button>
  );
}

export default function StickerPlayground({ project }) {
  const [positions, setPositions] = useState(() =>
    Object.fromEntries([
      ...PLAYGROUND_STICKERS.map((sticker) => [sticker.id, { x: sticker.x, y: sticker.y }]),
      ...PLAYGROUND_CAPTIONS.map((caption) => [caption.id, { x: caption.x, y: caption.y }])
    ])
  );
  const [order, setOrder] = useState(() => [...PLAYGROUND_STACK]);

  const onMove = (id, x, y) => {
    setPositions((current) => ({ ...current, [id]: { x, y } }));
  };

  const onFront = (id) => {
    setOrder((current) => [...current.filter((item) => item !== id), id]);
  };

  return (
    <div className="play-embed play-embed--stickers">
      <PlayMetaHeader project={project} />
      <div className="sticker-board" aria-label="Sticker playground">
        <p className="sticker-board__hint">Drag the stickers around.</p>
        {PLAYGROUND_STICKERS.map((sticker) => {
          const pos = positions[sticker.id];
          return (
            <PlaygroundSticker
              key={sticker.id}
              sticker={sticker}
              x={pos.x}
              y={pos.y}
              z={5 + order.indexOf(sticker.id)}
              onMove={onMove}
              onFront={onFront}
            />
          );
        })}
        {PLAYGROUND_CAPTIONS.map((caption) => {
          const pos = positions[caption.id];
          return (
            <PlaygroundCaption
              key={caption.id}
              caption={caption}
              x={pos.x}
              y={pos.y}
              z={5 + order.indexOf(caption.id)}
              onMove={onMove}
              onFront={onFront}
            />
          );
        })}
      </div>
    </div>
  );
}
