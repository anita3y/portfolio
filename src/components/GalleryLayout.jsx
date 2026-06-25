import { useEffect } from "react";
import { Link } from "react-router-dom";
import GalleryContent from "./GalleryContent.jsx";

export default function GalleryLayout({ gallery }) {
  useEffect(() => {
    document.title = `${gallery.title} | anita yan`;
    return () => {
      document.title = "anita yan | Portfolio";
    };
  }, [gallery.title]);

  return (
    <div className="gallery-page">
      <nav className="cs-breadcrumb" aria-label="Breadcrumb">
        {gallery.breadcrumb?.map((crumb, i) => (
          <span key={crumb}>
            {i > 0 && <span className="cs-breadcrumb__sep"> / </span>}
            {crumb}
          </span>
        ))}
      </nav>

      <GalleryContent gallery={gallery} />

      <footer className="gallery-footer">
        <Link className="cs-back" to="/" state={{ tab: "play" }}>
          ← Back to play
        </Link>
      </footer>
    </div>
  );
}
