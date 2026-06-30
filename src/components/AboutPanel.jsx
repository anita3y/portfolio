import { useEffect, useState } from "react";
import {
  ABOUT_COMMUNITY,
  ABOUT_OUTSIDE,
  ABOUT_PHILOSOPHY,
  ABOUT_PHOTOS,
  ABOUT_SECTIONS
} from "../data/about.js";
import AboutAnitaConnect from "./AboutAnitaConnect.jsx";
import AboutDottedHover from "./AboutDottedHover.jsx";
import AboutInlineVinyls from "./AboutInlineVinyls.jsx";
import AboutPhotoDeck from "./AboutPhotoDeck.jsx";
import AboutSidebar from "./AboutSidebar.jsx";
import AboutTags from "./AboutTags.jsx";
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

function renderOutsidePart(part, i) {
  if (part.type === "link") {
    return (
      <a
        key={`${part.href}-${i}`}
        className="about-inline-link about-inline-link--heading"
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
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

const VINYL_PART_INDEX = ABOUT_OUTSIDE.findIndex((part) => part.type === "vinyls");
const ABOUT_OUTSIDE_BEFORE_VINYL = ABOUT_OUTSIDE.slice(0, VINYL_PART_INDEX + 1);
const ABOUT_OUTSIDE_AFTER_VINYL = ABOUT_OUTSIDE.slice(VINYL_PART_INDEX + 1);

function useAboutActiveSection(sections) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const ids = sections.map((section) => section.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0, 0.2, 0.45, 0.7]
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return activeId;
}

export default function AboutPanel() {
  const activeId = useAboutActiveSection(ABOUT_SECTIONS);

  return (
    <div className="about-page">
      <div className="about-body">
        <AboutSidebar sections={ABOUT_SECTIONS} activeId={activeId} />

        <div className="about-content">
          <section id="hello" className="about-section about-section--hello">
            <h2 className="about-section__title about-section__title--sr">hello!</h2>
            <div className="about-hello">
              <header className="about-hello__hero">
                <div className="about-hello__hero-row">
                  <AboutPhotoDeck photos={ABOUT_PHOTOS} />
                  <div className="about-hello__intro">
                    <p className="about-hello__heading about-hello__heading--greeting">
                      <span className="about-hello__chunk about-hello__chunk--intro">
                        Hi, my name is <AboutAnitaConnect />!
                      </span>
                    </p>
                    <p className="about-hello__heading about-hello__heading--outside">
                      <span className="about-hello__chunk about-hello__chunk--outside">
                        {ABOUT_OUTSIDE_BEFORE_VINYL.map((part, i) => renderOutsidePart(part, i))}
                      </span>
                      <span className="about-hello__chunk about-hello__chunk--rest">
                        {ABOUT_OUTSIDE_AFTER_VINYL.map((part, i) =>
                          renderOutsidePart(part, i + VINYL_PART_INDEX + 1)
                        )}
                      </span>
                    </p>
                    <div className="about-hello__intro-tags">
                      <AboutTags />
                    </div>
                  </div>
                </div>
              </header>
            </div>
          </section>

          <section id="philosophy" className="about-section about-section--philosophy">
            <h2 className="about-section__heading">philosophy</h2>
            {ABOUT_PHILOSOPHY.map((entry, i) => renderPhilosophyParagraph(entry, i))}
          </section>

          <section id="bookshelf" className="about-section about-section--bookshelf">
            <h2 className="about-section__heading">my bookshelf</h2>
            <BookshelfEmbed />
          </section>

          <section id="community" className="about-section about-section--community">
            <h2 className="about-section__heading">my communities</h2>
            <div className="about-community">
              <ul className="about-community__grid">
                {ABOUT_COMMUNITY.map((item) => (
                  <li key={item.id} className="about-community__item">
                    <figure className="about-community__figure">
                      <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                    </figure>
                    <h3 className="about-community__item-title">{item.title}</h3>
                    <p className="about-community__item-copy">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
