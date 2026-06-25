import GalleryLayout from "../components/GalleryLayout.jsx";
import { MY_GALLERY } from "../data/play/my-gallery.js";

export default function MyGalleryPlay() {
  return <GalleryLayout gallery={MY_GALLERY} />;
}
