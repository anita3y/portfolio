import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useLocation } from "react-router-dom";
import AboutPanel from "../components/AboutPanel.jsx";
import { PlayPicker, PlayStudy } from "../components/PlayStage.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import StatusCorner from "../components/StatusCorner.jsx";
import WorkExpandPanel from "../components/WorkExpandPanel.jsx";
import { PLAY_PROJECTS, WORK_PROJECTS } from "../data/projects.js";
import { assetUrl } from "../utils/assetUrl.js";

const TABS = [
  { id: "work", label: "work" },
  { id: "play", label: "play" },
  { id: "about", label: "about" }
];
const TAB_IDS = TABS.map((tab) => tab.id);

const FOLDER_CLOSED = assetUrl("/hero/stickers/folder-closed.png");
const FOLDER_OPEN = assetUrl("/hero/stickers/folder-open.png");
const ENVELOPE_CLOSED = assetUrl("/hero/stickers/envelope-closed.png") + "?v=2";
const ENVELOPE_OPEN = assetUrl("/hero/stickers/envelope-open.png") + "?v=3";
const ABOUT_STAMP = assetUrl("/hero/stickers/about-stamp.png") + "?v=3";
const SCRIBBLE_ROLE_NOTE = assetUrl("/hero/stickers/scribbles/role-note.png");
const SCRIBBLE_ROLE_UNDERLINE = assetUrl("/hero/stickers/scribbles/role-underline.png");
const SCRIBBLE_CRAFT = assetUrl("/hero/stickers/scribbles/craft.png");
const SCRIBBLE_SIMPLICITY = assetUrl("/hero/stickers/scribbles/simplicity.png");

const playIds = new Set(PLAY_PROJECTS.filter((p) => !p.displayOnly).map((p) => p.id));
const workIds = new Set(WORK_PROJECTS.filter((p) => !p.displayOnly).map((p) => p.id));

