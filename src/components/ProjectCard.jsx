import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  const { title, year, subtitle, tags, href, thumbnail, thumbnailVideo, theme } = project;
  const isExternal = href.startsWith("http");
  const isInternal = href.startsWith("/");
  const isLink = href !== "#";

  const body = (
    <div className="project-card__frame">
      <div className={`project-card__media project-card__media--${theme}`}>
        {thumbnailVideo ? (
          <video
            className="project-card__video"
            src={thumbnailVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <img
            className="project-card__img"
            src={thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        <div className="project-card__glass-tab">
          <span className="project-card__name">{title}</span>
          {year && <span className="project-card__year">{year}</span>}
        </div>
      </div>

      {(subtitle || tags?.length > 0) && (
        <div className="project-card__meta">
          <div className="project-card__meta-inner">
            {subtitle && <p className="project-card__subtitle">{subtitle}</p>}
            {tags?.length > 0 && (
              <ul className="project-card__tags" aria-label="Topics">
                {tags.map((tag) => (
                  <li key={tag} className="project-card__tag">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const label = year ? `${title}, ${year} — ${subtitle}` : `${title} — ${subtitle}`;

  if (!isLink) {
    return (
      <article className="project-card" aria-label={label}>
        {body}
      </article>
    );
  }

  if (isInternal) {
    return (
      <Link className="project-card" to={href} aria-label={label}>
        {body}
      </Link>
    );
  }

  return (
    <a
      className="project-card"
      href={href}
      aria-label={label}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  );
}

export default ProjectCard;
