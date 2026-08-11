import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl.js";

/**
 * Vanity Screen 1 — product gather reel
 * Source of truth: /public/vanity/onboarding/motion.json
 */
export default function VanityOnboardingDemo() {
  const [motion, setMotion] = useState(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef(0);
  const playRef = useRef({ startT: 0, t0: 0 });

  useEffect(() => {
    fetch(assetUrl("/vanity/onboarding/motion.json"))
      .then((r) => r.json())
      .then(setMotion)
      .catch(console.error);
  }, []);

  const totalMs = useMemo(() => {
    if (!motion) return 1;
    const { timing, products } = motion;
    return timing.durationMs + timing.staggerMs * (products.length - 1);
  }, [motion]);

  useEffect(() => {
    if (!playing || !motion) return undefined;
    playRef.current = { startT: t >= 0.995 ? 0 : t, t0: performance.now() };
    const tick = (now) => {
      const { startT, t0 } = playRef.current;
      const next = startT + (now - t0) / totalMs;
      if (next >= 1) {
        setT(1);
        setPlaying(false);
        return;
      }
      setT(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, motion, totalMs]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!motion) {
    return (
      <main className="vanity-demo">
        <p className="vanity-demo__loading">Loading motion…</p>
      </main>
    );
  }

  const { artboard, timing, products, progress, copy, brand } = motion;
  const scale = 1; // rendered at artboard size inside phone frame

  return (
    <main className="vanity-demo">
      <header className="vanity-demo__bar">
        <Link to="/" className="vanity-demo__back">
          ← Portfolio
        </Link>
        <div className="vanity-demo__actions">
          <a
            className="vanity-demo__link"
            href={assetUrl("/vanity/onboarding/")}
            target="_blank"
            rel="noreferrer"
          >
            Open full prototype
          </a>
          <a
            className="vanity-demo__link"
            href={assetUrl("/vanity/onboarding/motion.json")}
            target="_blank"
            rel="noreferrer"
          >
            motion.json
          </a>
        </div>
      </header>

      <div className="vanity-demo__layout">
        <div
          className="vanity-demo__phone"
          style={{ width: artboard.width, height: artboard.height }}
        >
          <div className="vanity-demo__notch" aria-hidden />
          <div className="vanity-demo__brand" style={{ color: brand.color }}>
            {brand.text}
          </div>
          <div className="vanity-demo__progress" aria-hidden>
            {Array.from({ length: progress.steps }).map((_, i) => (
              <span
                key={i}
                data-active={i === (progress.activeStart ?? 0) ? "true" : "false"}
              />
            ))}
          </div>
          <p
            className="vanity-demo__copy"
            style={{ opacity: copyOpacity(t, timing, copy, totalMs) }}
          >
            Tired of oversaturated feeds
            <br />
            telling you what to buy?
          </p>
          <div className="vanity-demo__products">
            {products
              .slice()
              .sort((a, b) => a.start.z - b.start.z)
              .map((p) => {
                const local = productLocalT(
                  t,
                  p.staggerIndex ?? 0,
                  timing,
                  totalMs
                );
                const x = lerp(p.start.x, p.end.x, local) * scale;
                const y = lerp(p.start.y, p.end.y, local) * scale;
                const r = lerp(p.start.rotation, p.end.rotation, local);
                const s = lerp(p.start.scale, p.end.scale, local);
                const z = Math.round(lerp(p.start.z, p.end.z, local));
                return (
                  <div
                    key={p.id}
                    className="vanity-demo__product"
                    style={{
                      width: p.width,
                      zIndex: z,
                      transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`
                    }}
                  >
                    <img
                      src={assetUrl(`/vanity/onboarding/${p.src}`)}
                      alt=""
                      draggable={false}
                    />
                  </div>
                );
              })}
          </div>
          <div className="vanity-demo__home" aria-hidden />
        </div>

        <aside className="vanity-demo__panel">
          <h1>Screen 1 product gather</h1>
          <p>
            Same onboarding step — products converge into a pile and obscure the
            problem copy. Hand this to eng with <code>motion.json</code>.
          </p>
          <div className="vanity-demo__controls">
            <button type="button" onClick={() => setPlaying((v) => !v)}>
              {playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              className="is-secondary"
              onClick={() => {
                setPlaying(false);
                setT(0);
              }}
            >
              Reset
            </button>
          </div>
          <label className="vanity-demo__scrub">
            <span>Progress {Math.round(t * 100)}%</span>
            <input
              type="range"
              min={0}
              max={1000}
              value={Math.round(t * 1000)}
              onChange={(e) => {
                setPlaying(false);
                setT(Number(e.target.value) / 1000);
              }}
            />
          </label>
          <dl className="vanity-demo__kv">
            <dt>Duration</dt>
            <dd>{timing.durationMs}ms / product</dd>
            <dt>Stagger</dt>
            <dd>{timing.staggerMs}ms</dd>
            <dt>Total</dt>
            <dd>{totalMs}ms</dd>
            <dt>Easing</dt>
            <dd>{timing.easing}</dd>
          </dl>
        </aside>
      </div>
    </main>
  );
}

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

function easeOutQuint(v) {
  return 1 - (1 - v) ** 5;
}

function lerp(a, b, v) {
  return a + (b - a) * v;
}

function productLocalT(globalT, staggerIndex, timing, totalMs) {
  const start = (timing.staggerMs * staggerIndex) / totalMs;
  const dur = timing.durationMs / totalMs;
  return easeOutQuint(clamp01((globalT - start) / dur));
}

function copyOpacity(globalT, timing, copy, totalMs) {
  const delay = (timing.copyFadeDelayMs ?? 0) / totalMs;
  const dur = (timing.copyFadeMs ?? timing.durationMs) / totalMs;
  const local = clamp01((globalT - delay) / dur);
  return lerp(copy.startOpacity, copy.endOpacity, easeOutQuint(local));
}
