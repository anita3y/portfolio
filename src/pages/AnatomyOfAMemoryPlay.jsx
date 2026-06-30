import PlayProjectLayout from "../components/PlayProjectLayout.jsx";
import { getPlayStudy } from "../data/play/index.js";

export default function AnatomyOfAMemoryPlay() {
  const study = getPlayStudy("anatomy-of-a-memory");
  if (!study) return null;
  return <PlayProjectLayout study={study} />;
}
