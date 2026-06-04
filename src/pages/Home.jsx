import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useLocation } from "react-router-dom";
import AboutPanel from "../components/AboutPanel.jsx";
import HeroCurrently from "../components/HeroCurrently.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { PLAY_PROJECTS, WORK_PROJECTS } from "../data/projects.js";

const TAGS = [
  { id: "product-designer", label: "product designer" },
  { id: "jazz-enthusiast", label: "jazz-enthusiast" },
  { id: "details-maximalist", label: "details maximalist" },
  { id: "round-edges-warrior", label: "round-edges-warrior" },
  { id: "storyteller", label: "storyteller" }
];

const tabs = ["work", "play", "about"];

/** Fixed apple-well width — matches storyteller label (longest stable slot). */
const CITY_WELL_LABEL = "storyteller";

const PANEL_ANIM_MS = 480;
const TAB_SWITCH_MS = 920;

const THUMB_SPRING = { stiffness: 280, damping: 13 };

function stepThumbSpring(value, velocity, target, dt) {
  const { stiffness, damping } = THUMB_SPRING;
  const accel = (target - value) * stiffness - velocity * damping;
  const nextVelocity = velocity + accel * dt;
  const nextValue = value + nextVelocity * dt;
  return { value: nextValue, velocity: nextVelocity };
}

function CityWellScroll() {
  const [appleSrc, setAppleSrc] = useState("/nyc-apple.png");

  return (
    <span className="city-well-track" aria-hidden="true">
      <span className="city-well-frame">
        <img
          className="city-well-apple"
          src={appleSrc}
          alt=""
          decoding="async"
          onError={() => {
            if (!appleSrc.endsWith(".svg")) setAppleSrc("/nyc-apple.svg");
          }}
        />
      </span>
      <span className="city-well-frame">
        <img
          className="city-well-maple"
          src="/toronto-maple-syrup.png"
          alt=""
          decoding="async"
        />
      </span>
    </span>
  );
}

