import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../utils/assetUrl.js";
import { CASE_STUDY_REQUEST_EMAIL } from "../data/caseStudies/access.js";

const FOOTER_EMAIL = CASE_STUDY_REQUEST_EMAIL;
const COPIED_MS = 1800;

const FOOTER_LINKS = [
  {
    id: "x",
    label: "X",
    href: "https://x.com/nitayxxn",
    external: true
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anitayandesign/",
    external: true
  },
  {
    id: "gmail",
    label: "gmail",
    copyEmail: true
  },
  {
    id: "resume",
    label: "Resume",
    href: "https://drive.google.com/file/d/13nPyWPW9mGbElq2e7on_iw-K27GMD3-K/view?usp=sharing",
    external: true
  }
];

export default function SiteFooter() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyGmail = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(FOOTER_EMAIL);
    } catch {
      // Clipboard blocked — still show the callout.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__row">
        <p className="site-footer__name">Anita Yan</p>
        <div className="site-footer__connect">
          <img
            className="site-footer__scribble"
            src={assetUrl("/footer/lets-connect.png")}
            alt=""
            draggable={false}
          />
          <nav className="tabs tabs--select site-footer__links" aria-label="Contact links">
            {FOOTER_LINKS.map((link) =>
              link.copyEmail ? (
                <a
                  key={link.id}
                  className={`tab site-footer__gmail${copied ? " is-copied" : ""}`}
                  href={`mailto:${FOOTER_EMAIL}`}
                  aria-label={copied ? "Email copied" : `Copy ${FOOTER_EMAIL}`}
                  data-cursor-morph=""
                  onClick={copyGmail}
                >
                  {link.label}
                  <span className="site-footer__copied" aria-live="polite">
                    {copied ? "email copied!" : ""}
                  </span>
                </a>
              ) : (
                <a
                  key={link.id}
                  className="tab"
                  href={link.href}
                  aria-label={link.label}
                  data-cursor-morph=""
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
