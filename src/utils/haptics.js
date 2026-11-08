/** Subtle haptic tick when the platform supports it. No spam — call only on intentional snaps. */
export function hapticTick(ms = 10) {
  if (typeof navigator === "undefined") return false;
  if (typeof navigator.vibrate !== "function") return false;
  try {
    return navigator.vibrate(ms);
  } catch {
    return false;
  }
}

/** Carousel / study snap — slightly longer than a tab tick. */
export function hapticSnap() {
  if (typeof navigator === "undefined") return false;
  if (typeof navigator.vibrate !== "function") return false;
  try {
    return navigator.vibrate([8, 24, 10]);
  } catch {
    return false;
  }
}

/** Brief CSS class pulse for desktop “haptic” when vibrate is unavailable. */
export function pulseHapticClass(element, className = "is-haptic-tick", durationMs = 160) {
  if (!element) return;
  element.classList.remove(className);
  // Force reflow so rapid re-triggers still animate.
  void element.offsetWidth;
  element.classList.add(className);
  window.setTimeout(() => {
    element.classList.remove(className);
  }, durationMs);
}
