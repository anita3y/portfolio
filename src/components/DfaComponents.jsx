const MailIcon = () => (
  <svg
    className="dfa-comp__mail"
    viewBox="0 0 16 16"
    width="12"
    height="12"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M1.5 3.5A1.5 1.5 0 0 1 3 2h10a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 13 14H3A1.5 1.5 0 0 1 1.5 12.5v-9Zm1.6.5 4.5 3.2a.7.7 0 0 0 .8 0L12.9 4H3.1Zm9.9 1.2-4.2 3a2.2 2.2 0 0 1-2.6 0l-4.2-3v7.3c0 .2.2.5.5.5h10c.3 0 .5-.3.5-.5V5.2Z"
    />
  </svg>
);

const ArrowMarks = () => (
  <svg
    className="dfa-comp__arrows"
    viewBox="0 0 72 88"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M58 10c-10 6-18 16-22 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M40 34l-5 5 7 1z" fill="currentColor" />
    <path
      d="M62 48c-14 2-26 10-34 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M32 68l-6 3 7 2z" fill="currentColor" />
    <path
      d="M54 72c-8 4-16 8-26 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M32 78l-5 4 8-1z" fill="currentColor" />
  </svg>
);

function Piece({ caption, children, className = "" }) {
  return (
    <figure className={["dfa-comp__piece", className].filter(Boolean).join(" ")}>
      <div className="dfa-comp__stage">{children}</div>
      {caption ? <figcaption className="dfa-comp__caption">{caption}</figcaption> : null}
    </figure>
  );
}

function MissionCard() {
  return (
    <Piece caption="Our Mission → Learn more → About">
      <div className="dfa-comp__mission">
        <div className="dfa-comp__mission-panel">
          <p className="dfa-comp__mission-title">Our Mission</p>
          <div className="dfa-comp__mission-window">
            <p>
              We are a interdisciplinary community of students who use human-centered
              design to create impact locally and globally.
            </p>
          </div>
        </div>
        <span className="dfa-comp__sticker">Learn more</span>
      </div>
    </Piece>
  );
}

function FeaturedProjects() {
  return (
    <Piece caption="Featured projects → See more → Archive">
      <div className="dfa-comp__featured">
        <p className="dfa-comp__kicker">Featured projects</p>
        <div className="dfa-comp__project dfa-comp__project--green">
          <div className="dfa-comp__project-bar">
            <span className="dfa-comp__project-name">Civic Engagement Platform</span>
            <span className="dfa-comp__chip">
              Gopichand Busam
              <MailIcon />
            </span>
          </div>
          <p className="dfa-comp__project-copy">
            The NYU Changemaker Center Civic Fellows is designing and developing a
            centralized civic engagement website.
          </p>
        </div>
        <div className="dfa-comp__project dfa-comp__project--yellow">
          <div className="dfa-comp__project-bar">
            <span className="dfa-comp__project-name">DFA Website Redesign</span>
            <span className="dfa-comp__chip">
              Khushi Chandawar
              <MailIcon />
            </span>
          </div>
          <p className="dfa-comp__project-copy">
            DFA NYU will be working on the redevelopment of DFA&apos;s website, focusing
            on clear information architecture, intuitive navigation, and a refined
            design aligned with the organization&apos;s identity.
          </p>
        </div>
        <span className="dfa-comp__sticker dfa-comp__sticker--see">See more</span>
      </div>
    </Piece>
  );
}

function JoinUsNow() {
  return (
    <Piece caption="Join us now → Interest form + WhatsApp">
      <div className="dfa-comp__join-us">
        <p className="dfa-comp__kicker">Join us now!</p>
        <div className="dfa-comp__join-stack">
          <span className="dfa-comp__outline-pill">Fill in our group interest form</span>
          <span className="dfa-comp__outline-pill">Get added to our WhatsApp</span>
        </div>
        <ArrowMarks />
      </div>
    </Piece>
  );
}

function JoinNow() {
  return (
    <Piece caption="Join now → Header CTA" className="dfa-comp__piece--join-now">
      <div className="dfa-comp__join-now">
        <p className="dfa-comp__value-label">Sustainability</p>
        <div className="dfa-comp__join-halo">
          <span className="dfa-comp__join-pill">Join now</span>
        </div>
      </div>
    </Piece>
  );
}

const GROUPS = [
  {
    id: "discover",
    title: "Discover projects & impact",
    blurb:
      "The mission window and featured projects section both pull visitors deeper. Learn more routes to About, See more opens the full project archive.",
    pieces: [<MissionCard key="mission" />, <FeaturedProjects key="featured" />]
  },
  {
    id: "join",
    title: "Join / get involved",
    blurb:
      "Join CTAs repeat across the site, from a persistent header button to a bottom-of-page section with the interest form and WhatsApp group.",
    pieces: [<JoinUsNow key="join-us" />, <JoinNow key="join-now" />]
  }
];

export default function DfaComponents() {
  return (
    <div
      className="dfa-comp"
      role="img"
      aria-label="DFA UI components for Discover projects and impact and Join get involved"
    >
      {GROUPS.map((group) => (
        <section key={group.id} className="dfa-comp__group">
          <header className="dfa-comp__group-head">
            <h4 className="dfa-comp__group-title">{group.title}</h4>
            <p className="dfa-comp__group-blurb">{group.blurb}</p>
          </header>
          <div className="dfa-comp__grid">{group.pieces}</div>
        </section>
      ))}
    </div>
  );
}
