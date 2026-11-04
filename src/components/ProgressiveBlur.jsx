/*
 * Progressive (stepped) backdrop blur, after rghv.ca: stacked layers at
 * 1 / 2 / 4 / 8 / 16px, each masked to its own band so the blur ramps up
 * smoothly toward the edge instead of ending in a hard line.
 */
const STEPS = [1, 2, 4, 8, 16];

export default function ProgressiveBlur({ edge = "top", className = "" }) {
  const dir = edge === "top" ? "to top" : "to bottom";
  return (
    <div className={`progressive-blur progressive-blur--${edge} ${className}`.trim()} aria-hidden="true">
      {STEPS.map((px, i) => {
        const s = (i * 100) / 6;
        const mask = `linear-gradient(${dir}, transparent ${s}%, #000 ${s + 100 / 6}%, #000 ${s + 200 / 6}%, transparent ${s + 300 / 6}%)`;
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
