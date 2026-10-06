import { assetUrl } from "../../utils/assetUrl.js";

const FIGMA_WIREFRAMES = assetUrl("/case-studies/dfa/figma-wireframes.png");
const FLOW_CONTACT = assetUrl("/case-studies/dfa/flows/contact-button.png");
const COMPONENTS_UI = assetUrl("/case-studies/dfa/components-ui.png");
const AUDIT_RISDXBROWN = assetUrl("/case-studies/dfa/competitive-audit-risdxbrown.png");
const AUDIT_CMU = assetUrl("/case-studies/dfa/competitive-audit-cmu.png");
const VISUAL_BRAINSTORM_1 = assetUrl("/case-studies/dfa/visual-brainstorm-1.png");
const VISUAL_BRAINSTORM_2 = assetUrl("/case-studies/dfa/visual-brainstorm-2.png");
const RIKO_STRATEGY_IA = assetUrl("/case-studies/dfa/riko-strategy-ia.png");
const RIKO_IA_DECISION = assetUrl("/case-studies/dfa/riko-ia-decision.png");

const SOLUTION_TEAM = assetUrl("/case-studies/dfa/solution/team.jpg");
const SOLUTION_ARCHIVE = assetUrl("/case-studies/dfa/solution/archive.jpg");
const SOLUTION_ABOUT = assetUrl("/case-studies/dfa/solution/about.jpg");
const SOLUTION_HOMEPAGE = assetUrl("/case-studies/dfa/solution/homepage.jpg");
const SOLUTION_COMPONENTS = assetUrl("/case-studies/dfa/solution/components.png");