export default function Home() {
  const location = useLocation();
  const initialTab = tabs.includes(location.state?.tab) ? location.state.tab : "work";

  const [activeTagId, setActiveTagId] = useState(TAGS[0].id);
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelPhase, setPanelPhase] = useState("closed");
  const [activeTab, setActiveTab] = useState(initialTab);
  const [tabSwitching, setTabSwitching] = useState(false);
  const [tabPanelDir, setTabPanelDir] = useState(0);
  const [tagChipDims, setTagChipDims] = useState({
    chipW: 0,
    chipH: 0,
    labelW: 0,
    labelH: 0
  });
  const menuRef = useRef(null);
  const tagChipRef = useRef(null);
  const tagChipLabelRef = useRef(null);
  const tagSlotMeasureRef = useRef(null);
  const closeTimerRef = useRef(null);
  const tabsNavRef = useRef(null);
  const tabThumbRef = useRef(null);
  const tabBtnRefs = useRef([]);
  const tabSwitchingRef = useRef(false);
  const thumbSpringRef = useRef(null);

  useEffect(() => {
    document.title = "anita yan | Portfolio";
  }, []);

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

  const measureActiveTabThumb = useCallback(() => {
    const nav = tabsNavRef.current;
    const idx = tabs.indexOf(activeTab);
    const btn = tabBtnRefs.current[idx];
    if (!nav || !btn) return null;
    return {
      x: btn.offsetLeft,
      y: btn.offsetTop,
      w: btn.offsetWidth,
      h: btn.offsetHeight
    };
  }, [activeTab]);

  const THUMB_SLIDE_TRANSITION =
    "transform 0.76s cubic-bezier(0.18, 1.82, 0.32, 1), width 0s, height 0s, top 0s";

  const paintTabThumb = useCallback((dims, opts = {}) => {
    const { animate = false, slide = false, geomOnly = false, positionOnly = false } = opts;
    const thumb = tabThumbRef.current;
    if (!thumb || !dims) return;

    if (!geomOnly) {
      if (slide) {
        thumb.style.transition = THUMB_SLIDE_TRANSITION;
      } else if (animate) {
        thumb.style.removeProperty("transition");
      } else {
        thumb.style.transition = "none";
      }
      thumb.style.transform = `translate3d(${dims.x}px, 0, 0)`;
    }

    if (!positionOnly) {
      thumb.style.width = `${dims.w}px`;
      thumb.style.height = `${dims.h}px`;
      thumb.style.top = `${dims.y}px`;
    }
  }, []);

  const initThumbSpring = useCallback((target) => {
    const thumb = tabThumbRef.current;
    if (!thumb || !target) return null;

    const h = thumb.offsetHeight || target.h;
    const y = Number.parseFloat(thumb.style.top) || target.y;
    const hDelta = target.h - h;

    return {
      h,
      y,
      vh: Math.sign(hDelta || 1) * 140,
      vy: 0
    };
  }, []);

  useLayoutEffect(() => {
    tabSwitchingRef.current = tabSwitching;
  }, [tabSwitching]);

  useLayoutEffect(() => {
    const dims = measureActiveTabThumb();
    if (tabSwitchingRef.current) {
      paintTabThumb(dims, { slide: true, positionOnly: true });
    } else {
      paintTabThumb(dims, { animate: true });
    }
  }, [activeTab, measureActiveTabThumb, paintTabThumb]);

  useEffect(() => {
    const sync = () => {
      const dims = measureActiveTabThumb();
      if (tabSwitchingRef.current) {
        const spring = thumbSpringRef.current;
        if (spring) {
          paintTabThumb(
            { x: dims.x, w: dims.w, h: spring.h, y: spring.y },
            { geomOnly: true }
          );
        }
      } else {
        paintTabThumb(dims, { animate: true });
      }
    };
    const nav = tabsNavRef.current;
    if (!nav || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", sync);
      return () => window.removeEventListener("resize", sync);
    }
    const ro = new ResizeObserver(sync);
    ro.observe(nav);
    tabBtnRefs.current.forEach((btn) => {
      if (btn) ro.observe(btn);
    });
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [measureActiveTabThumb, paintTabThumb, activeTab]);

  useEffect(() => {
    if (!tabSwitching) {
      thumbSpringRef.current = null;
      return undefined;
    }

    const target = measureActiveTabThumb();
    thumbSpringRef.current = initThumbSpring(target);

    let raf = 0;
    let lastNow = performance.now();

    const tick = (now) => {
      const dims = measureActiveTabThumb();
      const spring = thumbSpringRef.current;
      if (!dims || !spring) return;

      const dt = Math.min((now - lastNow) / 1000, 0.032);
      lastNow = now;

      const hStep = stepThumbSpring(spring.h, spring.vh, dims.h, dt);
      const yStep = stepThumbSpring(spring.y, spring.vy, dims.y, dt);
      spring.h = hStep.value;
      spring.vh = hStep.velocity;
      spring.y = yStep.value;
      spring.vy = yStep.velocity;

      paintTabThumb(
        { x: dims.x, w: dims.w, h: spring.h, y: spring.y },
        { geomOnly: true }
      );

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    const end = window.setTimeout(() => {
      cancelAnimationFrame(raf);
      thumbSpringRef.current = null;
      setTabSwitching(false);
      paintTabThumb(measureActiveTabThumb(), { animate: true });
    }, TAB_SWITCH_MS + 80);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(end);
    };
  }, [tabSwitching, measureActiveTabThumb, paintTabThumb, initThumbSpring]);

  const selectTab = useCallback(
    (tab) => {
      if (tab === activeTab) return;
      const from = tabs.indexOf(activeTab);
      const to = tabs.indexOf(tab);
      setTabPanelDir(to === from ? 0 : to > from ? 1 : -1);
      setTabSwitching(true);
      setActiveTab(tab);
    },
    [activeTab]
  );

  const activeTag = TAGS.find((t) => t.id === activeTagId) ?? TAGS[0];

  const closePanel = useCallback(() => {
    if (panelPhase === "closed" || panelPhase === "exiting") return;
    setPanelPhase("exiting");
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setPanelMounted(false);
      setPanelPhase("closed");
      closeTimerRef.current = null;
    }, PANEL_ANIM_MS);
  }, [panelPhase]);

  const openPanel = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setPanelMounted(true);
    setPanelPhase("entering");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPanelPhase("open"));
    });
  }, []);

  const togglePanel = useCallback(() => {
    if (panelPhase === "open" || panelPhase === "entering") {
      closePanel();
    } else {
      openPanel();
    }
  }, [panelPhase, closePanel, openPanel]);

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closePanel();
      }
    }

    if (panelMounted && panelPhase !== "closed") {
      window.addEventListener("mousedown", closeOnOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [panelMounted, panelPhase, closePanel]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") closePanel();
    }
    if (panelMounted && panelPhase !== "closed" && panelPhase !== "exiting") {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [panelMounted, panelPhase, closePanel]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const panelExpanded = panelPhase === "open";
  const chipMenuActive = panelMounted && panelPhase !== "closed";

  useLayoutEffect(() => {
    syncTagChipDims();
    const id = requestAnimationFrame(() => syncTagChipDims());
    return () => cancelAnimationFrame(id);
  }, [syncTagChipDims, chipMenuActive, panelMounted, panelPhase, activeTagId]);

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

  return (
    <div className="page" style={chipCssVars}>
      <p className="brand">anita yan</p>

      <header className="hero">
        <div className="hero__stack">
        <h1>
          Anita is a{" "}
          <span
            className={`tag-picker${panelExpanded ? " tag-picker--open" : ""}`}
            ref={menuRef}
          >
            <button
              ref={tagChipRef}
              className={`tag-chip tag-chip--${activeTag.id}`}
              type="button"
              onClick={togglePanel}
              aria-expanded={chipMenuActive}
              aria-haspopup="listbox"
            >
              <span ref={tagChipLabelRef} className="tag-chip-label">
                {activeTag.label}
              </span>
              <span
                className={`chip-icon ${
                  chipMenuActive ? "chip-icon--close" : "chip-icon--plus"
                }`}
                aria-hidden="true"
              />
            </button>
            {panelMounted && (
              <div
                className={`tag-menu ${panelExpanded ? "is-open" : ""}${
                  panelPhase === "exiting" ? " is-exiting" : ""
                }`}
                role="listbox"
                aria-label="Choose role"
              >
                <div className="tag-menu-inner">
                  {TAGS.map((tag) => (
                    <button
                      key={tag.id}
                      className={`tag-option tag-option--${tag.id} ${
                        tag.id === activeTagId ? "active" : ""
                      }`}
                      type="button"
                      role="option"
                      aria-selected={tag.id === activeTagId}
                      onClick={() => {
                        setActiveTagId(tag.id);
                        closePanel();
                      }}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </span>
          <span ref={tagSlotMeasureRef} className="tag-slot-measure" aria-hidden="true">
            <span className="tag-chip-label tag-chip--storyteller">{CITY_WELL_LABEL}</span>
          </span>
          <br />
          based in{" "}
          <span className="city-group" aria-label="Based in NYC — hover for Toronto">
            <span className="city-well">
              <span className="city-well-slot">
                <CityWellScroll />
              </span>
            </span>
            <span className="city-chip" aria-hidden="true">
              <span className="city-chip-label city-chip-label--nyc">NYC</span>
              <span className="city-chip-label city-chip-label--trt">TRT</span>
            </span>
          </span>
        </h1>
        <HeroCurrently />
        </div>
      </header>

      <div className="main-nav">
        <nav
          className={`tabs${tabSwitching ? " is-switching" : ""}`}
          ref={tabsNavRef}
          aria-label="Site sections"
        >
          <span className="tabs__thumb" ref={tabThumbRef} aria-hidden="true" />
          {tabs.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => {
                tabBtnRefs.current[i] = el;
              }}
              type="button"
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => selectTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <section
        key={activeTab}
        className={`tab-panel tab-panel--dir-${tabPanelDir === 0 ? "none" : tabPanelDir > 0 ? "fwd" : "back"}`}
        aria-labelledby={`tab-${activeTab}`}
        id={`panel-${activeTab}`}
      >
        {activeTab === "work" && (
          <div className="project-grid" role="list">
            {WORK_PROJECTS.map((project) => (
              <div key={project.id} className="project-grid__item" role="listitem">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "play" && (
          <div className="project-grid project-grid--play" role="list">
            {PLAY_PROJECTS.map((project) => (
              <div key={project.id} className="project-grid__item" role="listitem">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "about" && <AboutPanel />}
      </section>
    </div>
  );
}
