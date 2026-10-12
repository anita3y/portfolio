import { useEffect, useMemo, useState } from "react";
import { PLAY_PROJECTS, WORK_PROJECTS } from "../data/projects.js";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "play", label: "Play" },
  { id: "writings", label: "Writings" },
  { id: "about", label: "About" }
];

const WORK_TITLES = WORK_PROJECTS.map((p) => p.title);
const PLAY_TITLES = PLAY_PROJECTS.map((p) => p.title);

const WRITINGS_TITLES = ["Notes", "Process", "Reading list"];
const ABOUT_TITLES = ["Anita Yan", "Product designer", "NYU", "Craft + simplicity"];

function LiveTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  return (
    <div className="v4-shell__time" aria-label={`Local time ${time}`}>
      <span className="v4-shell__time-mark" aria-hidden="true" />
      <span className="v4-shell__time-text">{time}</span>
      <span className="v4-shell__colon" aria-hidden="true">
        ::
      </span>
    </div>
  );
}

function ThumbMedia({ project }) {
  if (project.thumbnailVideo) {
    return (
      <video
        className="v4-shell__thumb-media"
        src={project.thumbnailVideo}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
      />
    );
  }

  const src =
    project.cover ||
    project.thumbnail ||
    project.thumbnailSlides?.[0] ||
    null;

  if (!src) {
    return <div className="v4-shell__thumb-fallback" aria-hidden="true" />;
  }

  return (
    <img
      className="v4-shell__thumb-media"
      src={src}
      alt=""
      draggable={false}
      loading="lazy"
    />
  );
}

function StageGrid({ projects, onOpen, featuredId }) {
  const ordered = useMemo(() => {
    if (!featuredId) return projects;
    const featured = projects.find((p) => p.id === featuredId);
    const rest = projects.filter((p) => p.id !== featuredId);
    return featured ? [featured, ...rest] : projects;
  }, [projects, featuredId]);

  return (
    <div className="v4-shell__stage" role="list">
      {ordered.map((project, index) => {
        const featured = index === 0;
        return (
          <button
            key={project.id}
            type="button"
            role="listitem"
            className={`v4-shell__tile${featured ? " is-featured" : ""}`}
            onClick={() => {
              if (!project.displayOnly) onOpen?.(project.id);
            }}
            data-theme={project.theme}
          >
            <span className="v4-shell__tile-name">{project.title}</span>
            <span className="v4-shell__tile-frame">
              <ThumbMedia project={project} />
            </span>
            {featured && project.headline ? (
              <span className="v4-shell__tile-blurb">{project.headline}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function TitleStack({ titles }) {
  return (
    <div className="v4-shell__titles" aria-hidden="true">
      {titles.map((title, i) => (
        <div key={`${title}-${i}`} className="v4-shell__title-row">
          <span className="v4-shell__title-text">{title}</span>
          {i < titles.length - 1 ? (
            <span className="v4-shell__title-rule" />
          ) : null}
        </div>
      ))}
      <span className="v4-shell__title-arrow" aria-hidden="true">
        →
      </span>
    </div>
  );
}

/**
 * Fixed-viewport homepage shell (Figma HERO). Section switches in place — no page scroll.
 */
export default function HomepageShell({
  locked = false,
  enter = 0,
  onOpenWork,
  onOpenPlay
}) {
  const [section, setSection] = useState("work");
  const visible = enter > 0.02 || locked;

  useEffect(() => {
    if (!locked) return undefined;
    const previousHtml = document.documentElement.style.overflow;
    const previousBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousHtml;
      document.body.style.overflow = previousBody;
    };
  }, [locked]);

  const titles =
    section === "work"
      ? WORK_TITLES
      : section === "play"
        ? PLAY_TITLES
        : section === "writings"
          ? WRITINGS_TITLES
          : ABOUT_TITLES;

  return (
    <section
      className={`v4-shell${locked ? " is-locked" : ""}${visible ? " is-visible" : ""}`}
      aria-label="Portfolio home"
      style={{
        opacity: locked ? 1 : Math.min(1, Math.max(0, enter)),
        pointerEvents: visible ? "auto" : "none"
      }}
      aria-hidden={visible ? undefined : true}
    >
      <div className="v4-shell__frame">
        <header className="v4-shell__top">
          <div className="v4-shell__brand">
            <span className="v4-shell__logo-mark" aria-hidden="true" />
            <span className="v4-shell__logo">Logo</span>
            <span className="v4-shell__colon" aria-hidden="true">
              ::
            </span>
          </div>
          <nav className="v4-shell__links" aria-label="External">
            <a href="mailto:hello@anitayan.com">Email</a>
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="https://github.com/anita3y" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
          <LiveTime />
        </header>
        <div className="v4-shell__rule" aria-hidden="true" />

        <div className="v4-shell__body">
          <aside className="v4-shell__left">
            <TitleStack titles={titles.slice(0, 6)} />

            <nav className="v4-shell__nav" aria-label="Sections">
              {SECTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`v4-shell__nav-btn${section === item.id ? " is-active" : ""}`}
                  aria-current={section === item.id ? "page" : undefined}
                  onClick={() => setSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="v4-shell__main">
            {section === "work" && (
              <StageGrid
                projects={WORK_PROJECTS}
                featuredId="world-affairs-conference"
                onOpen={(id) => onOpenWork?.(id)}
              />
            )}
            {section === "play" && (
              <StageGrid
                projects={PLAY_PROJECTS}
                featuredId="sticker-collection"
                onOpen={(id) => onOpenPlay?.(id)}
              />
            )}
            {section === "writings" && (
              <div className="v4-shell__placeholder">
                <p>Writings — coming soon.</p>
              </div>
            )}
            {section === "about" && (
              <div className="v4-shell__placeholder v4-shell__placeholder--about">
                <p>
                  Product designer focused on craft and simplicity. Based in New
                  York.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
