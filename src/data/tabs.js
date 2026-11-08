export const SITE_TABS = [
  { id: "work", label: "work" },
  { id: "play", label: "play" },
  { id: "about", label: "about" }
];

export const SITE_TAB_IDS = SITE_TABS.map((tab) => tab.id);

/** Path segment ↔ tab id (shareable /work /play /about). */
export function tabIdFromPathname(pathname = "/") {
  const segment = String(pathname)
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean)[0];
  if (!segment) return "work";
  return SITE_TAB_IDS.includes(segment) ? segment : null;
}

export function pathForTab(tabId) {
  if (!SITE_TAB_IDS.includes(tabId)) return "/work";
  return `/${tabId}`;
}