function HeroTugSticker({ src, className = "", children }) {
  const ref = useRef(null);
  const [tug, setTug] = useState({ x: 0, y: 0, hovering: false });

  const onPointerMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const nx = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
    const ny = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
    setTug({
      x: Math.max(-1, Math.min(1, nx)) * 8,
      y: Math.max(-1, Math.min(1, ny)) * 6,
      hovering: true
    });
  };

  const onPointerLeave = () => {
    setTug({ x: 0, y: 0, hovering: false });
  };

  return (
    <span
      ref={ref}
      className={`hero-stamp ${className}${tug.hovering ? " is-tugging" : ""}`}
      data-cuelume-hover="sparkle"
      style={{
        "--tug-x": `${tug.x.toFixed(2)}px`,
        "--tug-y": `${tug.y.toFixed(2)}px`
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children ?? <img className="hero-stamp__img" src={src} alt="" draggable={false} />}
    </span>
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

  const [selectedPlayId, setSelectedPlayId] = useState(
    initialOpenPlay ?? "sticker-collection"
  );
  const [openWorkId, setOpenWorkId] = useState(initialOpenWork);
  const [activeTab, setActiveTab] = useState(requestedTab ?? "work");
  const [navGrow, setNavGrow] = useState(0);
  const navRef = useRef(null);
  const navGrowRef = useRef(0);

  useEffect(() => {
    document.title = "anita yan | Portfolio";
  }, []);

  useEffect(() => {
    const playId = location.state?.openPlay;
    if (typeof playId === "string" && playIds.has(playId)) {
      setSelectedPlayId(playId);
      setActiveTab("play");
    }
  }, [location.state?.openPlay]);

  useEffect(() => {
    const workId = location.state?.openWork;
    if (typeof workId === "string" && workIds.has(workId)) {
      setOpenWorkId(workId);
      setActiveTab("work");
    }
  }, [location.state?.openWork]);

  useEffect(() => {
    if (requestedTab) {
      setActiveTab(requestedTab);
      setOpenWorkId(null);
    }
  }, [requestedTab]);

  useEffect(() => {
    let frame = 0;

    const updateNav = () => {
      const nav = navRef.current;
      if (!nav) return;

      const top = nav.getBoundingClientRect().top;
      const range = Math.max(window.innerHeight * 0.38, 180);
      const nextGrow = Math.max(0, Math.min(1, 1 - (top - 10) / range));
      const roundedGrow = Math.round(nextGrow * 32) / 32;
      if (roundedGrow !== navGrowRef.current) {
        navGrowRef.current = roundedGrow;
        setNavGrow(roundedGrow);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateNav();
      });
    };

    updateNav();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectTab = useCallback((id) => {
    setActiveTab(id);
    if (id !== "work") setOpenWorkId(null);
    if (id === "play") setSelectedPlayId("sticker-collection");
    if (id === "about") {
      window.requestAnimationFrame(() => {
        document.querySelector(".chrome-sticky")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  }, []);

  const activeTabIndex = Math.max(
    0,
    TABS.findIndex((tab) => tab.id === activeTab)
  );

  return (
    <div
      className={`page page--vertical${activeTab === "about" ? " page--about" : ""}`}
      style={{ "--nav-grow": navGrow }}
    >
      <StatusCorner />

      <header className="hero">
        <h1 className="hero__lockup">
          <span className="hero__line">
            Anita Yan
            <HeroTugSticker className="hero-stamp--folder">
              <span className="hero-sticker hero-sticker--folder">
                <img
                  className="hero-sticker__img hero-sticker__img--closed"
                  src={FOLDER_CLOSED}
                  alt=""
                  draggable={false}
                />
                <img
                  className="hero-sticker__img hero-sticker__img--open"
                  src={FOLDER_OPEN}
                  alt=""
                  draggable={false}
                />
              </span>
            </HeroTugSticker>
            is a{" "}
            <span className="hero-mark hero-mark--role">
              <span className="hero-mark__text">product designer</span>
              <img
                className="hero-scribble hero-scribble--role-note"
                src={SCRIBBLE_ROLE_NOTE}
                alt=""
                draggable={false}
              />
              <img
                className="hero-scribble hero-scribble--role-underline"
                src={SCRIBBLE_ROLE_UNDERLINE}
                alt=""
                draggable={false}
              />
            </span>
          </span>
          <span className="hero__line">
            focused on{" "}
            <span className="hero-mark hero-mark--craft">
              <span className="hero-mark__text">craft</span>
              <img
                className="hero-scribble hero-scribble--craft"
                src={SCRIBBLE_CRAFT}
                alt=""
                draggable={false}
              />
            </span>
            <HeroTugSticker className="hero-stamp--envelope">
              <span className="hero-sticker hero-sticker--envelope">
                <img
                  className="hero-sticker__img hero-sticker__img--closed"
                  src={ENVELOPE_CLOSED}
                  alt=""
                  draggable={false}
                />
                <img
                  className="hero-sticker__img hero-sticker__img--open"
                  src={ENVELOPE_OPEN}
                  alt=""
                  draggable={false}
                />
              </span>
            </HeroTugSticker>
            +{" "}
            <span className="hero-mark hero-mark--simplicity">
              <span className="hero-mark__text">simplicity</span>
              <img
                className="hero-scribble hero-scribble--simplicity"
                src={SCRIBBLE_SIMPLICITY}
                alt=""
                draggable={false}
              />
            </span>
            <HeroTugSticker className="hero-stamp--about" src={ABOUT_STAMP} />
          </span>
        </h1>
      </header>

      <div
        className={`chrome-sticky${
          activeTab === "play" ? " chrome-sticky--play" : activeTab === "about" ? " chrome-sticky--about" : ""
        }`}
      >
        <div className="main-nav">
          <nav
            ref={navRef}
            className="tabs tabs--select"
            style={{ "--tab-i": activeTabIndex }}
            data-active={activeTab}
            aria-label="Site sections"
            role="tablist"
          >
            <span className="tabs__thumb" aria-hidden="true" />
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                className={`tab${activeTab === tab.id ? " active" : ""}`}
                aria-selected={activeTab === tab.id}
                onClick={() => selectTab(tab.id)}
                data-cuelume-toggle="toggle"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <section
        className={`tab-panel${activeTab === "about" ? " tab-panel--about" : ""}`}
        id={`panel-${activeTab}`}
        aria-label={activeTab}
      >
        {activeTab === "play" && (
          <PlayPicker
            projects={PLAY_PROJECTS}
            selectedId={selectedPlayId}
            onSelect={setSelectedPlayId}
          />
        )}
        {activeTab === "work" && (
          <div className="project-grid" role="list">
            {WORK_PROJECTS.map((project) => (
              <div key={project.id} className="project-grid__item" role="listitem">
                <ProjectCard
                  project={project}
                  onExpand={
                    project.displayOnly
                      ? undefined
                      : () => setOpenWorkId(project.id)
                  }
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "play" && (
          <PlayStudy
            projects={PLAY_PROJECTS}
            selectedId={selectedPlayId}
            onSelect={setSelectedPlayId}
          />
        )}

        {activeTab === "about" && <AboutPanel />}
      </section>

      <SiteFooter />

      {openWorkId && (
        <WorkExpandPanel
          workId={openWorkId}
          onClose={() => setOpenWorkId(null)}
          onNavigate={setOpenWorkId}
          onSelectTab={(tabId) => {
            setOpenWorkId(null);
            selectTab(tabId);
          }}
        />
      )}
    </div>
  );
}
