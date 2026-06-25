import { useEffect, useState } from "react";
import { ABOUT_EDUCATION, ABOUT_LOCATION } from "../data/about.js";

const TYPE_MS = 32;

function LocationPinIcon() {
  return (
    <svg className="about-tags__pin" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path
        d="M6 1.1C4.23 1.1 2.8 2.53 2.8 4.3c0 2.45 3.2 5.75 3.2 5.75s3.2-3.3 3.2-5.75C9.2 2.53 7.77 1.1 6 1.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="4.25" r="1.05" fill="currentColor" />
    </svg>
  );
}

function ExpandableTag({ baseLabel, expandedSuffix, variant, collapseLabel }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [typedSuffix, setTypedSuffix] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const expandedLabel = `${baseLabel} ${expandedSuffix}`;

  useEffect(() => {
    if (!isExpanded) {
      setTypedSuffix("");
      setIsTyping(false);
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTypedSuffix(expandedSuffix);
      setIsTyping(false);
      return undefined;
    }

    setTypedSuffix("");
    setIsTyping(true);
    let index = 0;

    const intervalId = window.setInterval(() => {
      index += 1;
      setTypedSuffix(expandedSuffix.slice(0, index));

      if (index >= expandedSuffix.length) {
        window.clearInterval(intervalId);
        setIsTyping(false);
      }
    }, TYPE_MS);

    return () => window.clearInterval(intervalId);
  }, [isExpanded, expandedSuffix]);

  return (
    <button
      type="button"
      className={[
        "about-tags__tag",
        `about-tags__tag--${variant}`,
        isExpanded && "is-expanded"
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => setIsExpanded((expanded) => !expanded)}
      aria-expanded={isExpanded}
      aria-label={
        isExpanded
          ? `${expandedLabel}. Click to collapse.`
          : `${baseLabel}. Click to ${collapseLabel}.`
      }
      data-cursor-morph=""
    >
      <span className="about-tags__tag-text">
        {baseLabel}
        {isExpanded && (
          <span className="about-tags__tag-detail">
            {" "}
            {typedSuffix}
            {isTyping && <span className="about-tags__caret" aria-hidden="true" />}
          </span>
        )}
      </span>
    </button>
  );
}

export default function AboutTags() {
  return (
    <ul className="about-tags" aria-label="Location and education">
      <li className="about-tags__item">
        <span className="about-tags__tag about-tags__tag--location">
          <LocationPinIcon />
          {ABOUT_LOCATION}
        </span>
      </li>
      <li className="about-tags__item">
        <ExpandableTag
          baseLabel={ABOUT_EDUCATION.school}
          expandedSuffix={ABOUT_EDUCATION.classYear}
          variant="school"
          collapseLabel="expand class year"
        />
      </li>
      <li className="about-tags__item">
        <ExpandableTag
          baseLabel={ABOUT_EDUCATION.major}
          expandedSuffix={ABOUT_EDUCATION.minor}
          variant="major"
          collapseLabel="expand minor"
        />
      </li>
    </ul>
  );
}
