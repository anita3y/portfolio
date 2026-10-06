import { useId } from "react";

/** Reveals a raster scribble along traced centerlines (one per stroke, drawn in order) on hover. */
export default function Scribble({ src, width, height, strokes, maskStroke = 14, className = "" }) {
  const maskId = `scribble-${useId().replace(/:/g, "")}`;

  return (
    <svg
      className={`scribble ${className}`.trim()}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ "--scribble-n": strokes.length }}
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
          {strokes.map((d, index) => (
            <path
              key={d}
              className="scribble__trace"
              d={d}
              pathLength="1"
              fill="none"
              stroke="#fff"
              strokeWidth={maskStroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ "--scribble-i": index }}
            />
          ))}
        </mask>
      </defs>
      <image href={src} width={width} height={height} mask={`url(#${maskId})`} />
    </svg>
  );
}
