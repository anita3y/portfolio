import CaseStudyLayout from "../components/CaseStudyLayout.jsx";
import { DFA_CASE_STUDY } from "../data/caseStudies/dfa.js";

export default function DesignForAmericaCaseStudy() {
  return <CaseStudyLayout study={DFA_CASE_STUDY} />;
}
