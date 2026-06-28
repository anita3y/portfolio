import { useEffect } from "react";
import { getPlayEntry } from "../data/play/index.js";
import PlayProjectContent from "./PlayProjectContent.jsx";

export default function PlayExpandPanel({ playId, onClose }) {
  const entry = getPlayEntry(playId);

  useEffect(() => {
    if (!entry) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [entry, onClose]);

  if (!entry) return null;

  const title = entry.data.title;

  return (
    <div className="play-expand" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="play-expand__backdrop"
        onClick={onClose}
        aria-label="Close project"
      />
      <div className="play-expand__sheet">
        <div className="play-expand__chrome">
          <span className="play-expand__label">play</span>
          <button
            type="button"
            className="play-expand__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="play-expand__scroll">
          <PlayProjectContent project={entry.data} />
        </div>
      </div>
    </div>
  );
}
