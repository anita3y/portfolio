import { assetUrl } from "../utils/assetUrl.js";

export const WORK_PROJECTS = [
  {
    id: "world-affairs-conference",
    title: "World Affairs Conference",
    headline: "Unified registration process for 1,000+ attendees",
    company: "World Affairs Conference",
    status: "Shipped",
    year: "2025",
    tags: ["Systems", "Registration", "Physical × digital"],
    href: "#",
    thumbnail: assetUrl("/thumbnails/wac-thumbnail.png"),
    theme: "wac"
  },
  {
    id: "design-for-america",
    title: "Design for America",
    headline: "Modular Framer website, with handoff-first IA",
    company: "Design for America @ NYU",
    status: "Shipped",
    year: "2026",
    tags: ["Framer", "Content strategy", "Nonprofit"],
    href: "#",
    thumbnailSlides: [
      assetUrl("/thumbnails/dfa/frame-10.png"),
      assetUrl("/thumbnails/dfa/frame-11.png"),
      assetUrl("/thumbnails/dfa/frame-12.png"),
      assetUrl("/thumbnails/dfa/frame-13.png")
    ],
    thumbnailSlideInterval: 1000,
    theme: "dfa"
  },
  {
    id: "poster-designs",
    title: "Poster Designs",
    headline: "Poster Designs",
    company: "Personal",
    status: "Exploration",
    year: "2026",
    tags: ["Visual design", "Posters"],
    href: "#",
    thumbnailSlides: [
      assetUrl("/thumbnails/poster-designs/frame-01.png"),
      assetUrl("/thumbnails/poster-designs/frame-02.png"),
      assetUrl("/thumbnails/poster-designs/frame-03.png"),
      assetUrl("/thumbnails/poster-designs/frame-04.png"),
      assetUrl("/thumbnails/poster-designs/frame-05.png"),
      assetUrl("/thumbnails/poster-designs/frame-06.png"),
      assetUrl("/thumbnails/poster-designs/frame-07.png")
    ],
    thumbnailSlideInterval: 380,
    thumbnailSlideOnHover: true,
    theme: "poster-designs"
  },
  {
    id: "vanity-beauty",
    title: "Vanity Beauty App",
    headline: "Low-friction onboarding for iOS app",
    company: "Vanity Beauty App",
    status: "Shipping...",
    year: "2026",
    tabYear: "coming soon..",
    tags: ["iOS", "Onboarding", "Mobile"],
    href: "#",
    thumbnailVideo: assetUrl("/thumbnails/vanity/card.mov"),
    theme: "vanity"
  },
  {
    id: "chatgpt-branches",
    title: "ChatGPT Branches",
    headline: "Familiar navigation for long AI chats",
    company: "ChatGPT Branches",
    status: "Concept",
    year: "2026",
    tags: ["Concept", "AI product", "Research"],
    href: "#",
    thumbnail: assetUrl("/thumbnails/chatgpt-branches.jpg"),
    thumbnailVideo: assetUrl("/thumbnails/chatgpt-branches-card.mov"),
    theme: "branches"
  },
  {
    id: "pivotal-moments",
    title: "New York Design Club",
    headline: "Making 10k+ impressions through Instagram posts and reels",
    company: "New York Design Club",
    status: "Marketing",
    year: "2026",
    tags: ["Instagram", "Growth", "Editorial"],
    href: "#",
    thumbnailVideo: assetUrl("/thumbnails/nydc/card.mov"),
    theme: "pivotal"
  }
];

export const PLAY_PROJECTS = [
  {
    id: "degreeplanning",
    title: "Degree Planning",
    headline: "Graduation planner",
    company: "Degree Planning",
    status: "Shipped",
    year: "2025",
    tags: ["Web", "Planning", "Interactive"],
    href: "#",
    thumbnailVideo: assetUrl("/thumbnails/degreeplanning-card.mov"),
    cover: assetUrl("/thumbnails/play/degreeplanning.png") + "?v=2",
    theme: "degree"
  },
  {
    id: "anatomy-of-a-memory",
    title: "Anatomy of a Memory",
    headline: "Anatomy of a Memory",
    company: "Personal",
    status: "Concept",
    year: "2026",
    tags: ["Storytelling", "Web Audio", "Interactive"],
    href: "#",
    thumbnail: assetUrl("/thumbnails/anatomy-of-a-memory.jpg"),
    thumbnailVideo: assetUrl("/thumbnails/anatomy-of-a-memory-card.mov"),
    cover: assetUrl("/thumbnails/play/anatomy-of-a-memory.png"),
    theme: "memory"
  },
  {
    id: "sticker-collection",
    title: "Sticker Collection",
    headline: "Sticker collection",
    company: "Personal",
    status: "Exploration",
    year: "2026",
    tags: ["Visual design"],
    href: "#",
    cover: assetUrl("/thumbnails/play/sticker-collection.png") + "?v=4",
    theme: "stickers"
  },
  {
    id: "my-bookshelf",
    title: "My Bookshelf",
    headline: "Personal media library",
    company: "My Bookshelf",
    status: "Shipped",
    year: "2025",
    tags: ["Web", "Catalog", "Interactive"],
    href: "#",
    thumbnailVideo: assetUrl("/thumbnails/my-bookshelf-card.mov"),
    thumbnailSlides: [
      assetUrl("/thumbnails/bookshelf/steve-lacy.png"),
      assetUrl("/thumbnails/bookshelf/grand-budapest.png")
    ],
    thumbnailSlideInterval: 1200,
    cover: assetUrl("/thumbnails/play/bookshelf.png"),
    theme: "bookshelf"
  },
  {
    id: "femizon-website",
    title: "Femizon Website",
    headline: "Website walkthrough",
    company: "Femizon",
    status: "Shipped",
    year: "2025",
    tags: ["Web", "Motion"],
    href: "#",
    thumbnailVideo: assetUrl("/thumbnails/femizon-website-card.mov"),
    cover: assetUrl("/thumbnails/play/femizon.png") + "?v=3",
    theme: "femizon",
    displayOnly: true
  }
];

export function getNextProject(projects, currentId) {
  const navigable = projects.filter((project) => !project.displayOnly);
  const index = navigable.findIndex((project) => project.id === currentId);
  if (index === -1) return null;
  return navigable[(index + 1) % navigable.length];
}

export function getRelatedProjects(projects, currentId, count = 3) {
  const navigable = projects.filter((project) => !project.displayOnly);
  const index = navigable.findIndex((project) => project.id === currentId);
  if (navigable.length <= 1) return [];

  if (index === -1) return navigable.slice(0, count);

  const related = [];
  for (let offset = 1; offset < navigable.length && related.length < count; offset += 1) {
    related.push(navigable[(index + offset) % navigable.length]);
  }
  return related;
}
