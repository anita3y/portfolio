import { assetUrl } from "../utils/assetUrl.js";
import { POSTER_FRAMES } from "./play/posters.js";

/** Individual Play page entries — easy to append more later. */
export const PLAY_ARTIFACTS = [
  {
    id: "carousel",
    title: "album carousel",
    kind: "carousel",
    size: "md",
    thumbnail: assetUrl("/play/thumbs/album-carousel.gif")
  },
  {
    id: "sticker-sheet",
    title: "Sticker sheet",
    kind: "stickers",
    size: "tall",
    thumbnail: assetUrl("/thumbnails/play/sticker-collection.png") + "?v=4"
  },
  {
    id: "posters",
    title: "Posters",
    kind: "posters",
    size: "md",
    thumbnail: POSTER_FRAMES[0]?.src,
    thumbnailSlides: POSTER_FRAMES.map((frame) => frame.src)
  }
];

export function getPlayArtifact(id) {
  return PLAY_ARTIFACTS.find((artifact) => artifact.id === id) ?? null;
}

export const PLAY_ARTIFACT_IDS = new Set(PLAY_ARTIFACTS.map((a) => a.id));
