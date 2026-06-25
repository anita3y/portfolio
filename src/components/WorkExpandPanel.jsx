import { useEffect, useRef, useState } from "react";
import { getCaseStudy } from "../data/caseStudies/index.js";
import { CaseStudyFullContent } from "./CaseStudyContent.jsx";

export default function WorkExpandPanel({ workId, onClose }) {
  const study = getCaseStudy(workId);
  const scrollRef = useRef(null);
  const [mode, setMode] = useState("preview");
  useEffect(() => {
    setMode("preview");
  }, [workId]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [mode, workId]);

  useEffect(() => {
    if (!study) return undefined;

    document.title = `${study.title} | anita yan`;

    const onKey = (event) => {
      if (event.key === "Escape") {
        if (mode === "full") setMode("preview");
        else onClose();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.title = "anita yan | Portfolio";
    };
  }, [study, mode, onClose]);

  if (!study) return null;

  const isFull = mode === "full";

  return (
    <div
      className={`work-expand${isFull ? " work-expand--full" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={study.title}
    >
      <button
        type="button"
        className="work-expand__backdrop"
        onClick={onClose}
        aria-label="Close case study"
      />
      <div className={`work-expand__sheet${isFull ? " work-expand__sheet--full" : ""}`}>
        <span className="work-expand__header-btn-host work-expand__header-btn-host--toggle">
          <button
            type="button"
            className="work-expand__toggle"
            data-cursor-morph=""
            onClick={() => setMode(isFull ? "preview" : "full")}
            aria-label={isFull ? "Collapse case study" : "Expand case study to full page"}
          >
            <span className="work-expand__toggle-icon" aria-hidden="true" />
          </button>
        </span>
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
        <div
          ref={scrollRef}
          className={`work-expand__scroll${isFull ? "" : " work-expand__scroll--compact"}`}
        >
          <CaseStudyFullContent study={study} scrollRoot={scrollRef} compact={!isFull} />
        </div>
      </div>
    </div>
  );
}
