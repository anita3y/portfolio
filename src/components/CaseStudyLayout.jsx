import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CaseStudyBody, CaseStudyPreview } from "./CaseStudyContent.jsx";

export default function CaseStudyLayout({ study }) {
  const { title, backTab = "work" } = study;

  useEffect(() => {
    document.title = `${title} | anita yan`;
    return () => {
      document.title = "anita yan | Portfolio";
    };
  }, [title]);

  return (
    <div className="cs-page">
      <CaseStudyPreview study={study} />
      <CaseStudyBody study={study} />

      <footer className="cs-footer">
        <Link className="cs-back" to="/" state={{ tab: backTab }}>
          ← Back to {backTab}
        </Link>
      </footer>
    </div>
  );
}
