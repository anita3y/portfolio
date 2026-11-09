import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SITE_TABS, pathForTab } from "../data/tabs.js";
import { assetUrl } from "../utils/assetUrl.js";
import CaseStudySectionNav from "./CaseStudySectionNav.jsx";
import CaseStudySeeMore from "./CaseStudySeeMore.jsx";
import CaseStudyUserFlowMap from "./CaseStudyUserFlowMap.jsx";
import DfaWireframes from "./DfaWireframes.jsx";
import { PlayPicker } from "./PlayStage.jsx";
import ResearchPathsGraph from "./ResearchPathsGraph.jsx";
import CaseStudyHeroSlider from "./CaseStudyHeroSlider.jsx";
import InsightPanels from "./InsightPanels.jsx";
import CaseStudySnapshot from "./CaseStudySnapshot.jsx";
import CaseStudyConstructionSticky from "./CaseStudyConstructionSticky.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { PLAY_PROJECTS, WORK_PROJECTS } from "../data/projects.js";
import {
  getCaseStudyPassword,
  getCaseStudyRequestEmail,
  isCaseStudyUnlocked,
  unlockCaseStudy
} from "../data/caseStudies/access.js";

const DEFAULT_HERO_SLIDE_MS = 500;
const ALL_PROJECTS = [...WORK_PROJECTS, ...PLAY_PROJECTS];
const CASE_STUDY_TABS = SITE_TABS;
function normalizeMediaItem(item) {
  if (typeof item === "string") return { src: item, alt: "" };
  return item;
}

