/** Shared password for gated portfolio case studies. */
export const CASE_STUDY_PASSWORD = "enjoy!";

const STORAGE_PREFIX = "cs-unlocked:";

export function isCaseStudyUnlocked(id) {
  if (!id || typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(`${STORAGE_PREFIX}${id}`) === "1";
  } catch {
    return false;
  }
}

export function unlockCaseStudy(id) {
  if (!id || typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(`${STORAGE_PREFIX}${id}`, "1");
  } catch {
    // Ignore storage failures; unlock still works for the current session in memory.
  }
}

export function getCaseStudyPassword(study) {
  return study?.access?.password ?? CASE_STUDY_PASSWORD;
}
