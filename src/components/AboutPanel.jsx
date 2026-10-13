import { useRef, useState } from "react";
import { ABOUT_LETTER, ABOUT_QUOTE } from "../data/about.js";
import AboutTags from "./AboutTags.jsx";
import { assetUrl } from "../utils/assetUrl.js";

const ID_CARD = assetUrl("/about/id-card.png");
const SIGNATURE = assetUrl("/about/signature-anita.png");

const CONNECT_LINKS = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/anitayandesign/" },
  { id: "x", label: "X/Twitter", href: "https://x.com/nitayxxn" },
  { id: "email", label: "Email", href: "mailto:anita3yan@gmail.com" }
];

const MAX_TILT = 7;

function AboutIdCard() {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [active, setActive] = useState(false);

  const resetTilt = () => {
    setActive(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const onPointerMove = (event) => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setActive(true);
    setTilt({
      rx: Math.max(-MAX_TILT, Math.min(MAX_TILT, -py * MAX_TILT * 2)),
      ry: Math.max(-MAX_TILT, Math.min(MAX_TILT, px * MAX_TILT * 2))
    });
  };

  return (
    <div className="about-id-card-wrap">
      <div
        ref={wrapRef}
        className={`about-id-card${active ? " is-tilting" : ""}`}
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
        }}
        data-cursor-hover=""
      >
        <img
          className="about-id-card__img"
          src={ID_CARD}
          alt="Anita Yan ID card — New York University, Interactive Media Arts, Psychology"
          width={1976}
          height={1327}
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function AboutPanel() {
  return (
    <div className="about-page">
      <AboutIdCard />

      <div className="about-page__tags">
        <AboutTags />
      </div>

      <section className="about-letter" aria-label="About me">
        {ABOUT_LETTER.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="about-letter__p">
            {paragraph}
          </p>
        ))}
        <p className="about-letter__signoff">{ABOUT_LETTER.signoff}</p>
        <img
          className="about-letter__signature"
          src={SIGNATURE}
          alt="Anita"
          width={164}
          height={88}
          draggable={false}
        />

        <div className="about-letter__connect">
          <ul className="about-tags about-letter__links" aria-label="Contact">
            {CONNECT_LINKS.map((link) => (
              <li key={link.id} className="about-tags__item">
                <a
                  className="about-tags__tag about-tags__tag--link"
                  href={link.href}
                  {...(link.href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  data-cursor-hover=""
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="about-page__bio">
        <blockquote className="about-page__quote">
          <p className="about-page__quote-text">“{ABOUT_QUOTE.text}”</p>
          <footer className="about-page__quote-attr">
            — {ABOUT_QUOTE.attribution}
            {ABOUT_QUOTE.source ? (
              <>
                {" ("}
                <a
                  className="about-page__quote-source"
                  href={ABOUT_QUOTE.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ABOUT_QUOTE.source.label}
                </a>
                {")"}
              </>
            ) : null}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
