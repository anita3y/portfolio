import { useCallback, useEffect, useState } from "react";
import ExternalLinkArrow from "./ExternalLinkArrow.jsx";

const FLIP_MS = 700;

function QuoteCard({ quote }) {
  return (
    <figure className="philosophy-quote-deck__quote">
      <blockquote className="philosophy-quote-deck__text">&ldquo;{quote.text}&rdquo;</blockquote>
      <figcaption className="philosophy-quote-deck__author">
        <span className="philosophy-quote-deck__author-text">{quote.author}</span>
        {quote.source ? (
          <a
            className="philosophy-quote-deck__source-link"
            href={quote.source.href}
            target="_blank"
            rel="noopener noreferrer"
            title={quote.source.title}
            aria-label={`${quote.source.label}: ${quote.source.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <ExternalLinkArrow className="philosophy-quote-deck__source-icon" size={11} />
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}

export default function PhilosophyQuoteDeck({ quotes }) {
  const [stack, setStack] = useState(() => quotes.map((_, index) => index));
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
    if (isFlipping || quotes.length < 2) return;

    setIsFlipping(true);
    window.setTimeout(() => {
      setStack(([first, ...rest]) => [...rest, first]);
      setIsFlipping(false);
    }, FLIP_MS);
  }, [isFlipping, quotes.length]);

  const frontQuote = quotes[stack[0]];
  const visibleCount = Math.min(stack.length, 2);

  return (
    <button
      type="button"
      className={[
        "philosophy-quote-deck",
        isHovering && "is-hover",
        isFlipping && "is-flipping",
        quotes.length < 2 && "philosophy-quote-deck--single"
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={flipDeck}
      aria-label={
        quotes.length > 1
          ? `Quote by ${frontQuote.author}. Quote 1 of ${quotes.length}. Click to flip to the next quote.`
          : `Quote by ${frontQuote.author}`
      }
    >
      {stack.slice(0, visibleCount).map((quoteIndex, position) => {
        const quote = quotes[quoteIndex];
        const isFront = position === 0;
        const isNext = position === 1;

        return (
          <div
            key={quote.id}
            className={[
              "philosophy-quote-deck__card",
              `philosophy-quote-deck__card--pos-${position}`,
              isFront && isAnimatingFlip && "is-flipping-out",
              isNext && isAnimatingFlip && "is-promoting"
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ zIndex: visibleCount - position }}
            aria-hidden={!isFront}
          >
            <QuoteCard quote={quote} />
          </div>
        );
      })}
    </button>
  );
}
