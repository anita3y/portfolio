export const ABOUT_SECTIONS = [{ id: "hello", title: "Hello!" }];

/** Inline copy with external links — rendered in order */
export const ABOUT_OUTSIDE = [
  { type: "text", value: "Outside of design you'll probably find me logging hidden gems on " },
  { type: "link", label: "Corner", href: "https://www.corner.inc/nita3" },
  { type: "text", value: ", hunting for " },
  {
    type: "vinyls",
    label: "vinyls",
    coverSrc: "/about/vinyl-undercurrent.png",
    recordSrc: "/about/vinyl-record.png",
    alt: "Bill Evans and Jim Hall — Undercurrent album cover with vinyl record"
  },
  { type: "text", value: " in the East Village, or making " },
  { type: "dotted", value: "mango sticky rice", hoverTag: "thai cuisine is one of my favorites!", imageSrc: "/about/mango-sticky-rice.png", imageAlt: "Mango sticky rice on a white plate" },
  { type: "text", value: "." }
];

export const ABOUT_LINKEDIN = "https://www.linkedin.com/in/anita-yan-9ifg3426";

export const ABOUT_PORTRAIT = "/about/portrait-photo.png";

export const ABOUT_LOCATION = "NYC / TRT";

export const ABOUT_EDUCATION = {
  school: "NYU Tisch",
  classYear: "Class of 2029",
  major: "Interactive Media Arts Major",
  minor: "Minor in Psychology"
};

export const ABOUT_PHOTOS = [
  {
    id: "portrait",
    src: ABOUT_PORTRAIT,
    alt: "Portrait of Anita Yan",
    width: 724,
    height: 1086
  },
  {
    id: "flowers",
    src: "/about/photo-flowers.png",
    alt: "Anita with friends and a bouquet of flowers",
    width: 542,
    height: 360
  }
];

export const ABOUT_PHILOSOPHY = [
  {
    before:
      "I'm interested in behavior, systems, and information design, and how these intersect to help people ",
    emphasis: ["think", "decide", "act"],
    after: " more intuitively."
  },
  {
    before: "My work puts that into practice—",
    emphasis: ["solving complex and ambiguous problems"],
    after:
      "—from event registration and nonprofit platforms to AI navigation concepts, structuring experiences that reduce friction and cognitive overload when complexity starts to pile up."
  }
];
