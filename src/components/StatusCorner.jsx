import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../utils/assetUrl.js";

const STATUS = {
  barBg: assetUrl("/hero/v2/status/bar-bg.png"),
  dot: assetUrl("/hero/v2/status/dot.png"),
  currently: assetUrl("/hero/v2/status/currently.png"),
  ampmTab: assetUrl("/hero/v2/status/time/ampm-tab.png")
};

/** Action PNGs — all native height 16; widths vary. Slot uses the longest. */
const ACTIONS = [
  {
    src: assetUrl("/hero/v2/status/actions/cafe-hopping.png"),
    alt: "cafe hopping",
    width: 83
  },
  {
    src: assetUrl("/hero/v2/status/actions/making-matcha-lattes.png"),
    alt: "making matcha lattes",
    width: 134
  },
  {
    src: assetUrl("/hero/v2/status/actions/adjusting-letter-spacing.png"),
    alt: "adjusting letter spacing",
    width: 145
  },
  {
    src: assetUrl("/hero/v2/status/actions/renaming-frame.png"),
    alt: 'renaming "Frame 13849"',
    width: 157
  }
];

const ACTION_INTERVAL_MS = 2000;
const ACTION_SLIDE_MS = 520;
const ACTION_MAX_W = Math.max(...ACTIONS.map((a) => a.width));
const NY_TZ = "America/New_York";

function readNewYorkTime(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: NY_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).formatToParts(date);

  const hour = parts.find((part) => part.type === "hour")?.value ?? "--";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "--";
  const dayPeriod = (parts.find((part) => part.type === "dayPeriod")?.value ?? "AM").toUpperCase();

  return {
    clock: `${hour}:${minute}`,
    period: dayPeriod === "AM" || dayPeriod === "PM" ? dayPeriod : "AM"
  };
}

export default function StatusCorner() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [nyTime, setNyTime] = useState(() => readNewYorkTime());
  const trackRef = useRef(null);
  const slides = [...ACTIONS, ACTIONS[0]];

  useEffect(() => {
    const tick = () => setNyTime(readNewYorkTime());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => current + 1);
    }, ACTION_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index < ACTIONS.length) return undefined;

    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, ACTION_SLIDE_MS);

    return () => window.clearTimeout(timer);
  }, [index]);

  const activeAlt = ACTIONS[index % ACTIONS.length]?.alt ?? ACTIONS[0].alt;

  return (
    <>
      <aside className="status-corner status-corner--left" aria-label={`AY. Currently ${activeAlt}`}>
        <span className="status-corner__initials">AY</span>
        <div className="status-corner__bar">
          <img
            className="status-corner__bar-bg"
            src={STATUS.barBg}
            alt=""
            draggable={false}
            aria-hidden="true"
          />
          <img
            className="status-corner__dot"
            src={STATUS.dot}
            alt=""
            width={13}
            height={13}
            draggable={false}
            aria-hidden="true"
          />
          <img
            className="status-corner__currently"
            src={STATUS.currently}
            alt=""
            width={63}
            height={15}
            draggable={false}
            aria-hidden="true"
          />
          <div
            className="status-corner__actions"
            style={{ "--action-max-w": `${ACTION_MAX_W}` }}
          >
            <div
              ref={trackRef}
              className={`status-corner__actions-track${
                animate ? " is-animating" : ""
              }`}
              style={{ transform: `translate3d(0, ${-index * 100}%, 0)` }}
            >
              {slides.map((action, slideIndex) => (
                <div
                  key={`${action.alt}-${slideIndex}`}
                  className="status-corner__action"
                >
                  <img
                    src={action.src}
                    alt=""
                    width={action.width}
                    height={16}
                    draggable={false}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
            <span className="visually-hidden">{activeAlt}</span>
          </div>
        </div>
      </aside>

      <aside
        className="status-corner status-corner--right"
        aria-label={`New York time ${nyTime.clock} ${nyTime.period}`}
      >
        <span className="status-corner__time">{nyTime.clock}</span>
        <span className="status-corner__ampm" aria-hidden="true">
          <img
            className="status-corner__ampm-tab"
            src={STATUS.ampmTab}
            alt=""
            draggable={false}
          />
          <span className="status-corner__ampm-label">{nyTime.period}</span>
        </span>
      </aside>
    </>
  );
}
