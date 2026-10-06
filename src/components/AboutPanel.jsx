import { ABOUT_LETTER, ABOUT_POLAROIDS, ABOUT_QUOTE } from "../data/about.js";
import AboutTags from "./AboutTags.jsx";
import Scribble from "./Scribble.jsx";
import { assetUrl } from "../utils/assetUrl.js";

const TEXT_BUBBLE = assetUrl("/about/text-bubble-hello.png");
const LETTER_POLAROID = assetUrl("/about/polaroids/friends.png");
const LETTER_PAPER = assetUrl("/about/letter/letter.png");
const LETTER_BACK = assetUrl("/about/letter/back.png");
const LETTER_SCRIBBLE = assetUrl("/about/letter/scribble.png");
const LETTER_SCRIBBLE_LEFT = assetUrl("/about/letter/scribble-left.png");
export const LETTER_SCRIBBLE_RIGHT = assetUrl("/about/letter/scribble-right.png");
const LETTER_POST_IT = assetUrl("/about/letter/post-it.png");

const SCRIBBLE_BURST_STROKES = [
  "M43 1L43 20L40 26L34 32L26 36L12 40L4 41",
  "M77 5L74 20L73 36L75 47L82 52L90 56L100 59L112 60",
  "M2 64L22 65L34 69L42 74L47 81L51 88L55 97L58 110",
  "M127 85L118 80L92 80L84 84L79 89L76 96L75 108"
];

const SCRIBBLE_SPIRAL_STROKES = [
  "M52 52L52 60L50 64L34 64L29 56L29 44L32 38L36 32L42 28L52 28L60 32L66 36L72 44L77 52" +
    "L79 60L76 70L72 80L67 88L60 94L44 96L26 96L18 92L10 87L5 80L2 70L1 56L2 40L4 28" +
    "L8 20L14 15L20 10L30 5L46 1L60 4L74 8L84 14L92 24L98 34L104 46L107 56L107 68L104 76" +
    "L98 86L92 94L86 104L78 112L70 117L58 121L36 125L28 126"
];

const SCRIBBLE_SWIRL_STROKES = [
  "M0 36C8 42 18 48 28 54C38 60 50 65 60 67C64 67.5 66 67 68 66C74 67 82 66.5 88 64C93 62 96 58 97.5 52" +
    "C99 45 98 38 94 34C90 31 80 30 74 33C70 35 68 39 67 45C66 52 66.5 60 68 66C69.5 71 73 76 78 81" +
    "C83 85 90 88 98 88C106 88 111 85 116 80C121 74 125 67 129 60C133 52 136 44 139 37C141 31 143 25 146 20" +
    "C149 16 153 13.5 160 12C168 11 180 12 197 13",
  "M184 1L197 13L181 29"
];

export const SCRIBBLE_SPARKLE_STROKES = [
  "M22 158L26 148L30 136L34 128L37 121L42 112L46 105L52 101L70 100L86 97L70 95L62 92L58 88" +
    "L55 82L53 76L53 70L55 62L58 55L61 48L64 42L67 36L70 30L72 22L73 14L73 8L70 2L66 5L64 10" +
    "L62 16L60 24L58 30L55 36L52 42L49 48L45 53L40 57L30 60L18 62L2 65L10 68L16 72L21 77" +
    "L24 82L27 89L29 95L31 102L33 112L34 118",
  "M74 130L70 134L68 140L70 146L76 150L84 152L90 146L90 140L86 134L80 131L74 130"
];
const LETTER_STAMP = assetUrl("/about/letter/stamp.png");
const LETTER_LINKS = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/anitayandesign/" },
  { id: "x", label: "X/Twitter", href: "https://x.com/nitayxxn" },
  { id: "email", label: "Email", href: "mailto:anita3yan@gmail.com" }
];

export default function AboutPanel() {
  return (
    <div className="about-page">
      <div className="about-polaroids-wrap">
        <img
          className="about-polaroids__bubble"
          src={TEXT_BUBBLE}
          alt="hi! my name is anita!"
          width={489}
          height={139}
          draggable={false}
        />
        <ul className="about-polaroids" aria-label="Photos">
          {ABOUT_POLAROIDS.map((photo) => (
            <li key={photo.id} className={`about-polaroid about-polaroid--${photo.id}`}>
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="about-page__tags">
        <AboutTags />
      </div>

      <section className="about-letter" aria-label="About me">
        <div className="about-letter__stage">
          <img
            className="about-letter__back"
            src={LETTER_BACK}
            alt=""
            width={816}
            height={965}
            draggable={false}
            aria-hidden="true"
          />
          <img
            className="about-letter__polaroid"
            src={LETTER_POLAROID}
            alt="Anita and Cindy"
            width={543}
            height={673}
            draggable={false}
          />
          <img
            className="about-letter__paper about-letter__paper--letter"
            src={LETTER_PAPER}
            alt={`${ABOUT_LETTER.body} ${ABOUT_LETTER.signoff} Anita`}
            width={601}
            height={751}
            draggable={false}
          />
          <img
            className="about-letter__stamp"
            src={LETTER_STAMP}
            alt="Stamp photo: 18, Shenzhen, Toronto, New York"
            width={781}
            height={710}
            draggable={false}
          />
          <img
            className="about-letter__note"
            src={LETTER_POST_IT}
            alt={ABOUT_LETTER.note}
            width={739}
            height={868}
            draggable={false}
          />
          <svg
            className="scribble about-letter__scribble about-letter__scribble--swirl"
            viewBox="-2 -2 204 94"
            fill="none"
            stroke="#e8201a"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ "--scribble-n": SCRIBBLE_SWIRL_STROKES.length }}
            aria-hidden="true"
          >
            {SCRIBBLE_SWIRL_STROKES.map((d, index) => (
              <path
                key={d}
                className="scribble__trace"
                d={d}
                pathLength="1"
                style={{ "--scribble-i": index }}
              />
            ))}
          </svg>
          <ul className="about-tags about-letter__links" aria-label="Contact">
            {LETTER_LINKS.map((link) => (
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
          <Scribble
            className="about-letter__scribble about-letter__scribble--burst"
            src={LETTER_SCRIBBLE}
            width={129}
            height={113}
            maskStroke={12}
            strokes={SCRIBBLE_BURST_STROKES}
          />
          <Scribble
            className="about-letter__scribble about-letter__scribble--spiral"
            src={LETTER_SCRIBBLE_LEFT}
            width={110}
            height={128}
            strokes={SCRIBBLE_SPIRAL_STROKES}
          />
          <Scribble
            className="about-letter__scribble about-letter__scribble--sparkle"
            src={LETTER_SCRIBBLE_RIGHT}
            width={91}
            height={160}
            maskStroke={9}
            strokes={SCRIBBLE_SPARKLE_STROKES}
          />
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
