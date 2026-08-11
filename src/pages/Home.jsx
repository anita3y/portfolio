import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useLocation } from "react-router-dom";
import AboutPanel from "../components/AboutPanel.jsx";
import PlayExpandPanel from "../components/PlayExpandPanel.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import RoleChip from "../components/RoleChip.jsx";
import StatusCorner from "../components/StatusCorner.jsx";
import WorkExpandPanel from "../components/WorkExpandPanel.jsx";
import { PLAY_PROJECTS, WORK_PROJECTS } from "../data/projects.js";
import { assetUrl } from "../utils/assetUrl.js";

const DOCK_ITEMS = [
  { id: "work", label: "Work", icon: assetUrl("/dock/work.png") },
  { id: "play", label: "Play", icon: assetUrl("/dock/play.png") },
  { id: "about", label: "About", icon: assetUrl("/dock/about.png") }
];
const TAB_IDS = DOCK_ITEMS.map((item) => item.id);

const DOCK_BASE = assetUrl("/dock/base.png");
const HERO_LOCATION = assetUrl("/hero/v2/based-in-new-york.png");

/** macOS-style dock magnification — peak scale & influence radius in px */
const DOCK_MAG_MAX = 1.42;
const DOCK_MAG_RANGE = 110;

const playIds = new Set(PLAY_PROJECTS.map((p) => p.id));
const displayOnlyPlayIds = new Set(
  PLAY_PROJECTS.filter((project) => project.displayOnly).map((project) => project.id)
);
const workIds = new Set(WORK_PROJECTS.map((p) => p.id));

