import { PLAY_PROJECTS, WORK_PROJECTS, getRelatedProjects } from "../data/projects.js";
import { getCaseStudy } from "../data/caseStudies/index.js";
import { getPlayStudy } from "../data/play/index.js";

function resolveThumbSrc(project) {
  if (project.thumbnail) return { type: "image", src: project.thumbnail };
  if (project.thumbnailSlides?.length) return { type: "image", src: project.thumbnailSlides[0] };
  if (project.cover) return { type: "image", src: project.cover };
  if (project.thumbnailVideo) return { type: "video", src: project.thumbnailVideo };
  return null;
}

function SeeMoreThumb({ project }) {
  const media = resolveThumbSrc(project);
  if (!media) {
    return <div className="cs-see-more__placeholder" aria-hidden="true" />;
  }

  if (media.type === "video") {
    return (
      <video
        className="cs-see-more__media"
        src={media.src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      className="cs-see-more__media"
      src={media.src}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}

function getWorkRelated(currentId) {
  const withStudies = WORK_PROJECTS.filter(
    (project) => !project.displayOnly && getCaseStudy(project.id)
  );
  return getRelatedProjects(withStudies, currentId, 3);
}

function getPlayRelated(currentId) {
  const withStudies = PLAY_PROJECTS.filter((project) => {
    if (project.displayOnly) return false;
    const study = getPlayStudy(project.id);
    return Boolean(study?.sections || study?.playground || study?.videoOnly);
  });
  return getRelatedProjects(withStudies, currentId, 3);
}

export default function CaseStudySeeMore({ studyId, kind = "work", onSelect }) {
  const related =
    kind === "play" ? getPlayRelated(studyId) : getWorkRelated(studyId);

  if (!related.length) return null;

  return (
    <section className="cs-see-more" aria-label="More case studies">
      <p className="cs-see-more__label">See more</p>
      <div className="cs-see-more__grid">
        {related.map((project) => (
          <button
            key={project.id}
            type="button"
            className="cs-see-more__card"
            onClick={() => onSelect?.(project.id)}
            aria-label={`Open ${project.title}`}
          >
            <div className={`cs-see-more__thumb cs-see-more__thumb--${project.theme || "default"}`}>
              <SeeMoreThumb project={project} />
            </div>
            <p className="cs-see-more__title">{project.title}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
