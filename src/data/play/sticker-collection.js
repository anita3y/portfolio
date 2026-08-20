import { assetUrl } from "../../utils/assetUrl.js";

export const STICKER_COLLECTION = {
  id: "sticker-collection",
  title: "Sticker Collection",
  playground: true,
  matchaCaption: "banana caramel matcha from my favorite cafe ever: lala bakeshop",
  paintingCaption: "back when my main craft was painting",
  meta: {
    role: "Interactive · Stickers",
    timeline: "2026",
    tools: ["Illustration", "Play"]
  }
};

export const PLAYGROUND_CAPTIONS = [
  {
    id: "matcha-caption",
    text: STICKER_COLLECTION.matchaCaption,
    x: 3.5,
    y: 86,
    className: "sticker-board__caption sticker-board__caption--matcha",
    label: "Matcha note"
  },
  {
    id: "painting-caption",
    text: STICKER_COLLECTION.paintingCaption,
    x: 40,
    y: 72,
    className: "sticker-board__caption sticker-board__caption--painting",
    label: "Painting note"
  }
];

export const PLAYGROUND_STICKERS = [
  {
    id: "folder",
    type: "swap",
    closedSrc: assetUrl("/hero/stickers/folder-closed.png"),
    openSrc: assetUrl("/hero/stickers/folder-open.png"),
    stampClass: "hero-stamp--folder",
    stickerClass: "hero-sticker--folder",
    x: 4,
    y: 6,
    label: "Folder"
  },
  {
    id: "envelope",
    type: "swap",
    closedSrc: assetUrl("/hero/stickers/envelope-closed.png") + "?v=2",
    openSrc: assetUrl("/hero/stickers/envelope-open.png") + "?v=3",
    stampClass: "hero-stamp--envelope",
    stickerClass: "hero-sticker--envelope",
    x: 16,
    y: 24,
    label: "Envelope"
  },
  {
    id: "stamp",
    type: "image",
    src: assetUrl("/hero/stickers/about-stamp.png") + "?v=3",
    stampClass: "hero-stamp--about sticker-piece--stamp",
    x: 74,
    y: 5,
    label: "Stamp"
  },
  {
    id: "prom-night",
    type: "image",
    src: assetUrl("/play/stickers/prom-night.png"),
    stampClass: "sticker-piece--art sticker-piece--prom",
    x: 79,
    y: 16,
    label: "Prom night"
  },
  {
    id: "lineage",
    type: "image",
    src: assetUrl("/play/stickers/end-of-a-lineage.png"),
    stampClass: "sticker-piece--art sticker-piece--lineage",
    x: 58,
    y: 46,
    label: "End of a Lineage"
  },
  {
    id: "bones",
    type: "image",
    src: assetUrl("/play/stickers/deeper-than-bones.png"),
    stampClass: "sticker-piece--art sticker-piece--bones",
    x: 46,
    y: 22,
    label: "Deeper than Bones"
  },
  {
    id: "matcha",
    type: "image",
    src: assetUrl("/play/stickers/matcha.png") + "?v=2",
    stampClass: "sticker-piece--art sticker-piece--matcha",
    x: 16,
    y: 54,
    label: "Matcha"
  }
];

export const PLAYGROUND_STACK = [
  "folder",
  "envelope",
  "lineage",
  "matcha",
  "stamp",
  "prom-night",
  "bones",
  "matcha-caption",
  "painting-caption"
];
