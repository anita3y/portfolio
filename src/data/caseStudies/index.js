import { DFA_CASE_STUDY } from "./dfa.js";
import { POSTER_DESIGNS_CASE_STUDY } from "./poster-designs.js";
import { WAC_CASE_STUDY } from "./wac.js";

export const CASE_BY_ID = {
  "design-for-america": DFA_CASE_STUDY,
  "poster-designs": POSTER_DESIGNS_CASE_STUDY,
  "world-affairs-conference": WAC_CASE_STUDY
};

export function getCaseStudy(id) {
  return CASE_BY_ID[id] ?? null;
}
