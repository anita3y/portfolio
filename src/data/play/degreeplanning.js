import { assetUrl } from "../../utils/assetUrl.js";

const PREVIEW_VIDEO = assetUrl("/thumbnails/degreeplanning-card.mov");

export const DEGREEPLANNING = {
  id: "degreeplanning",
  breadcrumb: ["Portfolio", "Play: Degree Planning"],
  backTab: "play",
  title: "Degree Planning",
  meta: {
    role: "Graduation planner",
    timeline: "2025",
    tools: ["Web", "Planning", "Interactive"]
  },
  heroVideo: PREVIEW_VIDEO,
  heroAspectRatio: "1372 / 908",
  heroBorderless: true,
  heroBackground: "#f4f6f8",
  actions: {
    liveUrl: "https://anita3y.github.io/degreeplanning/",
    launchLabel: "Open planner",
    launchTheme: "degree",
    centered: true
  },
  sections: [
    {
      id: "experience",
      title: "The Experience",
      summary:
        "A graduation planner for mapping an NYU Tisch Interactive Media Arts degree—credits, semesters, and a schedule you can reshape as plans change.",
      blocks: [
        {
          paragraphs: [
            "It turns degree requirements into something you can see and rearrange: track credits toward graduation, move courses across Fall and Spring semesters, and switch between grid and schedule views."
          ]
        }
      ]
    },
    {
      id: "try",
      title: "Try this",
      summary: "A few ways to explore the planner.",
      blocks: [
        {
          bullets: [
            "Scan the seeded plan and credit progress.",
            "Move courses between semesters.",
            "Toggle between grid view and schedule view."
          ]
        }
      ]
    },
    {
      id: "why",
      title: "Why I made this",
      summary:
        "Degree planning gets messy fast—I wanted a clearer way to see the path without drowning in spreadsheets.",
      blocks: [
        {
          paragraphs: [
            "This was a chance to design around a real planning problem: making requirements, timing, and progress feel legible enough to actually use when deciding what to take next."
          ]
        }
      ]
    }
  ]
};
