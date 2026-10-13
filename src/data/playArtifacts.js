import { assetUrl } from "../utils/assetUrl.js";
import { PLAY_PROJECTS } from "./projects.js";

/** Individual Play page entries — easy to append more later. */
export const PLAY_ARTIFACTS = [
  {
    id: "carousel",
    title: "Carousel",
    kind: "carousel",
    size: "wide",
    /** Cover stack for the thumbnail collage (placeholder until real thumbs). */
    covers: PLAY_PROJECTS.filter((p) => p.cover).map((p) => ({
      id: p.id,
      src: p.cover,
      title: p.title
    }))
  },
  {
    id: "sticker-sheet",
    title: "Sticker sheet",
    kind: "stickers",
    size: "tall",
    thumbnail: assetUrl("/thumbnails/play/sticker-collection.png") + "?v=4"
  }
];

export function getPlayArtifact(id) {
  return PLAY_ARTIFACTS.find((artifact) => artifact.id === id) ?? null;
}

export const PLAY_ARTIFACT_IDS = new Set(PLAY_ARTIFACTS.map((a) => a.id));
