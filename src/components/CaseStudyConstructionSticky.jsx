import { useEffect, useRef, useState } from "react";
import { CASE_STUDY_REQUEST_EMAIL } from "../data/caseStudies/access.js";

const EMAIL = CASE_STUDY_REQUEST_EMAIL;
const COPIED_MS = 1600;

/**
 * Yellow under-construction sticky for opened Work case study workspaces.
 * Email click copies the address — never opens mailto.
 */
export default function CaseStudyConstructionSticky() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard blocked — still show feedback; user can select from the label.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <aside className="cs-construction-sticky" aria-label="Case study status">
      <p className="cs-construction-sticky__text">
        This case study is under construction. Please find me at{" "}
        <button
          type="button"
          className={`cs-construction-sticky__email${copied ? " is-copied" : ""}`}
          onClick={copyEmail}
          aria-label={copied ? "Email copied" : `Copy ${EMAIL}`}
          title={copied ? "Copied!" : "Click to copy"}
        >
          {EMAIL}
        </button>{" "}
        to get the full story.
      </p>
      <span className="cs-construction-sticky__flash" aria-live="polite">
        {copied ? "Copied!" : ""}
      </span>
    </aside>
  );
}
