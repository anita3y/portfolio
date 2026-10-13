import { useEffect, useState } from "react";
import { PLAY_PROJECTS } from "../data/projects.js";
import { getPlayArtifact } from "../data/playArtifacts.js";
import { PlayPicker } from "./PlayStage.jsx";
import StickerPlayground from "./StickerPlayground.jsx";

export default function PlayArtifactOverlay({
  artifactId,
  onClose,
  initialCarouselId
}) {
  const artifact = getPlayArtifact(artifactId);
  const [carouselId, setCarouselId] = useState(
    () =>
      initialCarouselId ??
      PLAY_PROJECTS.find((p) => !p.displayOnly)?.id ??
      PLAY_PROJECTS[0]?.id
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
    if (initialCarouselId) setCarouselId(initialCarouselId);
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
              projects={PLAY_PROJECTS}
              selectedId={carouselId}
              onSelect={setCarouselId}
            />
          ) : null}
          {artifact.kind === "stickers" ? (
            <StickerPlayground project={stickerProject} demoOnly />
          ) : null}
        </div>
      </div>
    </div>
  );
}
