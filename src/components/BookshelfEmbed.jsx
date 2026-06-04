import { useEffect, useState } from "react";
import { MY_BOOKSHELF } from "../data/about.js";

const GH_BASE = "https://anita3y.github.io/my-bookshelf";
const FALLBACK_PINS = { movie: 1, book: 11, album: 23 };
const SHELF_ORDER = ["book", "album", "movie"];

const TYPE_LABELS = {
  book: "Book",
  album: "Album",
  movie: "Movie"
};

function formatRating(val) {
  if (!val) return "";
  if (val === "Listening") return "▶";
  if (val.includes("★")) {
    let score = (val.match(/★/g) || []).length;
    if (val.includes("½")) score += 0.5;
    return `${score}/5`;
  }
  return val;
}

async function loadPins() {
  for (const url of ["/my-bookshelf/top-favorites.json", `${GH_BASE}/top-favorites.json`]) {
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
      <header className="shelf-preview__head">
        <h3 className="shelf-preview__title">Shelf</h3>
        <p className="shelf-preview__subtitle">
          <span className="shelf-preview__star" aria-hidden="true">
            ★
          </span>{" "}
          Favorites
        </p>
      </header>

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
              <img src={item.image} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="shelf-preview__meta">
              <span className="shelf-preview__type">{TYPE_LABELS[item.type]}</span>
              <span className="shelf-preview__name">{item.title}</span>
              {formatRating(item.rating) && (
                <span className="shelf-preview__rating">{formatRating(item.rating)}</span>
              )}
            </div>
          </article>
        ))}
      </div>

      <a
        className="shelf-preview__site-link"
        href={MY_BOOKSHELF.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        my bookshelf
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
