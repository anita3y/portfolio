import { useEffect, useState } from "react";
import CaseStudySectionNav from "./CaseStudySectionNav.jsx";

const DEFAULT_HERO_SLIDE_MS = 500;

function CaseStudyHeroMedia({ heroSlides, heroSlideInterval, heroPlaceholder }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = heroSlides?.length ? heroSlides : null;
  const intervalMs = heroSlideInterval ?? DEFAULT_HERO_SLIDE_MS;

  useEffect(() => {
    if (!slides?.length) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [slides, intervalMs]);

  if (slides) {
    return (
      <div className="cs-placeholder cs-placeholder--hero cs-hero-slides" aria-hidden="true">
        {slides.map((src, index) => (
          <img
            key={src}
            className={["cs-hero-slide", index === slideIndex && "is-active"].filter(Boolean).join(" ")}
            src={src}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>
    );
  }

  return <div className="cs-placeholder cs-placeholder--hero">{heroPlaceholder}</div>;
}

function CaseStudySection({ section, children }) {
  return (
    <section id={section.id} className="cs-section">
      <div className="cs-section__aside">
        <h2 className="cs-section__title">{section.title}</h2>
        {section.summary && <p className="cs-section__summary">{section.summary}</p>}
      </div>
      <div className="cs-section__main">{children}</div>
    </section>
  );
}

function TextBlock({ block }) {
  return (
    <div className="cs-block">
      {block.heading && <h3 className="cs-block__heading">{block.heading}</h3>}
      {block.paragraphs?.map((p) => (
        <p key={p} className="cs-block__text">
          {p}
        </p>
      ))}
      {block.bullets && (
        <ul className="cs-block__list">
          {block.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {block.layout === "flows" && block.items && (
        <div className="cs-flows">
          {block.items.map((item) => (
            <div key={item} className="cs-flow">
              <span className="cs-flow__icon" aria-hidden="true" />
              <div className="cs-flow__card">
                <p>{item}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {block.layout === "cards" && block.items && (
        <div className="cs-cards">
          {block.items.map((item) => (
            <div key={item} className="cs-card">
              <div className="cs-card__lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
      {block.layout === "wireframes" && (
        <div className="cs-wireframes">
          <div className="cs-placeholder cs-placeholder--tall">{block.placeholder}</div>
          <div className="cs-placeholder cs-placeholder--tall">{block.placeholder}</div>
        </div>
      )}
    </div>
  );
}

export function CaseStudyPreview({ study, compact = false }) {
  const { title, meta, heroPlaceholder, heroSlides, heroSlideInterval } = study;

  return (
    <header className={`cs-header cs-header--preview${compact ? " cs-header--compact" : ""}`}>
      <h1 className="cs-title">{title}</h1>
      {meta && (
        <ul className="cs-meta-pills" aria-label="Project details">
          {meta.timeline && <li className="cs-meta-pill">{meta.timeline}</li>}
          {meta.role && <li className="cs-meta-pill">{meta.role}</li>}
          {meta.tools?.map((tool) => (
            <li key={tool} className="cs-meta-pill">
              {tool}
            </li>
          ))}
        </ul>
      )}
      <CaseStudyHeroMedia
        heroSlides={heroSlides}
        heroSlideInterval={heroSlideInterval}
        heroPlaceholder={heroPlaceholder}
      />
    </header>
  );
}

function useCaseStudyActiveSection(sections, scrollRoot) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: scrollRoot?.current ?? null,
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0, 0.2, 0.45, 0.7]
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, scrollRoot]);

  return activeId;
}

function WorkExpandNavStuckSync({ scrollRoot }) {
  useEffect(() => {
    const root = scrollRoot?.current;
    if (!root) return undefined;

    const sync = () => {
      const nav = root.querySelector(".cs-section-nav-wrap");
      if (!nav) {
        root.removeAttribute("data-nav-stuck");
        return;
      }

      const rootTop = root.getBoundingClientRect().top;
      const navTop = nav.getBoundingClientRect().top;
      const stuck = navTop <= rootTop + 1;
      root.toggleAttribute("data-nav-stuck", stuck);
      root.closest(".work-expand__sheet")?.toggleAttribute("data-nav-stuck", stuck);
    };

    sync();
    root.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(sync);
      ro.observe(root);
    }

    return () => {
      root.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      ro?.disconnect();
      root.removeAttribute("data-nav-stuck");
      root.closest(".work-expand__sheet")?.removeAttribute("data-nav-stuck");
    };
  }, [scrollRoot]);

  return null;
}

export function CaseStudySectionNavBar({
  study,
  scrollRoot,
  fixedHeader = false
}) {
  const { sections } = study;
  const activeId = useCaseStudyActiveSection(sections, scrollRoot);

  return (
    <CaseStudySectionNav
      sections={sections}
      activeId={activeId}
      scrollRoot={scrollRoot}
      fixedHeader={fixedHeader}
    />
  );
}

export function CaseStudyBody({ study, scrollRoot, compact = false, hideNav = false }) {
  const { sections } = study;

  return (
    <div className={`cs-body${compact ? " cs-body--compact" : ""}`}>
      {scrollRoot && <WorkExpandNavStuckSync scrollRoot={scrollRoot} />}
      {!hideNav && <CaseStudySectionNavBar study={study} scrollRoot={scrollRoot} />}
      <div className="cs-content">
        {sections.map((section) => (
          <CaseStudySection key={section.id} section={section}>
            {section.blocks?.map((block) => (
              <TextBlock key={block.heading ?? block.layout} block={block} />
            ))}
            {section.media?.placeholder && (
              <div className="cs-placeholder cs-placeholder--wide">{section.media.placeholder}</div>
            )}
          </CaseStudySection>
        ))}
      </div>
    </div>
  );
}

export function CaseStudyFullContent({ study, scrollRoot, compact = false, hideNav = false }) {
  return (
    <div className={`cs-embed${compact ? " cs-embed--compact" : ""}`}>
      <CaseStudyPreview study={study} compact={compact} />
      <CaseStudyBody
        study={study}
        scrollRoot={scrollRoot}
        compact={compact}
        hideNav={hideNav}
      />
    </div>
  );
}
