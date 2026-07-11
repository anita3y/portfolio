import { useEffect, useState } from "react";
import { assetUrl } from "../utils/assetUrl.js";

const TYPE_LABEL = { book: "Reading", album: "Album", movie: "Watching" };

const GH_BASE = "https://anita3y.github.io/my-bookshelf";
const FALLBACK_PINS = { movie: 1, book: 11, album: 23 };
const SHELF_ORDER = ["book", "album", "movie"];

// Local overrides — always shown for these types, regardless of the external shelf data.
const OVERRIDES = {
  album: {
    title: "Hate CD",
    creator: "Steve Lacy",
    image: assetUrl("/thumbnails/bookshelf/steve-lacy.png")
  },
  movie: {
    title: "The Grand Budapest Hotel",
    creator: "Wes Anderson",
    image: assetUrl("/thumbnails/bookshelf/grand-budapest.png")
  }
};

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

    const buildFavorites = (media, pins) =>
      SHELF_ORDER.map((type) => {
        if (OVERRIDES[type]) return { ...OVERRIDES[type], type };
        const id = pins[type];
        const item = id && media ? media.find((entry) => entry.id === id) : null;
        return item ? { ...item, type } : null;
      }).filter(Boolean);

    (async () => {
      try {
        const [dataRes, pins] = await Promise.all([
          fetch(`${GH_BASE}/data.json`),
          loadPins()
        ]);
        const media = dataRes.ok ? await dataRes.json() : null;
        if (!cancelled) setItems(buildFavorites(media, pins));
      } catch {
        // External shelf failed — still render the local overrides.
        if (!cancelled) {
          const favorites = buildFavorites(null, FALLBACK_PINS);
          if (favorites.length) setItems(favorites);
          else setError(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="shelf-bento">
      <div className="shelf-bento__grid" aria-label="Top three favorites">
        {error && <p className="shelf-bento__status">Couldn’t load shelf.</p>}
        {!error && !items && (
          <>
            <div className="shelf-bento__tile shelf-bento__tile--book shelf-bento__tile--loading" aria-hidden="true" />
            <div className="shelf-bento__tile shelf-bento__tile--album shelf-bento__tile--loading" aria-hidden="true" />
            <div className="shelf-bento__tile shelf-bento__tile--movie shelf-bento__tile--loading" aria-hidden="true" />
          </>
        )}
        {items?.map((item) => (
          <article
            key={`${item.type}-${item.id}`}
            className={`shelf-bento__tile shelf-bento__tile--${item.type}`}
          >
            <div className="shelf-bento__media">
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            </div>
            <div className="shelf-bento__overlay">
              <span className="shelf-bento__type">{TYPE_LABEL[item.type] ?? item.type}</span>
              <span className="shelf-bento__name">{item.title}</span>
              {item.creator ? (
                <span className="shelf-bento__creator">{item.creator}</span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
