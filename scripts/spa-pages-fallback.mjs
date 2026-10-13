import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const indexHtml = join(dist, "index.html");

// GitHub Pages serves 404.html for missing paths (nested deep links).
copyFileSync(indexHtml, join(dist, "404.html"));

// Tab routes need real index.html landings so shareable URLs return 200
// (about/, play/, and writings/ already exist as asset folders and otherwise 301→404).
for (const route of ["work", "play", "about", "writings"]) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexHtml, join(dir, "index.html"));
}

// Legacy /seiton → /writings (temporary Seiton label)
const seitonDir = join(dist, "seiton");
mkdirSync(seitonDir, { recursive: true });
writeFileSync(
  join(seitonDir, "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0;url=../writings/" />
    <link rel="canonical" href="../writings/" />
    <script>
      location.replace("../writings/" + location.search + location.hash);
    </script>
    <title>Redirecting…</title>
  </head>
  <body>
    <p><a href="../writings/">Continue to writings</a></p>
  </body>
</html>
`
);
