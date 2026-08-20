import { ANATOMY_OF_A_MEMORY } from "./anatomy-of-a-memory.js";
import { DEGREEPLANNING } from "./degreeplanning.js";
import { FEMIZON_WEBSITE } from "./femizon-website.js";
import { MY_BOOKSHELF } from "./my-bookshelf.js";
import { STICKER_COLLECTION } from "./sticker-collection.js";

export const PLAY_BY_ID = {
  "anatomy-of-a-memory": {
    type: "play",
    data: ANATOMY_OF_A_MEMORY
  },
  "my-bookshelf": {
    type: "play",
    data: MY_BOOKSHELF
  },
  degreeplanning: {
    type: "play",
    data: DEGREEPLANNING
  },
  "sticker-collection": {
    type: "play",
    data: STICKER_COLLECTION
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
