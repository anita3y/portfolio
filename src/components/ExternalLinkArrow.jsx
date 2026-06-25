/** ↗ arrow — diagonal + open corner wings. */
export default function ExternalLinkArrow({ className = "", size = 13, variant = "default" }) {
  const sizeProps =
    size == null
      ? {}
      : {
          width: size,
          height: size
        };

  const isSharp = variant === "sharp";
  const strokeCap = isSharp ? "butt" : "round";
  const strokeJoin = isSharp ? "miter" : "round";

  const diagonal = isSharp ? "M3.2 10.9L9.4 4.6" : "M3.5 10.75L9.1 5.15";
  const wingLeft = isSharp ? "M9.4 4.6H4.2" : "M9.1 5.15H6";
  const wingDown = isSharp ? "M9.4 4.6V9.35" : "M9.1 5.15V8.25";

  return (
    <svg
      className={["external-link-arrow", className].filter(Boolean).join(" ")}
      viewBox="0 0 14 14"
      aria-hidden="true"
      {...sizeProps}
    >
      <path
        d={diagonal}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        vectorEffect="nonScalingStroke"
        strokeLinecap={strokeCap}
        strokeLinejoin={strokeJoin}
      />
      <path
        d={wingLeft}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        vectorEffect="nonScalingStroke"
        strokeLinecap={strokeCap}
        strokeLinejoin={strokeJoin}
      />
      <path
        d={wingDown}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        vectorEffect="nonScalingStroke"
        strokeLinecap={strokeCap}
        strokeLinejoin={strokeJoin}
      />
    </svg>
  );
}
