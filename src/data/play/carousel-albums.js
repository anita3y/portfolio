import { assetUrl } from "../../utils/assetUrl.js";

/** Album covers for the Play carousel artifact. */
export const CAROUSEL_ALBUMS = [
  {
    id: "apollo-xxi",
    title: "Apollo XXI",
    artist: "Steve Lacy",
    cover: assetUrl("/play/carousel-albums/apollo-xxi.png")
  },
  {
    id: "call-me-if-you-get-lost",
    title: "CALL ME IF YOU GET LOST",
    artist: "Tyler, the Creator",
    cover: assetUrl("/play/carousel-albums/call-me-if-you-get-lost.png")
  },
  {
    id: "for-lovers",
    title: "For Lovers",
    artist: "Lamp",
    cover: assetUrl("/play/carousel-albums/koibito-e.png")
  },
  {
    id: "frr",
    title: "FRR",
    artist: "george",
    cover: assetUrl("/play/carousel-albums/doodle-cover.png")
  },
  {
    id: "new-jeans",
    title: "New Jeans",
    artist: "NewJeans",
    cover: assetUrl("/play/carousel-albums/new-jeans.png")
  }
];

export function getCarouselAlbum(id) {
  return CAROUSEL_ALBUMS.find((album) => album.id === id) ?? null;
}

/** Middle album so the coverflow opens balanced left/right. */
export const CAROUSEL_START_ID =
  CAROUSEL_ALBUMS[Math.floor(CAROUSEL_ALBUMS.length / 2)]?.id ?? CAROUSEL_ALBUMS[0]?.id;
