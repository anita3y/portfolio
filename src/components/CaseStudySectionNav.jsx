import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const THUMB_TRANSITION =
  "transform 0.76s cubic-bezier(0.18, 1.82, 0.32, 1), width 0.78s 0.05s cubic-bezier(0.42, 0.04, 0.18, 1)";

export default function CaseStudySectionNav({
  sections,
  activeId,
  scrollRoot,
  fixedHeader = false
}) {
  const wrapRef = useRef(null);
  const navRef = useRef(null);
  const thumbRef = useRef(null);
  const btnRefs = useRef([]);

  const paintThumb = useCallback(
    (id) => {
      const nav = navRef.current;
      const thumb = thumbRef.current;
      const idx = sections.findIndex((section) => section.id === id);
      const btn = btnRefs.current[idx];

      if (!nav || !thumb || !btn) return;

      thumb.style.transition = THUMB_TRANSITION;
      thumb.style.width = `${btn.offsetWidth}px`;
      thumb.style.height = `${btn.offsetHeight}px`;
      thumb.style.transform = `translate3d(${btn.offsetLeft}px, 0, 0)`;
    },
    [sections]
  );

  useLayoutEffect(() => {
    paintThumb(activeId);
  }, [activeId, paintThumb]);

  useEffect(() => {
    const sync = () => paintThumb(activeId);
    window.addEventListener("resize", sync);

    const nav = navRef.current;
    if (!nav || typeof ResizeObserver === "undefined") {
      return () => window.removeEventListener("resize", sync);
    }

    const ro = new ResizeObserver(sync);
    ro.observe(nav);
    btnRefs.current.forEach((btn) => {
      if (btn) ro.observe(btn);
    });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [activeId, paintThumb]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const container = scrollRoot?.current;
    const navHeight = fixedHeader ? 0 : (wrapRef.current?.offsetHeight ?? 0);
    const scrollInset = fixedHeader ? 10 : 6;

    if (container) {
      const top =
        el.getBoundingClientRect().top -
        container.getBoundingClientRect().top +
        container.scrollTop -
        navHeight -
        scrollInset;
      container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      return;
    }

    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  return (
    <div className="cs-section-nav-wrap" ref={wrapRef}>
      <nav className="cs-section-nav" ref={navRef} aria-label="Case study sections">
        <span className="cs-section-nav__thumb" ref={thumbRef} aria-hidden="true" />
        {sections.map((section, index) => (
          <button
            key={section.id}
            ref={(el) => {
              btnRefs.current[index] = el;
            }}
            type="button"
            className={`cs-section-nav__btn${activeId === section.id ? " active" : ""}`}
            data-cursor-morph=""
            onClick={() => scrollToSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
