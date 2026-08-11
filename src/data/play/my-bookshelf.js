import { assetUrl } from "../../utils/assetUrl.js";

const PREVIEW_VIDEO = assetUrl("/thumbnails/my-bookshelf-card.mov");
const PREVIEW_SLIDES = [
  assetUrl("/thumbnails/bookshelf/steve-lacy.png"),
  assetUrl("/thumbnails/bookshelf/grand-budapest.png")
];

export const MY_BOOKSHELF = {
  id: "my-bookshelf",
  breadcrumb: ["Portfolio", "Play: My Bookshelf"],
  backTab: "play",
  title: "My Bookshelf",
  meta: {
    role: "Personal media library",
    timeline: "2025",
    tools: ["Web", "Catalog", "Interactive"]
  },
  heroVideo: PREVIEW_VIDEO,
  heroSlides: PREVIEW_SLIDES,
  heroAspectRatio: "1372 / 908",
  heroBorderless: true,
  heroBackground: "#f0ecf8",
  actions: {
    liveUrl: "https://anita3y.github.io/my-bookshelf/",
    launchLabel: "Open bookshelf",
    launchTheme: "bookshelf",
    centered: true
  },
  sections: [
    {
      id: "experience",
      title: "The Experience",
      summary:
        "A personal media library for tracking favorites—books, films, and music—with room to pin top picks and ask for AI-curated recommendations.",
      blocks: [
        {
          paragraphs: [
            "Built as a small web app to keep what I'm reading, watching, and listening to in one place, and to make browsing those favorites feel a little more like flipping through a shelf than a spreadsheet."
          ]
        }
      ]
    },
    {
      id: "try",
      title: "Try this",
      summary: "A few ways to poke around.",
      blocks: [
        {
          bullets: [
            "Browse the shelf and open a few favorites.",
            "Pin something to Top Favorites.",
            "Ask AI for recommendations based on what's already there."
          ]
        }
      ]
    },
    {
      id: "why",
      title: "Why I made this",
      summary:
        "Play projects are where I try ideas that sit between utility and personality—tools that still feel like me.",
      blocks: [
        {
          paragraphs: [
            "I wanted a lightweight catalog that felt personal instead of generic, and a place to experiment with how recommendations and collections can feel more human."
          ]
        }
      ]
    }
  ]
};
