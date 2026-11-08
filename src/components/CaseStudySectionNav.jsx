import { useEffect, useRef } from "react";


export default function CaseStudySectionNav({
  sections,
  activeId,
  scrollRoot,
  fixedHeader = false,
  onBack
}) {
  const wrapRef = useRef(null);
  const btnRefs = useRef({});

  /* Proximity shading (after calebwu.ca): each chapter darkens smoothly as
     its section approaches the reading line, and fades as it leaves —
     a continuous --near value (0..1) instead of an on/off active state. */
  useEffect(() => {
    const root = scrollRoot?.current ?? null;
    const target = root ?? window;
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = root ? root.getBoundingClientRect() : { top: 0, height: window.innerHeight };
      const line = box.top + box.height * 0.3;
      const range = box.height * 0.35;
      Object.entries(btnRefs.current).forEach(([id, btn]) => {
        const el = document.getElementById(id);
        if (!btn || !el) return;
        const r = el.getBoundingClientRect();
        let near;
        if (r.top <= line && r.bottom >= line) near = 1;
        else {
          const d = r.top > line ? r.top - line : line - r.bottom;
          near = Math.max(0, 1 - d / range);
        }
        btn.style.setProperty("--near", near.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections, scrollRoot]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const container = scrollRoot?.current;
    const navHeight = fixedHeader ? 0 : 0;
    const scrollInset = fixedHeader ? 10 : 12;

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
      {onBack && (
        <button
          type="button"
          className="cs-section-nav__back"
          onClick={onBack}
          aria-label="Back"
          data-cursor-hover=""
        >
          {/* Soft, round-capped arrow (replaces the sharp PNG). */}
          <svg className="cs-back-arrow" viewBox="0 0 30 14" width="30" height="14" aria-hidden="true">
            <path d="M28 7 H3" />
            <path d="M8.5 1.8 C6.4 4 4.6 5.6 2.4 7 C4.6 8.4 6.4 10 8.5 12.2" />
          </svg>
        </button>
      )}
      <nav className="cs-section-nav" aria-label="Case study sections">
        {sections.map((section) => {
          const childActive = section.subsections?.some((sub) => sub.id === activeId);
          const parentActive = activeId === section.id || childActive;

          return (
            <div key={section.id} className="cs-section-nav__group">
              <button
                ref={(el) => {
                  btnRefs.current[section.id] = el;
                }}
                type="button"
                className={`cs-section-nav__btn cs-section-nav__btn--${section.id}${parentActive ? " active" : ""}`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