export const DFA_CASE_STUDY = {
  id: "design-for-america",
  breadcrumb: ["Portfolio", "Work: Design for America"],
  title: "Design for America x NYU",
  details: [
    { label: "role", value: "Product Designer" },
    { label: "timeline", value: "Aug-Sept 2026" },
    { label: "team", value: "1 Product Designer\n1 Product Manager\n1 Developer" },
    { label: "skills", value: "Product design,\nUser research" }
  ],
  meta: {
    role: "Product design · Web",
    timeline: "2025",
    tools: ["Framer", "Figma", "Notion"]
  },
  heroSlides: [
    assetUrl("/case-studies/dfa/banner-01.png"),
    assetUrl("/case-studies/dfa/banner-02.png"),
    assetUrl("/case-studies/dfa/banner-03.png"),
    assetUrl("/case-studies/dfa/banner-04.png")
  ],
  heroSlideInterval: 450,
  heroBackground: "#0b0b0c",
  sections: [
    {
      id: "overview",
      title: "overview",
      blocks: [
        {
          paragraphs: [
            "Design for America @ NYU had 1,000+ members but no centralized website. As the chapter started taking on projects and expanding into design services and student work, not just tutorials and speaker series, they needed a place to hold past projects and clarify what the chapter does."
          ],
          callout: {
            emoji: "🧩",
            label: "Problem",
            text: "No central home for the chapter. Past projects lived in scattered folders, and new members couldn’t easily see what DFA @ NYU actually does."
          }
        },
        {
          heading: "Objectives",
          bullets: [
            "Create a credible online presence for DFA @ NYU.",
            "Showcase projects in a way that communicates real-world impact.",
            "Design a modular system other chapters can reuse.",
            "Enable an easy handoff so future leads can update content without breaking the site."
          ]
        },
        {
          heading: "Success Criteria",
          bullets: [
            "Clear information architecture for projects, team, and get-involved flows.",
            "Consistency and scalability: a visual system built for growth, plus docs for content updates and chapter onboarding."
          ]
        }
      ]
    },
    {
      id: "discovery-research",
      title: "discovery & research",
      summary:
        "Before designing, I aligned with our PM on who the site was for and what it had to carry, then audited how peer chapters present themselves online.",
      blocks: [
        {
          heading: "Strategy (Riko)",
          paragraphs: [
            "Our PM Riko framed the revamp around one goal: get more students to reach out. The site had to make joining feel obvious, not buried behind project galleries."
          ]
        },
        {
          heading: "Audience & Site Needs",
          paragraphs: [
            "Primary audience: NYU freshmen through juniors across schools. Make why join clear, and show the team, past projects, and how to reach out.",
            "The site needed a landing with Join, mission/about/team/archive/projects, contact paths, and a bit of play so the chapter feels approachable."
          ]
        }
      ],
      subsections: [
        {
          id: "competitive-audit-research",
          title: "Competitive Audit Research",
          summary:
            "I audited how other DFA chapters present themselves online: what works for recruitment, what gets in the way, and where NYU could do better.",
          blocks: [
            {
              heading: "Competitive Audit",
              paragraphs: [
                "I reviewed peer chapter sites to understand how they balance showcasing work with welcoming new members."
              ]
            },
            {
              heading: "DFA @ RISD×Brown",
              bullets: [
                "Pros: playful interactivity, simple navigation, intuitive hierarchy, strong project showcase.",
                "Cons: feels built for clients more than prospective members: weak “why join,” little on member benefits or commitment, and key paths like joining or events aren’t prioritized."
              ],
              image: {
                src: AUDIT_RISDXBROWN,
                alt: "Competitive audit board for DFA at RISDxBrown with pros and cons sticky notes",
                caption: "RISDxBrown — competitive audit",
                wide: true
              }
            },
            {
              heading: "DFA @ CMU",
              bullets: [
                "Pros: warm, inviting branding; balances recruitment and client-facing work; clear mission focus.",
                "Cons: dense About page that’s hard to skim; long paragraphs with weak visual hierarchy before visitors reach a call to action."
              ],
              image: {
                src: AUDIT_CMU,
                alt: "Competitive audit board for DFA at CMU with pros and cons sticky notes",
                caption: "CMU — competitive audit",
                wide: true
              }
            }
          ]
        }
      ]
    },
    {
      id: "process",
      title: "process",
      subsectionsFirst: true,
      summary:
        "Once the strategy was clear, I explored visual direction, information architecture, wireframes, and page flows that could scale.",
      subsections: [
        {
          id: "visual-brainstorm",
          title: "Visual Brainstorm",
          blocks: [
            {
              paragraphs: [
                "I started by consolidating the strategy needs Riko (the product manager) had already mapped with visual design. Her notes covered who the site was for and what each group needed; the boards below were me figuring out how that brief could look and feel."
              ],
              image: {
                src: RIKO_STRATEGY_IA,
                alt: "Riko's document mapping four Main User Types to Info-Architecture, including Current member and About",
                caption:
                  "Riko's map connecting user needs to information architecture: prospective NYU students, external viewers, current members, and DFA National / other chapters → Home, Projects, About, Team, Newsletter, Get Involved.",
                wide: true
              }
            },
            {
              heading: "Content and Visual Brainstorm with Riko (Product Manager)",
              image: {
                src: VISUAL_BRAINSTORM_1,
                alt: "Brainstorm board with strategy notes, color palettes, puzzle motif, and folder references",
                wide: true
              }
            },
            {
              image: {
                src: VISUAL_BRAINSTORM_2,
                alt: "DFA at NYU Design Guide Brainstorm exploring play and education with a folders concept",
                caption: "Design Guide Brainstorm",
                wide: true
              }
            },
            {
              heading: "Theme: Folders",
              paragraphs: [
                "Tabbed folder headers like file dividers. Layered cards that feel like stacked documents. A system inspired by folders, files, and layered organization."
              ],
              bullets: [
                "Building over time",
                "Archiving impact",
                "Structured collaboration",
                "Studio-based work",
                "Systems thinking"
              ]
            },
            {
              image: {
                src: RIKO_IA_DECISION,
                alt: "Riko's document mapping Main User Types to Info-Architecture (Home, Projects, About, Team) and CTAs (Get Involved, Contact)",
                caption: "Riko's document: user types → IA → CTAs",
                wide: true
              }
            },
            {
              heading: "IA Decision",
              paragraphs: [
                "I eliminated a standalone Get Involved page. Get Involved lives on pages that already give context to new students before they hit join, so they're not dropped into a CTA with no story. Principle: every page should earn its place."
              ]
            }
          ]
        }
      ],
      blocks: [
        {
          heading: "Wireframes & Visual Direction",
          paragraphs: [
            "From there I mapped information architecture, carried the folders theme forward, and wireframed key pages before moving into high-fidelity design."
          ],
          image: {
            src: FIGMA_WIREFRAMES,
            alt: "Figma board showing DFA NYU competitive audits, strategy notes, site map, and wireframe explorations",
            caption: "Figma — strategy, IA, and wireframes",
            wide: true
          }
        },
        {
          heading: "Final Wireframes",
          paragraphs: [
            "Page frames for Home, Projects, About, and Team, plus an optional Newsletter. Get Involved was explored as its own frame, then cut; join CTAs stay in the header and on pages with context. Folder tabs and layered cards stay consistent so one developer can implement a shared pattern and reuse it across pages."
          ],
          layout: "dfaWireframes"
        },
        {
          heading: "Key Flows",
          paragraphs: [
            "Every major page routes visitors toward one of three goals: discover what we do, join the club, or get in touch. I mapped how each CTA connects pages before wireframing the details."
          ],
          layout: "userFlowMap"
        },
        {
          heading: "Components",
          paragraphs: [
            "UI pieces that carry the key flows: mission and featured projects for discovery, plus the join CTAs that repeat across the site."
          ],
          image: {
            src: COMPONENTS_UI,
            alt: "UI components for Discover projects and impact and Join get involved, including Our Mission, Featured Projects, Join us now, and Join now",
            caption: "Discover and Join UI Pieces",
            wide: true
          }
        },
        {
          heading: "Contact & Partner Outreach",
          paragraphs: [
            "A Contact button in the landing page header gives visitors a direct path to reach the chapter, alongside join CTAs at the bottom of every page."
          ],
          image: {
            src: FLOW_CONTACT,
            alt: "Contact button in the landing page header navigation",
            caption: "Contact — header on landing page",
            narrow: true
          }
        }
      ]
    },
    {
      id: "solution",
      title: "solution",
      summary:
        "Four core pages (team, archive, about, homepage) built from a shared component library so future leads can swap content without redesigning from scratch.",
      blocks: [
        {
          callout: {
            emoji: "💡",
            label: "Solution",
            text: "Four core pages (team, archive, about, homepage) from a shared component library so future leads can swap content without redesigning from scratch. Scannable project stories, a welcoming team, and clear join paths, with shared tabs, folder cards, and CTAs ready for a later Framer build."
          }
        },
        {
          paragraphs: [
            "Final design prioritizes scannable project stories, a welcoming team presence, and clear paths for visitors to participate.",
            "Every page reuses the same tab navigation, folder cards, CTAs, and typography, mapped to real content types so a later Framer build can reuse the same pieces."
          ]
        },
        {
          heading: "Team",
          paragraphs: [
            "Leadership and members get equal visibility—president and co-president up top, then the broader e-board grid. Join CTAs repeat at the bottom so recruitment stays one scroll away."
          ],
          image: {
            src: SOLUTION_TEAM,
            alt: "DFA NYU team page with leadership photos, e-board grid, and join CTAs",
            caption: "Team — leadership, e-board, and get-involved paths",
            page: true
          }
        },
        {
          heading: "Project archive",
          paragraphs: [
            "Every past project gets the same card pattern—title, contributor, and a scannable description—color-coded so the archive feels lively without losing hierarchy."
          ],
          image: {
            src: SOLUTION_ARCHIVE,
            alt: "DFA NYU projects archive with color-coded project cards and get involved section",
            caption: "Archive — scannable project stories",
            page: true
          }
        },
        {
          heading: "About",
          paragraphs: [
            "Mission and design-thinking context up front, then what we do—with a See more path into deeper chapter content. Sticky-note accents keep the tone approachable."
          ],
          image: {
            src: SOLUTION_ABOUT,
            alt: "DFA NYU about page with mission statement, design thinking section, and what we do",
            caption: "About — mission, design thinking, and chapter story",
            page: true
          }
        },
        {
          heading: "Homepage",
          paragraphs: [
            "The landing page leads with values chips and a bold Join CTA, surfaces featured projects, and routes visitors to mission, archive, and contact—every major path visible above the fold or one scroll down."
          ],
          image: {
            src: SOLUTION_HOMEPAGE,
            alt: "DFA NYU homepage with values chips, mission card, featured projects, and join section",
            caption: "Homepage — values, mission, featured projects, join",
            page: true
          }
        },
        {
          heading: "Components",
          paragraphs: [
            "A reusable library—type styles, color tokens, folder textures, cards, CTAs, and sticky notes—documented for scalability. New pages assemble from these pieces; future leads update copy and imagery without breaking the system."
          ],
          image: {
            src: SOLUTION_COMPONENTS,
            alt: "DFA design system showing typography, colors, shadows, cards, buttons, and sticky note components",
            caption: "Component library — typography, color, cards, CTAs, and handoff-ready patterns",
            wide: true
          }
        }
      ]
    },
    {
      id: "results-impact",
      title: "results & impact",
      summary: "What changed, what shipped, and what should still work after this leadership cycle.",
      blocks: [
        {
          heading: "Results",
          bullets: [
            "One place to see projects and a clearer story of what the chapter does.",
            "New leads can update content without rebuilding the site from scratch.",
            "Other chapters have a real example they can borrow from."
          ]
        },
        {
          heading: "Scaling for the future",
          bullets: [
            "Documented the content patterns, page structure, and visual design system so whoever builds in Framer later can reuse the same pieces.",
            "Wrote down how the site is structured so new leads can pick it up without starting from scratch.",
            "Designed for change over time, not a freeze after launch, so the handoff stays usable."
          ]
        }
      ]
    },
    {
      id: "reflection",
      title: "reflection",
      summary: "What I’d carry into the next nonprofit or community product.",
      blocks: [
        {
          heading: "Lessons learned",
          bullets: [
            "Getting on the same page early saved us from reworking the sitemap and voice later.",
            "Making the site easy to update mattered as much as how it looked on launch day.",
            "For nonprofit sites, clarity beats complexity. If a section doesn’t earn its place, I’d cut it."
          ]
        }
      ]
    }
  ]
};
