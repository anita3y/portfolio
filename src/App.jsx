import { Route, Routes } from "react-router-dom";
import AnatomyOfAMemoryPlay from "./pages/AnatomyOfAMemoryPlay.jsx";
import OurBookshelfPlay from "./pages/OurBookshelfPlay.jsx";
import ChatGPTBranchesCaseStudy from "./pages/ChatGPTBranchesCaseStudy.jsx";
import DesignForAmericaCaseStudy from "./pages/DesignForAmericaCaseStudy.jsx";
import Home from "./pages/Home.jsx";
import WorldAffairsConferenceCaseStudy from "./pages/WorldAffairsConferenceCaseStudy.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/design-for-america" element={<DesignForAmericaCaseStudy />} />
      <Route path="/work/world-affairs-conference" element={<WorldAffairsConferenceCaseStudy />} />
      <Route path="/work/chatgpt-branches" element={<ChatGPTBranchesCaseStudy />} />
      <Route path="/play/anatomy-of-a-memory" element={<AnatomyOfAMemoryPlay />} />
      <Route path="/play/our-bookshelf" element={<OurBookshelfPlay />} />
    </Routes>
  );
}
