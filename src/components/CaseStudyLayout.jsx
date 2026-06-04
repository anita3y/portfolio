import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CaseStudySection({ section, children }) {
  return (
    <section id={section.id} className="cs-section">
      <h2 className="cs-section__title">{section.title}</h2>
      {section.summary && <p className="cs-section__summary">{section.summary}</p>}
      {children}
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

export default function CaseStudyLayout({ study }) {
  const { breadcrumb, title, meta, heroPlaceholder, sections } = study;
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    document.title = `${title} | anita yan`;
    return () => {
      document.title = "anita yan | Portfolio";
    };
  }, [title]);

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="cs-page">
      <header className="cs-header">
        <Link className="cs-brand" to="/" state={{ tab: "work" }}>
          anita yan
        </Link>
        <nav className="cs-breadcrumb" aria-label="Breadcrumb">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb}>
              {i > 0 && <span className="cs-breadcrumb__sep"> / </span>}
              {crumb}
            </span>
          ))}
        </nav>
        <h1 className="cs-title">{title}</h1>
        {meta && (
          <p className="cs-meta">
            {[meta.role, meta.timeline, meta.tools?.join(", ")].filter(Boolean).join(" · ")}
          </p>
        )}
        <div className="cs-placeholder cs-placeholder--hero">{heroPlaceholder}</div>
      </header>

      <div className="cs-body">
        <aside className="cs-sidebar" aria-label="Section navigation">
          <ol className="cs-sidebar__list">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={activeId === section.id ? "is-active" : ""}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

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

          <footer className="cs-footer">
            <Link className="cs-back" to="/" state={{ tab: "work" }}>
              ← Back to work
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
