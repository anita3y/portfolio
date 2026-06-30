import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DEFAULT_SLIDE_MS = 500;

function ProjectCardMedia({
  thumbnail,
  thumbnailVideo,
  thumbnailSlides,
  thumbnailSlideInterval,
  thumbMissing,
  setThumbMissing
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = thumbnailSlides?.length ? thumbnailSlides : null;
  const intervalMs = thumbnailSlideInterval ?? DEFAULT_SLIDE_MS;

  useEffect(() => {
    if (!slides?.length) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [slides, intervalMs]);

  if (thumbnailVideo) {
    return (
      <video
        className="project-card__video"
        src={thumbnailVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        onError={() => setThumbMissing(true)}
      />
    );
  }

  if (slides) {
    return (
      <div className="project-card__slides" aria-hidden="true">
        {slides.map((src, index) => (
          <img
            key={src}
            className={["project-card__slide", index === slideIndex && "is-active"]
              .filter(Boolean)
              .join(" ")}
            src={src}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            onError={() => {
              if (index === 0) setThumbMissing(true);
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <img
      className="project-card__img"
      src={thumbnail}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setThumbMissing(true)}
    />
  );
}

function ProjectCard({ project, onExpand }) {
  const {
    title,
    year,
    subtitle,
    tags,
    href,
    thumbnail,
    thumbnailVideo,
    thumbnailSlides,
    thumbnailSlideInterval,
    theme,
    displayOnly
  } = project;
  const [thumbMissing, setThumbMissing] = useState(false);
  const isExternal = href.startsWith("http");
  const isInternal = href.startsWith("/");
  const isLink = href !== "#" && !onExpand;

  const body = (
    <div className="project-card__frame">
      <div
        className={[
          "project-card__media",
          `project-card__media--${theme}`,
          thumbMissing && "project-card__media--no-thumb"
        ]
          .filter(Boolean)
          .join(" ")}
        data-cursor-morph={displayOnly ? undefined : ""}
      >
        <ProjectCardMedia
          thumbnail={thumbnail}
          thumbnailVideo={thumbnailVideo}
          thumbnailSlides={thumbnailSlides}
          thumbnailSlideInterval={thumbnailSlideInterval}
          thumbMissing={thumbMissing}
          setThumbMissing={setThumbMissing}
        />

        <div className="project-card__glass-tab" data-cursor-morph={displayOnly ? undefined : ""}>
          <span className="project-card__name">{title}</span>
          {year && <span className="project-card__year">{year}</span>}
        </div>

        {(subtitle || tags?.length > 0) && (
          <div className="project-card__meta">
            <div className="project-card__meta-inner">
              {tags?.length > 0 && (
                <ul className="project-card__tags" aria-label="Topics">
                  {tags.map((tag) => (
                    <li key={tag} className="project-card__tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              {subtitle && <p className="project-card__subtitle">{subtitle}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const label = year ? `${title}, ${year} — ${subtitle}` : `${title} — ${subtitle}`;

  if (onExpand) {
    return (
      <button
        type="button"
        className="project-card project-card--expandable"
        onClick={onExpand}
        aria-label={label}
        aria-haspopup="dialog"
      >
        {body}
      </button>
    );
  }

  if (!isLink) {
    return (
      <article
        className={["project-card", displayOnly && "project-card--display-only"]
          .filter(Boolean)
          .join(" ")}
        aria-label={label}
      >
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
