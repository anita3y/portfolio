import { useEffect, useState } from "react";
import CaseStudySectionNav from "./CaseStudySectionNav.jsx";
import ExternalLinkArrow from "./ExternalLinkArrow.jsx";

const DEFAULT_HERO_SLIDE_MS = 500;

function normalizeMediaItem(item) {
  if (typeof item === "string") return { src: item, alt: "" };
  return item;
}

function CaseStudyHeroMedia({
  heroVideo,
  heroSlides,
  heroSlideInterval,
  heroPlaceholder,
  heroAspectRatio,
  heroFlat,
  heroBorderless,
  heroBackground,
  heroCompact,
  heroFit,
  heroObjectPosition
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = heroSlides?.length ? heroSlides.map(normalizeMediaItem) : null;
  const intervalMs = heroSlideInterval ?? DEFAULT_HERO_SLIDE_MS;
  const videoSrc = heroVideo
    ? typeof heroVideo === "string"
      ? heroVideo
      : heroVideo.src
    : null;

  useEffect(() => {
    if (!slides?.length) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [slides, intervalMs]);

  if (videoSrc) {
    return (
      <div
        className={[
          "cs-placeholder",
          "cs-placeholder--hero",
          "cs-hero-video",
          heroFlat && "cs-hero-slides--flat",
          heroBorderless && "cs-hero-video--borderless"
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          ...(heroAspectRatio ? { aspectRatio: heroAspectRatio } : {}),
          ...(heroBackground ? { background: heroBackground } : {})
        }}
      >
        <video
          className={[
            "cs-hero-video__player",
            heroBackground && "cs-hero-video__player--contain"
          ]
            .filter(Boolean)
            .join(" ")}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          aria-label={typeof heroVideo === "object" ? heroVideo.alt : "Case study banner"}
        />
      </div>
    );
  }

  if (slides) {
    return (
      <div
        className={[
          "cs-placeholder",
          "cs-placeholder--hero",
          "cs-hero-slides",
          heroFlat && "cs-hero-slides--flat",
          heroCompact && "cs-hero-slides--compact",
          heroFit === "cover" && "cs-hero-slides--cover"
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          ...(heroAspectRatio ? { aspectRatio: heroAspectRatio } : {}),
          ...(heroBackground ? { background: heroBackground } : {}),
          ...(heroObjectPosition ? { "--hero-object-position": heroObjectPosition } : {})
        }}
        aria-hidden="true"
      >
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            className={[
              "cs-hero-slide",
              index === slideIndex && "is-active",
              heroFlat && heroFit === "cover" && "cs-hero-slide--cover"
            ]
              .filter(Boolean)
              .join(" ")}
            src={slide.src}
            alt={slide.alt ?? ""}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>
    );
  }

  return <div className="cs-placeholder cs-placeholder--hero">{heroPlaceholder}</div>;
}

function CaseStudyFigure({ image, className }) {
  return (
    <figure className={["cs-figure", className].filter(Boolean).join(" ")}>
      <img src={image.src} alt={image.alt ?? ""} loading="lazy" decoding="async" />
      {image.caption && <figcaption className="cs-figure__caption">{image.caption}</figcaption>}
    </figure>
  );
}

function CaseStudyVideo({ video, className, variant = "phone", aspectRatio, frameBackground }) {
  const item = normalizeMediaItem(video);

  return (
    <figure className={["cs-video", variant === "desktop" && "cs-video--desktop", className].filter(Boolean).join(" ")}>
      <div
        className="cs-video__frame"
        style={{
          ...(aspectRatio ? { aspectRatio } : {}),
          ...(frameBackground ? { background: frameBackground } : {})
        }}
      >
        <video
          className="cs-video__player"
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={item.alt || item.caption || "Product demo"}
        />
      </div>
      {item.caption && <figcaption className="cs-video__caption">{item.caption}</figcaption>}
    </figure>
  );
}

function CaseStudyMedia({ media }) {
  if (!media) return null;

  if (media.images?.length) {
    const images = media.images.map(normalizeMediaItem);
    const gridClass = images.length > 1 ? "cs-media-grid" : "cs-media-single";

    return (
      <div className={["cs-media", gridClass].join(" ")}>
        {images.map((image) => (
          <CaseStudyFigure key={image.src} image={image} />
        ))}
      </div>
    );
  }

  if (media.src) {
    return (
      <div className="cs-media cs-media-single">
        <CaseStudyFigure image={normalizeMediaItem(media)} />
      </div>
    );
  }

  if (media.placeholder) {
    return <div className="cs-placeholder cs-placeholder--wide">{media.placeholder}</div>;
  }

  if (media.videos?.length) {
    return (
      <div className="cs-videos">
        {media.videos.map((video) => (
          <CaseStudyVideo key={video.src} video={video} />
        ))}
      </div>
    );
  }

  return null;
}

function CaseStudySection({ section, children }) {
  return (
    <section id={section.id} className="cs-section">
      <div className="cs-section__aside">
        <h2 className="cs-section__title">{section.title}</h2>
        {section.summary && <p className="cs-section__summary">{section.summary}</p>}
      </div>
      <div className="cs-section__main">{children}</div>
    </section>
  );
}

function CaseStudyActions({ actions }) {
  if (!actions?.liveUrl) return null;

  return (
    <div className={`play-actions cs-actions__links${actions.centered ? " cs-actions__links--centered" : ""}`}>
      <a
        className={[
          "play-launch",
          "cs-actions__launch",
          actions.launchTheme && `play-launch--${actions.launchTheme}`
        ]
          .filter(Boolean)
          .join(" ")}
        href={actions.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {actions.launchLabel ?? "Launch project"}
        <ExternalLinkArrow className="play-launch__arrow" size={13} />
      </a>
    </div>
  );
}

function TextBlock({ block }) {
  return (
    <div className="cs-block">
      {block.heading && <h3 className="cs-block__heading">{block.heading}</h3>}
      {block.paragraphs?.map((p) => (
        <p key={p} className="cs-block__text">
          {p}
        </p>
      ))}
      {block.bullets && (
        <ul className="cs-block__list">
          {block.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {block.layout === "flows" && block.items && (
        <div
          className={[
            "cs-flows",
            block.variant === "visual" && "cs-flows--visual"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {block.items.map((item, index) => {
            const flow = typeof item === "string" ? { label: item } : item;
            const key = flow.label ?? flow.step ?? index;

            return (
              <div
                key={key}
                className={[
                  "cs-flow",
                  block.variant === "visual" && "cs-flow--visual"
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {block.variant === "visual" && flow.image ? (
                  <div
                    className="cs-flow__thumb"
                    style={
                      flow.image.background || block.flowBackground
                        ? { background: flow.image.background ?? block.flowBackground }
                        : undefined
                    }
                  >
                    <img
                      src={flow.image.src}
                      alt={flow.image.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <span className="cs-flow__icon" aria-hidden="true" />
                )}
                <div className="cs-flow__card">
                  {flow.step && <span className="cs-flow__step">{flow.step}</span>}
                  <p>{flow.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {block.layout === "cards" && block.items && (
        <div className="cs-cards">
          {block.items.map((item) => (
            <div key={item} className="cs-card">
              <div className="cs-card__lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
      {block.layout === "wireframes" && block.images?.length > 0 && (
        <div
          className={[
            "cs-wireframes",
            block.images.length === 3 && "cs-wireframes--trio",
            block.variant === "components" && "cs-wireframes--components"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {block.images.map((image) => (
            <CaseStudyFigure
              key={image.src}
              image={normalizeMediaItem(image)}
              className={[
                image.narrow && "cs-figure--narrow",
                image.fullRow && "cs-figure--full-row"
              ]
                .filter(Boolean)
                .join(" ") || undefined}
            />
          ))}
        </div>
      )}
      {block.layout === "wireframes" && !block.images?.length && (
        <div className="cs-wireframes">
          <div className="cs-placeholder cs-placeholder--tall">{block.placeholder}</div>
          <div className="cs-placeholder cs-placeholder--tall">{block.placeholder}</div>
        </div>
      )}
      {block.image && (
        <div
          className={[
            "cs-media",
            "cs-media-single",
            block.image.wide && "cs-media--wide",
            block.image.narrow && "cs-media--narrow",
            block.image.page && "cs-media--page"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <CaseStudyFigure image={normalizeMediaItem(block.image)} />
        </div>
      )}
      {block.layout === "videos" && block.videos?.length > 0 && (
        <div
          className={[
            "cs-videos",
            "cs-videos--stack",
            block.videoVariant === "desktop" && "cs-videos--desktop",
            block.videoVariant === "phone" && "cs-videos--phone"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {block.videos.map((video) => (
            <CaseStudyVideo
              key={video.src}
              video={video}
              variant={block.videoVariant}
              aspectRatio={block.videoAspectRatio}
              frameBackground={block.videoBackground}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CaseStudyPreview({ study, compact = false }) {
  const {
    title,
    meta,
    heroPlaceholder,
    heroVideo,
    heroSlides,
    heroSlideInterval,
    heroAspectRatio,
    heroFlat,
    heroBorderless,
    heroBackground,
    heroCompact,
    heroFit,
    heroObjectPosition
  } = study;

  return (
    <header className={`cs-header cs-header--preview${compact ? " cs-header--compact" : ""}`}>
      <h1 className="cs-title">{title}</h1>
      {meta && (
        <ul className="cs-meta-pills" aria-label="Project details">
          {meta.timeline && <li className="cs-meta-pill">{meta.timeline}</li>}
          {meta.role && <li className="cs-meta-pill">{meta.role}</li>}
          {meta.tools?.map((tool) => (
            <li key={tool} className="cs-meta-pill">
              {tool}
            </li>
          ))}
        </ul>
      )}
      <CaseStudyHeroMedia
        heroVideo={heroVideo}
        heroSlides={heroSlides}
        heroSlideInterval={heroSlideInterval}
        heroPlaceholder={heroPlaceholder}
        heroAspectRatio={heroAspectRatio}
        heroFlat={heroFlat}
        heroBorderless={heroBorderless}
        heroBackground={heroBackground}
        heroCompact={heroCompact}
        heroFit={heroFit}
        heroObjectPosition={heroObjectPosition}
      />
    </header>
  );
}

function useCaseStudyActiveSection(sections, scrollRoot) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: scrollRoot?.current ?? null,
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0, 0.2, 0.45, 0.7]
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, scrollRoot]);

  return activeId;
}

function WorkExpandNavStuckSync({ scrollRoot }) {
  useEffect(() => {
    const root = scrollRoot?.current;
    if (!root) return undefined;

    const sync = () => {
      const nav = root.querySelector(".cs-section-nav-wrap");
      if (!nav) {
        root.removeAttribute("data-nav-stuck");
        return;
      }

      const rootTop = root.getBoundingClientRect().top;
      const navTop = nav.getBoundingClientRect().top;
      const stuck = navTop <= rootTop + 1;
      root.toggleAttribute("data-nav-stuck", stuck);
      root.closest(".work-expand__sheet")?.toggleAttribute("data-nav-stuck", stuck);
    };

    sync();
    root.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(sync);
      ro.observe(root);
    }

    return () => {
      root.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      ro?.disconnect();
      root.removeAttribute("data-nav-stuck");
      root.closest(".work-expand__sheet")?.removeAttribute("data-nav-stuck");
    };
  }, [scrollRoot]);

  return null;
}

export function CaseStudySectionNavBar({
  study,
  scrollRoot,
  fixedHeader = false
}) {
  const { sections } = study;
  const activeId = useCaseStudyActiveSection(sections, scrollRoot);

  return (
    <CaseStudySectionNav
      sections={sections}
      activeId={activeId}
      scrollRoot={scrollRoot}
      fixedHeader={fixedHeader}
    />
  );
}

export function CaseStudyBody({ study, scrollRoot, compact = false, hideNav = false }) {
  const { sections, actions } = study;

  return (
    <div className={`cs-body${compact ? " cs-body--compact" : ""}`}>
      {scrollRoot && <WorkExpandNavStuckSync scrollRoot={scrollRoot} />}
      {!hideNav && <CaseStudySectionNavBar study={study} scrollRoot={scrollRoot} />}
      <div className="cs-content">
        {sections.map((section) => (
          <CaseStudySection key={section.id} section={section}>
            {section.blocks?.map((block, index) => (
              <TextBlock key={block.heading ?? `${block.layout ?? "block"}-${index}`} block={block} />
            ))}
            {section.media && <CaseStudyMedia media={section.media} />}
          </CaseStudySection>
        ))}
        {actions && (
          <section
            className={[
              "cs-section",
              "cs-section--actions",
              actions.centered && "cs-section--actions-centered"
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label="Project links"
          >
            {!actions.centered && <div className="cs-section__aside" />}
            <div className="cs-section__main">
              <CaseStudyActions actions={actions} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function CaseStudyFullContent({ study, scrollRoot, compact = false, hideNav = false }) {
  return (
    <div className={`cs-embed${compact ? " cs-embed--compact" : ""}`}>
      <CaseStudyPreview study={study} compact={compact} />
      <CaseStudyBody
        study={study}
        scrollRoot={scrollRoot}
        compact={compact}
        hideNav={hideNav}
      />
    </div>
  );
}
