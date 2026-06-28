import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-hover]';

const GROW_SELECTOR = ".brand, [data-cursor-grow]";

const DEFAULT_SIZE = 26;
const GROW_SIZE = 40;

/** Elements that get the iPadOS-style pill morph (extend over time). */
const MORPH_SELECTOR = ".tab, .chip-icon[data-cursor-morph], [data-cursor-morph]";
const CURSOR_TAG_SELECTOR = "[data-cursor-tag]";
const CURSOR_TAG_OFFSET_X = 14;

const LAYERED_MORPH_HOSTS = [
  { match: ".tab", host: ".tabs" },
  { match: ".chip-icon[data-cursor-morph]", host: ".tag-chip" },
  { match: ".site-footer__link[data-cursor-morph]", host: ".site-footer__nav" },
  { match: ".project-card__media[data-cursor-morph]", host: ".project-card__frame" },
  {
    match: ".work-expand__toggle[data-cursor-morph], .work-expand__close[data-cursor-morph]",
    host: ".work-expand__header-btn-host"
  },
  { match: ".cs-section-nav__btn[data-cursor-morph]", host: ".cs-section-nav" },
  { match: ".about-tags__tag[data-cursor-morph]", host: ".about-tags__item" },
  { match: ".about-hello__name-connect-label[data-cursor-morph]", host: ".about-hello__name-connect-morph-host" }
];

const MORPH_PAD = 5;

function getMorphRadius(w, h) {
  return Math.min(6, Math.min(w, h) * 0.26);
}

function getFixedMorphTarget(element) {
  const rect = element.getBoundingClientRect();
  const pad = MORPH_PAD;
  const w = rect.width + pad * 2;
  const h = rect.height + pad * 2;

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    w,
    h,
    r: getMorphRadius(w, h)
  };
}

function getLayeredMorphTarget(element, container) {
  const elRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const pad = element.matches(".chip-icon")
    ? 4
    : element.matches(".about-tags__tag") ||
        element.matches(".about-hello__name-connect-label")
      ? 7
      : MORPH_PAD;
  const w = elRect.width + pad * 2;
  const h = elRect.height + pad * 2;

  return {
    left: elRect.left - containerRect.left - pad,
    top: elRect.top - containerRect.top - pad,
    w,
    h,
    r: getMorphRadius(w, h)
  };
}

