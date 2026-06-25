export default function AboutInlineVinyls({ label, coverSrc, recordSrc, alt }) {
  return (
    <span className="about-inline-vinyls">
      <span className="about-inline-vinyls__label">{label}</span>
      <span className="about-inline-vinyls__stack">
        <img
          className="about-inline-vinyls__cover"
          src={coverSrc}
          alt={alt}
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
        />
        <img
          className="about-inline-vinyls__record"
          src={recordSrc}
          alt=""
          aria-hidden="true"
          width={24}
          height={48}
          loading="lazy"
          decoding="async"
        />
      </span>
    </span>
  );
}
