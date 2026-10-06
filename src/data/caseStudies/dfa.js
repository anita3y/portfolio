import { assetUrl } from "../../utils/assetUrl.js";

const FIGMA_WIREFRAMES = assetUrl("/case-studies/dfa/figma-wireframes.png");
const FLOW_MISSION = assetUrl("/case-studies/dfa/flows/mission-learn-more.png");
const FLOW_FEATURED = assetUrl("/case-studies/dfa/flows/featured-projects.png");
const FLOW_JOIN_SECTION = assetUrl("/case-studies/dfa/flows/join-us-now.png");
const FLOW_JOIN_BUTTON = assetUrl("/case-studies/dfa/flows/join-now-button.png");
const FLOW_CONTACT = assetUrl("/case-studies/dfa/flows/contact-button.png");
const AUDIT_RISDXBROWN = assetUrl("/case-studies/dfa/competitive-audit-risdxbrown.png");
const AUDIT_CMU = assetUrl("/case-studies/dfa/competitive-audit-cmu.png");
const VISUAL_BRAINSTORM_1 = assetUrl("/case-studies/dfa/visual-brainstorm-1.png");
const VISUAL_BRAINSTORM_2 = assetUrl("/case-studies/dfa/visual-brainstorm-2.png");
const RIKO_STRATEGY_IA = assetUrl("/case-studies/dfa/riko-strategy-ia.png");

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
    { label: "team", value: "1 Product Designer\n1 Product Manager" },
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
          heading: "Success criteria",
          bullets: [
            "Clear information architecture for projects, team, and get-involved flows.",
            "Consistent visual system built for growth, not one-off pages.",
            "Documentation for content updates and chapter onboarding."
          ]
        }
      ]
    },
    {
      id: "discovery-research",
      title: "discovery & research",
      summary:
        "Before designing, I aligned with our PM on audience, chapter priorities, and the specific stories the site needed to tell. I also audited how peer chapters present themselves online.",
      blocks: [
        {
          heading: "Strategy (Riko)",
          paragraphs: [
            "Our PM Riko framed the revamp around one goal: get more students to reach out. The site had to make joining feel obvious, not buried behind project galleries."
          ]
        },
        {
          heading: "Audience & priorities",
          bullets: [
            "Primary audience: freshmen through juniors across NYU schools, not just Tandon.",
            "They care about inclusiveness, whether projects feel fun, what the club actually does, and why they should join.",
            "Strategic focus: make “why join” unmistakable; lead with cross-disciplinary collaboration as a core value.",
            "Surface who we are, the e-board, past projects, and clear ways to reach out, form or email."
          ]
        },
        {
          heading: "What the site needed",
          bullets: [
            "Landing page with a prominent Join button",
            "Mission, About, team, alumni, archive, events, and projects",
            "Advisor and past e-board context",
            "Contact paths, and a fun element (characters, animation) so the chapter feels approachable"
          ]
        }
      ],
      subsections: [
        {
          id: "competitive-audit-research",
          title: "competitive audit research",
          summary:
            "I audited how other DFA chapters present themselves online: what works for recruitment, what gets in the way, and where NYU could do better.",
          blocks: [
            {
              heading: "Competitive audit",
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
                alt: "Riko's document mapping Main User Types to Info-Architecture with colored connection lines",
                caption:
                  "Riko's map connecting the needs she listed to information architecture: prospective NYU students, external viewers, and DFA National / other chapters → Home, Projects, Team, Newsletter, Get Involved.",
                wide: true
              }
            },
            {
              image: {
                src: VISUAL_BRAINSTORM_1,
                alt: "BRAINSTORM board with strategy notes, color palettes, puzzle motif, and folder references",
                caption: "BRAINSTORM board",
                wide: true
              }
            },
            {
              image: {
                src: VISUAL_BRAINSTORM_2,
                alt: "DFA at NYU Design Guide Brainstorm exploring play and education with a folders concept",
                caption: "Design guide brainstorm",
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
            }
          ]
        }
      ],
      blocks: [
        {
          heading: "Wireframes & visual direction",
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
          heading: "Final wireframes",
          paragraphs: [
            "High-fidelity wireframes for the four core pages (Landing, About, Archive, and Team), with CTAs mapped to each key flow. Purple annotations mark animation and motion specs for dev handoff."
          ]
        },
        {
          heading: "Key flows",
          paragraphs: [
            "Every major page routes visitors toward one of three goals: discover what we do, join the club, or get in touch. I mapped how each CTA connects pages before wireframing the details."
          ],
          layout: "userFlowMap"
        },
        {
          heading: "Discover projects & impact",
          paragraphs: [
            "The mission window and featured projects section both pull visitors deeper. Learn more routes to About, See more opens the full project archive."
          ],
          layout: "wireframes",
          images: [
            {
              src: FLOW_MISSION,
              alt: "Our Mission card with Learn more button leading to the About page",
              caption: "Our Mission → Learn more → About"
            },
            {
              src: FLOW_FEATURED,
              alt: "Featured projects section with See more button leading to the project archive",
              caption: "Featured projects → See more → Archive"
            }
          ]
        },
        {
          heading: "Join / get involved",
          paragraphs: [
            "Join CTAs repeat across the site, from a persistent header button to a bottom-of-page section with the interest form and WhatsApp group."
          ],
          layout: "wireframes",
          images: [
            {
              src: FLOW_JOIN_SECTION,
              alt: "Join us now section with group interest form and WhatsApp buttons",
              caption: "Join us now — interest form & WhatsApp"
            },
            {
              src: FLOW_JOIN_BUTTON,
              alt: "Join now pill button in the site header",
              caption: "Join now — header CTA"
            }
          ]
        },
        {
          heading: "Contact & partner outreach",
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
        "Four core pages—team, archive, about, and homepage—built from a shared component library so future leads can swap content without redesigning from scratch.",
      blocks: [
        {
          paragraphs: [
            "Final design prioritizes scannable project stories, a welcoming team presence, and clear paths for visitors to participate.",
            "Every page reuses the same tab navigation, folder cards, CTAs, and typography—mapped to real content types for easy handoff in Framer."
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
            "Framer components match the content types we actually publish, so new pages reuse the same pieces.",
            "Wrote down how the site is structured so new leads can pick it up.",
            "Built to change over time, not freeze after launch."
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
            "For nonprofit sites, clarity beats complexity. If a section doesn’t earn its place, cut it."
          ]
        }
      ]
    }
  ]
};
