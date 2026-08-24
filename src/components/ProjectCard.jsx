import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DEFAULT_SLIDE_MS = 500;

function ProjectCardMedia({
  thumbnail,
  thumbnailVideo,
  thumbnailSlides,
  thumbnailSlideInterval,
  thumbnailSlideOnHover,
  thumbnailStack,
  thumbMissing,
  setThumbMissing,
  isHovered,
  comingSoon
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const slides = thumbnailSlides?.length ? thumbnailSlides : null;
  const intervalMs = thumbnailSlideInterval ?? DEFAULT_SLIDE_MS;
  const stack = thumbnailStack?.length ? thumbnailStack : null;
  const showVideo = Boolean(thumbnailVideo) && !videoFailed && !stack;
  const playSlides = Boolean(slides?.length) && !showVideo && (!thumbnailSlideOnHover || isHovered);

  useEffect(() => {
    setVideoFailed(false);
  }, [thumbnailVideo]);

  useEffect(() => {
    if (!playSlides) {
      if (thumbnailSlideOnHover) setSlideIndex(0);
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const advance = () => {
      setSlideIndex((current) => (current + 1) % slides.length);
    };

    // Hover-only loops (posters) should flip on hover, not after a full interval.
    const firstDelay = thumbnailSlideOnHover ? 50 : intervalMs;
    let intervalId;
    const startId = window.setTimeout(() => {
      advance();
      intervalId = window.setInterval(advance, intervalMs);
    }, firstDelay);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [playSlides, slides, intervalMs, thumbnailSlideOnHover]);

  if (comingSoon) {
    return <p className="project-card__coming-soon">{comingSoon}</p>;
  }

  if (stack) {
    return (
      <div className="project-card__stack" aria-hidden="true">
        {stack.map((layer) => (
          <div
            key={layer.id}
            className={`project-card__stack-layer project-card__stack-layer--${layer.id}`}
          >
            <img
              src={layer.src}
              alt=""
              draggable={false}
              onError={() => setThumbMissing(true)}
            />
          </div>
        ))}
      </div>
    );
  }

  if (showVideo) {
    return (
      <div className="project-card__video-frame">
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
      </div>
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
            loading={index === 0 || slides.length <= 8 ? "eager" : "lazy"}
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

function ProjectCardTab({ company, year, title }) {
  const displayTitle = company && company !== "Personal" ? company : title;

  if (!displayTitle && !year) return null;

  return (
    <div className="project-card__tab">
      {displayTitle && <p className="project-card__headline">{displayTitle}</p>}
      {year && <p className="project-card__year">{year}</p>}
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
    thumbnailStack,
    theme,
    displayOnly,
    comingSoon,
    tabYear
  } = project;
  const [thumbMissing, setThumbMissing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isExternal = href.startsWith("http");
  const isInternal = href.startsWith("/");
  const isLink = href !== "#" && !onExpand;
  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  };

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
        <div className="project-card__visual">
          <ProjectCardMedia
            thumbnail={thumbnail}
            thumbnailVideo={thumbnailVideo}
            thumbnailSlides={thumbnailSlides}
            thumbnailSlideInterval={thumbnailSlideInterval}
            thumbnailSlideOnHover={project.thumbnailSlideOnHover}
            thumbnailStack={thumbnailStack}
            thumbMissing={thumbMissing}
            setThumbMissing={setThumbMissing}
            isHovered={isHovered}
            comingSoon={comingSoon}
          />
        </div>
        <ProjectCardTab
          company={company}
          year={tabYear ?? year}
          title={title}
        />
      </div>
      {(headline || status) && (
        <div className="project-card__hover-copy">
          {status && <p className="project-card__hover-status">{status}</p>}
          {status && headline && (
            <span className="project-card__hover-dot" aria-hidden="true">
              ·
            </span>
          )}
          {headline && <p className="project-card__hover-desc">{headline}</p>}
        </div>
      )}
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
        {...hoverProps}
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
        {...hoverProps}
      >
        {body}
      </article>
    );
  }

  if (isInternal) {
    return (
      <Link className="project-card" to={href} aria-label={label} {...hoverProps}>
        {body}
      </Link>
    );
  }

  return (
    <a
      className="project-card"
      href={href}
      aria-label={label}
      {...hoverProps}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  );
}

export default ProjectCard;
