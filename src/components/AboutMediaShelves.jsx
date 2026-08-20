import { useEffect, useState } from "react";
import { assetUrl } from "../utils/assetUrl.js";

const GH_BASE = "https://anita3y.github.io/my-bookshelf";
const SHELF_ORDER = ["album", "book", "movie"];
const SHELF_LABEL = { album: "albums", book: "books", movie: "movies" };

const FALLBACK = {
  album: [
    { title: "Hate CD", image: assetUrl("/thumbnails/bookshelf/steve-lacy.png") }
  ],
  movie: [
    { title: "The Grand Budapest Hotel", image: assetUrl("/thumbnails/bookshelf/grand-budapest.png") }
  ],
  book: []
};

function groupMedia(media) {
  const seen = new Set();
  const grouped = Object.fromEntries(SHELF_ORDER.map((type) => [type, []]));

  (Array.isArray(media) ? media : []).forEach((entry) => {
    if (!entry?.image || !SHELF_ORDER.includes(entry.type)) return;
    const key = `${entry.type}:${entry.title || entry.id}`;
    if (seen.has(key)) return;
    seen.add(key);
    grouped[entry.type].push({
      id: entry.id,
      title: entry.title || "",
      image: entry.image
    });
  });

  SHELF_ORDER.forEach((type) => {
    if (!grouped[type].length && FALLBACK[type]?.length) {
      grouped[type] = FALLBACK[type];
    }
  });

  return grouped;
}

export default function AboutMediaShelves() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${GH_BASE}/data.json`);
        const media = res.ok ? await res.json() : [];
        if (!cancelled) setRows(groupMedia(media));
      } catch {
        if (!cancelled) setRows(groupMedia(null));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="about-shelf-scroll" aria-label="Albums, books, and movies">
      {SHELF_ORDER.map((type) => {
        const items = rows?.[type] ?? [];
        if (!items.length && rows) return null;
        return (
          <section key={type} className="about-shelf-group">
            <h3 className="about-shelf-group__label">{SHELF_LABEL[type]}</h3>
            <div className={`about-shelf-group__grid about-shelf-group__grid--${type}`}>
              {(items.length ? items : Array.from({ length: 6 }, () => null)).map((item, index) => (
                <div
                  key={item?.id ?? item?.title ?? `${type}-${index}`}
                  className={`about-shelf-cover about-shelf-cover--${type}${item?.image ? "" : " is-empty"}`}
                >
                  {item?.image ? (
                    <img src={item.image} alt={item.title || ""} loading="lazy" decoding="async" />
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
