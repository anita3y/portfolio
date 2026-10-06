const NAV = ["Home", "Projects", "About", "Team"];

const PAGES = [
  {
    id: "home",
    label: "Home",
    active: "Home",
    body: (
      <>
        <div className="dfa-wf__hero">
          <div className="dfa-wf__line dfa-wf__line--title" />
          <div className="dfa-wf__chips">
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="dfa-wf__pill">Join now</span>
        </div>
        <div className="dfa-wf__folder-card dfa-wf__folder-card--accent">
          <div className="dfa-wf__folder-tab">Our Mission</div>
          <div className="dfa-wf__folder-body">
            <div className="dfa-wf__line" />
            <div className="dfa-wf__line dfa-wf__line--short" />
            <span className="dfa-wf__pill dfa-wf__pill--ghost">Learn more</span>
          </div>
        </div>
        <p className="dfa-wf__section-label">Featured projects</p>
        <div className="dfa-wf__stack">
          <div className="dfa-wf__layer-card dfa-wf__layer-card--a">
            <div className="dfa-wf__line dfa-wf__line--mid" />
            <div className="dfa-wf__line dfa-wf__line--short" />
          </div>
          <div className="dfa-wf__layer-card dfa-wf__layer-card--b">
            <div className="dfa-wf__line dfa-wf__line--mid" />
            <div className="dfa-wf__line dfa-wf__line--short" />
          </div>
        </div>
      </>
    )
  },
  {
    id: "projects",
    label: "Projects",
    active: "Projects",
    body: (
      <>
        <p className="dfa-wf__section-label">Projects archive</p>
        <div className="dfa-wf__stack dfa-wf__stack--tight">
          {["a", "b", "c", "d"].map((tone) => (
            <div key={tone} className={`dfa-wf__layer-card dfa-wf__layer-card--${tone}`}>
              <div className="dfa-wf__card-head">
                <div className="dfa-wf__line dfa-wf__line--mid" />
                <span className="dfa-wf__tag" />
              </div>
              <div className="dfa-wf__inset">
                <div className="dfa-wf__line" />
                <div className="dfa-wf__line dfa-wf__line--short" />
              </div>
            </div>
          ))}
        </div>
      </>
    )
  },
  {
    id: "about",
    label: "About",
    active: "About",
    body: (
      <>
        <div className="dfa-wf__folder-card dfa-wf__folder-card--accent">
          <div className="dfa-wf__folder-tab">Who we are</div>
          <div className="dfa-wf__folder-body">
            <div className="dfa-wf__line" />
            <div className="dfa-wf__line dfa-wf__line--short" />
          </div>
        </div>
        <div className="dfa-wf__about-row">
          <div className="dfa-wf__media" />
          <div className="dfa-wf__note" aria-hidden="true">
            <div className="dfa-wf__line dfa-wf__line--short" />
            <div className="dfa-wf__line dfa-wf__line--short" />
          </div>
        </div>
        <p className="dfa-wf__section-label">What we do</p>
        <div className="dfa-wf__line" />
        <div className="dfa-wf__line dfa-wf__line--mid" />
        <span className="dfa-wf__pill dfa-wf__pill--ghost">See more</span>
      </>
    )
  },
  {
    id: "team",
    label: "Team",
    active: "Team",
    body: (
      <>
        <div className="dfa-wf__folder-card dfa-wf__folder-card--soft">
          <div className="dfa-wf__folder-tab">Who we are</div>
          <div className="dfa-wf__folder-body">
            <div className="dfa-wf__line" />
            <div className="dfa-wf__line dfa-wf__line--short" />
          </div>
        </div>
        <p className="dfa-wf__section-label">Meet the team</p>
        <div className="dfa-wf__avatars dfa-wf__avatars--lead">
          <span />
          <span />
        </div>
        <div className="dfa-wf__avatars">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className="dfa-wf__section-label">Become part of our team</p>
        <span className="dfa-wf__pill dfa-wf__pill--ghost">Interest form</span>
      </>
    )
  },
  {
    id: "newsletter",
    label: "Newsletter",
    optional: true,
    active: "Home",
    body: (
      <>
        <p className="dfa-wf__section-label">Stay updated</p>
        <div className="dfa-wf__folder-card">
          <div className="dfa-wf__folder-tab">Newsletter</div>
          <div className="dfa-wf__folder-body">
            <div className="dfa-wf__line" />
            <div className="dfa-wf__line dfa-wf__line--mid" />
            <div className="dfa-wf__form-row">
              <span className="dfa-wf__field" />
              <span className="dfa-wf__pill">Subscribe</span>
            </div>
          </div>
        </div>
        <p className="dfa-wf__hint">Optional page for events and chapter updates</p>
      </>
    )
  },
  {
    id: "get-involved",
    label: "Get Involved",
    cut: true,
    active: "Home",
    body: (
      <>
        <div className="dfa-wf__folder-card dfa-wf__folder-card--accent">
          <div className="dfa-wf__folder-tab">Join us</div>
          <div className="dfa-wf__folder-body">
            <div className="dfa-wf__line" />
            <div className="dfa-wf__line dfa-wf__line--short" />
          </div>
        </div>
        <p className="dfa-wf__section-label">Get involved</p>
        <div className="dfa-wf__cta-stack">
          <span className="dfa-wf__pill dfa-wf__pill--wide">Group interest form</span>
          <span className="dfa-wf__pill dfa-wf__pill--wide dfa-wf__pill--ghost">WhatsApp group</span>
        </div>
        <div className="dfa-wf__line dfa-wf__line--mid" />
        <div className="dfa-wf__line dfa-wf__line--short" />
        <p className="dfa-wf__hint">Explored, then cut — join lives in context on other pages</p>
      </>
    )
  }
];

function WireframeChrome({ active, children, label, optional, cut }) {
  return (
    <figure className={["dfa-wf__frame", cut && "dfa-wf__frame--cut"].filter(Boolean).join(" ")}>
      <div className="dfa-wf__browser" aria-hidden="true">
        <div className="dfa-wf__tabs">
          {NAV.map((tab) => (
            <span
              key={tab}
              className={[
                "dfa-wf__tab",
                tab === active && "dfa-wf__tab--active",
                tab === "Projects" && "dfa-wf__tab--projects",
                tab === "About" && "dfa-wf__tab--about",
                tab === "Team" && "dfa-wf__tab--team"
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {tab}
            </span>
          ))}
          <span className="dfa-wf__contact">Contact</span>
        </div>
        <div className="dfa-wf__page">{children}</div>
        <div className="dfa-wf__footer" />
      </div>
      <figcaption className="dfa-wf__caption">
        {label}
        {optional ? <span className="dfa-wf__optional"> optional</span> : null}
        {cut ? <span className="dfa-wf__optional"> cut</span> : null}
      </figcaption>
    </figure>
  );
}

export default function DfaWireframes() {
  return (
    <div
      className="dfa-wf"
      role="img"
      aria-label="Portfolio-style wireframes for Home, Projects, About, Team, optional Newsletter, and a Get Involved frame that was explored then cut, with folder tabs and layered cards"
    >
      <div className="dfa-wf__grid">
        {PAGES.map((page) => (
          <WireframeChrome
            key={page.id}
            active={page.active}
            label={page.label}
            optional={page.optional}
            cut={page.cut}
          >
            {page.body}
          </WireframeChrome>
        ))}
      </div>
    </div>
  );
}
