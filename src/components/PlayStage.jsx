import { useCallback, useEffect, useRef, useState } from "react";
import { getPlayStudy } from "../data/play/index.js";
import { CaseStudyFullContent } from "./CaseStudyContent.jsx";
import StickerPlayground from "./StickerPlayground.jsx";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function cardTransform(offset, reduced) {
  const abs = Math.abs(offset);
  const rotateY = reduced || offset === 0 ? 0 : offset < 0 ? 58 : -58;
  const x = offset * (reduced ? 9.6 : 8.55);
  const z = offset === 0 ? 56 : 22 - abs * 16;
  const scale = offset === 0 ? 1.04 : Math.max(0.82, 1 - abs * 0.06);

  return {
    transform: `translate(-50%, -50%) translateX(${x}rem) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
    zIndex: 40 - abs,
    opacity: abs > 3 ? 0 : 1
  };
}

function PlayMetaHeader({ project, title }) {
  return <h2 className="cs-title">{title || project.headline || project.title}</h2>;
}

function PlayVideoEmbed({ project, study }) {
  const videoRef = useRef(null);
  const videoSrc =
    typeof study.heroVideo === "string" ? study.heroVideo : study.heroVideo?.src;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    video.muted = true;
    const play = () => {
      video.play().catch(() => {});
    };
    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, [videoSrc]);

  return (
    <div
      className={[
        "play-embed",
        "play-embed--video",
        study.id === "femizon-website" && "play-embed--femizon"
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <PlayMetaHeader project={project} title={project.headline || study.title} />
      {videoSrc && (
        <div className="play-embed__video-frame">
          <video
            ref={videoRef}
            className="play-embed__video"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback"
            aria-label={study.title}
          />
        </div>
      )}
    </div>
  );
}

export function PlayPicker({ projects, selectedId, onSelect }) {
  const reducedMotion = usePrefersReducedMotion();
  const selectedIndex = Math.max(
    0,
    projects.findIndex((project) => project.id === selectedId)
  );
  const selected = projects[selectedIndex] ?? projects[0];

  const stageRef = useRef(null);
  const scrubberRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startIndex: 0,
    moved: false,
    pointerId: null
  });

  const selectIndex = useCallback(
    (index) => {
      const next = clamp(index, 0, projects.length - 1);
      const project = projects[next];
      if (project && project.id !== selectedId) onSelect(project.id);
    },
    [onSelect, projects, selectedId]
  );
  const selectIndexRef = useRef(selectIndex);
  selectIndexRef.current = selectIndex;
  const projectCount = projects.length;

  useEffect(() => {
    const onKey = (event) => {
      const stage = stageRef.current;
      if (!stage) return;
      if (!stage.contains(document.activeElement) && document.activeElement !== stage) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectIndex(selectedIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        selectIndex(selectedIndex + 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectIndex, selectedIndex]);

  const indexFromScrubberX = (clientX) => {
    const rect = scrubberRef.current?.getBoundingClientRect();
    if (!rect || projectCount <= 1) return 0;
    const t = clamp((clientX - rect.left) / rect.width, 0, 1);
    return Math.round(t * (projectCount - 1));
  };

  useEffect(() => {
    const onMove = (event) => {
      const drag = dragRef.current;
      if (!drag.active) return;
      if (drag.mode === "scrubber") {
        const rect = scrubberRef.current?.getBoundingClientRect();
        const count = projectCount;
        if (!rect || count <= 1) return;
        const t = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        selectIndexRef.current(Math.round(t * (count - 1)));
        return;
      }
      if (Math.abs(event.clientX - drag.startX) > 8) drag.moved = true;
      if (!drag.moved) return;
      selectIndexRef.current(
        clamp(
          drag.startIndex - Math.round((event.clientX - drag.startX) / 72),
          0,
          projectCount - 1
        )
      );
    };

    const onUp = () => {
      dragRef.current.active = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [projectCount]);

  const onStagePointerDown = (event) => {
    if (event.button != null && event.button !== 0) return;
    dragRef.current = {
      active: true,
      mode: "flow",
      startX: event.clientX,
      startIndex: selectedIndex,
      moved: false
    };
  };

  const onCardClick = (event, projectId) => {
    if (dragRef.current.moved) {
      event.preventDefault();
      return;
    }
    onSelect(projectId);
  };

  const onScrubberPointerDown = (event) => {
    if (event.button != null && event.button !== 0) return;
    dragRef.current = {
      active: true,
      mode: "scrubber",
      startX: event.clientX,
      startIndex: selectedIndex,
      moved: true
    };
    selectIndex(indexFromScrubberX(event.clientX));
  };

  if (!selected) return null;

  return (
    <div className="play-picker">
      <div className="play-flow-clip">
        <div
          ref={stageRef}
          className="play-flow"
          tabIndex={0}
          role="listbox"
          aria-label="Play case studies"
          aria-activedescendant={`play-cover-${selected.id}`}
          onPointerDown={onStagePointerDown}
        >
        {projects.map((project, index) => {
          const offset = index - selectedIndex;
          const isSelected = project.id === selected.id;

          return (
            <button
              key={project.id}
              id={`play-cover-${project.id}`}
              type="button"
              role="option"
              aria-selected={isSelected}
              className={`play-flow__card${isSelected ? " is-selected" : ""}`}
              style={cardTransform(offset, reducedMotion)}
              onClick={(event) => onCardClick(event, project.id)}
              data-cuelume-hover="tick"
              data-cuelume-press="page"
            >
              <span className="play-flow__lift">
                <img src={project.cover} alt="" draggable={false} />
              </span>
              <span className="visually-hidden">{project.title}</span>
            </button>
          );
        })}
        </div>
      </div>

      <div
        ref={scrubberRef}
        className="play-scrubber"
        role="tablist"
        aria-label="Case study position"
        onPointerDown={onScrubberPointerDown}
      >
        {projects.map((project) => {
          const isSelected = project.id === selected.id;
          return (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={project.title}
              className={`play-scrubber__tick${isSelected ? " is-selected" : ""}`}
              onClick={() => onSelect(project.id)}
              data-cursor-hover=""
              data-cuelume-hover="tick"
              data-cuelume-press="tick"
            />
          );
        })}
      </div>
    </div>
  );
}

export function PlayStudy({ projects, selectedId, onSelect }) {
  const selectedIndex = Math.max(
    0,
    projects.findIndex((project) => project.id === selectedId)
  );
  const selected = projects[selectedIndex] ?? projects[0];
  const study = selected ? getPlayStudy(selected.id) : null;
  const studyRef = useRef(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const studyEl = studyRef.current;
    const chrome = document.querySelector(".chrome-sticky");
    const picker = document.querySelector(".play-picker");
    if (!studyEl || !chrome) return;
    if (picker && picker.getBoundingClientRect().bottom > chrome.getBoundingClientRect().bottom + 48) {
      return;
    }
    const delta = studyEl.getBoundingClientRect().top - chrome.getBoundingClientRect().bottom;
    if (Math.abs(delta) > 4) {
      window.scrollBy({ top: delta, behavior: "auto" });
    }
  }, [selectedId]);

  if (!selected) return null;

  return (
    <div className="play-stage__study" ref={studyRef}>
      <div key={selected.id}>
        {study?.playground ? (
          <StickerPlayground project={selected} />
        ) : study?.videoOnly ? (
          <PlayVideoEmbed project={selected} study={study} />
        ) : study?.sections ? (
          <CaseStudyFullContent
            study={study}
            compact={false}
            hideNav
            hideTabs
          />
        ) : (
          <div className="play-embed play-embed--simple">
            <PlayMetaHeader project={selected} />
          </div>
        )}
      </div>
    </div>
  );
}
