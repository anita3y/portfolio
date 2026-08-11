import { assetUrl } from "../../utils/assetUrl.js";

const POSTER_FRAMES = [
  assetUrl("/thumbnails/poster-designs/frame-01.png"),
  assetUrl("/thumbnails/poster-designs/frame-02.png"),
  assetUrl("/thumbnails/poster-designs/frame-03.png"),
  assetUrl("/thumbnails/poster-designs/frame-04.png"),
  assetUrl("/thumbnails/poster-designs/frame-05.png"),
  assetUrl("/thumbnails/poster-designs/frame-06.png"),
  assetUrl("/thumbnails/poster-designs/frame-07.png")
];

export const POSTER_DESIGNS_CASE_STUDY = {
  id: "poster-designs",
  breadcrumb: ["Portfolio", "Work: Poster Designs"],
  title: "Poster Designs",
  details: [],
  meta: {
    role: "Visual design",
    timeline: "2026",
    tools: ["Poster design"]
  },
  heroSlides: POSTER_FRAMES,
  heroSlideInterval: 1000,
  heroAspectRatio: "1024 / 672",
  heroFit: "contain",
  heroBackground: "#000",
  sections: []
};
