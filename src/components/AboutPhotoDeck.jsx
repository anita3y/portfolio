import { useCallback, useEffect, useState } from "react";

const FLIP_MS = 700;

export default function AboutPhotoDeck({ photos, size = "default", embeddedInName = false }) {
  const [stack, setStack] = useState(() => photos.map((_, index) => index));
  const [isHovering, setIsHovering] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAnimatingFlip, setIsAnimatingFlip] = useState(false);

  useEffect(() => {
    if (!isFlipping) {
      setIsAnimatingFlip(false);
      return;
    }

    let frame2 = 0;
    const frame1 = window.requestAnimationFrame(() => {
      frame2 = window.requestAnimationFrame(() => {
        setIsAnimatingFlip(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame1);
      window.cancelAnimationFrame(frame2);
    };
  }, [isFlipping]);

  const flipDeck = useCallback(() => {
    if (isFlipping || photos.length < 2) return;

    setIsFlipping(true);
    window.setTimeout(() => {
      setStack(([first, ...rest]) => [...rest, first]);
      setIsFlipping(false);
    }, FLIP_MS);
  }, [isFlipping, photos.length]);

  const frontPhoto = photos[stack[0]];
  const visibleCount = Math.min(stack.length, 3);

  return (
    <div
      className={[
        "about-photo-deck-wrap",
        size === "hero" && "about-photo-deck-wrap--hero",
        size === "inline" && "about-photo-deck-wrap--inline"
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className={[
          "about-photo-deck",
          isHovering && "is-hover",
          isFlipping && "is-flipping",
          photos.length < 2 && "about-photo-deck--single"
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={flipDeck}
        aria-label={
          photos.length > 1
            ? `${frontPhoto.alt}. Photo 1 of ${photos.length}. Click to flip to the next photo.`
            : frontPhoto.alt
        }
        {...(embeddedInName ? {} : { "data-cursor-grow": "" })}
      >
        {stack.slice(0, visibleCount).map((photoIndex, position) => {
          const photo = photos[photoIndex];
          const isFront = position === 0;
          const isNext = position === 1;

          return (
            <div
              key={photo.id}
              className={[
                "about-photo-deck__card",
                `about-photo-deck__card--pos-${position}`,
                isFront && isAnimatingFlip && "is-flipping-out",
                isNext && isAnimatingFlip && "is-promoting"
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ zIndex: visibleCount - position }}
              aria-hidden={!isFront}
            >
              <img
                src={photo.src}
                alt=""
                loading={position === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            </div>
          );
        })}
      </button>
    </div>
  );
}
