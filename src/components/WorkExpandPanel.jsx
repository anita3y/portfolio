import { useEffect, useRef } from "react";
import { getCaseStudy } from "../data/caseStudies/index.js";
import { CaseStudyFullContent } from "./CaseStudyContent.jsx";

export default function WorkExpandPanel({ workId, onClose, onSelectTab, onNavigate }) {
  const study = getCaseStudy(workId);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [workId]);

  useEffect(() => {
    if (!study) return undefined;

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
        aria-label="Close case study"
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
            showFooter
            onBack={onClose}
            onSelectTab={onSelectTab}
            onSelectRelated={onNavigate}
          />
        </div>
      </div>
    </div>
  );
}
