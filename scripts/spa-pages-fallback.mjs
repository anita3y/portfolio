import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const indexHtml = join(dist, "index.html");

// GitHub Pages serves 404.html for missing paths (nested deep links).
copyFileSync(indexHtml, join(dist, "404.html"));

// Tab routes need real index.html landings so shareable URLs return 200
// (about/ and play/ already exist as asset folders and otherwise 301→404).
for (const route of ["work", "play", "about", "seiton"]) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexHtml, join(dir, "index.html"));
}
