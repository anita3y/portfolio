import { Navigate, useParams } from "react-router-dom";
import { getPlayEntry } from "../data/play/index.js";

export default function PlayDeepLink() {
  const { playId } = useParams();
  const entry = getPlayEntry(playId);

  if (!entry) {
    return <Navigate to="/" state={{ tab: "play" }} replace />;
  }

  return <Navigate to="/" state={{ tab: "play", openPlay: playId }} replace />;
}
