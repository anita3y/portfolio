import { useRef, useState } from "react";
import {
  ABOUT_INTRO,
  ABOUT_OUTSIDE,
  ABOUT_PHOTOS,
  ABOUT_QUOTE_CARDS
} from "../data/about.js";
import AboutAnitaConnect from "./AboutAnitaConnect.jsx";
import AboutDottedHover from "./AboutDottedHover.jsx";
import AboutInlineVinyls from "./AboutInlineVinyls.jsx";
import AboutMediaShelves from "./AboutMediaShelves.jsx";
import AboutPhotoDeck from "./AboutPhotoDeck.jsx";
import AboutTags from "./AboutTags.jsx";
import CurrentlyBar from "./CurrentlyBar.jsx";
import { assetUrl } from "../utils/assetUrl.js";

const URL_TAB = assetUrl("/about/url-tab.png");
const BOOKSHELF_URL = "anita3y.github.io/my-bookshelf";
const BOOKSHELF_HREF = "https://anita3y.github.io/my-bookshelf/";
const DRAG_IGNORE =
  ".about-browser__dot, .about-quote-card, .about-inline-vinyls__stack, .about-inline-dotted__img-wrap, .about-photo-deck, .about-tags__tag--school, .about-tags__tag--major, .about-hello__name-connect, .about-hello__name-connect-link, .about-inline-link, .about-bookshelf-embed, .about-shelf-scroll, .play-launch";

const WINDOWS = [
  { id: "bio", label: "Hi, my name is", url: "nita.os" },
  { id: "philosophy", label: "Philosophy", url: "anitasphilosophy.com" },
  { id: "bookshelf", label: "My bookshelf", url: BOOKSHELF_URL, href: BOOKSHELF_HREF }
];

function AboutQuoteCard({ card, isFront, onFront }) {
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
    <blockquote
      ref={ref}
      className={[
        "about-quote-card",
        `about-quote-card--${card.id}`,
        isFront && "is-front",
        tug.hovering && "is-tugging"
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--tug-x": `${tug.x.toFixed(2)}px`,
        "--tug-y": `${tug.y.toFixed(2)}px`
      }}
      data-cursor-hover=""
      data-cuelume-hover="whisper"
      data-cuelume-press="tick"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTug({ x: 0, y: 0, hovering: false })}
      onClick={() => onFront(card.id)}
    >
      <p className="about-quote-card__title">{card.title}</p>
      <p className="about-quote-card__text">“{card.text}”</p>
      <footer className="about-quote-card__attr">
        - {card.attribution}
        {card.source ? (
          <>
            {" ("}
            <a
              className="about-quote-card__source"
              href={card.source.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cuelume-hover="tick"
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
            >
              {card.source.label}
            </a>
            {")"}
          </>
        ) : null}
      </footer>
    </blockquote>
  );
}

function renderOutsidePart(part, i) {
  if (part.type === "link") {
    return (
      <a
        key={`${part.href}-${i}`}
        className="about-inline-link about-inline-link--heading"
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cuelume-hover="tick"
        data-cuelume-press="press"
      >
        {part.label}
      </a>
    );
  }

  if (part.type === "dotted") {
    return (
      <AboutDottedHover
        key={i}
        label={part.value}
        hoverTag={part.hoverTag}
        imageSrc={part.imageSrc}
        imageAlt={part.imageAlt}
      />
    );
  }

  if (part.type === "vinyls") {
    return (
      <AboutInlineVinyls
        key={i}
        label={part.label}
        coverSrc={part.coverSrc}
        recordSrc={part.recordSrc}
        alt={part.alt}
      />
    );
  }

  return <span key={i}>{part.value}</span>;
}