function CaseStudyTopTabs({ activeTab = "work", onSelectTab }) {
  const activeIndex = Math.max(
    0,
    CASE_STUDY_TABS.findIndex((tab) => tab.id === activeTab)
  );

  return (
    <div className="cs-top-tabs">
      <nav
        className="tabs tabs--select"
        style={{ "--tab-i": activeIndex }}
        data-active={activeTab}
        aria-label="Site sections"
        role="tablist"
      >
        <span className="tabs__thumb" aria-hidden="true" />
        {CASE_STUDY_TABS.map((tab) => {
          const className = `tab${activeTab === tab.id ? " active" : ""}`;
          if (onSelectTab) {
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                className={className}
                aria-selected={activeTab === tab.id}
                onClick={() => onSelectTab(tab.id)}
                data-cuelume-toggle="toggle"
                data-cursor-morph=""
              >
                {tab.label}
              </button>
            );
          }

          return (
            <Link
              key={tab.id}
              className={className}
              role="tab"
              aria-selected={activeTab === tab.id}
              to={pathForTab(tab.id)}
              data-cursor-morph=""
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function CaseStudyBento({ bento, aspectRatio, className, loading = "lazy" }) {
  const poster = normalizeMediaItem(bento?.poster);
  const desktop = normalizeMediaItem(bento?.desktop);
  const iphone = normalizeMediaItem(bento?.iphone);
  if (!poster?.src || !desktop?.src || !iphone?.src) return null;

  return (
    <div
      className={["cs-bento", className].filter(Boolean).join(" ")}
      style={aspectRatio ? { aspectRatio } : undefined}
      role="img"
      aria-label={[poster.alt, desktop.alt, iphone.alt].filter(Boolean).join(". ")}
    >
      <figure className="cs-bento__tile cs-bento__tile--poster">
        <img src={poster.src} alt={poster.alt ?? ""} loading={loading} decoding="async" />
      </figure>
      <figure className="cs-bento__tile cs-bento__tile--desktop">
        <img src={desktop.src} alt={desktop.alt ?? ""} loading={loading} decoding="async" />
      </figure>
      <figure className="cs-bento__tile cs-bento__tile--iphone">
        <img src={iphone.src} alt={iphone.alt ?? ""} loading={loading} decoding="async" />
      </figure>
    </div>
  );
}

function CaseStudyHeroBento({ heroBento, heroAspectRatio }) {
  return (
    <CaseStudyBento
      bento={heroBento}
      aspectRatio={heroAspectRatio}
      className="cs-placeholder cs-placeholder--hero cs-bento cs-hero-bento"
      loading="eager"
    />
  );
}

function CaseStudyHeroMedia({
  heroEmbed,
  heroEmbedTitle,
  heroVideo,
  heroBento,
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
  const [videoFailed, setVideoFailed] = useState(false);
  const slides = heroSlides?.length ? heroSlides.map(normalizeMediaItem) : null;
  const intervalMs = heroSlideInterval ?? DEFAULT_HERO_SLIDE_MS;
  const videoSrc = heroVideo
    ? typeof heroVideo === "string"
      ? heroVideo
      : heroVideo.src
    : null;
  const showVideo = Boolean(videoSrc) && !videoFailed && !heroEmbed && !heroBento;

  useEffect(() => {
    setVideoFailed(false);
  }, [videoSrc]);

  useEffect(() => {
    if (!slides?.length || showVideo || heroBento) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [slides, intervalMs, showVideo, heroBento]);

  if (heroBento) {
    return <CaseStudyHeroBento heroBento={heroBento} heroAspectRatio={heroAspectRatio} />;
  }

  if (heroEmbed) {
    return (
      <div
        className={[
          "cs-placeholder",
          "cs-placeholder--hero",
          "cs-hero-embed",
          heroBorderless && "cs-hero-embed--borderless"
        ]
          .filter(Boolean)
          .join(" ")}
        style={heroBackground ? { background: heroBackground } : undefined}
      >
        <iframe
          className="cs-hero-embed__frame"
          src={heroEmbed}
          title={heroEmbedTitle || "Live project"}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  if (showVideo) {
    const video = (
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
        onError={() => setVideoFailed(true)}
      />
    );

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
        {heroBorderless ? <div className="cs-hero-video__round">{video}</div> : video}
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
            loading={index === 0 || slides.length <= 8 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={[
        "cs-placeholder",
        "cs-placeholder--hero",
        heroBorderless && "cs-hero-video--borderless"
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...(heroAspectRatio ? { aspectRatio: heroAspectRatio } : {}),
        ...(heroBackground ? { background: heroBackground } : {})
      }}
    >
      {heroPlaceholder}
    </div>
  );
}

/* Template v2 hero: the Play album coverflow, reused as a product banner. */
function CaseStudyHeroCarousel({ items, title }) {
  const start = items[Math.floor(items.length / 2)]?.id ?? items[0]?.id;
  const [selectedId, setSelectedId] = useState(start);

  return (
    <div className="cs-hero-carousel">
      <PlayPicker
        projects={items}
        selectedId={selectedId}
        onSelect={setSelectedId}
        ariaLabel={`${title} screens`}
        spread={1.85}
      />
    </div>
  );
}

function CaseStudyMediaSlot({ item, className }) {
  return (
    <figure className={["cs-slot", item.wide && "cs-slot--wide", className].filter(Boolean).join(" ")}>
      <div className="cs-slot__frame" style={item.aspectRatio ? { aspectRatio: item.aspectRatio } : undefined}>
        {item.src ? (
          <img src={item.src} alt={item.alt ?? ""} loading="lazy" decoding="async" />
        ) : item.video ? (
          <video src={item.video} autoPlay loop muted playsInline preload="metadata" />
        ) : item.label ? (
          <span className="cs-slot__label">{item.label}</span>
        ) : null}
      </div>
      {item.caption ? <figcaption className="cs-slot__caption">{item.caption}</figcaption> : null}
    </figure>
  );
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
      <div className="cs-section__main">
        <h2 className="cs-section__title">{section.title}</h2>
        {section.summary && <p className="cs-section__summary">{section.summary}</p>}
        {children}
      </div>
    </section>
  );
}

function CaseStudySubsection({ subsection }) {
  return (
    <div id={subsection.id} className="cs-subsection">
      <h3 className="cs-subsection__title">{subsection.title}</h3>
      {subsection.summary && <p className="cs-subsection__summary">{subsection.summary}</p>}
      {subsection.blocks?.map((block, index) => (
        <TextBlock key={block.heading ?? `${block.layout ?? "block"}-${index}`} block={block} />
      ))}
    </div>
  );
}

function CaseStudyActions({ actions }) {
  if (!actions?.liveUrl) return null;

  return (
    <div className={`play-actions cs-actions__links${actions.centered ? " cs-actions__links--centered" : ""}`}>
      <a
        className="play-launch cs-actions__launch"
        href={actions.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="play-launch__pill">
          {actions.launchLabel ?? "Launch project"}
        </span>
      </a>
    </div>
  );
}

function TextBlock({ block }) {
  return (
    <div className={["cs-block", block.eyebrow && "cs-block--beat"].filter(Boolean).join(" ")}>
      {block.eyebrow && <p className="cs-block__eyebrow">{block.eyebrow}</p>}
      {block.heading && <h3 className="cs-block__heading">{block.heading}</h3>}
      {block.text && <p className="cs-block__text">{block.text}</p>}
      {block.caption && <p className="cs-block__caption">{block.caption}</p>}
      {block.layout === "findings" && block.items?.length > 0 && (
        <div className={["cs-findings", block.variant === "plain" && "cs-findings--plain"].filter(Boolean).join(" ")}>
          {block.items.map((item) => (
            <div key={item.tag ?? item.title} className="cs-finding">
              {item.tag ? <span className="cs-finding__tag">{item.tag}</span> : null}
              <p className="cs-finding__title">{item.title}</p>
              {item.text ? <p className="cs-finding__text">{item.text}</p> : null}
            </div>
          ))}
        </div>
      )}
      {block.layout === "learnings" && block.items?.length > 0 && (
        <ul className="cs-learnings">
          {block.items.map((item) => (
            <li key={item.lead} className="cs-learnings__item">
              <span className="cs-learnings__lead">{item.lead}</span>
              {item.text ? <> {item.text}</> : null}
            </li>
          ))}
        </ul>
      )}
      {block.layout === "researchGraph" && <ResearchPathsGraph bleed={Boolean(block.bleed)} />}
      {block.layout === "insightPanels" && block.items?.length > 0 && <InsightPanels items={block.items} />}
      {block.layout === "mediaSlot" && <CaseStudyMediaSlot item={{ ...block, caption: undefined }} />}
      {block.layout === "showcase" && block.items?.length > 0 && (
        <div className="cs-showcase">
          {block.items.map((item, index) => (
            <CaseStudyMediaSlot key={`${item.label}-${index}`} item={item} />
          ))}
        </div>
      )}
      {block.layout === "hmwFlow" && block.rows?.length > 0 && (
        <div className="cs-hmw" role="table" aria-label="Hypotheses to findings to how might we">
          <div className="cs-hmw__row cs-hmw__row--head" role="row">
            <span role="columnheader">hypothesis</span>
            <span role="columnheader">finding</span>
            <span role="columnheader">how might we</span>
          </div>
          {block.rows.map((row) => (
            <div key={row.hypothesis} className="cs-hmw__row" role="row">
              <p className="cs-hmw__cell cs-hmw__cell--h" role="cell">{row.hypothesis}</p>
              <p className="cs-hmw__cell" role="cell">{row.finding}</p>
              <p className="cs-hmw__cell cs-hmw__cell--hmw" role="cell">{row.hmw}</p>
            </div>
          ))}
        </div>
      )}
      {block.layout === "quotes" && block.variant === "stickies" && block.items?.length > 0 && (
        <div className="cs-stickies">
          {block.items.map((item, i) => (
            <figure
              key={item.quote}
              className={`cs-sticky cs-sticky--${(item.who || "").toLowerCase()}`}
              style={{ "--tilt": `${[-1.6, 1.2, -0.6, 1.8, -1.1, 0.7][i % 6]}deg`, "--nudge": `${[6, -4, 10, -2, 4, -8][i % 6]}px` }}
            >
              <blockquote className="cs-sticky__text">“{item.quote}”</blockquote>
              <figcaption className="cs-sticky__who">
                {item.who}
                {item.role ? `, ${item.role}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      {block.layout === "quotes" && block.variant !== "stickies" && block.items?.length > 0 && (
        <div className="cs-quotes">
          {block.items.map((item) => (
            <blockquote key={item.quote} className="cs-quote">
              <p className="cs-quote__text">“{item.quote}”</p>
              <footer className="cs-quote__who">
                {item.who}
                {item.role ? <span className="cs-quote__role"> · {item.role}</span> : null}
              </footer>
            </blockquote>
          ))}
        </div>
      )}
      {block.paragraphs?.map((p) => (
        <p key={p} className="cs-block__text">
          {p}
        </p>
      ))}
      {block.callout && (
        <aside className="cs-callout" aria-label={block.callout.label || "Callout"}>
          {block.callout.emoji ? (
            <span className="cs-callout__emoji" aria-hidden="true">
              {block.callout.emoji}
            </span>
          ) : null}
          <div className="cs-callout__body">
            {block.callout.label ? (
              <span className="cs-callout__label">{block.callout.label}</span>
            ) : null}
            <p className="cs-callout__text">{block.callout.text}</p>
          </div>
        </aside>
      )}
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
      {block.layout === "userFlowMap" && <CaseStudyUserFlowMap />}
      {block.layout === "dfaWireframes" && <DfaWireframes />}
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
      {block.layout === "bento" && (
        <CaseStudyBento
          bento={block}
          aspectRatio={block.aspectRatio ?? "688 / 508"}
          className="cs-bento--body"
        />
      )}
      {block.layout === "polaroids" && block.images?.length > 0 && (
        <div className="cs-polaroids">
          {block.images.map((image) => {
            const item = normalizeMediaItem(image);
            return (
              <figure key={item.src} className="cs-polaroids__item">
                <img src={item.src} alt={item.alt ?? ""} loading="lazy" decoding="async" />
                {item.caption ? (
                  <figcaption className="cs-polaroids__caption">{item.caption}</figcaption>
                ) : null}
              </figure>
            );
          })}
        </div>
      )}
      {block.note && <p className="cs-block__note">{block.note}</p>}
    </div>
  );
}

function CaseStudyAccessGate({ study, onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const requestEmail = getCaseStudyRequestEmail(study);
  const mailto = `mailto:${requestEmail}?subject=${encodeURIComponent(`Access request: ${study.title}`)}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const expected = getCaseStudyPassword(study);
    if (password.trim() === expected) {
      unlockCaseStudy(study.id);
      setError("");
      onUnlock();
      return;
    }
    setError("Incorrect password. Try again, or request access below.");
  };

  return (
    <section className="cs-section cs-section--gate" aria-label="Full case study access">
      <div className="cs-section__main">
        <h2 className="cs-section__title">full case study</h2>
        <p className="cs-section__summary">
          Full case study available with password. Request access at{" "}
          <a className="cs-gate__email" href={mailto}>
            {requestEmail}
          </a>
          .
        </p>
        <form className="cs-gate" onSubmit={handleSubmit}>
          <label className="cs-gate__label" htmlFor={`cs-password-${study.id}`}>
            Password
          </label>
          <div className="cs-gate__row">
            <input
              id={`cs-password-${study.id}`}
              className="cs-gate__input"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (error) setError("");
              }}
              placeholder="Enter password"
            />
            <button className="cs-gate__submit" type="submit">
              Unlock
            </button>
          </div>
          {error ? (
            <p className="cs-gate__error" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function useCaseStudyUnlock(study) {
  const gated = Boolean(study?.gated);
  const [unlocked, setUnlocked] = useState(() => {
    if (!gated) return true;
    return isCaseStudyUnlocked(study.id);
  });

  useEffect(() => {
    if (!gated) {
      setUnlocked(true);
      return;
    }
    setUnlocked(isCaseStudyUnlocked(study.id));
  }, [gated, study.id]);

  return {
    gated,
    unlocked: !gated || unlocked,
    unlock: () => setUnlocked(true)
  };
}

function getCaseStudySectionBuckets(study) {
  const teaser = Array.isArray(study.teaserSections) ? study.teaserSections : [];
  const afterGate = Array.isArray(study.afterGateSections) ? study.afterGateSections : [];
  const full = Array.isArray(study.sections) ? study.sections : [];
  return { teaser, afterGate, full };
}

function getCaseStudyVisibleSections(study, unlocked) {
  const { teaser, afterGate, full } = getCaseStudySectionBuckets(study);
  if (!study.gated) {
    if (teaser.length > 0 || afterGate.length > 0) {
      return [...teaser, ...afterGate, ...full];
    }
    return full;
  }
  if (!unlocked) return [...teaser, ...afterGate];
  return [...teaser, ...afterGate, ...full];
}

function renderCaseStudySections(sections) {
  return sections.map((section) => {
    const showBlocksBefore = !section.subsectionsFirst;
    const showBlocksAfter = Boolean(section.subsectionsFirst);

    return (
      <CaseStudySection key={section.id} section={section}>
        {showBlocksBefore &&
          section.blocks?.map((block, index) => (
            <TextBlock
              key={block.heading ?? `${block.layout ?? "block"}-${index}`}
              block={block}
            />
          ))}
        {section.subsections?.map((subsection) => (
          <CaseStudySubsection key={subsection.id} subsection={subsection} />
        ))}
        {showBlocksAfter &&
          section.blocks?.map((block, index) => (
            <TextBlock
              key={block.heading ?? `${block.layout ?? "block"}-${index}`}
              block={block}
            />
          ))}
        {section.media && <CaseStudyMedia media={section.media} />}
      </CaseStudySection>
    );
  });
}

const BACK_ARROW = assetUrl("/case-studies/back-arrow.png");

export function CaseStudyPreview({ study, compact = false, hideTabs = false, onSelectTab, onBack }) {
  const {
    id,
    title,
    subtitle,
    details,
    heroPlaceholder,
    heroEmbed,
    heroVideo,
    heroBento,
    heroSlides,
    heroSlideInterval,
    heroAspectRatio,
    heroFlat,
    heroBorderless,
    heroBackground,
    heroCompact,
    heroFit,
    heroObjectPosition,
    heroCarousel,
    detailsVariant,
    template
  } = study;
  const projectCard = ALL_PROJECTS.find((project) => project.id === id) ?? null;
  const detailItems = Array.isArray(details) ? details.filter((item) => item?.label && item?.value) : [];
  const hasSubtitle = Boolean(subtitle);
  const displayTitle = hasSubtitle ? title : projectCard?.headline || title;
  const metaParts = [
    projectCard?.company,
    projectCard?.status,
    projectCard?.year
  ].filter(Boolean);
  const activeTopTab = projectCard && PLAY_PROJECTS.some((project) => project.id === projectCard.id) ? "play" : "work";
  const isPlay = activeTopTab === "play";

  return (
    <header
      className={[
        "cs-header",
        "cs-header--preview",
        compact && "cs-header--compact",
        isPlay && "cs-header--play",
        template && `cs-header--${template}`
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!hideTabs && <CaseStudyTopTabs activeTab={activeTopTab} onSelectTab={onSelectTab} />}
      {!isPlay && !template && metaParts.length > 0 && (
        <p className="cs-project-meta">
          {metaParts.map((part, index) => (
            <span key={`${part}-${index}`}>
              {index > 0 && (
                <span className="cs-project-meta__sep" aria-hidden="true">
                  {" "}
                  •{" "}
                </span>
              )}
              <span>{part}</span>
            </span>
          ))}
        </p>
      )}
      {!template && <h1 className="cs-title">{displayTitle}</h1>}
      {!template && hasSubtitle ? <p className="cs-subtitle">{subtitle}</p> : null}
      {heroCarousel?.length ? (
        <CaseStudyHeroSlider items={heroCarousel} title={title} />
      ) : template ? null : (
      <CaseStudyHeroMedia
        heroEmbed={heroEmbed}
        heroEmbedTitle={title}
        heroVideo={heroVideo}
        heroBento={heroBento}
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
      )}
      {/* Template v2: the preview leads, title sits under it. */}
      {template && (
        <div className="cs-intro">
          {onBack ? (
            <button type="button" className="cs-section-nav__back cs-intro__back" onClick={onBack} aria-label="Back to work" data-cursor-morph="">
              <img src={BACK_ARROW} alt="" />
            </button>
          ) : null}
          <h1 className="cs-title cs-title--under">{displayTitle}</h1>
          {hasSubtitle ? <p className="cs-subtitle">{subtitle}</p> : null}
          {study.intro?.map((line) => (
            <p key={line} className="cs-intro__text">
              {/* *word* -> italic */}
              {line.split(/(\*[^*]+\*)/g).map((part, i) =>
                part.startsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part
              )}
            </p>
          ))}
        </div>
      )}
      {detailItems.length > 0 && (
        <div
          className={["cs-details", detailsVariant === "compact" && "cs-details--compact"].filter(Boolean).join(" ")}
          aria-label="Project details"
        >
          {detailItems.map((item) => (
            <div
              key={item.label}
              className={`cs-details__item cs-details__item--${item.label.toLowerCase().replaceAll(/\s+/g, "-")}`}
            >
              <p className="cs-details__label">{item.label}</p>
              <p className="cs-details__value">{item.value}</p>
            </div>
          ))}
        </div>
      )}
      {/* Grey product showcase after hero/meta, before Findings; yellow WIP sticky centered inside. */}
      {template && study.heroShowcase ? (
        <div className="cs-intro__showcase">
          <figure className="cs-slot">
            <div
              className="cs-slot__frame"
              style={
                study.heroShowcase.aspectRatio
                  ? { aspectRatio: study.heroShowcase.aspectRatio }
                  : undefined
              }
            >
              {study.constructionSticky ? <CaseStudyConstructionSticky /> : null}
            </div>
          </figure>
        </div>
      ) : null}
    </header>
  );
}

function flattenSectionIds(sections) {
  return sections.flatMap((section) => [
    section.id,
    ...(section.subsections?.map((sub) => sub.id) ?? [])
  ]);
}

function useCaseStudyActiveSection(sections, scrollRoot) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const ids = flattenSectionIds(sections);
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
  sections,
  scrollRoot,
  fixedHeader = false,
  onBack
}) {
  const navSections = sections ?? study.sections ?? [];
  const activeId = useCaseStudyActiveSection(navSections, scrollRoot);

  return (
    <CaseStudySectionNav
      sections={navSections}
      activeId={activeId}
      scrollRoot={scrollRoot}
      fixedHeader={fixedHeader}
      onBack={onBack}
    />
  );
}

export function CaseStudyBody({
  study,
  scrollRoot,
  compact = false,
  hideNav = false,
  onBack,
  onSelectRelated
}) {
  const { actions } = study;
  const { gated, unlocked, unlock } = useCaseStudyUnlock(study);
  const { teaser, afterGate, full } = getCaseStudySectionBuckets(study);
  const visibleSections = getCaseStudyVisibleSections(study, unlocked);
  const isPlay = PLAY_PROJECTS.some((project) => project.id === study.id);
  const showGateSplit = gated && (teaser.length > 0 || afterGate.length > 0);

  return (
    <div
      className={[
        "cs-body",
        compact && "cs-body--compact",
        hideNav && "cs-body--no-nav"
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {scrollRoot && <WorkExpandNavStuckSync scrollRoot={scrollRoot} />}
      {!hideNav && (
        <CaseStudySectionNavBar
          study={study}
          sections={visibleSections}
          scrollRoot={scrollRoot}
          onBack={onBack}
        />
      )}
      <div className="cs-content">
        {showGateSplit ? (
          <>
            {renderCaseStudySections(teaser)}
            {gated && !unlocked ? <CaseStudyAccessGate study={study} onUnlock={unlock} /> : null}
            {renderCaseStudySections(afterGate)}
            {unlocked ? renderCaseStudySections(full) : null}
          </>
        ) : (
          <>
            {renderCaseStudySections(visibleSections)}
            {gated && !unlocked ? <CaseStudyAccessGate study={study} onUnlock={unlock} /> : null}
          </>
        )}
        {study.snapshot && unlocked ? (
          <CaseStudySnapshot email={getCaseStudyRequestEmail(study)} />
        ) : null}
        {actions && unlocked && (
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
        {!isPlay && unlocked && (
          <CaseStudySeeMore
            studyId={study.id}
            onSelect={onSelectRelated}
          />
        )}
      </div>
    </div>
  );
}

/* Template v2: content focuses in (blur -> sharp) as it enters the view. */
function useBlurReveal(rootRef, scrollRoot, enabled, key) {
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return undefined;
    const targets = root.querySelectorAll(
      ".cs-section__title, .cs-section__summary, .cs-subsection__title, .cs-block, .cs-hero-carousel, .cs-details"
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    targets.forEach((el) => el.classList.add("cs-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { root: scrollRoot?.current ?? null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      targets.forEach((el) => el.classList.remove("cs-reveal", "is-in"));
    };
  }, [rootRef, scrollRoot, enabled, key]);
}

export function CaseStudyFullContent({
  study,
  scrollRoot,
  compact = false,
  hideNav = false,
  hideTabs = false,
  showFooter = false,
  onBack,
  onSelectTab,
  onSelectRelated
}) {
  const embedRef = useRef(null);
  useBlurReveal(embedRef, scrollRoot, study.template === "v2", study.id);
  const topTab = PLAY_PROJECTS.some((project) => project.id === study.id) ? "play" : "work";

  return (
    <div
      ref={embedRef}
      className={["cs-embed", compact && "cs-embed--compact", study.template && `cs-embed--${study.template}`]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Tabs live at the embed level so they can stay stuck while the study scrolls. */}
      {!hideTabs && (
        <div className="cs-sticky-tabs">
          <CaseStudyTopTabs activeTab={topTab} onSelectTab={onSelectTab} />
        </div>
      )}
      <CaseStudyPreview
        study={study}
        compact={compact}
        hideTabs
        onSelectTab={onSelectTab}
        onBack={onBack}
      />
      <CaseStudyBody
        study={study}
        scrollRoot={scrollRoot}
        compact={compact}
        hideNav={hideNav}
        onBack={onBack}
        onSelectRelated={onSelectRelated}
      />
      {showFooter ? <SiteFooter /> : null}
    </div>
  );
}
