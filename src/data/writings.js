import { assetUrl } from "../utils/assetUrl.js";

export const DRIVE_NAME = "anita’s drive";

/** Paste essay copy into `body` (string or paragraph array) when ready. */
export const WRITINGS_FOLDERS = [
  {
    id: "writings",
    label: "writings",
    icon: assetUrl("/writings/folder-writings.png"),
    files: [
      {
        id: "my-design-philosophy",
        title: "my (design) philosophy",
        body: [
          "this list is an ever-changing, ever-growing collection of principles related to work (and occasionally life) that i rule by. not much significance to the order, but the first two points in particular lay the foundation for everything i do.",
          {
            text: "1. “simplicity is earned not given” — ryo lu",
            bullets: [
              "“simple” design is only achieved when you familiarize yourself with the complex, and understand it enough that you can present it in a digestible form.",
              "it isn’t “keep it simple”, its grasp complexity first."
            ]
          },
          {
            text: "2. craft lives in the breakdown of something",
            bullets: [
              "craft is easy to spot, hard to define. to me, if every inch of a product has been thought of immensely, and exists for both form and function then i know it’s been created with thought—if i can simultaneously see both the labor put in and also the effortlessness of it all."
            ]
          },
          {
            text: "3. embrace entropy in design",
            bullets: [
              "when you refuse to let the design process get messy, you lose the ability to explore alternative paths"
            ]
          },
          {
            text: "4. “what's the ONE Thing I can do such that by doing it, everything else will be easier or unnecessary?” — gary keller",
            bullets: [
              "i don’t believe in multi-tasking. when multi-tasking, you are only shifting your attention across multiple things at different intervals. and real good work comes from deep work, when you hone in on and focus your maximum attention on one thing for a long interval."
            ]
          },
          {
            text: "5. make it first, then make it perfect; winners lose more than losers ever will",
            bullets: [
              "these two quotes kind serve a similar purpose to me, which is to tell myself to “just do it”. submit even if i’m not confident in myself, throw myself into situations, clubs, positions, even if i don’t feel 100% ready because ultimately you don’t grow from staying in your comfort zone. you have nothing to lose but everything to gain."
            ]
          },
          {
            text: "6. never be jaded, don’t have an ego about you (or your skills in particular), & you can learn something from anyone and everyone."
          },
          {
            text: "7. if you want to be good at design, learn the basic design principles, then learn everything but design.",
            bullets: [
              "go out there and understand the user and the business, take psych classes, marketing & business classes. when you network, don’t just talk to fellow product designers, talk to PMs, developers, founders, investors, etc…"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "readings",
    label: "archive",
    icon: assetUrl("/writings/folder-readings.png"),
    files: [],
    /** Scattered on purpose — x / y are starting spots, the reader can drag from there. */
    links: [
      {
        id: "grok-bot",
        title: "Designing Grok Bot for a world of persistent agents",
        author: "SpaceXAI",
        href: "https://x.ai/news/designing-grok-bot",
        icon: assetUrl("/writings/readings/grok-bot.png"),
        x: "2%",
        y: "1%",
        width: "15.5rem"
      },
      {
        id: "design-with-ai",
        title: "How I Design with AI.",
        author: "Matt Dailey",
        href: "https://x.com/reactiverobot/status/2092638003789439075",
        icon: assetUrl("/writings/readings/ref-design.png"),
        x: "40%",
        y: "15%",
        width: "13rem"
      },
      {
        id: "vernacular-web",
        title: "A Vernacular Web: the indigenous and the barbarians",
        author: "Olia Lialina",
        href: "http://art.teleportacia.org/observation/vernacular/",
        icon: assetUrl("/writings/readings/vernacular.gif"),
        iconWidth: "2.6rem",
        x: "5%",
        y: "40%",
        width: "16rem"
      },
      {
        id: "web-as-architecture",
        title: "Web design as architecture",
        author: "Malte Müller",
        href: "https://www--arc.com",
        icon: assetUrl("/writings/readings/arc.jpg"),
        x: "36%",
        y: "60%",
        width: "13.5rem"
      },
      {
        id: "archive-clipping",
        title: "archive.ph clipping",
        author: "saved read",
        href: "https://archive.ph/N8t8n#selection-11773.286-11773.287",
        icon: assetUrl("/writings/readings/archive.png"),
        x: "14%",
        y: "80%",
        width: "12rem"
      }
    ],
    /** Loose images, labelled like files on a Finder desktop. */
    stills: [
      {
        id: "dieter-rams",
        src: assetUrl("/writings/readings/dieter-rams.png"),
        alt: "Braun RT 20 tabletop radio designed by Dieter Rams",
        label: "dieter-rams.png",
        width: 698,
        height: 481,
        x: "68%",
        y: "24%",
        displayWidth: "13rem"
      }
    ]
  },
  {
    id: "arena",
    label: "are.na",
    icon: assetUrl("/writings/folder-arena.png"),
    files: [],
    embed: {
      src: "https://www.are.na/anita-yan",
      href: "https://www.are.na/anita-yan",
      title: "Anita Yan on Are.na"
    }
  }
];

export function getWritingsFolder(folderId) {
  return WRITINGS_FOLDERS.find((folder) => folder.id === folderId) ?? WRITINGS_FOLDERS[0];
}

export function getWritingsFile(folderId, fileId) {
  const folder = getWritingsFolder(folderId);
  return folder.files.find((file) => file.id === fileId) ?? null;
}

export function getFileBlocks(file) {
  if (!file) return [];

  const source = Array.isArray(file.body)
    ? file.body
    : typeof file.body === "string" && file.body.trim()
      ? file.body.split(/\n\s*\n/)
      : Array.isArray(file.paragraphs)
        ? file.paragraphs
        : [];

  return source.flatMap((part, index) => {
    if (part && typeof part === "object") {
      const text = String(part.text ?? "").trim();
      const bullets = Array.isArray(part.bullets)
        ? part.bullets.map((item) => String(item).trim()).filter(Boolean)
        : [];
      const blocks = [];
      if (text) blocks.push({ type: "point", text, key: `${index}-p` });
      if (bullets.length) blocks.push({ type: "ul", items: bullets, key: `${index}-ul` });
      return blocks;
    }

    const text = String(part ?? "").trim();
    return text ? [{ type: "p", text, key: `${index}-p` }] : [];
  });
}
