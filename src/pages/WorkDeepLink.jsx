import { Navigate, useParams } from "react-router-dom";
import { getCaseStudy } from "../data/caseStudies/index.js";
import { WORK_PROJECTS } from "../data/projects.js";

export default function WorkDeepLink() {
  const { workId } = useParams();
  const study = getCaseStudy(workId);
  const project = WORK_PROJECTS.find((item) => item.id === workId);
  const isDisplayOnly = Boolean(project?.displayOnly);

  if (!study || isDisplayOnly) {
    return <Navigate to="/work" replace />;
  }

  return <Navigate to="/work" state={{ openWork: workId }} replace />;
}
