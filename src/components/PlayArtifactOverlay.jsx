import { useEffect, useRef, useState } from "react";
import { PLAY_PROJECTS } from "../data/projects.js";
import {
  CAROUSEL_ALBUMS,
  CAROUSEL_START_ID,
  getCarouselAlbum
} from "../data/play/carousel-albums.js";
import { getPlayArtifact } from "../data/playArtifacts.js";
import { PlayPicker } from "./PlayStage.jsx";
import PosterArtifactViewer from "./PosterArtifactViewer.jsx";
import StickerPlayground from "./StickerPlayground.jsx";

const ALBUM_THEME_KEY = "play-album-theme";

function readAlbumTheme() {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("albumTheme");
    if (fromQuery === "dark" || fromQuery === "light") return fromQuery;
    const stored = sessionStorage.getItem(ALBUM_THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* ignore */
  }
  return "light";
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
  const [albumTheme, setAlbumTheme] = useState(readAlbumTheme);

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

  const stickerProject =
    PLAY_PROJECTS.find((p) => p.id === "sticker-collection") ?? {
      id: "sticker-collection",
      title: "Sticker sheet",
      headline: "Sticker sheet"
    };

  const showChromeLabel = !artifact.hideChromeLabel && Boolean(artifact.title);
  const isCarousel = artifact.kind === "carousel";
  const isAlbumDark = isCarousel && albumTheme === "dark";

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
          isAlbumDark && "is-dark"
        ]
          .filter(Boolean)
          .join(" ")}
        data-album-theme={isCarousel ? albumTheme : undefined}
      >
        <div
          className={[
            "play-artifact-overlay__chrome",
            !showChromeLabel && "play-artifact-overlay__chrome--label-hidden"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {isCarousel ? (
            <span className="play-artifact-overlay__theme-host">
              <button
                type="button"
                className="play-artifact-overlay__theme"
                onClick={() =>
                  setAlbumTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
                aria-pressed={isAlbumDark}
                aria-label={
                  isAlbumDark ? "Switch album carousel to light mode" : "Switch album carousel to dark mode"
                }
                data-cursor-morph=""
              >
                {isAlbumDark ? "Light" : "Dark"}
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
          {artifact.kind === "stickers" ? (
            <div className="play-artifact-overlay__stickers-pad">
              <StickerPlayground project={stickerProject} demoOnly />
            </div>
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
          {artifact.kind === "iframe" && artifact.iframeSrc ? (
            <div className="play-artifact-overlay__iframe-pad">
              <iframe
                className="play-artifact-overlay__iframe"
                src={artifact.iframeSrc}
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
