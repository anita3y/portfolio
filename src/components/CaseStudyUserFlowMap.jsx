const LEGEND = [
  { id: "mission", label: "Mission / about" },
  { id: "projects", label: "Projects / archive" },
  { id: "join", label: "Join / membership" },
  { id: "contact", label: "Contact / outreach" }
];

const VANITY_BEFORE = ["Intro", "Skin", "Complexion", "Makeup", "Hair", "Summary"];

const VANITY_AFTER_HAIR = [
  { label: "Hair type", tag: "why we ask · porosity" },
  { label: "Hair habits", tag: "why we ask · density" },
  { label: "Concerns and goals", tag: "why we ask · undertone" }
];

const VANITY_RULES = [
  "Every screen is skippable",
  "Only ask what you use",
  "Leave and resume anywhere",
  "Edit the summary inline"
];

const VANITY_PERSONAS = [
  {
    name: "The Skincare Minimalist",
    goal: "Find products that won't irritate me.",
    sections: ["Skin only"]
  },
  {
    name: "The Makeup Enthusiast",
    goal: "Match my shades, track my favourites.",
    sections: ["Complexion", "Makeup"]
  },
  {
    name: "The Hair-First User",
    goal: "Understand my hair's real needs.",
    sections: ["Hair type", "Hair habits", "Concerns and goals"]
  }
];

function FlowNode({ label, detail, tone = "neutral", tag }) {
  return (
    <div className={`cs-uf__node cs-uf__node--${tone}${tag ? " cs-uf__node--tagged" : ""}`}>
      <span className="cs-uf__node-label">{label}</span>
      {detail ? <span className="cs-uf__node-detail">{detail}</span> : null}
      {tag ? <span className="cs-uf__tag">{tag}</span> : null}
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

function joinNodes(labels) {
  return labels.flatMap((label, index) => {
    const node = <FlowNode key={label} label={label} />;
    if (index === 0) return [node];
    return [<FlowArrow key={`arrow-${label}`} />, node];
  });
}

function DfaUserFlowMap() {
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

function VanityBeforeAfter() {
  return (
    <div
      className="cs-uf cs-uf--vanity"
      role="img"
      aria-label="Onboarding flow before and after. Before is Intro, Skin, Complexion, Makeup, Hair, Summary. After splits Hair into Hair type, Hair habits, and Concerns and goals, each with a why we ask tag for porosity, density, or undertone."
    >
      <section className="cs-uf__journey">
        <h4 className="cs-uf__title">Before</h4>
        <FlowPath>{joinNodes(VANITY_BEFORE)}</FlowPath>
      </section>
      <section className="cs-uf__journey">
        <h4 className="cs-uf__title">After</h4>
        <FlowPath>
          {joinNodes(["Intro", "Skin", "Complexion", "Makeup"])}
          <FlowArrow />
          <div className="cs-uf__stack">
            {VANITY_AFTER_HAIR.map((screen) => (
              <FlowNode key={screen.label} label={screen.label} tag={screen.tag} />
            ))}
          </div>
          <FlowArrow />
          <FlowNode label="Summary" />
        </FlowPath>
      </section>
    </div>
  );
}

function VanityRules() {
  return (
    <div
      className="cs-uf cs-uf--vanity"
      role="img"
      aria-label="Four rules: every screen is skippable, only ask what you use, leave and resume anywhere, and edit the summary inline."
    >
      <div className="cs-uf__rules">
        {VANITY_RULES.map((rule) => (
          <FlowNode key={rule} label={rule} />
        ))}
      </div>
    </div>
  );
}

function LoggingScreen({ single = false }) {
  return (
    <div className={single ? "cs-uf__screen cs-uf__screen--single" : "cs-uf__screen"}>
      <span className="cs-uf__node-label">{single ? "Skippable inline fields" : "Form screen"}</span>
      {single ? (
        <div className="cs-uf__fields" aria-hidden="true">
          <span className="cs-uf__field" />
          <span className="cs-uf__field" />
          <span className="cs-uf__field" />
        </div>
      ) : (
        <span className="cs-uf__modal">Pop-up modal</span>
      )}
    </div>
  );
}

function VanityLogging() {
  return (
    <div
      className="cs-uf cs-uf--vanity"
      role="img"
      aria-label="Product logging goes from three stacked form screens with pop-up modals to one screen with skippable inline fields, inspired by Beli's logging model."
    >
      <div className="cs-uf__logging">
        <div className="cs-uf__forms">
          <LoggingScreen />
          <LoggingScreen />
          <LoggingScreen />
        </div>
        <FlowArrow />
        <div className="cs-uf__logging-after">
          <LoggingScreen single />
          <p className="cs-uf__beli">Inspired by Beli's logging model</p>
        </div>
      </div>
    </div>
  );
}

function VanityPersonas() {
  return (
    <div
      className="cs-uf cs-uf--vanity"
      role="img"
      aria-label="Three illustrative personas: The Skincare Minimalist sees Skin only, The Makeup Enthusiast sees Complexion and Makeup, and The Hair-First User sees Hair type, Hair habits, and Concerns and goals."
    >
      <div className="cs-uf__personas">
        {VANITY_PERSONAS.map((persona) => (
          <article key={persona.name} className="cs-uf__persona">
            <h4 className="cs-uf__title">{persona.name}</h4>
            <p className="cs-uf__persona-goal">{persona.goal}</p>
            <p className="cs-uf__eyebrow">Sees</p>
            <ul className="cs-uf__persona-sections">
              {persona.sections.map((section) => (
                <li key={section}>{section}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="cs-uf__caption">Illustrative personas.</p>
    </div>
  );
}

export default function CaseStudyUserFlowMap({ variant }) {
  if (variant === "vanity-before-after") return <VanityBeforeAfter />;
  if (variant === "vanity-rules") return <VanityRules />;
  if (variant === "vanity-logging") return <VanityLogging />;
  if (variant === "vanity-personas") return <VanityPersonas />;
  return <DfaUserFlowMap />;
}
