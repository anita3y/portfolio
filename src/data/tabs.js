export const SITE_TABS = [
  { id: "work", label: "work" },
  { id: "play", label: "play" },
  { id: "about", label: "about" },
  { id: "writings", label: "writings" }
];

export const SITE_TAB_IDS = SITE_TABS.map((tab) => tab.id);

/** Path segment ↔ tab id (shareable /work /play /about /writings). */
export function tabIdFromPathname(pathname = "/") {
  const segment = String(pathname)
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean)[0];
  if (!segment) return "work";
  // Legacy shareable URL from the temporary Seiton label
  if (segment === "seiton") return "writings";
  return SITE_TAB_IDS.includes(segment) ? segment : null;
}

export function pathForTab(tabId) {
  if (!SITE_TAB_IDS.includes(tabId)) return "/work";
  return `/${tabId}`;
}
