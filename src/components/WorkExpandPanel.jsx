import { useEffect, useRef } from "react";
import { getCaseStudy } from "../data/caseStudies/index.js";
import { WORK_PROJECTS } from "../data/projects.js";
import { hapticSnap, pulseHapticClass } from "../utils/haptics.js";
import { CaseStudyFullContent } from "./CaseStudyContent.jsx";

/** Expandable Work studies only — skip display-only cards like Vanity. */
const EXPANDABLE_WORK_IDS = WORK_PROJECTS.filter(
  (project) => !project.displayOnly && getCaseStudy(project.id)
).map((project) => project.id);

const WHEEL_THRESHOLD = 72;
const NAV_COOLDOWN_MS = 640;

export default function WorkExpandPanel({ workId, onClose, onSelectTab, onNavigate }) {
  const study = getCaseStudy(workId);
  const scrollRef = useRef(null);
  const sheetRef = useRef(null);
  const accumX = useRef(0);
  const cooldownUntil = useRef(0);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
    accumX.current = 0;
  }, [workId]);

  useEffect(() => {
    if (!study) return undefined;

    document.title = `${study.title} | Anita Yan`;

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
  }, [study, onClose]);

  // Horizontal walk between case studies (trackpad swipe / shift+wheel).
  // Vertical scroll inside the open study stays intact.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || !onNavigate || EXPANDABLE_WORK_IDS.length < 2) return undefined;

    const go = (dir) => {
      const index = EXPANDABLE_WORK_IDS.indexOf(workId);
      if (index < 0) return;
      const nextId = EXPANDABLE_WORK_IDS[index + dir];
      if (!nextId) return;

      cooldownUntil.current = performance.now() + NAV_COOLDOWN_MS;
      accumX.current = 0;
      const vibrated = hapticSnap();
      if (!vibrated) pulseHapticClass(sheetRef.current, "is-haptic-tick", 200);
      onNavigate(nextId);
    };

    const onWheel = (event) => {
      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      const shiftVertical = event.shiftKey && absY > 0 && absX < absY * 0.35;
      const horizontalIntent = absX > absY * 1.05 || shiftVertical;

      if (!horizontalIntent) {
        accumX.current = 0;
        return;
      }

      event.preventDefault();
      if (performance.now() < cooldownUntil.current) return;

      const delta = shiftVertical ? event.deltaY : event.deltaX;
      accumX.current += delta;

      if (Math.abs(accumX.current) < WHEEL_THRESHOLD) return;

      const dir = accumX.current > 0 ? 1 : -1;
      go(dir);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, [workId, onNavigate]);

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
      <div
        ref={sheetRef}
        className="work-expand__sheet work-expand__sheet--full"
      >
        <div ref={scrollRef} className="work-expand__scroll">
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
