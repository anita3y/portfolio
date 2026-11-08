import { useRef, useState } from "react";
import { ABOUT_COLLAGE, ABOUT_LETTER, ABOUT_QUOTE } from "../data/about.js";
import AboutTags from "./AboutTags.jsx";
import { assetUrl } from "../utils/assetUrl.js";

const ID_CARD = assetUrl("/about/id-card.png");

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

function AboutCollage() {
  return (
    <section className="about-collage" aria-label="Photos and a favorite quote">
      <div className="about-collage__board">
        {ABOUT_COLLAGE.map((photo) => (
          <figure
            key={photo.id}
            className={`about-collage__photo about-collage__photo--${photo.id}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" draggable={false} />
          </figure>
        ))}
        <aside className="about-collage__sticky" aria-label={`Quote by ${ABOUT_QUOTE.attribution}`}>
          <p className="about-collage__sticky-text">{ABOUT_QUOTE.text}</p>
          <p className="about-collage__sticky-who">— {ABOUT_QUOTE.attribution}</p>
        </aside>
      </div>
    </section>
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
      </section>

      <AboutCollage />
    </div>
  );
}
