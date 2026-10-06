const LEGEND = [
  { id: "mission", label: "Mission / about" },
  { id: "projects", label: "Projects / archive" },
  { id: "join", label: "Join / membership" },
  { id: "contact", label: "Contact / outreach" }
];

function FlowNode({ label, detail, tone = "neutral" }) {
  return (
    <div className={`cs-uf__node cs-uf__node--${tone}`}>
      <span className="cs-uf__node-label">{label}</span>
      {detail ? <span className="cs-uf__node-detail">{detail}</span> : null}
    </div>
  );
}

function FlowArrow() {
  return (
    <span className="cs-uf__arrow" aria-hidden="true">
      →
    </span>
  );
}

function FlowPath({ children, className = "" }) {
  return <div className={["cs-uf__path", className].filter(Boolean).join(" ")}>{children}</div>;
}

export default function CaseStudyUserFlowMap() {
  return (
    <div
      className="cs-uf"
      role="img"
      aria-label="Three key user flows: discover projects and impact, join or get involved, and contact or partner outreach"
    >
      <section className="cs-uf__journey">
        <p className="cs-uf__eyebrow">Flow 1</p>
        <h4 className="cs-uf__title">Discover projects &amp; impact</h4>
        <div className="cs-uf__branch-wrap">
          <FlowNode label="Landing page" />
          <div className="cs-uf__branch">
            <FlowPath>
              <FlowArrow />
              <FlowNode label="Mission window" detail="Our mission" tone="mission" />
              <FlowArrow />
              <FlowNode label="Learn more" detail="→ About" tone="mission" />
            </FlowPath>
            <FlowPath>
              <FlowArrow />
              <FlowNode label="Featured projects" detail="Homepage section" tone="projects" />
              <FlowArrow />
              <FlowNode label="See more" detail="→ Archive" tone="projects" />
            </FlowPath>
          </div>
        </div>
      </section>

      <section className="cs-uf__journey">
        <p className="cs-uf__eyebrow">Flow 2</p>
        <h4 className="cs-uf__title">Join / get involved</h4>
        <FlowPath className="cs-uf__path--join">
          <FlowNode label="Any page" />
          <FlowArrow />
          <FlowNode label="Header CTA" detail="Join now button" tone="join" />
          <FlowArrow />
          <div className="cs-uf__stack">
            <FlowNode label="Interest form" tone="join" />
            <FlowNode label="WhatsApp group" tone="join" />
          </div>
        </FlowPath>
        <p className="cs-uf__note">
          Repeated at bottom of every page as “Join us now” section
        </p>
      </section>

      <section className="cs-uf__journey">
        <p className="cs-uf__eyebrow">Flow 3</p>
        <h4 className="cs-uf__title">Contact &amp; partner outreach</h4>
        <div className="cs-uf__rows">
          <FlowPath>
            <FlowNode label="Landing page" />
            <FlowArrow />
            <FlowNode label="Header contact" detail="button (landing only)" tone="contact" />
            <FlowArrow />
            <FlowNode label="Reach chapter" tone="contact" />
          </FlowPath>
          <FlowPath>
            <FlowNode label="Any page" />
            <FlowArrow />
            <FlowNode label="Bottom join CTA" detail="every page" tone="contact" />
            <FlowArrow />
            <FlowNode label="Reach chapter" tone="contact" />
          </FlowPath>
        </div>
      </section>

      <ul className="cs-uf__legend" aria-label="Flow category legend">
        {LEGEND.map((item) => (
          <li key={item.id} className="cs-uf__legend-item">
            <span className={`cs-uf__swatch cs-uf__swatch--${item.id}`} aria-hidden="true" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
