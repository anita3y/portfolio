import { useRef } from "react";
import { assetUrl } from "../utils/assetUrl.js";

const BACK_ARROW = assetUrl("/case-studies/back-arrow.png");

export default function CaseStudySectionNav({
  sections,
  activeId,
  scrollRoot,
  fixedHeader = false,
  onBack
}) {
  const wrapRef = useRef(null);

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
          <img src={BACK_ARROW} alt="" aria-hidden="true" />
        </button>
      )}
      <nav className="cs-section-nav" aria-label="Case study sections">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`cs-section-nav__btn cs-section-nav__btn--${section.id}${activeId === section.id ? " active" : ""}`}
            onClick={() => scrollToSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
