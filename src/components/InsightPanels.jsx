/*
 * Insight panels, after calebwu.ca/RevisionDojo: soft grey squares, each a
 * small monoline diagram (ink lines, one accent) over a one-line caption
 * whose key words are bold. Diagrams share the .cs-diagram tokens.
 */

function Bold({ text }) {
  // "**word**" -> <strong>word</strong>
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
  );
}

const Arrow = ({ d, accent, dashed }) => (
  <path
    d={d}
    className={["ip-line", accent && "is-accent", dashed && "is-dashed"].filter(Boolean).join(" ")}
    markerEnd={accent ? "url(#ip-head-accent)" : "url(#ip-head)"}
  />
);

function Defs() {
  return (
    <defs>
      <marker id="ip-head" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M1 1 L7 4 L1 7" className="ip-head" />
      </marker>
      <marker id="ip-head-accent" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M1 1 L7 4 L1 7" className="ip-head is-accent" />
      </marker>
    </defs>
  );
}

/* 1. Work starts in AI; Figma is where it comes back to be checked. */
function ReferenceDiagram() {
  return (
    <svg viewBox="0 0 320 200" className="ip-svg" aria-hidden="true">
      <Defs />
      <circle cx="34" cy="100" r="7" className="ip-dot is-accent" />
      <Arrow d="M42 100 H92" accent />
      <rect x="96" y="80" width="64" height="40" rx="5" className="ip-box is-accent" />
      <text x="128" y="138" className="ip-label" textAnchor="middle">ai tool</text>
      <Arrow d="M162 100 H216" accent />
      <rect x="220" y="80" width="64" height="40" rx="5" className="ip-box" />
      <text x="252" y="138" className="ip-label" textAnchor="middle">figma</text>
      {/* the loop back: check, polish, return */}
      <path d="M252 78 C252 40, 128 40, 128 78" className="ip-line is-dashed is-march" markerEnd="url(#ip-head)" />
      <text x="190" y="36" className="ip-label" textAnchor="middle">check + polish</text>
    </svg>
  );
}

/* 2. A shared file keeps a visible history; AI chats don't. */
function TrailDiagram() {
  const xs = [40, 108, 176, 244];
  return (
    <svg viewBox="0 0 320 200" className="ip-svg" aria-hidden="true">
      <Defs />
      <text x="40" y="44" className="ip-label">shared file</text>
      {xs.map((x, i) => (
        <g key={`f${x}`}>
          <rect x={x} y="56" width="40" height="28" rx="4" className="ip-box" />
          {i < xs.length - 1 ? <Arrow d={`M${x + 42} 70 H${x + 64}`} /> : null}
        </g>
      ))}
      <text x="40" y="124" className="ip-label">ai chat</text>
      <rect x="40" y="136" width="40" height="28" rx="4" className="ip-box is-accent" />
      <path d="M82 150 H300" className="ip-line is-dashed is-fade" />
      {xs.slice(1).map((x, i) => (
        <rect
          key={`c${x}`}
          x={x}
          y="136"
          width="40"
          height="28"
          rx="4"
          className="ip-box is-ghost"
          style={{ opacity: 0.55 - i * 0.18 }}
        />
      ))}
    </svg>
  );
}

/* 3. Each person builds their own fix; nothing connects them. */
function AloneDiagram() {
  const people = [
    { x: 64, label: "slack-to-self", shape: "rect" },
    { x: 160, label: "personal repo", shape: "circle", accent: true },
    { x: 256, label: "version page", shape: "tri" }
  ];
  return (
    <svg viewBox="0 0 320 200" className="ip-svg" aria-hidden="true">
      <Defs />
      {people.map((p) => (
        <g key={p.x}>
          <circle cx={p.x} cy="62" r="9" className={`ip-dot${p.accent ? " is-accent" : ""}`} />
          <path d={`M${p.x} 73 V108`} className="ip-line" markerEnd="url(#ip-head)" />
          {p.shape === "rect" && <rect x={p.x - 16} y="114" width="32" height="26" rx="4" className="ip-box" />}
          {p.shape === "circle" && <circle cx={p.x} cy="127" r="14" className="ip-box is-accent" />}
          {p.shape === "tri" && <path d={`M${p.x} 112 L${p.x + 17} 141 L${p.x - 17} 141 Z`} className="ip-box" />}
          <text x={p.x} y="164" className="ip-label" textAnchor="middle">{p.label}</text>
        </g>
      ))}
      {/* the links that don't exist */}
      <path d="M78 62 H146 M174 62 H242" className="ip-line is-dashed is-broken" />
    </svg>
  );
}

const DIAGRAMS = {
  reference: ReferenceDiagram,
  trail: TrailDiagram,
  alone: AloneDiagram
};

export default function InsightPanels({ items }) {
  return (
    <div className={`ip-grid cs-diagram ip-grid--${items.length}`}>
      {items.map((item) => {
        const Diagram = DIAGRAMS[item.diagram];
        return (
          <figure key={item.caption} className="ip-panel">
            <div className="ip-panel__art">{Diagram ? <Diagram /> : null}</div>
            <figcaption className="ip-panel__caption">
              <Bold text={item.caption} />
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
