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
  const [videoFailed, setVideoFailed] = useState(false);
  const slides = thumbnailSlides?.length ? thumbnailSlides : null;
  const intervalMs = thumbnailSlideInterval ?? DEFAULT_SLIDE_MS;
  const showVideo = Boolean(thumbnailVideo) && !videoFailed;

  useEffect(() => {
    setVideoFailed(false);
  }, [thumbnailVideo]);

  useEffect(() => {
    if (!slides?.length || showVideo) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [slides, intervalMs, showVideo]);

  if (showVideo) {
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
        onError={() => {
          if (slides?.length || thumbnail) {
            setVideoFailed(true);
            return;
          }
          setThumbMissing(true);
        }}
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

  if (!thumbnail) return null;

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

function ProjectCardCaption({ headline, company, status, year, title }) {
  const displayHeadline = headline || title;
  const metaParts = [company, [status, year].filter(Boolean).join(" ")].filter(Boolean);

  if (!displayHeadline && metaParts.length === 0) return null;

  return (
    <div className="project-card__caption">
      {displayHeadline && <p className="project-card__headline">{displayHeadline}</p>}
      {metaParts.length > 0 && (
        <p className="project-card__meta-line">
          {metaParts.map((part, index) => (
            <span key={`${part}-${index}`}>
              {index > 0 && (
                <span className="project-card__meta-sep" aria-hidden="true">
                  {" "}
                  •{" "}
                </span>
              )}
              <span>{part}</span>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

function ProjectCard({ project, onExpand }) {
  const {
    title,
    headline,
    company,
    status,
    year,
    subtitle,
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
        data-cursor-case-study={displayOnly ? undefined : ""}
      >
        <ProjectCardMedia
          thumbnail={thumbnail}
          thumbnailVideo={thumbnailVideo}
          thumbnailSlides={thumbnailSlides}
          thumbnailSlideInterval={thumbnailSlideInterval}
          thumbMissing={thumbMissing}
          setThumbMissing={setThumbMissing}
        />
      </div>

      <ProjectCardCaption
        headline={headline}
        company={company}
        status={status}
        year={year}
        title={title}
      />
    </div>
  );

  const labelParts = [
    headline || title,
    company,
    [status, year].filter(Boolean).join(" "),
    subtitle
  ].filter(Boolean);
  const label = labelParts.join(" — ");

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
