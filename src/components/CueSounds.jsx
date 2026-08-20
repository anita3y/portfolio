import { useEffect } from "react";
import { bind, setEnabled, setVolume } from "cuelume";

export default function CueSounds() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setEnabled(!media.matches);
      setVolume(media.matches ? 0 : 0.52);
    };

    bind();
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return null;
}
