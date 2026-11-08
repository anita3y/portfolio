import { useCallback, useEffect, useRef, useState } from "react";
import { POSTER_FRAMES } from "../data/play/posters.js";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function PosterArtifactViewer() {
  const [index, setIndex] = useState(0);
  const dragRef = useRef({ active: false, startX: 0, startIndex: 0, moved: false });
  const frame = POSTER_FRAMES[index];

  const selectIndex = useCallback((next) => {
    setIndex(clamp(next, 0, POSTER_FRAMES.length - 1));
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectIndex(index - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        selectIndex(index + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, selectIndex]);

  const onPointerDown = (event) => {
    if (event.button != null && event.button !== 0) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startIndex: index,
      moved: false,
      pointerId: event.pointerId
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    if (Math.abs(event.clientX - drag.startX) > 8) drag.moved = true;
    if (!drag.moved) return;
    selectIndex(drag.startIndex - Math.round((event.clientX - drag.startX) / 72));
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (drag.pointerId != null && event.currentTarget.hasPointerCapture?.(drag.pointerId)) {
      event.currentTarget.releasePointerCapture(drag.pointerId);
    }
    dragRef.current = { active: false, startX: 0, startIndex: 0, moved: false };
  };

  if (!frame) return null;

  return (
    <div className="poster-artifact" aria-label="Poster designs">
      <div
        className="poster-artifact__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <img
          className="poster-artifact__img"
          src={frame.src}
          alt={frame.alt}
          draggable={false}
        />
      </div>
      <div className="poster-artifact__scrubber" role="tablist" aria-label="Poster position">
        {POSTER_FRAMES.map((item, i) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={item.alt}
            className={`poster-artifact__tick${i === index ? " is-selected" : ""}`}
            onClick={() => selectIndex(i)}
            data-cursor-hover=""
          />
        ))}
      </div>
    </div>
  );
}