function getLayeredMorphHost(element) {
  for (const { match, host } of LAYERED_MORPH_HOSTS) {
    if (element.matches(match)) {
      const container = element.closest(host);
      if (container) return container;
    }
  }
  return null;
}

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const layerMorphRef = useRef(null);
  const subtitleTagRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const tagPos = useRef({ x: -100, y: -100 });
  const size = useRef({ w: DEFAULT_SIZE, h: DEFAULT_SIZE, r: DEFAULT_SIZE / 2 });
  const layerMorph = useRef({ left: 0, top: 0, w: DEFAULT_SIZE, h: DEFAULT_SIZE, r: DEFAULT_SIZE / 2 });
  const pointer = useRef({ x: -100, y: -100 });
  const morphTarget = useRef(null);
  const layerMorphTarget = useRef(null);
  const morphEl = useRef(null);
  const growing = useRef(false);
  const tagActive = useRef(false);
  const layerPortalHostRef = useRef(null);
  const raf = useRef(null);
  const resizeObserver = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [morphing, setMorphing] = useState(false);
  const [layerMorphing, setLayerMorphing] = useState(false);
  const [layerPortalHost, setLayerPortalHost] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [growingHover, setGrowingHover] = useState(false);
  const [subtitleTag, setSubtitleTag] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const syncMorphRect = () => {
      const el = morphEl.current;
      if (!el) return;

      const host = getLayeredMorphHost(el);
      if (host) {
        layerMorphTarget.current = getLayeredMorphTarget(el, host);
      } else {
        morphTarget.current = getFixedMorphTarget(el);
      }
    };

    const observeMorphEl = (el) => {
      resizeObserver.current?.disconnect();
      if (!el || typeof ResizeObserver === "undefined") return;
      resizeObserver.current = new ResizeObserver(syncMorphRect);
      resizeObserver.current.observe(el);
      if (el.parentElement) resizeObserver.current.observe(el.parentElement);
      const host = getLayeredMorphHost(el);
      if (host) resizeObserver.current.observe(host);
    };

    const setMorphElement = (el) => {
      morphEl.current = el;

      if (!el) {
        morphTarget.current = null;
        layerMorphTarget.current = null;
        setMorphing(false);
        setLayerMorphing(false);
        layerPortalHostRef.current = null;
        setLayerPortalHost(null);
        resizeObserver.current?.disconnect();
        return;
      }

      const layeredHost = getLayeredMorphHost(el);

      if (layeredHost) {
        morphTarget.current = null;
        layerMorphTarget.current = getLayeredMorphTarget(el, layeredHost);
        setMorphing(false);
        setLayerMorphing(true);
        layerPortalHostRef.current = layeredHost;
        setLayerPortalHost(layeredHost);
      } else {
        layerMorphTarget.current = null;
        morphTarget.current = getFixedMorphTarget(el);
        setMorphing(true);
        setLayerMorphing(false);
        layerPortalHostRef.current = null;
        setLayerPortalHost(null);
      }

      observeMorphEl(el);
    };

    const onMove = (event) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      setVisible(true);

      const tagTarget = event.target.closest(CURSOR_TAG_SELECTOR);
      tagActive.current = Boolean(tagTarget);

      if (tagTarget) {
        const tagLabel = tagTarget.getAttribute("data-cursor-tag") || "";
        setSubtitleTag((current) => (current === tagLabel ? current : tagLabel));
        if (morphEl.current) {
          setMorphElement(null);
        }
      } else {
        setSubtitleTag((current) => (current === null ? current : null));

        const morphCandidate = event.target.closest(MORPH_SELECTOR);
        if (morphCandidate !== morphEl.current) {
          setMorphElement(morphCandidate);
        } else if (morphCandidate) {
          syncMorphRect();
        }
      }

      const interactive = event.target.closest(INTERACTIVE_SELECTOR);
      setHovering(Boolean(interactive));

      const growTarget = event.target.closest(GROW_SELECTOR);
      growing.current = Boolean(growTarget);
      setGrowingHover(Boolean(growTarget));
    };

    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);
    const onLeave = () => {
      setVisible(false);
      setPressing(false);
      setHovering(false);
      growing.current = false;
      setGrowingHover(false);
      tagActive.current = false;
      setSubtitleTag(null);
      setMorphElement(null);
    };

    const paintLayerMorph = (left, top, w, h, r) => {
      const el = layerMorphRef.current;
      if (!el) return;
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.borderRadius = `${r}px`;
    };

    const animate = () => {
      const el = cursorRef.current;
      const tagEl = subtitleTagRef.current;
      const posEase = reducedMotion ? 1 : 0.2;

      if (tagActive.current && tagEl) {
        const targetX = pointer.current.x + CURSOR_TAG_OFFSET_X;
        const targetY = pointer.current.y;
        tagPos.current.x += (targetX - tagPos.current.x) * posEase;
        tagPos.current.y += (targetY - tagPos.current.y) * posEase;
        tagEl.style.transform = `translate3d(${tagPos.current.x}px, ${tagPos.current.y}px, 0) translateY(-50%)`;
      }

      if (el) {
        const sizeEase = reducedMotion ? 1 : 0.17;
        const layerEase = reducedMotion ? 1 : 0.22;

        let targetX = pointer.current.x;
        let targetY = pointer.current.y;
        let targetW;
        let targetH;
        let targetR;

        if (tagActive.current) {
          targetW = 0;
          targetH = 0;
          targetR = 0;
        } else if (layerMorphTarget.current) {
          const hoverScale = hovering ? 1.15 : 1;
          const base = pressing ? 20 : DEFAULT_SIZE * hoverScale;
          targetW = base;
          targetH = base;
          targetR = base / 2;

          const m = layerMorphTarget.current;
          const pressScale = pressing ? 0.95 : 1;
          const targetLeft = m.left;
          const targetTop = m.top;
          const targetLayerW = m.w * pressScale;
          const targetLayerH = m.h * pressScale;
          const targetLayerR = m.r * pressScale;

          layerMorph.current.left += (targetLeft - layerMorph.current.left) * layerEase;
          layerMorph.current.top += (targetTop - layerMorph.current.top) * layerEase;
          layerMorph.current.w += (targetLayerW - layerMorph.current.w) * layerEase;
          layerMorph.current.h += (targetLayerH - layerMorph.current.h) * layerEase;
          layerMorph.current.r += (targetLayerR - layerMorph.current.r) * layerEase;

          paintLayerMorph(
            layerMorph.current.left,
            layerMorph.current.top,
            layerMorph.current.w,
            layerMorph.current.h,
            layerMorph.current.r
          );
        } else if (morphTarget.current) {
          const m = morphTarget.current;
          const pressScale = pressing ? 0.95 : 1;
          targetX = m.x;
          targetY = m.y;
          targetW = m.w * pressScale;
          targetH = m.h * pressScale;
          targetR = m.r * pressScale;
        } else if (growing.current) {
          const base = pressing ? 30 : GROW_SIZE;
          targetW = base;
          targetH = base;
          targetR = base / 2;
        } else {
          const hoverScale = hovering ? 1.2 : 1;
          const base = pressing ? 22 : DEFAULT_SIZE * hoverScale;
          targetW = base;
          targetH = base;
          targetR = base / 2;
        }

        pos.current.x += (targetX - pos.current.x) * posEase;
        pos.current.y += (targetY - pos.current.y) * posEase;
        size.current.w += (targetW - size.current.w) * sizeEase;
        size.current.h += (targetH - size.current.h) * sizeEase;
        size.current.r += (targetR - size.current.r) * sizeEase;

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
    window.addEventListener("scroll", syncMorphRect, { passive: true });
    window.addEventListener("resize", syncMorphRect);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", syncMorphRect);
      window.removeEventListener("resize", syncMorphRect);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      resizeObserver.current?.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;

  const className = [
    "custom-cursor",
    visible && !subtitleTag && "custom-cursor--visible",
    morphing && "custom-cursor--morph",
    layerMorphing && "custom-cursor--tab-dot",
    pressing && "custom-cursor--pressing",
    growingHover && "custom-cursor--grow",
    hovering && !morphing && !layerMorphing && !growingHover && !subtitleTag && "custom-cursor--hover"
  ]
    .filter(Boolean)
    .join(" ");

  const subtitleTagClassName = [
    "custom-cursor-subtitle-tag",
    subtitleTag && "custom-cursor-subtitle-tag--visible"
  ]
    .filter(Boolean)
    .join(" ");

  const layerMorphClassName = [
    "custom-cursor-tab-morph",
    layerMorphing && "custom-cursor-tab-morph--visible",
    pressing && "custom-cursor-tab-morph--pressing"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div ref={cursorRef} className={className} aria-hidden="true" />
      <div ref={subtitleTagRef} className={subtitleTagClassName} aria-hidden="true">
        {subtitleTag}
      </div>
      {layerPortalHost &&
        createPortal(
          <div ref={layerMorphRef} className={layerMorphClassName} aria-hidden="true" />,
          layerPortalHost
        )}
    </>
  );
}
