export default function AboutDottedHover({ label, hoverTag, imageSrc, imageAlt }) {
  const dotted = (
    <span className="about-inline-dotted-wrap" data-cursor-tag={hoverTag || undefined}>
      <span className="about-inline-dotted">{label}</span>
    </span>
  );

  if (!imageSrc) return dotted;

  return (
    <span className="about-inline-dotted-group">
      {dotted}
      <span className="about-inline-dotted__img-wrap">
        <img
          className="about-inline-dotted__img"
          src={imageSrc}
          alt={imageAlt ?? ""}
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
        />
      </span>
    </span>
  );
}
