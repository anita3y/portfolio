import { ANATOMY_OF_A_MEMORY } from "./anatomy-of-a-memory.js";
import { ARTIFACTS_POSTER } from "./artifacts-poster.js";
import { FEMIZON_WEBSITE } from "./femizon-website.js";

export const PLAY_BY_ID = {
  "anatomy-of-a-memory": {
    type: "play",
    data: ANATOMY_OF_A_MEMORY
  },
  "artifacts-poster": {
    type: "play",
    data: ARTIFACTS_POSTER
  },
  "femizon-website": {
    type: "play",
    data: FEMIZON_WEBSITE
  }
};

export function getPlayEntry(id) {
  return PLAY_BY_ID[id] ?? null;
}

export function getPlayStudy(id) {
  return PLAY_BY_ID[id]?.data ?? null;
}
