import { assetUrl } from "../../utils/assetUrl.js";

const VIDEO = assetUrl("/thumbnails/artifacts-poster-card.mov");

export const ARTIFACTS_POSTER = {
  id: "artifacts-poster",
  title: "Artifacts Poster",
  videoOnly: true,
  lightBackground: true,
  heroVideo: VIDEO
};
