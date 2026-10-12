import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomepageShell from "../components/HomepageShell.jsx";
import NameIntro from "../components/NameIntro.jsx";
import WorkExpandPanel from "../components/WorkExpandPanel.jsx";
import { PLAY_PROJECTS, WORK_PROJECTS } from "../data/projects.js";
import "../styles/geist.css";
import "../styles/v4.css";

const playIds = new Set(
  PLAY_PROJECTS.filter((p) => !p.displayOnly).map((p) => p.id)
);
const workIds = new Set(
  WORK_PROJECTS.filter((p) => !p.displayOnly).map((p) => p.id)
);

export default function Home() {
  const location = useLocation();
  const initialOpenPlay =
    typeof location.state?.openPlay === "string" &&
    playIds.has(location.state.openPlay)
      ? location.state.openPlay
      : null;
  const initialOpenWork =
    typeof location.state?.openWork === "string" &&
    workIds.has(location.state.openWork)
      ? location.state.openWork
      : null;

  const [openWorkId, setOpenWorkId] = useState(initialOpenWork);
  const [introProgress, setIntroProgress] = useState(0);
  const shellEnter = Math.min(
    1,
    Math.max(0, (introProgress - 0.84) / 0.14)
  );
  const shellLocked = introProgress >= 0.98;

  useEffect(() => {
    document.title = "anita yan | Portfolio";
  }, []);

  useEffect(() => {
    const workId = location.state?.openWork;
    if (typeof workId === "string" && workIds.has(workId)) {
      setOpenWorkId(workId);
    }
  }, [location.state?.openWork]);

  useEffect(() => {
    const playId = location.state?.openPlay;
    if (typeof playId === "string" && playIds.has(playId)) {
      // Deep-link into play: skip intro lock so shell can open immediately.
      setIntroProgress(1);
    }
  }, [location.state?.openPlay]);

  const onIntroProgress = useCallback((value) => {
    setIntroProgress(value);
  }, []);

  return (
    <div className="page page--v4">
      <NameIntro onProgress={onIntroProgress} />
      <HomepageShell
        locked={shellLocked}
        enter={shellEnter}
        onOpenWork={(id) => setOpenWorkId(id)}
        onOpenPlay={() => {
          /* Play expands via deep links / future panel — v1 opens stage only */
        }}
      />

      {openWorkId && (
        <WorkExpandPanel
          workId={openWorkId}
          onClose={() => setOpenWorkId(null)}
          onNavigate={setOpenWorkId}
          onSelectTab={() => setOpenWorkId(null)}
        />
      )}
    </div>
  );
}
