import { assetUrl } from "../utils/assetUrl.js";
import { POSTER_FRAMES } from "./play/posters.js";

/** Individual Play page entries — easy to append more later. */
export const PLAY_ARTIFACTS = [
  {
    id: "stopmotion",
    title: "Stopmotion",
    kind: "video",
    size: "md",
    hideChromeLabel: true,
    thumbnailVideo: assetUrl("/play/stopmotion/stopMotionCollageBlack.mp4") + "?v=1",
    video: assetUrl("/play/stopmotion/stopMotionCollageBlack.mp4") + "?v=1"
  },
  {
    id: "carousel",
    title: "Album carousel",
    kind: "carousel",
    size: "md",
    hideChromeLabel: true,
    thumbnailVideo: assetUrl("/play/carousel/carousel.mov") + "?v=1"
  },
  {
    id: "stickers",
    title: "Stickers",
    kind: "stickers",
    size: "md",
    hideChromeLabel: true,
    thumbnailVideo: assetUrl("/play/stickers/stickerSheet.mp4") + "?v=1"
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