function Dock({ activeTab, onSelect }) {
  const iconsRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);

  const paintMagnify = useCallback((clientX) => {
    const host = iconsRef.current;
    const items = itemRefs.current.filter(Boolean);
    if (!host || items.length === 0) return;

    // Use layout (untransformed) centers so growth doesn't chase itself.
    const hostLeft = host.getBoundingClientRect().left;
    const centers = items.map((el) => hostLeft + el.offsetLeft + el.offsetWidth / 2);
    const widths = items.map((el) => el.offsetWidth);

    const scales = centers.map((center) => {
      const distance = Math.abs(clientX - center);
      const t = Math.max(0, 1 - distance / DOCK_MAG_RANGE);
      const amount = (1 - Math.cos(t * Math.PI)) * 0.5;
      return 1 + (DOCK_MAG_MAX - 1) * amount;
    });

    // Each icon's extra width spills half left / half right — neighbors shift aside.
    items.forEach((el, index) => {
      let shift = 0;
      for (let j = 0; j < scales.length; j += 1) {
        if (j === index) continue;
        const extra = (scales[j] - 1) * widths[j];
        shift += j < index ? extra * 0.5 : -extra * 0.5;
      }
      const scale = scales[index];
      const lift = (scale - 1) * 16;
      el.style.setProperty("--dock-scale", scale.toFixed(3));
      el.style.setProperty("--dock-lift", `${lift.toFixed(2)}px`);
      el.style.setProperty("--dock-shift", `${shift.toFixed(2)}px`);
    });
  }, []);

  const resetMagnify = useCallback(() => {
    itemRefs.current.forEach((el) => {
      if (!el) return;
      el.style.setProperty("--dock-scale", "1");
      el.style.setProperty("--dock-lift", "0px");
      el.style.setProperty("--dock-shift", "0px");
    });
  }, []);

  const onPointerMove = useCallback(
    (event) => {
      const x = event.clientX;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => paintMagnify(x));
    },
    [paintMagnify]
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <nav className="dock" aria-label="Site sections">
      <img className="dock__base" src={DOCK_BASE} alt="" draggable={false} aria-hidden="true" />
      <div
        className="dock__icons"
        ref={iconsRef}
        onPointerMove={onPointerMove}
        onPointerLeave={resetMagnify}
      >
        {DOCK_ITEMS.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            type="button"
            className={`dock__item${activeTab === item.id ? " is-active" : ""}`}
            onClick={() => onSelect(item.id)}
            aria-label={item.label}
            aria-current={activeTab === item.id ? "true" : undefined}
          >
            <img
              className="dock__icon"
              src={item.icon}
              alt=""
              draggable={false}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function Home() {
  const location = useLocation();
  const requestedTab = TAB_IDS.includes(location.state?.tab) ? location.state.tab : null;
  const initialOpenPlay =
    typeof location.state?.openPlay === "string" && playIds.has(location.state.openPlay)
      ? location.state.openPlay
      : null;
  const initialOpenWork =
    typeof location.state?.openWork === "string" && workIds.has(location.state.openWork)
      ? location.state.openWork
      : null;

  const [openPlayId, setOpenPlayId] = useState(initialOpenPlay);
  const [openWorkId, setOpenWorkId] = useState(initialOpenWork);
  const [activeTab, setActiveTab] = useState(requestedTab);
  const [trackMetrics, setTrackMetrics] = useState({ maxX: 0, viewportH: 0 });
  const [tagChipDims, setTagChipDims] = useState({
    chipW: 0,
    chipH: 0,
    labelW: 0,
    labelH: 0
  });
  const tagChipRef = useRef(null);
  const tagChipLabelRef = useRef(null);
  const tagSlotMeasureRef = useRef(null);
  const trackRef = useRef(null);
  const panelRefs = useRef({});
  const maxXRef = useRef(0);
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    document.title = "anita yan | Portfolio";
  }, []);

  useEffect(() => {
    const playId = location.state?.openPlay;
    if (typeof playId === "string" && playIds.has(playId) && !displayOnlyPlayIds.has(playId)) {
      setOpenPlayId(playId);
    }
  }, [location.state?.openPlay]);

  useEffect(() => {
    const workId = location.state?.openWork;
    if (typeof workId === "string" && workIds.has(workId)) {
      setOpenWorkId(workId);
    }
  }, [location.state?.openWork]);

  const panelOffset = useCallback((id) => {
    const track = trackRef.current;
    const panel = panelRefs.current[id];
    if (!track || !panel) return 0;
    const trackPadLeft = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
    return Math.max(0, Math.round(panel.offsetLeft - trackPadLeft));
  }, []);

  const paintTrack = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const x = Math.min(Math.max(window.scrollY, 0), maxXRef.current);
    track.style.transform = `translate3d(${-x}px, 0, 0)`;

    // Stay on "hero" (no dock highlight) until the work panel actually enters view.
    const probe = x + window.innerWidth * 0.28;
    let nextTab = null;
    for (const id of TAB_IDS) {
      const panel = panelRefs.current[id];
      if (panel && panelOffset(id) <= probe) nextTab = id;
    }
    if (nextTab !== activeTabRef.current) {
      activeTabRef.current = nextTab;
      setActiveTab(nextTab);
    }
  }, [panelOffset]);

  const measureTrack = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxX = Math.max(0, Math.round(track.scrollWidth - window.innerWidth));
    maxXRef.current = maxX;
    setTrackMetrics((current) =>
      current.maxX === maxX && current.viewportH === window.innerHeight
        ? current
        : { maxX, viewportH: window.innerHeight }
    );
    paintTrack();
  }, [paintTrack]);

  useLayoutEffect(() => {
    measureTrack();
  }, [measureTrack]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        paintTrack();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureTrack);

    const track = trackRef.current;
    let ro;
    if (track && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measureTrack());
      ro.observe(track);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureTrack);
      ro?.disconnect();
    };
  }, [paintTrack, measureTrack]);

  const didJumpRef = useRef(false);
  useEffect(() => {
    if (didJumpRef.current || !requestedTab) return;
    didJumpRef.current = true;
    window.scrollTo({ top: panelOffset(requestedTab), behavior: "auto" });
  }, [requestedTab, panelOffset, trackMetrics.maxX]);

  const goToTab = useCallback(
    (tab) => {
      window.scrollTo({
        top: Math.min(panelOffset(tab), maxXRef.current),
        behavior: "smooth"
      });
    },
    [panelOffset]
  );

  const syncTagChipDims = useCallback(() => {
    const chip = tagChipRef.current;
    const slotLabel = tagSlotMeasureRef.current;
    if (!chip) return;
    const cr = chip.getBoundingClientRect();
    const sr = slotLabel?.getBoundingClientRect();
    setTagChipDims({
      chipW: cr.width,
      chipH: cr.height,
      labelW: sr?.width ?? cr.width,
      labelH: sr?.height ?? cr.height
    });
  }, []);

  useLayoutEffect(() => {
    syncTagChipDims();
    const id = requestAnimationFrame(() => syncTagChipDims());
    return () => cancelAnimationFrame(id);
  }, [syncTagChipDims]);

  useEffect(() => {
    const chip = tagChipRef.current;
    const slotLabel = tagSlotMeasureRef.current;
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", syncTagChipDims);
      return () => window.removeEventListener("resize", syncTagChipDims);
    }
    const ro = new ResizeObserver(() => syncTagChipDims());
    if (chip) ro.observe(chip);
    if (slotLabel) ro.observe(slotLabel);
    window.addEventListener("resize", syncTagChipDims);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncTagChipDims);
    };
  }, [syncTagChipDims]);

  const chipCssVars =
    tagChipDims.labelW > 0
      ? {
          "--tag-chip-w": `${tagChipDims.chipW}px`,
          "--tag-chip-h": `${tagChipDims.chipH}px`,
          "--tag-label-w": `${tagChipDims.labelW}px`,
          "--tag-label-h": `${tagChipDims.labelH}px`
        }
      : undefined;

  const setPanelRef = (id) => (el) => {
    panelRefs.current[id] = el;
  };

  const runwayHeight =
    trackMetrics.viewportH > 0
      ? `${trackMetrics.maxX + trackMetrics.viewportH}px`
      : "100vh";

  return (
    <div className="page page--rail" style={chipCssVars}>
      <StatusCorner />

      <div className="rail" style={{ height: runwayHeight }}>
        <div className="rail__viewport">
          <div className="rail__track" ref={trackRef}>
            <section className="rail-panel rail-panel--hero" ref={setPanelRef("hero")}>
              <header className="hero">
                <h1>
                  <span className="hero-lead">Anita Yan is a</span>{" "}
                  <RoleChip chipRef={tagChipRef} labelRef={tagChipLabelRef} />
                  <span ref={tagSlotMeasureRef} className="tag-slot-measure" aria-hidden="true">
                    <RoleChip measureOnly />
                  </span>
                  <br />
                  <span className="hero-focus-line">
                    <span className="hero-focus-label">focused on</span>{" "}
                    <span className="hero-focus-values">craft and simplicity</span>
                  </span>
                  <img
                    className="hero-location"
                    src={HERO_LOCATION}
                    alt="based in New York"
                    width={246}
                    height={17}
                    draggable={false}
                  />
                </h1>
              </header>
            </section>

            <section
              className="rail-panel rail-panel--work"
              id="panel-work"
              ref={setPanelRef("work")}
              aria-label="Work"
            >
              <p className="rail-panel__label">work</p>
              <div className="project-grid project-grid--rail" role="list">
                {WORK_PROJECTS.map((project) => (
                  <div key={project.id} className="project-grid__item" role="listitem">
                    <ProjectCard
                      project={project}
                      onExpand={() => setOpenWorkId(project.id)}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rail-panel rail-panel--play"
              id="panel-play"
              ref={setPanelRef("play")}
              aria-label="Play"
            >
              <p className="rail-panel__label">play</p>
              <div className="project-grid project-grid--rail project-grid--play" role="list">
                {PLAY_PROJECTS.map((project) => (
                  <div key={project.id} className="project-grid__item" role="listitem">
                    <ProjectCard
                      project={project}
                      onExpand={
                        project.displayOnly ? undefined : () => setOpenPlayId(project.id)
                      }
                    />
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rail-panel rail-panel--about"
              id="panel-about"
              ref={setPanelRef("about")}
              aria-label="About"
            >
              <p className="rail-panel__label">about</p>
              <AboutPanel />
            </section>
          </div>
        </div>
      </div>

      <Dock activeTab={activeTab} onSelect={goToTab} />

      {openPlayId && (
        <PlayExpandPanel
          playId={openPlayId}
          onClose={() => setOpenPlayId(null)}
          onNavigate={setOpenPlayId}
        />
      )}

      {openWorkId && (
        <WorkExpandPanel
          workId={openWorkId}
          onClose={() => setOpenWorkId(null)}
          onNavigate={setOpenWorkId}
        />
      )}
    </div>
  );
}
