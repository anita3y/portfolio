import { useEffect, useRef, useState } from "react";

const MAX_TILT = 5;

function ArtifactThumbMedia({ artifact, hovering }) {
  const slides = artifact.thumbnailSlides?.length ? artifact.thumbnailSlides : null;
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!slides || !hovering) {
      setSlideIndex(0);
      return undefined;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let intervalId;
    const startId = window.setTimeout(() => {
      setSlideIndex(1 % slides.length);
      intervalId = window.setInterval(() => {
        setSlideIndex((current) => (current + 1) % slides.length);
      }, 380);
    }, 50);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [slides, hovering]);

  if (slides) {
    return (
      <span className="play-artifact__slides" aria-hidden="true">
        {slides.map((src, index) => (
          <img
            key={src}
            className={[
              "play-artifact__slide",
              index === slideIndex && "is-active"
            ]
              .filter(Boolean)
              .join(" ")}
            src={src}
            alt=""
            draggable={false}
          />
        ))}
      </span>
    );
  }

  if (artifact.thumbnail) {
    return (
      <img
        className="play-artifact__img"
        src={artifact.thumbnail}
        alt=""
        draggable={false}
      />
    );
  }

  return <span className="play-artifact__placeholder" aria-hidden="true" />;
}

function ArtifactThumb({ artifact, onOpen }) {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hovering: false });

  const resetTilt = () => setTilt({ rx: 0, ry: 0, hovering: false });

  const onPointerMove = (event) => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Math.max(-MAX_TILT, Math.min(MAX_TILT, -py * MAX_TILT * 2)),
      ry: Math.max(-MAX_TILT, Math.min(MAX_TILT, px * MAX_TILT * 2)),
      hovering: true
    });
  };

  return (
    <button
      type="button"
      className={`play-artifact play-artifact--${artifact.size} play-artifact--${artifact.kind}${
        tilt.hovering ? " is-tilting" : ""
      }`}
      onClick={() => onOpen(artifact.id)}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      aria-label={`Open ${artifact.title}`}
      aria-haspopup="dialog"
      data-cursor-hover=""
    >
      <span
        ref={wrapRef}
        className="play-artifact__lift"
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${
            tilt.hovering ? 1.03 : 1
          })`
        }}
      >
        <ArtifactThumbMedia artifact={artifact} hovering={tilt.hovering} />
      </span>
      <span className="play-artifact__label">{artifact.title}</span>
    </button>
  );
}

export default function PlayArtifactsGrid({ artifacts, onOpen }) {
  return (
    <div className="play-artifacts" role="list" aria-label="Play artifacts">
      {artifacts.map((artifact) => (
        <div
          key={artifact.id}
          className={`play-artifacts__cell play-artifacts__cell--${artifact.size}`}
          role="listitem"
        >
          <ArtifactThumb artifact={artifact} onOpen={onOpen} />
        </div>
      ))}
    </div>
  );
}
