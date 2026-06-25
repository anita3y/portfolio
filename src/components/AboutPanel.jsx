import {
  ABOUT_OUTSIDE,
  ABOUT_PHILOSOPHY,
  ABOUT_SECTIONS
} from "../data/about.js";
import AboutAnitaConnect from "./AboutAnitaConnect.jsx";
import AboutDottedHover from "./AboutDottedHover.jsx";
import AboutInlineVinyls from "./AboutInlineVinyls.jsx";
import AboutTags from "./AboutTags.jsx";

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

export default function AboutPanel() {
  return (
    <div className="about-page">
      <div className="about-body">
        <div className="about-content">
          <section id="hello" className="about-section about-section--hello">
            <h2 className="about-section__title about-section__title--sr">
              {ABOUT_SECTIONS.find((s) => s.id === "hello")?.title}
            </h2>
            <div className="about-hello">
              <header className="about-hello__hero">
                <div className="about-hello__intro">
                  <p className="about-hello__heading">
                    <span className="about-hello__chunk about-hello__chunk--intro">
                      Hi, my name is <AboutAnitaConnect />!{" "}
                    </span>
                    <span className="about-hello__chunk about-hello__chunk--outside">
                      {ABOUT_OUTSIDE_BEFORE_VINYL.map((part, i) => renderOutsidePart(part, i))}
                    </span>
                    <span className="about-hello__chunk about-hello__chunk--rest">
                      {ABOUT_OUTSIDE_AFTER_VINYL.map((part, i) =>
                        renderOutsidePart(part, i + VINYL_PART_INDEX + 1)
                      )}
                    </span>
                  </p>
                </div>
              </header>
              <div className="about-hello__body">
                <AboutTags />
                {ABOUT_PHILOSOPHY.map((entry, i) => renderPhilosophyParagraph(entry, i))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