function UrlTab({ url, href, onPointerDown, onClick }) {
  const inner = (
    <>
      <img className="about-browser__url-bg" src={URL_TAB} alt="" draggable={false} aria-hidden="true" />
      <span className="about-browser__url-text">{url}</span>
    </>
  );

  if (href) {
    return (
      <a
        className="about-browser__url"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cuelume-hover="tick"
        data-cuelume-press="press"
        onPointerDown={onPointerDown}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <span className="about-browser__url" onPointerDown={onPointerDown}>
      {inner}
    </span>
  );
}

function WindowChrome({ url, href, onClose, onShrink, onGreen, skipNavClickRef, isSmall }) {
  const stop = (event) => event.stopPropagation();

  return (
    <header className="about-browser">
      <span className="about-browser__dots">
        <button
          type="button"
          className="about-browser__dot about-browser__dot--red"
          aria-label="Close window"
          onPointerDown={stop}
          onClick={onClose}
          data-cuelume-press="droplet"
        />
        <button
          type="button"
          className="about-browser__dot about-browser__dot--yellow"
          aria-label={isSmall ? "Expand window" : "Make window smaller"}
          onPointerDown={stop}
          onClick={onShrink}
          data-cuelume-toggle="toggle"
        />
        <button
          type="button"
          className="about-browser__dot about-browser__dot--green"
          aria-label="Restore window"
          onPointerDown={stop}
          onClick={onGreen}
          data-cuelume-press="bloom"
        />
      </span>
      <UrlTab
        url={url}
        href={href}
        onClick={(event) => {
          if (skipNavClickRef?.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      />
    </header>
  );
}

export default function AboutPanel() {
  const [frontId, setFrontId] = useState("bio");
  const [closed, setClosed] = useState({
    bio: false,
    philosophy: false,
    bookshelf: false
  });
  const [small, setSmall] = useState({
    bio: false,
    philosophy: false,
    bookshelf: false
  });
  const [frontCardId, setFrontCardId] = useState("craft");
  const [draggingId, setDraggingId] = useState(null);
  const windowRefs = useRef({});
  const closedRef = useRef(closed);
  const dragRef = useRef(null);
  const offsetsRef = useRef({ bio: { x: 0, y: 0 }, philosophy: { x: 0, y: 0 }, bookshelf: { x: 0, y: 0 } });
  const skipNavClickRef = useRef(false);
  closedRef.current = closed;

  const closeWindow = (id) => {
    const remaining = WINDOWS.filter((item) => item.id !== id && !closedRef.current[item.id]);
    if (remaining.length === 0) return;

    const nextClosed = { ...closedRef.current, [id]: true };
    closedRef.current = nextClosed;
    setClosed(nextClosed);
    setFrontId((currentFront) => (currentFront === id ? remaining[0].id : currentFront));
  };

  const openWindow = (id) => {
    setFrontId(id);
    if (!closedRef.current[id]) return;
    const next = { ...closedRef.current, [id]: false };
    closedRef.current = next;
    setClosed(next);
  };

  const shrinkWindow = (id) => {
    setFrontId(id);
    setSmall((current) => ({ ...current, [id]: !current[id] }));
  };

  const restoreWindow = (id) => {
    const reset = { bio: false, philosophy: false, bookshelf: false };
    closedRef.current = reset;
    setClosed(reset);
    setFrontId(id);
    setSmall((current) => ({ ...current, [id]: false }));
  };

  const beginDrag = (id, event) => {
    openWindow(id);
    if (event.button !== 0) return;
    if (event.target.closest(DRAG_IGNORE)) return;

    const node = windowRefs.current[id];
    if (!node) return;

    skipNavClickRef.current = false;
    node.setPointerCapture(event.pointerId);
    dragRef.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origX: offsetsRef.current[id].x,
      origY: offsetsRef.current[id].y,
      moved: false
    };
    setDraggingId(id);
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || (event && drag.pointerId !== event.pointerId)) return;
    dragRef.current = null;
    setDraggingId(null);
    window.setTimeout(() => {
      skipNavClickRef.current = false;
    }, 0);
  };

  const onWindowPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && dx * dx + dy * dy < 16) return;
    drag.moved = true;
    skipNavClickRef.current = true;

    const next = { x: drag.origX + dx, y: drag.origY + dy };
    offsetsRef.current[drag.id] = next;
    const node = windowRefs.current[drag.id];
    if (!node) return;
    node.style.setProperty("--drag-x", `${next.x}px`);
    node.style.setProperty("--drag-y", `${next.y}px`);
  };

  const endPointer = (event) => {
    endDrag(event);
  };

  const windowClass = (id) =>
    [
      "about-window",
      `about-window--${id}`,
      frontId === id && !closed[id] ? "is-front" : "",
      small[id] ? "is-small" : "",
      closed[id] ? "is-closed" : "",
      draggingId === id ? "is-dragging" : ""
    ]
      .filter(Boolean)
      .join(" ");

  const windowDragProps = (id) => ({
    onPointerDown: (event) => beginDrag(id, event),
    onPointerMove: onWindowPointerMove,
    onPointerUp: endPointer,
    onPointerCancel: endPointer
  });

  return (
    <div className="about-page about-page--desktop">
      <div className="about-desktop">
        <article
          ref={(node) => {
            windowRefs.current.philosophy = node;
          }}
          className={windowClass("philosophy")}
          {...windowDragProps("philosophy")}
        >
          <div className="about-window__tilt">
            <WindowChrome
              url="anitasphilosophy.com"
              onClose={() => closeWindow("philosophy")}
              onShrink={() => shrinkWindow("philosophy")}
              onGreen={() => restoreWindow("philosophy")}
              skipNavClickRef={skipNavClickRef}
              isSmall={small.philosophy}
            />
            <p className="about-intro">{ABOUT_INTRO}</p>
            <div className="about-quote-stack">
              <div className="about-quote-deck">
                {ABOUT_QUOTE_CARDS.map((card) => (
                  <AboutQuoteCard
                    key={card.id}
                    card={card}
                    isFront={frontCardId === card.id}
                    onFront={setFrontCardId}
                  />
                ))}
              </div>
            </div>
          </div>
        </article>

        <article
          ref={(node) => {
            windowRefs.current.bio = node;
          }}
          className={windowClass("bio")}
          {...windowDragProps("bio")}
        >
          <div className="about-window__tilt">
            <WindowChrome
              url="nita.os"
              onClose={() => closeWindow("bio")}
              onShrink={() => shrinkWindow("bio")}
              onGreen={() => restoreWindow("bio")}
              skipNavClickRef={skipNavClickRef}
              isSmall={small.bio}
            />
            <CurrentlyBar />
            <div className="about-window__bio-row">
              <AboutPhotoDeck photos={ABOUT_PHOTOS} size="hero" />
              <div className="about-window__bio-copy">
                <p className="about-window__hello">
                  Hi, my name is <AboutAnitaConnect />!{" "}
                  {ABOUT_OUTSIDE.map(renderOutsidePart)}
                </p>
              </div>
            </div>
            <div className="about-window__bio-tags">
              <AboutTags />
            </div>
          </div>
        </article>

        <article
          ref={(node) => {
            windowRefs.current.bookshelf = node;
          }}
          className={windowClass("bookshelf")}
          {...windowDragProps("bookshelf")}
        >
          <div className="about-window__tilt">
            <WindowChrome
              url={BOOKSHELF_URL}
              href={BOOKSHELF_HREF}
              onClose={() => closeWindow("bookshelf")}
              onShrink={() => shrinkWindow("bookshelf")}
              onGreen={() => restoreWindow("bookshelf")}
              skipNavClickRef={skipNavClickRef}
              isSmall={small.bookshelf}
            />
            <div className="about-bookshelf-body">
              <div className="about-bookshelf-embed">
                <AboutMediaShelves />
                <span className="about-bookshelf-fade" aria-hidden="true" />
              </div>
              <a
                className="play-launch"
                href={BOOKSHELF_HREF}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover=""
                data-cuelume-hover="tick"
                data-cuelume-press="pulse"
                data-cuelume-release="release"
              >
                <span className="play-launch__pill">open bookshelf</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
