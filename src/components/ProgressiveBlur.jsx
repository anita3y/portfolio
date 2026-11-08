/*
 * Progressive (stepped) backdrop blur, after rghv.ca: stacked layers,
 * each masked to its own band so the blur ramps toward the edge.
 * Soft 1→8px ramp + dark tint (CSS) keeps the edge readable without a white wash.
 */
const STEPS = [1, 2, 4, 8];

export default function ProgressiveBlur({ edge = "top", className = "" }) {
  const dir = edge === "top" ? "to top" : "to bottom";
  const bands = STEPS.length + 1;
  return (
    <div className={`progressive-blur progressive-blur--${edge} ${className}`.trim()} aria-hidden="true">
      {STEPS.map((px, i) => {
        const s = (i * 100) / bands;
        const mask = `linear-gradient(${dir}, transparent ${s}%, #000 ${s + 100 / bands}%, #000 ${s + 200 / bands}%, transparent ${s + 300 / bands}%)`;
        return (
          <span
            key={px}
            className="progressive-blur__layer"
            style={{
              backdropFilter: `blur(${px}px)`,
              WebkitBackdropFilter: `blur(${px}px)`,
              maskImage: mask,
              WebkitMaskImage: mask
            }}
          />
        );
      })}
      <span className="progressive-blur__tint" />
    </div>
  );
}
