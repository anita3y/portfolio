import { assetUrl } from "../utils/assetUrl.js";

export const WORK_PROJECTS = [
  {
    id: "world-affairs-conference",
    title: "World Affairs Conference",
    year: "2024",
    subtitle: "Registration that works on event day",
    tags: ["Systems", "Registration", "Physical × digital"],
    href: "#",
    thumbnail: assetUrl("/thumbnails/wac.png"),
    thumbnailVideo: assetUrl("/case-studies/wac/demos/admin-tags.mov"),
    theme: "wac"
  },
  {
    id: "design-for-america",
    title: "Design for America",
    year: "2025",
    subtitle: "Scalable nonprofit site, easier to navigate",
    tags: ["Framer", "Content strategy", "Nonprofit"],
    href: "#",
    thumbnailSlides: [
      assetUrl("/thumbnails/dfa/frame-02.png"),
      assetUrl("/thumbnails/dfa/frame-01.png"),
      assetUrl("/thumbnails/dfa/frame-03.png"),
      assetUrl("/thumbnails/dfa/frame-04.png")
    ],
    thumbnailSlideInterval: 500,
    theme: "dfa"
  },
  {
    id: "chatgpt-branches",
    title: "ChatGPT Branches",
    year: "2025",
    subtitle: "Familiar navigation for long AI chats",
    tags: ["Concept", "AI product", "Research"],
    href: "#",
    thumbnail: assetUrl("/thumbnails/chatgpt-branches.jpg"),
    thumbnailVideo: assetUrl("/thumbnails/chatgpt-branches-card.mov"),
    theme: "branches"
  }
];

export const PLAY_PROJECTS = [
  {
    id: "anatomy-of-a-memory",
    title: "Anatomy of a Memory",
    year: "2026",
    subtitle: "Interactive · Multimedia",
    tags: ["Storytelling", "Web Audio", "Interactive"],
    href: "#",
    thumbnail: assetUrl("/thumbnails/anatomy-of-a-memory.jpg"),
    thumbnailVideo: assetUrl("/thumbnails/anatomy-of-a-memory-card.mov"),
    theme: "memory"
  },
  {
    id: "femizon-website",
    title: "Femizon Website",
    year: "2025",
    subtitle: "Website walkthrough",
    tags: ["Web", "Motion"],
    href: "#",
    thumbnailVideo: assetUrl("/thumbnails/femizon-website-card.mov"),
    theme: "femizon",
    displayOnly: true
  }
];
