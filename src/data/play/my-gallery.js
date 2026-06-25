import { assetUrl } from "../../utils/assetUrl.js";

/**
 * Add artwork images to public/gallery/ and set each item's `src`.
 * Example: src: "/gallery/untitled-01.jpg"
 */
export const MY_GALLERY = {
  breadcrumb: ["Portfolio", "Play: My Gallery"],
  title: "My Gallery",
  meta: {
    type: "Art · Personal work",
    tags: ["Drawing", "Painting", "Mixed media"]
  },
  intro: [
    "A collection of personal artwork—experiments in color, form, and storytelling outside of product work.",
    "Pieces span different mediums and moods; more are added as they finish."
  ],
  artworks: [
    {
      id: "piece-01",
      title: "Untitled study I",
      year: "2025",
      medium: "Graphite",
      src: assetUrl("/gallery/piece-01.jpg"),
      aspect: "portrait"
    },
    {
      id: "piece-02",
      title: "Untitled study II",
      year: "2025",
      medium: "Ink & wash",
      src: assetUrl("/gallery/piece-02.jpg"),
      aspect: "square"
    },
    {
      id: "piece-03",
      title: "Color field",
      year: "2024",
      medium: "Acrylic",
      src: assetUrl("/gallery/piece-03.jpg"),
      aspect: "landscape"
    },
    {
      id: "piece-04",
      title: "Interior light",
      year: "2024",
      medium: "Digital",
      src: assetUrl("/gallery/piece-04.jpg"),
      aspect: "portrait"
    },
    {
      id: "piece-05",
      title: "Still life",
      year: "2024",
      medium: "Colored pencil",
      src: assetUrl("/gallery/piece-05.jpg"),
      aspect: "square"
    },
    {
      id: "piece-06",
      title: "Composition in blue",
      year: "2023",
      medium: "Mixed media",
      src: assetUrl("/gallery/piece-06.jpg"),
      aspect: "landscape"
    }
  ]
};
