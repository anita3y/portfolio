import { useEffect, useRef, useState } from "react";

/*
 * Ported from the "Seven Paths Through AI" research diagram.
 * One shared state graph; each participant is a dot travelling it.
 * Back-and-forth pairs (AI tool <-> Figma) are drawn as almond leaves.
 */

const NODES = {
  N1: { label: "Trigger", x: 130, y: 430, tools: "Slack, Calendar, Docs, Notion AI, FigJam" },
  N2: { label: "Context", x: 330, y: 580, tools: "Notion, Linear, Fathom, Granola, GitHub" },
  N3: { label: "Concepts", x: 540, y: 330, ai: true, tools: "Figma, Claude artifacts, Framer, v0, Midjourney" },
  N4: { label: "Check-in", x: 540, y: 120, tools: "Slack, Zoom, Claude critique skill" },
  N13: { label: "Reference sourcing", x: 300, y: 250, tools: "Pinterest, Are.na, Mobbin, Instagram, X, GitHub demos" },
  N5: { label: "AI prototyping", x: 840, y: 430, ai: true, tools: "Cursor, Claude Code, Codex, Copilot, Figma MCP, Lovable" },
  N6: { label: "Figma", x: 840, y: 650, tools: "Detailed iteration, handoff specs, source of truth" },
  N7: { label: "Review gate", x: 1130, y: 330, tools: "Figma Slides, Maze, live links" },
  N14: { label: "Agent review", x: 1130, y: 560, ai: true, tools: "Parallel Claude sessions" },
  N15: { label: "Memory system", x: 1300, y: 680, tools: "MD memory files, daily routines, skills" },
  N9: { label: "Handoff", x: 1360, y: 510, tools: "GitHub, Figma spec, Playwright, Loom, Notion" },
  N11: { label: "Shipped", x: 1540, y: 330, strong: true, tools: "Live prototype, Jira, GitHub" }
};

const PEOPLE = [
  { id: "queenie", name: "Quinn", color: "#F97316", path: ["N1", "N2", "N3", "N7", "N5", "N6", "N7", "N9"] },
  { id: "justin", name: "Jordan", color: "#14B8A6", path: ["N1", "N2", "N3", "N4", "N7", "N5", "N6", "N5", "N6", "N9", "N11"] },
  { id: "minami", name: "Mira", color: "#3B82F6", path: ["N3", "N2", "N3", "N4", "N3", "N5", "N6", "N5", "N11"] },
  { id: "jennifer", name: "Jamie", color: "#EAB308", path: ["N1", "N13", "N4", "N3", "N5", "N9", "N11"] },
  { id: "surya", name: "Sage", color: "#7C3AED", path: ["N13", "N3", "N5", "N4", "N5", "N11"] },
  { id: "kia", name: "Kira", color: "#F43F5E", path: ["N1", "N3", "N13", "N5", "N2", "N4", "N14", "N15", "N9"] }
];

const SECONDS_TOTAL = 11;
const NS = "http://www.w3.org/2000/svg";

