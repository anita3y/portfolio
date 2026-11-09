import { useRef, useState } from "react";
import { ABOUT_COLLAGE, ABOUT_LETTER, ABOUT_QUOTE } from "../data/about.js";
import { assetUrl } from "../utils/assetUrl.js";

const ID_CARD = assetUrl("/about/id-card.png") + "?v=4";

const MAX_TILT = 7;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function CollageIdCard() {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [active, setActive] = useState(false);

  const resetTilt = () => {
    setActive(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const onPointerMove = (event) => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setActive(true);
    setTilt({
      rx: Math.max(-MAX_TILT, Math.min(MAX_TILT, -py * MAX_TILT * 2)),
      ry: Math.max(-MAX_TILT, Math.min(MAX_TILT, px * MAX_TILT * 2))
    });
  };

  return (
    <div
      ref={wrapRef}
      className={`about-collage__id${active ? " is-tilting" : ""}`}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      style={{
        transform: `rotate(var(--tilt)) perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
      }}
      data-cursor-hover=""
    >
      <img
        className="about-collage__id-img"
        src={ID_CARD}
        alt="Anita Yan ID card — New York University, Interactive Media Arts, Psychology"
        width={2602}
        height={1737}
        draggable={false}
      />
    </div>
  );
}

/** Drag-move a collage piece; CSS keeps z-order / size / tilt until placed. */
function DraggableCollagePiece({
  id,
  className,
  ariaLabel,
  children,
  pos,
  onMove
}) {
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);
  const placed = Boolean(pos);

  const onPointerDown = (event) => {
    if (event.button != null && event.button !== 0) return;
    event.preventDefault();
    const el = event.currentTarget;
    const board = el.closest(".about-collage__board");
    if (!board) return;
    el.setPointerCapture(event.pointerId);
    const boardBox = board.getBoundingClientRect();
    const elBox = el.getBoundingClientRect();
    const origX = placed
      ? pos.x
      : ((elBox.left - boardBox.left) / boardBox.width) * 100;
    const origY = placed
      ? pos.y
      : ((elBox.top - boardBox.top) / boardBox.height) * 100;
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      origX,
      origY,
      boardW: boardBox.width,
      boardH: boardBox.height
    };
    setDragging(true);
    onMove(id, origX, origY);
  };

  const onPointerMove = (event) => {
    if (!drag.current) return;
    const dx = ((event.clientX - drag.current.startX) / drag.current.boardW) * 100;
    const dy = ((event.clientY - drag.current.startY) / drag.current.boardH) * 100;
    onMove(
      id,
      clamp(drag.current.origX + dx, -8, 92),
      clamp(drag.current.origY + dy, -8, 92)
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
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      data-cursor-hover=""
      className={[
        className,
        "about-collage__draggable",
        placed && "is-placed",
        dragging && "is-dragging"
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        placed
          ? {
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              right: "auto",
              bottom: "auto"
            }
          : undefined
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {children}
    </div>
  );
}

function AboutCollage() {
  const [positions, setPositions] = useState({});

  const onMove = (id, x, y) => {
    setPositions((current) => ({ ...current, [id]: { x, y } }));
  };

  return (
    <section className="about-collage" aria-label="Photos and a favorite quote">
      <div className="about-collage__board">
        {ABOUT_COLLAGE.map((photo) => (
          <DraggableCollagePiece
            key={photo.id}
            id={photo.id}
            className={`about-collage__photo about-collage__photo--${photo.id}`}
            ariaLabel={`Move ${photo.alt}`}
            pos={positions[photo.id]}
            onMove={onMove}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </DraggableCollagePiece>
        ))}
        <DraggableCollagePiece
          id="sticky"
          className="about-collage__sticky"
          ariaLabel={`Move quote by ${ABOUT_QUOTE.attribution}`}
          pos={positions.sticky}
          onMove={onMove}
        >
          <p className="about-collage__sticky-text">{ABOUT_QUOTE.text}</p>
          <p className="about-collage__sticky-who">{ABOUT_QUOTE.attribution}</p>
        </DraggableCollagePiece>
        <CollageIdCard />
      </div>
    </section>
  );
}

export default function AboutPanel() {
  return (
    <div className="about-page">
      <section className="about-letter" aria-label="About me">
        {ABOUT_LETTER.paragraphs.length ? (
          <p className="about-letter__p">
            {ABOUT_LETTER.paragraphs.map((line, index) => (
              <span key={line.slice(0, 32)}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        ) : null}
        {ABOUT_LETTER.signoff ? (
          <p className="about-letter__signoff">{ABOUT_LETTER.signoff}</p>
        ) : null}
      </section>

      <AboutCollage />
    </div>
  );
}
