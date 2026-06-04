import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PlayProjectLayout({ project }) {
  const {
    breadcrumb,
    title,
    meta,
    liveUrl,
    repoUrl,
    launchLabel,
    intro,
    tryThis,
    why,
    previewPlaceholder,
    previewVideo
  } = project;

  useEffect(() => {
    document.title = `${title} | anita yan`;
    return () => {
      document.title = "anita yan | Portfolio";
    };
  }, [title]);

  return (
    <div className="play-page">
      <Link className="cs-brand" to="/" state={{ tab: "play" }}>
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

      <header className="play-header">
        <h1 className="cs-title">{title}</h1>
        {meta && (
          <p className="cs-meta">
            {[meta.type, meta.tags?.join(", ")].filter(Boolean).join(" · ")}
          </p>
        )}
      </header>

      <div
        className={`play-preview${
          project.previewTheme ? ` play-preview--${project.previewTheme}` : " play-preview--memory"
        }`}
      >
        {previewVideo ? (
          <video
            className="play-preview__video"
            src={previewVideo}
            controls
            playsInline
            preload="metadata"
            poster={project.previewPoster}
            aria-label={`${title} demo`}
          />
        ) : (
          <div className="play-preview__placeholder">
            <p>{previewPlaceholder}</p>
          </div>
        )}
      </div>

      <div className="play-body">
        <div className="play-intro">
          {intro.map((paragraph) => (
            <p key={paragraph} className="play-text">
              {paragraph}
            </p>
          ))}
        </div>

        {tryThis?.length > 0 && (
          <section className="play-section">
            <h2 className="play-section__title">Try this</h2>
            <ul className="play-list">
              {tryThis.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {why && (
          <section className="play-section">
            <h2 className="play-section__title">{why.heading}</h2>
            {why.paragraphs.map((paragraph) => (
              <p key={paragraph} className="play-text">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        <div className="play-actions">
          <a
            className="play-launch"
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {launchLabel}
            <span className="play-launch__arrow" aria-hidden="true">
              ↗
            </span>
          </a>
          {repoUrl && (
            <a
              className="play-repo"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          )}
        </div>

        <footer className="play-footer">
          <Link className="cs-back" to="/" state={{ tab: "play" }}>
            ← Back to play
          </Link>
        </footer>
      </div>
    </div>
  );
}
