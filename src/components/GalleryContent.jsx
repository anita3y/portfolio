import { useEffect, useState } from "react";

function GalleryPiece({ piece, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = piece.src && !imgFailed;

  return (
    <button
      type="button"
      className={`gallery-piece gallery-piece--${piece.aspect || "square"}`}
      onClick={() => onSelect(piece)}
    >
      <div className="gallery-piece__frame">
        {showImage ? (
          <img
            src={piece.src}
            alt={piece.alt || piece.title}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="gallery-piece__placeholder" aria-hidden="true">
            <span>{piece.medium}</span>
          </div>
        )}
      </div>
      <div className="gallery-piece__caption">
        <span className="gallery-piece__title">{piece.title}</span>
        <span className="gallery-piece__meta">
          {piece.medium}
          {piece.year ? ` · ${piece.year}` : ""}
        </span>
      </div>
    </button>
  );
}

export default function GalleryContent({ gallery }) {
  const { title, meta, intro, artworks } = gallery;
  const [activePiece, setActivePiece] = useState(null);
  const [modalImgFailed, setModalImgFailed] = useState(false);

  useEffect(() => {
    setModalImgFailed(false);
  }, [activePiece]);

  useEffect(() => {
    if (!activePiece) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setActivePiece(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activePiece]);

  return (
    <div className="gallery-content">
      <header className="gallery-content__header">
        <h2 className="gallery-content__title">{title}</h2>
        {meta && (
          <p className="gallery-content__meta">
            {[meta.type, meta.tags?.join(", ")].filter(Boolean).join(" · ")}
          </p>
        )}
        {intro?.map((paragraph) => (
          <p key={paragraph} className="gallery-intro">
            {paragraph}
          </p>
        ))}
      </header>

      <div className="gallery-grid" role="list">
        {artworks.map((piece) => (
          <div key={piece.id} className="gallery-grid__item" role="listitem">
            <GalleryPiece piece={piece} onSelect={setActivePiece} />
          </div>
        ))}
      </div>

      {activePiece && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activePiece.title}
          onClick={() => setActivePiece(null)}
        >
          <div className="gallery-lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-lightbox__close"
              onClick={() => setActivePiece(null)}
              aria-label="Close artwork"
            >
              ×
            </button>
            <div
              className={`gallery-lightbox__visual gallery-lightbox__visual--${activePiece.aspect || "square"}`}
            >
              {activePiece.src && !modalImgFailed ? (
                <img
                  src={activePiece.src}
                  alt={activePiece.alt || activePiece.title}
                  onError={() => setModalImgFailed(true)}
                />
              ) : (
                <div className="gallery-lightbox__placeholder">
                  <p>{activePiece.title}</p>
                  <span>Add image at {activePiece.src}</span>
                </div>
              )}
            </div>
            <div className="gallery-lightbox__info">
              <h3>{activePiece.title}</h3>
              <p>
                {activePiece.medium}
                {activePiece.year ? ` · ${activePiece.year}` : ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
