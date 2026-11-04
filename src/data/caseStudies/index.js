import { AI_WORKFLOW_CASE_STUDY } from "./ai-workflow.js";
import { DFA_CASE_STUDY } from "./dfa.js";
import { POSTER_DESIGNS_CASE_STUDY } from "./poster-designs.js";

export const CASE_BY_ID = {
  "ai-workflow": AI_WORKFLOW_CASE_STUDY,
  "design-for-america": DFA_CASE_STUDY,
  "poster-designs": POSTER_DESIGNS_CASE_STUDY
};

export function getCaseStudy(id) {
  return CASE_BY_ID[id] ?? null;
}
