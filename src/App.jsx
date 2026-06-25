import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PlayDeepLink from "./pages/PlayDeepLink.jsx";
import WorkDeepLink from "./pages/WorkDeepLink.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/:workId" element={<WorkDeepLink />} />
      <Route path="/play/:playId" element={<PlayDeepLink />} />
    </Routes>
  );
}
