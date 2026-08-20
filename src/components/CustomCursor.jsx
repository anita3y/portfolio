import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  '[role="tab"]',
  '[role="option"]',
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "[data-cursor-hover]",
  "[data-cursor-grow]",
  "[data-cursor-case-study]"
].join(", ");

const CURSOR_TAG_SELECTOR = "[data-cursor-tag]";
const CURSOR_TAG_OFFSET_X = 14;

const DEFAULT_SIZE = 26;
const HOVER_SIZE = 15;
const PRESS_SIZE = 12;

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const subtitleTagRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const tagPos = useRef({ x: -100, y: -100 });
  const size = useRef({ w: DEFAULT_SIZE, h: DEFAULT_SIZE, r: DEFAULT_SIZE / 2 });
  const pointer = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
  const pressingRef = useRef(false);
  const tagActive = useRef(false);
  const raf = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [subtitleTag, setSubtitleTag] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (event) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      setVisible(true);

      const tagTarget = event.target.closest(CURSOR_TAG_SELECTOR);
      tagActive.current = Boolean(tagTarget);

      if (tagTarget) {
        const tagLabel = tagTarget.getAttribute("data-cursor-tag") || "";
        setSubtitleTag((current) => (current === tagLabel ? current : tagLabel));
        hoveringRef.current = false;
        setHovering(false);
        return;
      }

      setSubtitleTag((current) => (current === null ? current : null));
      const interactive = Boolean(event.target.closest(INTERACTIVE_SELECTOR));
      hoveringRef.current = interactive;
      setHovering(interactive);
    };

    const onDown = () => {
      pressingRef.current = true;
      setPressing(true);
    };
    const onUp = () => {
      pressingRef.current = false;
      setPressing(false);
    };
    const onLeave = () => {
      setVisible(false);
      pressingRef.current = false;
      setPressing(false);
      hoveringRef.current = false;
      setHovering(false);
      tagActive.current = false;
      setSubtitleTag(null);
    };

    const animate = () => {
      const el = cursorRef.current;
      const tagEl = subtitleTagRef.current;
      const posEase = reducedMotion ? 1 : 0.2;
      const sizeEase = reducedMotion ? 1 : 0.2;

      if (tagActive.current && tagEl) {
        const targetX = pointer.current.x + CURSOR_TAG_OFFSET_X;
        const targetY = pointer.current.y;
        tagPos.current.x += (targetX - tagPos.current.x) * posEase;
        tagPos.current.y += (targetY - tagPos.current.y) * posEase;
        tagEl.style.transform = `translate3d(${tagPos.current.x}px, ${tagPos.current.y}px, 0) translateY(-50%)`;
      }

      if (el) {
        const targetX = pointer.current.x;
        const targetY = pointer.current.y;
        let targetW;
        let targetH;

        if (tagActive.current) {
          targetW = 0;
          targetH = 0;
        } else if (pressingRef.current) {
          targetW = PRESS_SIZE;
          targetH = PRESS_SIZE;
        } else if (hoveringRef.current) {
          targetW = HOVER_SIZE;
          targetH = HOVER_SIZE;
        } else {
          targetW = DEFAULT_SIZE;
          targetH = DEFAULT_SIZE;
        }

        pos.current.x += (targetX - pos.current.x) * posEase;
        pos.current.y += (targetY - pos.current.y) * posEase;
        size.current.w += (targetW - size.current.w) * sizeEase;
        size.current.h += (targetH - size.current.h) * sizeEase;
        size.current.r = Math.min(size.current.w, size.current.h) / 2;

        const { x, y } = pos.current;
        const { w, h, r } = size.current;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.borderRadius = `${r}px`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;

  const className = [
    "custom-cursor",
    visible && !subtitleTag && "custom-cursor--visible",
    pressing && "custom-cursor--pressing",
    hovering && !subtitleTag && "custom-cursor--hover"
  ]
    .filter(Boolean)
    .join(" ");

  const subtitleTagClassName = [
    "custom-cursor-subtitle-tag",
    subtitleTag && "custom-cursor-subtitle-tag--visible"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div ref={cursorRef} className={className} aria-hidden="true" />
      <div ref={subtitleTagRef} className={subtitleTagClassName} aria-hidden="true">
        {subtitleTag}
      </div>
    </>
  );
}
