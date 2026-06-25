import { Navigate, useParams } from "react-router-dom";
import { getCaseStudy } from "../data/caseStudies/index.js";

export default function WorkDeepLink() {
  const { workId } = useParams();
  const study = getCaseStudy(workId);

  if (!study) {
    return <Navigate to="/" state={{ tab: "work" }} replace />;
  }

  return <Navigate to="/" state={{ tab: "work", openWork: workId }} replace />;
}
