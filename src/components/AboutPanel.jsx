import { useEffect, useState } from "react";
import {
  ABOUT_COMMUNITY,
  ABOUT_PHILOSOPHY,
  ABOUT_PORTRAIT,
  ABOUT_SECTIONS,
  MY_BOOKSHELF
} from "../data/about.js";
import BookshelfEmbed from "./BookshelfEmbed.jsx";

function renderPhilosophyParagraph(entry, key) {
  if (typeof entry === "string") {
    return (
      <p key={key} className="about-text">
        {entry}
      </p>
    );
  }

  const { before, emphasis, after } = entry;

  return (
    <p key={key} className="about-text">
      {before}
      {emphasis.map((word, i) => (
        <span key={word}>
          {i > 0 && (i === emphasis.length - 1 ? ", and " : ", ")}
          <strong className="about-text__emph">{word}</strong>
        </span>
      ))}
      {after}
    </p>
  );
}

export default function AboutPanel() {
  const [activeId, setActiveId] = useState(ABOUT_SECTIONS[0]?.id ?? "");

  useEffect(() => {
    const ids = ABOUT_SECTIONS.map((s) => s.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: [0, 0.2, 0.45] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <div className="about-body">
        <aside className="about-sidebar" aria-label="About sections">
          <ol className="about-sidebar__list">
            {ABOUT_SECTIONS.map((section) => (
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

        <div className="about-content">
          <section id="hello" className="about-section about-section--hello">
            <h2 className="about-section__title about-section__title--sr">hello!</h2>
            <div className="about-hello">
              <img
                className="about-portrait"
                src={ABOUT_PORTRAIT}
                alt="Portrait of Anita Yan"
                width={320}
                height={400}
                loading="lazy"
                decoding="async"
              />
              <div className="about-hello__copy">
                <p className="about-hello__heading">Hi, my name is Anita!</p>
                <span className="about-tag about-tag--nyu">NYU</span>
              </div>
            </div>
          </section>

          <section id="philosophy" className="about-section about-section--philosophy">
            <h2 className="about-section__title about-section__title--sr">philosophy</h2>
            {ABOUT_PHILOSOPHY.map((entry, i) => renderPhilosophyParagraph(entry, i))}
          </section>

          <section id="bookshelf" className="about-section about-section--bookshelf">
            <h2 className="about-section__title about-section__title--sr">my bookshelf</h2>
            <BookshelfEmbed />
            {MY_BOOKSHELF.paragraphs.map((p) => (
              <p key={p} className="about-text">
                {p}
              </p>
            ))}
            <div className="about-links">
              <a
                className="about-link about-link--muted"
                href={MY_BOOKSHELF.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </section>

          <section id="community" className="about-section">
            <h2 className="about-section__title about-section__title--sr">community</h2>
            {ABOUT_COMMUNITY.paragraphs.map((p) => (
              <p key={p} className="about-text">
                {p}
              </p>
            ))}
            <ul className="about-list">
              {ABOUT_COMMUNITY.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
