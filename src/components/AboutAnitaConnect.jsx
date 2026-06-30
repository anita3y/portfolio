import { useEffect, useState } from "react";
import { ABOUT_LINKEDIN } from "../data/about.js";
import ExternalLinkArrow from "./ExternalLinkArrow.jsx";

const TYPE_MS = 32;
const CONNECT_TEXT = "let's connect";

export default function AboutAnitaConnect() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    if (!isExpanded) {
      setTypedText("");
      setIsTyping(false);
      setShowLink(false);
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTypedText(CONNECT_TEXT);
      setShowLink(true);
      return undefined;
    }

    setTypedText("");
    setShowLink(false);
    setIsTyping(true);
    let index = 0;

    const intervalId = window.setInterval(() => {
      index += 1;
      setTypedText(CONNECT_TEXT.slice(0, index));

      if (index >= CONNECT_TEXT.length) {
        window.clearInterval(intervalId);
        setIsTyping(false);
        setShowLink(true);
      }
    }, TYPE_MS);

    return () => window.clearInterval(intervalId);
  }, [isExpanded]);

  return (
    <span className="about-hello__name-connect-wrap">
      <button
        type="button"
        className={["about-hello__name-connect", isExpanded && "is-expanded"].filter(Boolean).join(" ")}
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
        aria-label={
          isExpanded
            ? "Anita. let's connect expanded. Click to collapse."
            : "Anita. Click to expand connect link."
        }
      >
        <span className="about-hello__name-connect-morph-host">
          <span className="about-hello__name-connect-label" data-cursor-morph="">
            Anita
          </span>
          {isExpanded && <span className="about-hello__name-connect-comma">,</span>}
        </span>
      </button>
      {isExpanded && showLink ? (
        <a
          className="about-hello__name-connect-link"
          href={ABOUT_LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="let's connect on LinkedIn"
        >
          <span className="about-hello__name-connect-detail">
            {" "}
            {CONNECT_TEXT}
          </span>
          <ExternalLinkArrow
            className="about-hello__name-connect-arrow"
            size={null}
            variant="sharp"
          />
        </a>
      ) : (
        isExpanded && (
          <span className="about-hello__name-connect-detail">
            {" "}
            {typedText}
            {isTyping && <span className="about-hello__name-connect-caret" aria-hidden="true" />}
          </span>
        )
      )}
    </span>
  );
}
