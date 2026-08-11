import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  // Root on Vercel / local; `/portfolio/` only for GitHub Pages builds.
  const base =
    command === "serve" || process.env.VERCEL ? "/" : "/portfolio/";

  return {
    plugins: [react()],
    base
  };
});
