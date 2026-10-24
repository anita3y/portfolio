import { Navigate, useParams } from "react-router-dom";
import { PLAY_ARTIFACT_IDS } from "../data/playArtifacts.js";
import { getPlayEntry } from "../data/play/index.js";

export default function PlayDeepLink() {
  const { playId } = useParams();
  const entry = getPlayEntry(playId);
  const isArtifact = PLAY_ARTIFACT_IDS.has(playId);

  if (!entry && !isArtifact) {
    return <Navigate to="/play" replace />;
  }

  return <Navigate to="/play" state={{ openPlay: playId }} replace />;
}
