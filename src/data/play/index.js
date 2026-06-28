import { assetUrl } from "../../utils/assetUrl.js";
import { ANATOMY_OF_A_MEMORY } from "./anatomy-of-a-memory.js";

export const PLAY_BY_ID = {
  "anatomy-of-a-memory": {
    type: "play",
    data: {
      ...ANATOMY_OF_A_MEMORY,
      previewVideo: assetUrl("/play/anatomy-thumb.mov")
    }
  }
};

export function getPlayEntry(id) {
  return PLAY_BY_ID[id] ?? null;
}
