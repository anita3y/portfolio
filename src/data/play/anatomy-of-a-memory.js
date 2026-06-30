import { assetUrl } from "../../utils/assetUrl.js";

const PREVIEW_VIDEO = assetUrl("/thumbnails/anatomy-of-a-memory-card.mov");

export const ANATOMY_OF_A_MEMORY = {
  id: "anatomy-of-a-memory",
  breadcrumb: ["Portfolio", "Play: Anatomy of a Memory"],
  backTab: "play",
  title: "Anatomy of a Memory",
  meta: {
    role: "Interactive · Multimedia",
    timeline: "2026",
    tools: ["Storytelling", "Web Audio", "Interactive"]
  },
  heroVideo: PREVIEW_VIDEO,
  heroAspectRatio: "1372 / 908",
  heroBorderless: true,
  actions: {
    liveUrl: "https://anita3y.github.io/anatomyofamemory/",
    launchLabel: "Enter the memory",
    launchTheme: "memory",
    centered: true
  },
  sections: [
    {
      id: "experience",
      title: "The Experience",
      summary:
        "An interactive web piece about piecing together a faded, nostalgic moment—a gathering around a dinner table, layer by layer.",
      blocks: [
        {
          paragraphs: [
            "It uses visual layering, dynamic audio mixing, and poetic captions to explore how sight and sound combine to make a memory feel whole.",
            "Toggle each layer—table, atmosphere, food, people, music—and watch the scene rebuild. Wear headphones if you can; the experience is built around sensory detail."
          ]
        }
      ]
    },
    {
      id: "try",
      title: "Try this",
      summary: "A few ways to get the most out of the piece.",
      blocks: [
        {
          bullets: [
            "Toggle each layer and watch the scene rebuild.",
            "Use the volume sliders to mix the soundscape.",
            "Wear headphones—the experience is built around sensory detail."
          ]
        }
      ]
    },
    {
      id: "why",
      title: "Why I made this",
      summary:
        "Play is where I explore psychology, pacing, and feedback—how small sensory choices change what something feels like.",
      blocks: [
        {
          paragraphs: [
            "Work case studies show how I solve product problems. This piece is less about UI polish and more about understanding how people reconstruct meaning from fragments.",
            "It's a space to experiment with interaction design as emotional architecture—not just usability."
          ]
        }
      ]
    }
  ]
};