function el(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

function nodeHash(a, b) {
  const s = a + b;
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 97;
  return h / 97;
}

function quadPath(a, b, bend) {
  const A = NODES[a];
  const B = NODES[b];
  const mx = (A.x + B.x) / 2;
  const my = (A.y + B.y) / 2;
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return { d: `M ${A.x} ${A.y} Q ${cx} ${cy} ${B.x} ${B.y}`, cx, cy };
}

function quadPoint(A, C, B, t) {
  const mt = 1 - t;
  return {
    x: mt * mt * A.x + 2 * mt * t * C.x + t * t * B.x,
    y: mt * mt * A.y + 2 * mt * t * C.y + t * t * B.y
  };
}

const smooth = (x) => x * x * (3 - 2 * x);

export default function ResearchPathsGraph({ bleed = false }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const apiRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [panel, setPanel] = useState(null);
  const [pinned, setPinned] = useState(null);
  const pinnedRef = useRef(null);
  pinnedRef.current = pinned;

  /* Build the static graph once. */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    svg.innerHTML = "";

    const directed = {};
    PEOPLE.forEach((p) => {
      for (let i = 0; i < p.path.length - 1; i += 1) {
        if (p.path[i] !== p.path[i + 1]) directed[`${p.path[i]}>${p.path[i + 1]}`] = true;
      }
    });
    const leafPairs = {};
    const linePairs = {};
    Object.keys(directed).forEach((k) => {
      const [a, b] = k.split(">");
      const key = [a, b].sort().join("-");
      if (directed[`${b}>${a}`]) leafPairs[key] = [a, b];
      else if (!leafPairs[key]) linePairs[key] = [a, b];
    });
    Object.keys(linePairs).forEach((k) => {
      if (leafPairs[k]) delete linePairs[k];
    });

    const edgeGeo = {};
    Object.values(linePairs).forEach(([a, b]) => {
      const qp = quadPath(a, b, (nodeHash(a, b) - 0.5) * 70);
      svg.appendChild(el("path", { d: qp.d, class: "rpg-edge", "data-a": a, "data-b": b }));
      const C = { x: qp.cx, y: qp.cy };
      edgeGeo[`${a}>${b}`] = { A: NODES[a], C, B: NODES[b] };
      edgeGeo[`${b}>${a}`] = { A: NODES[b], C, B: NODES[a] };
    });
    Object.values(leafPairs).forEach(([a, b]) => {
      const q1 = quadPath(a, b, 46);
      const q2 = quadPath(a, b, -46);
      svg.appendChild(el("path", { d: q1.d, class: "rpg-edge", "data-a": a, "data-b": b }));
      svg.appendChild(el("path", { d: q2.d, class: "rpg-edge", "data-a": a, "data-b": b }));
      edgeGeo[`${a}>${b}`] = { A: NODES[a], C: { x: q1.cx, y: q1.cy }, B: NODES[b] };
      edgeGeo[`${b}>${a}`] = { A: NODES[b], C: { x: q2.cx, y: q2.cy }, B: NODES[a] };
    });

    svg.appendChild(el("rect", { x: 0, y: 0, width: 1600, height: 760, class: "rpg-scrim" }));

    const nodeEls = {};
    Object.entries(NODES).forEach(([id, n]) => {
      // Caleb Wu language: hollow circles for steps, squares for AI tools, accent for outcome.
      const ring = n.ai
        ? el("rect", { x: n.x - 5.5, y: n.y - 5.5, width: 11, height: 11, class: "rpg-node is-ai" })
        : el("circle", { cx: n.x, cy: n.y, r: n.strong ? 6 : 5.5, class: `rpg-node${n.strong ? " is-end" : ""}` });
      const anchor = n.x > 1300 ? "end" : n.x < 260 ? "start" : "middle";
      const txt = el("text", {
        class: `rpg-label${n.strong ? " is-strong" : ""}`,
        x: n.x,
        y: n.y - 15,
        "text-anchor": anchor
      });
      txt.textContent = n.label.toLowerCase();
      const hit = el("circle", { cx: n.x, cy: n.y, r: 28, class: "rpg-hit" });
      svg.append(ring, txt, hit);
      nodeEls[id] = { ring, txt };

      let timer;
      const on = () => {
        svg.classList.add("is-dim");
        svg.querySelectorAll(".is-hl").forEach((e) => e.classList.remove("is-hl"));
        ring.classList.add("is-hl");
        txt.classList.add("is-hl");
        svg.querySelectorAll(".rpg-edge").forEach((e) => {
          if (e.dataset.a === id || e.dataset.b === id) e.classList.add("is-hl");
        });
        setPanel({ name: n.label, tools: n.tools });
      };
      hit.addEventListener("mouseenter", () => {
        clearTimeout(timer);
        timer = setTimeout(on, 220);
      });
      hit.addEventListener("mouseleave", () => {
        clearTimeout(timer);
        svg.classList.remove("is-dim");
        svg.querySelectorAll(".is-hl").forEach((e) => e.classList.remove("is-hl"));
        setPanel(null);
      });
      hit.addEventListener("click", on);
    });

    // One solid route per person, revealed when they're pinned.
    const routeLayer = el("g", { class: "rpg-routes" });
    svg.appendChild(routeLayer);
    const routes = {};
    PEOPLE.forEach((p) => {
      let d = `M ${NODES[p.path[0]].x} ${NODES[p.path[0]].y}`;
      for (let i = 0; i < p.path.length - 1; i += 1) {
        const geo = edgeGeo[`${p.path[i]}>${p.path[i + 1]}`];
        const B = NODES[p.path[i + 1]];
        d += geo ? ` Q ${geo.C.x} ${geo.C.y} ${B.x} ${B.y}` : ` L ${B.x} ${B.y}`;
      }
      const route = el("path", { d, class: "rpg-route", stroke: p.color, pathLength: 1 });
      routeLayer.appendChild(route);
      routes[p.id] = route;
    });

    const dotLayer = el("g", { class: "rpg-dots" });
    svg.appendChild(dotLayer);
    const dots = {};
    const trails = {};
    PEOPLE.forEach((p) => {
      const trail = el("polyline", { fill: "none", stroke: p.color, "stroke-width": 1.2, opacity: 0.3, points: "" });
      const dot = el("circle", { r: 4.5, fill: p.color, stroke: "#f8f8f8", "stroke-width": 1.5, class: "rpg-dot" });
      dotLayer.append(trail, dot);
      dots[p.id] = dot;
      trails[p.id] = { el: trail, pts: [] };
    });

    const render = (t) => {
      PEOPLE.forEach((p) => {
        const n = p.path.length;
        const f = t * (n - 1);
        const i = Math.max(0, Math.min(Math.floor(f), n - 2));
        const frac = smooth(f - i);
        const a = p.path[i];
        const b = p.path[i + 1];
        const geo = edgeGeo[`${a}>${b}`];
        const pt = geo
          ? quadPoint(geo.A, geo.C, geo.B, frac)
          : { x: NODES[a].x + (NODES[b].x - NODES[a].x) * frac, y: NODES[a].y + (NODES[b].y - NODES[a].y) * frac };
        dots[p.id].setAttribute("cx", pt.x);
        dots[p.id].setAttribute("cy", pt.y);
        const faded = pinnedRef.current && pinnedRef.current !== p.id;
        dots[p.id].setAttribute("opacity", faded ? 0.18 : 1);
        const tr = trails[p.id];
        tr.pts.push(`${pt.x},${pt.y}`);
        if (tr.pts.length > 18) tr.pts.shift();
        tr.el.setAttribute("points", tr.pts.join(" "));
        tr.el.setAttribute("opacity", faded ? 0.06 : 0.3);
      });
    };

    const showRoute = (id) => {
      Object.entries(routes).forEach(([pid, r]) => r.classList.toggle("is-on", pid === id));
      svg.classList.toggle("has-route", Boolean(id));
    };

    apiRef.current = { render, showRoute };
    render(0);
    return () => {
      svg.innerHTML = "";
    };
  }, []);

  /* Full-bleed: stretch to the edges of the scrolling sheet (or the window),
     whatever column the chart sits in. */
  useEffect(() => {
    const root = rootRef.current;
    if (!bleed || !root) return undefined;
    const scroller = root.closest(".work-expand__scroll");
    // Layout offsets (not getBoundingClientRect) so the sheet's open animation
    // (a scale transform) can't skew the measurement.
    const leftWithin = (el, stop) => {
      let x = 0;
      let node = el;
      while (node && node !== stop) {
        x += node.offsetLeft;
        node = node.offsetParent;
      }
      return x;
    };
    const sync = () => {
      const stop = scroller ? scroller.offsetParent : null;
      const scrollerLeft = scroller ? leftWithin(scroller, stop) : 0;
      const parentLeft = leftWithin(root.parentElement, stop);
      const width = scroller ? scroller.clientWidth : document.documentElement.clientWidth;
      root.style.setProperty("--bleed-left", `${scrollerLeft - parentLeft}px`);
      root.style.setProperty("--bleed-w", `${width}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(scroller ?? document.documentElement);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [bleed]);

  /* Animation loop. */
  const progressRef = useRef(0);
  useEffect(() => {
    if (!playing) return undefined;
    let raf;
    let last = null;
    const frame = (ts) => {
      if (last == null) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
      let v = progressRef.current + dt / SECONDS_TOTAL;
      if (v > 1) v -= 1;
      progressRef.current = v;
      apiRef.current?.render(v);
      setProgress(v);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  /* Autoplay once it scrolls into view (skipped for reduced motion). */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          setPlaying(true);
        } else if (!entry.isIntersecting) {
          setPlaying(false);
          started = false;
        }
      },
      { threshold: 0.35 }
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    apiRef.current?.showRoute(pinned);
    apiRef.current?.render(progressRef.current);
  }, [pinned]);

  const onScrub = (event) => {
    const v = Number(event.target.value);
    setPlaying(false);
    progressRef.current = v;
    setProgress(v);
    apiRef.current?.render(v);
  };

  return (
    <div ref={rootRef} className={`rpg cs-diagram${bleed ? " rpg--bleed" : ""}`}>
      <div className="rpg__stage" ref={stageRef}>
        <div className={`rpg__panel${panel ? " is-shown" : ""}`} aria-live="polite">
          {panel ? (
            <>
              <p className="rpg__panel-name">{panel.name}</p>
              <p className="rpg__panel-tools">{panel.tools}</p>
            </>
          ) : null}
        </div>
        <div className="rpg__roster">
          {PEOPLE.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`rpg__person${pinned === p.id ? " is-pinned" : ""}`}
              onClick={() => setPinned((cur) => (cur === p.id ? null : p.id))}
              aria-pressed={pinned === p.id}
              data-cursor-hover=""
            >
              <span className="rpg__swatch" style={{ background: p.color }} />
              {p.name}
            </button>
          ))}
        </div>
        <svg
          ref={svgRef}
          className="rpg__svg"
          viewBox="0 0 1600 760"
          role="img"
          aria-label="Shared workflow graph with six designers moving through it"
        />
      </div>
      <div className="rpg__controls">
        <button
          type="button"
          className="rpg__play"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          data-cursor-morph=""
        >
          {playing ? (
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <rect x="2.5" y="2" width="2.4" height="8" rx="0.6" />
              <rect x="7.1" y="2" width="2.4" height="8" rx="0.6" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M3.2 1.8 L10 6 L3.2 10.2 Z" />
            </svg>
          )}
        </button>
        <input
          className="rpg__scrub"
          type="range"
          min="0"
          max="1"
          step="0.0015"
          value={progress}
          onChange={onScrub}
          aria-label="Scrub through the journeys"
        />
      </div>
    </div>
  );
}
