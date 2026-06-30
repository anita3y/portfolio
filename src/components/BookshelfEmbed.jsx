import { useEffect, useState } from "react";
import { assetUrl } from "../utils/assetUrl.js";

const GH_BASE = "https://anita3y.github.io/my-bookshelf";
const FALLBACK_PINS = { movie: 1, book: 11, album: 23 };
const SHELF_ORDER = ["book", "album", "movie"];

async function loadPins() {
  for (const url of [assetUrl("/my-bookshelf/top-favorites.json"), `${GH_BASE}/top-favorites.json`]) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
    } catch {
      /* try next */
    }
  }
  return FALLBACK_PINS;
}

export default function BookshelfEmbed() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [dataRes, pins] = await Promise.all([
          fetch(`${GH_BASE}/data.json`),
          loadPins()
        ]);
        if (!dataRes.ok) throw new Error("fetch");
        const media = await dataRes.json();
        const favorites = SHELF_ORDER.map((type) => {
          const id = pins[type];
          const item = id ? media.find((entry) => entry.id === id) : null;
          return item ? { ...item, type } : null;
        }).filter(Boolean);

        if (!cancelled) setItems(favorites);
      } catch {
        if (!cancelled) setError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="shelf-preview">
      <div className="shelf-preview__row" aria-label="Top three favorites">
        {error && <p className="shelf-preview__status">Couldn’t load shelf.</p>}
        {!error && !items && (
          <>
            <div className="shelf-preview__slot shelf-preview__slot--book" aria-hidden="true" />
            <div className="shelf-preview__slot shelf-preview__slot--album" aria-hidden="true" />
            <div className="shelf-preview__slot shelf-preview__slot--movie" aria-hidden="true" />
          </>
        )}
        {items?.map((item) => (
          <article
            key={`${item.type}-${item.id}`}
            className={`shelf-preview__item shelf-preview__item--${item.type}`}
          >
            <div className="shelf-preview__cover">
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            </div>
            <div className="shelf-preview__meta">
              <span className="shelf-preview__name">{item.title}</span>
              {item.creator ? (
                <span className="shelf-preview__creator">{item.creator}</span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
