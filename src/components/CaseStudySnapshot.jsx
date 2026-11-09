import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../utils/assetUrl.js";

const ENVELOPE_CLOSED = assetUrl("/hero/stickers/envelope-closed.png") + "?v=2";
const ENVELOPE_OPEN = assetUrl("/hero/stickers/envelope-open.png") + "?v=3";

/* End-of-study card (after calebwu.ca): "this is a snapshot", with a button
   that copies the email address. */
export default function CaseStudySnapshot({ email }) {
  const [copied, setCopied] = useState(false);
  const emailRef = useRef(null);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard blocked: select the address so it can be copied by hand.
      const range = document.createRange();
      range.selectNodeContents(emailRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <aside className="cs-snapshot" aria-label="Get the full story">
      <span className="cs-snapshot__icon" aria-hidden="true">
        <img className="cs-snapshot__env cs-snapshot__env--closed" src={ENVELOPE_CLOSED} alt="" draggable={false} />
        <img className="cs-snapshot__env cs-snapshot__env--open" src={ENVELOPE_OPEN} alt="" draggable={false} />
      </span>
      <div className="cs-snapshot__copy">
        <p className="cs-snapshot__lead">This is just a snapshot of the entire design process.</p>
        <p className="cs-snapshot__sub">
          Reach out to <span ref={emailRef} className="cs-snapshot__email">{email}</span> for the full story.
        </p>
      </div>
      <button
        type="button"
        className={`cs-snapshot__btn${copied ? " is-copied" : ""}`}
        onClick={copy}
        data-cursor-morph=""
      >
        {/* White chrome sits under the cursor morph; label stays above. */}
        <span className="cs-snapshot__btn-pill" aria-hidden="true" />
        <span className="cs-snapshot__btn-label">
          <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            {copied ? (
              <path d="M3 8.5 L6.5 12 L13 4.5" />
            ) : (
              <>
                <rect x="5" y="5" width="8.5" height="8.5" rx="2" />
                <path d="M10.5 3.2 V3 a1.5 1.5 0 0 0 -1.5 -1.5 H4 A2 2 0 0 0 2 3.5 V9 a1.5 1.5 0 0 0 1.5 1.5" />
              </>
            )}
          </svg>
        </span>
      </button>
    </aside>
  );
}
