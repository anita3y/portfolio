import ExternalLinkArrow from "./ExternalLinkArrow.jsx";

export default function PlayProjectContent({ project }) {
  const {
    title,
    meta,
    liveUrl,
    repoUrl,
    launchLabel,
    intro,
    tryThis,
    why,
    previewPlaceholder,
    previewVideo,
    previewTheme,
    previewPoster
  } = project;

  return (
    <div className="play-content">
      <header className="play-content__header">
        <h2 className="play-content__title">{title}</h2>
        {meta && (
          <p className="play-content__meta">
            {[meta.type, meta.tags?.join(", ")].filter(Boolean).join(" · ")}
          </p>
        )}
      </header>

      <div
        className={`play-preview play-content__preview${
          previewTheme ? ` play-preview--${previewTheme}` : " play-preview--memory"
        }`}
      >
        {previewVideo ? (
          <video
            className="play-preview__video"
            src={previewVideo}
            controls
            playsInline
            preload="metadata"
            poster={previewPoster}
            aria-label={`${title} demo`}
          />
        ) : (
          <div className="play-preview__placeholder">
            <p>{previewPlaceholder}</p>
          </div>
        )}
      </div>

      <div className="play-content__body">
        <div className="play-intro">
          {intro.map((paragraph) => (
            <p key={paragraph} className="play-text">
              {paragraph}
            </p>
          ))}
        </div>

        {tryThis?.length > 0 && (
          <section className="play-section">
            <h3 className="play-section__title">Try this</h3>
            <ul className="play-list">
              {tryThis.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {why && (
          <section className="play-section">
            <h3 className="play-section__title">{why.heading}</h3>
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
            <ExternalLinkArrow className="play-launch__arrow" size={13} />
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
      </div>
    </div>
  );
}
