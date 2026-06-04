const GH_BASE = "https://anita3y.github.io/my-bookshelf";
const DATA_URL = `${GH_BASE}/data.json`;
const TYPES = ["movie", "book", "album"];
const FALLBACK_PINS = { movie: 1, book: 11, album: 23 };

async function loadPins() {
  const localUrl = new URL("top-favorites.json", window.location.href).href;
  for (const url of [localUrl, `${GH_BASE}/top-favorites.json`]) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
    } catch {
      /* try next source */
    }
  }
  return FALLBACK_PINS;
}

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

function capitalizeType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "embed-card";
  card.innerHTML = `
    <img class="embed-card__img" src="${item.image}" alt="" loading="lazy" />
    <div class="embed-card__body">
      <span class="embed-card__meta">${item.creator} · ${item.type}</span>
      <div class="embed-card__row">
        <span class="embed-card__title">${item.title}</span>
        <span class="embed-card__rating">${formatRating(item.rating)}</span>
      </div>
    </div>
  `;
  return card;
}

function createEmptySlot(type) {
  const slot = document.createElement("div");
  slot.className = "embed-slot";
  slot.textContent = `Pin a ${type}`;
  return slot;
}

async function init() {
  const grid = document.getElementById("embed-grid");
  try {
    const [dataRes, pins] = await Promise.all([fetch(DATA_URL), loadPins()]);
    if (!dataRes.ok) throw new Error("data");
    const media = await dataRes.json();

    grid.innerHTML = "";
    TYPES.forEach((type) => {
      const id = pins[type];
      const item = id ? media.find((entry) => entry.id === id) : null;
      grid.appendChild(item ? createCard(item) : createEmptySlot(type));
    });
  } catch {
    grid.innerHTML = '<p class="embed-error">Could not load bookshelf.</p>';
  }
}

init();
