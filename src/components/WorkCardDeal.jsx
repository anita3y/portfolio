import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProjectCardMedia } from "./ProjectCard.jsx";

/*
 * Work as a dealt pile (the reverse of gracechen.io's stacking cards).
 * The case studies start as a neat pile right under the work/play tabs.
 * Scrolling deals them out onto the grid: the card at the BACK of the pile
 * slides out first, then the next, until the front card settles. Once all
 * are laid out the deal is finished for this page load — scrolling back up
 * just shows the laid-out grid.
 */

const DEAL_VH_PER_CARD = 45; // scroll distance to deal one card
const STICK_TOP_REM = 5.4; // just under the sticky tabs
const MAX_TILT = 7;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* How each card sits in the pile (index 0 = front). */
function pileOffset(i) {
  if (i === 0) return { x: 0, y: 0, r: 0, s: 1 };
  const side = i % 2 === 1 ? 1 : -1;
  return { x: side * i * 5, y: i * 9, r: side * (1.6 + i * 0.9), s: 1 - i * 0.025 };
}

function DealCard({ project, onOpen, slotRef }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [tilting, setTilting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const soon = project.displayOnly;

  const onPointerMove = (event) => {
    if (reducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilting(true);
    setTilt({
      rx: clamp(-py * MAX_TILT * 2, -MAX_TILT, MAX_TILT),
      ry: clamp(px * MAX_TILT * 2, -MAX_TILT, MAX_TILT)
    });
  };
  const reset = () => {
    setTilting(false);
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const label = [project.headline || project.title, project.company, project.year]
    .filter(Boolean)
    .join(" — ");

  return (
    <div ref={slotRef} className="wdeal__slot" role="listitem">
      <button
        type="button"
        className={`wdeal-card${tilting ? " is-tilting" : ""}${soon ? " is-soon" : ""}`}
        style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={reset}
        onPointerCancel={reset}
        onClick={() => !soon && onOpen(project.id)}
        aria-label={soon ? `${label} (coming soon)` : `Open ${label}`}
        aria-haspopup={soon ? undefined : "dialog"}
        data-cursor-case-study={soon ? undefined : ""}
      >
        <span className={`project-card__media project-card__media--${project.theme}`}>
          <span className="project-card__visual">
            <ProjectCardMedia
              thumbnail={project.thumbnail}
              thumbnailVideo={project.thumbnailVideo}
              thumbnailSlides={project.thumbnailSlides}
              thumbnailSlideInterval={project.thumbnailSlideInterval}
              thumbnailSlideOnHover={project.thumbnailSlideOnHover}
              thumbnailStack={project.thumbnailStack}
              thumbMissing={false}
              setThumbMissing={() => {}}
              isHovered={hovered}
              comingSoon={null}
            />
          </span>
        </span>
      </button>
      <p className="wdeal__caption">
        <span className="wdeal__caption-title">{project.headline || project.title}</span>
        <span className="wdeal__caption-year">{soon ? project.tabYear ?? "coming soon" : project.year}</span>
      </p>
    </div>
  );
}

export default function WorkCardDeal({ projects, onOpen }) {
  const wrapRef = useRef(null);
  const gridRef = useRef(null);
  const slotRefs = useRef([]);
  const geo = useRef([]); // per card: { dx, dy } from its slot to the pile
  // Deal transition parked for now: cards always render laid out.
  const [done, setDone] = useState(true);
  const doneRef = useRef(done);
  const count = projects.length;

  const travel = () => (window.innerHeight * DEAL_VH_PER_CARD * count) / 100;

  /* Measure where each slot is relative to the pile spot (top-centre of the grid). */
  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const gridW = grid.clientWidth;
    geo.current = slotRefs.current.map((el) => {
      if (!el) return { dx: 0, dy: 0 };
      const pileLeft = (gridW - el.offsetWidth) / 2;
      return { dx: pileLeft - el.offsetLeft, dy: -el.offsetTop };
    });
  }, []);

  const paint = useCallback(
    (progress) => {
      // progress 0..count; card (count-1) deals first, card 0 last.
      slotRefs.current.forEach((el, i) => {
        if (!el) return;
        const order = count - 1 - i;
        const t = ease(clamp(progress - order, 0, 1));
        const g = geo.current[i] || { dx: 0, dy: 0 };
        const p = pileOffset(i);
        const x = (g.dx + p.x) * (1 - t);
        const y = (g.dy + p.y) * (1 - t);
        const r = p.r * (1 - t);
        const s = p.s + (1 - p.s) * t;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(4)})`;
        el.style.zIndex = String(count - i);
        el.style.setProperty("--dealt", t.toFixed(3));
      });
    },
    [count]
  );

  useLayoutEffect(() => {
    if (done) {
      slotRefs.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "";
        el.style.removeProperty("--dealt");
      });
      return undefined;
    }
    measure();
    paint(0);
    return undefined;
  }, [done, measure, paint]);

  useEffect(() => {
    if (done) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const wrap = wrapRef.current;
      if (!wrap || doneRef.current) return;
      const stickTop = parseFloat(getComputedStyle(document.documentElement).fontSize) * STICK_TOP_REM;
      const scrolled = stickTop - wrap.getBoundingClientRect().top;
      const T = travel();
      const progress = clamp(scrolled / T, 0, 1) * count;
      paint(progress);

      if (progress >= count) {
        // Deal finished: drop the extra scroll room and compensate so nothing jumps.
        doneRef.current = true;
        setDone(true);
        window.scrollBy({ top: -T, behavior: "auto" });
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [done, count, measure, paint]);

  return (
    <div
      ref={wrapRef}
      className={`wdeal${done ? " is-done" : ""}`}
      style={done ? undefined : { "--wdeal-travel": `${DEAL_VH_PER_CARD * count}vh`, "--wdeal-top": `${STICK_TOP_REM}rem` }}
    >
      <div ref={gridRef} className="wdeal__grid" role="list">
        {projects.map((project, i) => (
          <DealCard
            key={project.id}
            project={project}
            onOpen={onOpen}
            slotRef={(el) => {
              slotRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
