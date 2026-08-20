import { useEffect, useRef } from "react";
import { getPlayStudy } from "../data/play/index.js";
import { CaseStudyFullContent } from "./CaseStudyContent.jsx";

function PlayVideoOnlyPanel({ study, onClose }) {
  const videoRef = useRef(null);
  const videoSrc =
    typeof study.heroVideo === "string" ? study.heroVideo : study.heroVideo?.src;

  useEffect(() => {
    document.title = `${study.title} | anita yan`;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) video.play().catch(() => {});

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.title = "anita yan | Portfolio";
    };
  }, [study.title, onClose]);

  return (
    <div
      className={[
        "work-expand",
        "play-video-expand",
        study.lightBackground && "play-video-expand--light"
      ]
        .filter(Boolean)
        .join(" ")}
      role="dialog"
      aria-modal="true"
      aria-label={study.title}
    >
      <button
        type="button"
        className="work-expand__backdrop"
        onClick={onClose}
        aria-label="Close video"
      />
      <div className="work-expand__sheet work-expand__sheet--video">
        <span className="work-expand__header-btn-host work-expand__header-btn-host--close">
          <button
            type="button"
            className="work-expand__close"
            data-cursor-morph=""
            onClick={onClose}
            aria-label="Close"
          >
            <span className="work-expand__close-icon" aria-hidden="true">
              ×
            </span>
          </button>
        </span>
        <div className="play-video-expand__body">
          <video
            ref={videoRef}
            className="play-video-expand__player"
            src={videoSrc}
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label={study.title}
          />
        </div>
      </div>
    </div>
  );
}

export default function PlayExpandPanel({ playId, onClose }) {
  const study = getPlayStudy(playId);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [playId]);

  useEffect(() => {
    if (!study || study.videoOnly) return undefined;

    document.title = `${study.title} | anita yan`;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.title = "anita yan | Portfolio";
    };
  }, [study, onClose]);

  if (!study) return null;

  if (study.videoOnly) {
    return <PlayVideoOnlyPanel study={study} onClose={onClose} />;
  }

  return (
    <div
      className="work-expand work-expand--full"
      role="dialog"
      aria-modal="true"
      aria-label={study.title}
    >
      <button
        type="button"
        className="work-expand__backdrop"
        onClick={onClose}
        aria-label="Close project"
      />
      <div className="work-expand__sheet work-expand__sheet--full">
        <div
          ref={scrollRef}
          className="work-expand__scroll"
        >
          <CaseStudyFullContent
            study={study}
            scrollRoot={scrollRef}
            compact={false}
            onBack={onClose}
          />
        </div>
      </div>
    </div>
  );
}
