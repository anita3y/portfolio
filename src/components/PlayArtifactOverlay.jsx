import { useEffect, useState } from "react";
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

export default function PlayArtifactOverlay({
  artifactId,
  onClose,
  initialCarouselId
}) {
  const artifact = getPlayArtifact(artifactId);
  const [carouselId, setCarouselId] = useState(() => {
    if (initialCarouselId && getCarouselAlbum(initialCarouselId)) {
      return initialCarouselId;
    }
    return CAROUSEL_START_ID;
  });

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

  if (!artifact) return null;

  const stickerProject =
    PLAY_PROJECTS.find((p) => p.id === "sticker-collection") ?? {
      id: "sticker-collection",
      title: "Sticker sheet",
      headline: "Sticker sheet"
    };

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
        className={`play-artifact-overlay__sheet play-artifact-overlay__sheet--${artifact.kind}`}
      >
        <div className="play-artifact-overlay__chrome">
          <span className="play-artifact-overlay__label">{artifact.title}</span>
          <button
            type="button"
            className="play-artifact-overlay__close"
            onClick={onClose}
            aria-label="Close"
            data-cursor-hover=""
          >
            <span aria-hidden="true">×</span>
          </button>
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
        </div>
      </div>
    </div>
  );
}
