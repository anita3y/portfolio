import { useEffect, useRef, useState } from "react";
import {
  CAROUSEL_ALBUMS,
  CAROUSEL_START_ID,
  getCarouselAlbum
} from "../data/play/carousel-albums.js";
import { getPlayArtifact } from "../data/playArtifacts.js";
import { PlayPicker } from "./PlayStage.jsx";
import PosterArtifactViewer from "./PosterArtifactViewer.jsx";

const ALBUM_THEME_KEY = "play-album-theme";
const SKETCH_THEME_KEY = "play-sketchbook-theme";

function readTheme(storageKey, queryKey) {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get(queryKey);
    if (fromQuery === "dark" || fromQuery === "light") return fromQuery;
    const stored = sessionStorage.getItem(storageKey);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* ignore */
  }
  return "light";
}

function withThemeParam(src, theme) {
  if (!src) return src;
  try {
    const url = new URL(src, window.location.href);
    url.searchParams.set("theme", theme);
    if (/^https?:\/\//i.test(src)) return url.toString();
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    const hashIdx = src.indexOf("#");
    const hash = hashIdx >= 0 ? src.slice(hashIdx) : "";
    const base = hashIdx >= 0 ? src.slice(0, hashIdx) : src;
    const cleaned = base.replace(/([?&])theme=[^&]*&?/, "$1").replace(/[?&]$/, "");
    const sep = cleaned.includes("?") ? "&" : "?";
    return `${cleaned}${sep}theme=${encodeURIComponent(theme)}${hash}`;
  }
}

export default function PlayArtifactOverlay({
  artifactId,
  onClose,
  initialCarouselId
}) {
  const artifact = getPlayArtifact(artifactId);
  const videoRef = useRef(null);
  const [carouselId, setCarouselId] = useState(() => {
    if (initialCarouselId && getCarouselAlbum(initialCarouselId)) {
      return initialCarouselId;
    }
    return CAROUSEL_START_ID;
  });
  const [albumTheme, setAlbumTheme] = useState(() =>
    readTheme(ALBUM_THEME_KEY, "albumTheme")
  );
  const [sketchTheme, setSketchTheme] = useState(() =>
    readTheme(SKETCH_THEME_KEY, "sketchTheme")
  );

  useEffect(() => {
    if (!artifact) return undefined;

    document.title = `${artifact.title} | Anita Yan`;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.title = "Anita Yan";
    };
  }, [artifact, onClose]);

  useEffect(() => {
    if (initialCarouselId && getCarouselAlbum(initialCarouselId)) {
      setCarouselId(initialCarouselId);
    }
  }, [initialCarouselId]);

  useEffect(() => {
    if (artifact?.kind !== "carousel") return;
    try {
      sessionStorage.setItem(ALBUM_THEME_KEY, albumTheme);
    } catch {
      /* ignore */
    }
  }, [albumTheme, artifact?.kind]);

  useEffect(() => {
    if (artifact?.kind !== "iframe") return;
    try {
      sessionStorage.setItem(SKETCH_THEME_KEY, sketchTheme);
    } catch {
      /* ignore */
    }
  }, [sketchTheme, artifact?.kind]);

  useEffect(() => {
    if (artifact?.kind !== "video" || !artifact.video) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    // Autoplay policies require muted; controls let her unmute.
    video.muted = true;
    video.defaultMuted = true;
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [artifact?.kind, artifact?.video]);

  if (!artifact) return null;

  const showChromeLabel = !artifact.hideChromeLabel && Boolean(artifact.title);
  const isCarousel = artifact.kind === "carousel";
  const isSketchbook = artifact.kind === "iframe";
  const isAlbumDark = isCarousel && albumTheme === "dark";
  const isSketchDark = isSketchbook && sketchTheme === "dark";
  const isDark = isAlbumDark || isSketchDark;
  const themeLabel = isCarousel ? "album carousel" : "sketchbook";
  const activeTheme = isCarousel ? albumTheme : sketchTheme;
  const toggleTheme = () => {
    if (isCarousel) {
      setAlbumTheme((prev) => (prev === "dark" ? "light" : "dark"));
      return;
    }
    if (isSketchbook) {
      setSketchTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }
  };

  const iframeSrc =
    artifact.kind === "iframe" && artifact.iframeSrc
      ? withThemeParam(artifact.iframeSrc, sketchTheme)
      : null;

  return (
    <div
      className="play-artifact-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={artifact.title}
    >
      <button
        type="button"
        className="play-artifact-overlay__backdrop"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        className={[
          "play-artifact-overlay__sheet",
          `play-artifact-overlay__sheet--${artifact.kind}`,
          isDark && "is-dark"
        ]
          .filter(Boolean)
          .join(" ")}
        data-album-theme={isCarousel ? albumTheme : undefined}
        data-sketch-theme={isSketchbook ? sketchTheme : undefined}
      >
        <div
          className={[
            "play-artifact-overlay__chrome",
            !showChromeLabel && "play-artifact-overlay__chrome--label-hidden"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {isCarousel || isSketchbook ? (
            <span className="play-artifact-overlay__theme-host">
              <button
                type="button"
                className="play-artifact-overlay__theme"
                onClick={toggleTheme}
                aria-pressed={isDark}
                aria-label={
                  isDark
                    ? `Switch ${themeLabel} to light mode`
                    : `Switch ${themeLabel} to dark mode`
                }
                data-cursor-morph=""
              >
                {activeTheme === "dark" ? "Light" : "Dark"}
              </button>
            </span>
          ) : null}
          {showChromeLabel ? (
            <span className="play-artifact-overlay__label">{artifact.title}</span>
          ) : (
            <span className="play-artifact-overlay__label-spacer" aria-hidden="true" />
          )}
          <span className="play-artifact-overlay__close-host">
            <button
              type="button"
              className="play-artifact-overlay__close"
              onClick={onClose}
              aria-label="Close"
              data-cursor-morph=""
            >
              <span aria-hidden="true">×</span>
            </button>
          </span>
        </div>
        <div className="play-artifact-overlay__body">
          {artifact.kind === "carousel" ? (
            <PlayPicker
              projects={CAROUSEL_ALBUMS}
              selectedId={carouselId}
              onSelect={setCarouselId}
              ariaLabel="Album covers"
            />
          ) : null}
          {artifact.kind === "posters" ? <PosterArtifactViewer /> : null}
          {artifact.kind === "video" && artifact.video ? (
            <div className="play-artifact-overlay__video-pad">
              <video
                key={artifact.video}
                ref={videoRef}
                className="play-artifact-overlay__video"
                src={artifact.video}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={artifact.title}
              />
            </div>
          ) : null}
          {artifact.kind === "iframe" && iframeSrc ? (
            <div className="play-artifact-overlay__iframe-pad">
              <iframe
                key={iframeSrc}
                className="play-artifact-overlay__iframe"
                src={iframeSrc}
                title={artifact.title}
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
          {artifact.kind === "placeholder" ? (
            <div className="play-artifact-overlay__placeholder" aria-hidden="true">
              <div className="play-artifact-overlay__placeholder-page" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
