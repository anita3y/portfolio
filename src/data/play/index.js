import { assetUrl } from "../../utils/assetUrl.js";
import { ANATOMY_OF_A_MEMORY } from "./anatomy-of-a-memory.js";
import { MY_GALLERY } from "./my-gallery.js";
import { OUR_BOOKSHELF } from "./our-bookshelf.js";

export const PLAY_BY_ID = {
  "anatomy-of-a-memory": {
    type: "play",
    data: {
      ...ANATOMY_OF_A_MEMORY,
      previewVideo: assetUrl("/play/anatomy-thumb.mov")
    }
  },
  "our-bookshelf": {
    type: "play",
    data: OUR_BOOKSHELF
  },
  "my-gallery": {
    type: "gallery",
    data: MY_GALLERY
  }
};

export function getPlayEntry(id) {
  return PLAY_BY_ID[id] ?? null;
}
