import { assetUrl } from "../../utils/assetUrl.js";

const BANNER = assetUrl("/case-studies/chatgpt-branches/banner.png");
const DEMO_VIDEO = assetUrl("/case-studies/chatgpt-branches/demo.mov");
const BRANCHES_GREY = "#ececee";

const FRAME_01 = assetUrl("/case-studies/chatgpt-branches/frames/frame-01-offer-choices.png");
const FRAME_02 = assetUrl("/case-studies/chatgpt-branches/frames/frame-02-inside-branch.png");
const FRAME_03 = assetUrl("/case-studies/chatgpt-branches/frames/frame-03-switch-tabs.png");
const FRAME_04 = assetUrl("/case-studies/chatgpt-branches/frames/frame-04-collapse-branch.png");

const COMP_CHOICE_CHIPS = assetUrl("/case-studies/chatgpt-branches/components/choice-chips-hover.png");
const COMP_LEFT_RAIL = assetUrl("/case-studies/chatgpt-branches/components/left-rail.png");
const COMP_EXPLORED_CHIPS = assetUrl("/case-studies/chatgpt-branches/components/explored-chips-footer.png");
const COMP_COLLAPSED_ROW = assetUrl("/case-studies/chatgpt-branches/components/collapsed-branch-row.png");
const COMP_SIDE_MARKERS = assetUrl("/case-studies/chatgpt-branches/components/side-markers.png");

export const CHATGPT_BRANCHES_CASE_STUDY = {
  id: "chatgpt-branches",
  breadcrumb: ["Portfolio", "Work: ChatGPT Branches"],
  title: "ChatGPT Branches",
  meta: {
    role: "Concept · Product design",
    timeline: "2025",
    tools: ["Figma", "Research", "Prototyping"]
  },
  heroSlides: [
    {
      src: BANNER,
      alt: "Choice chips with explored Tight budget, active Comfortable tab, and left rail marking branch scope"
    }
  ],
  heroAspectRatio: "1020 / 200",
  heroFlat: true,
  heroCompact: true,
  heroFit: "cover",
  heroObjectPosition: "top",
  heroBackground: "#fff",
  sections: [
    {
      id: "problem",
      title: "The Problem",
      summary:
        "Long ChatGPT sessions branch in your head—budget vs. comfortable, tone A vs. tone B—but the UI stays one flat thread. I studied how people already wayfind in chat and where that breaks down when alternatives pile up.",
      blocks: [
        {
          heading: "Linear threads don’t match how people think",
          bullets: [
            "Real conversations branch—one question leads to a side exploration, then you come back.",
            "ChatGPT treats everything as one flat timeline, even when the assistant offers clear forks.",
            "Trying a different path means re-prompting from scratch or losing track of what you already explored."
          ]
        },
        {
          heading: "Choice points have no structure",
          bullets: [
            "When the model offers options—budget tiers, tones, formats—they read as one-off replies, not paths you can revisit.",
            "There’s no visual anchor for “I’m exploring this option” vs. “I’m back on the main thread.”",
            "Follow-ups blur together; context from abandoned paths is hard to recover."
          ]
        },
        {
          heading: "Branches exist, but wayfinding doesn’t",
          bullets: [
            "Exploring alternatives helps, but long sessions still feel disorienting.",
            "It’s hard to see what you tried, what you set aside, and what’s worth returning to.",
            "Users need structure—not more threads, but a map of where they’ve been."
          ]
        }
      ]
    },
    {
      id: "goal",
      title: "The Goal",
      summary:
        "Explore a concept where branching starts at natural choice points—when the assistant offers options—and stays reversible through tabs, rails, and collapse so the main thread stays readable.",
      blocks: [
        {
          heading: "Core ideas",
          bullets: [
            "Branch from choice chips when the assistant surfaces multiple paths—not only from arbitrary messages.",
            "Tabs + left rail: the selected option becomes a scoped tab; a vertical rail marks what belongs to that branch.",
            "Collapse & markers: tuck explored branches away and use side markers so you can jump back without scrolling."
          ]
        },
        {
          heading: "Design principles",
          bullets: [
            "Familiar patterns first—chips, tabs, and rails borrow from chat and browser mental models.",
            "Keep the main conversation readable; branches shouldn’t explode the UI.",
            "Make exploration reversible—explored options grey out, but you can always return."
          ]
        }
      ]
    },
    {
      id: "research",
      title: "Research & Insights",
      summary:
        "I looked at how people manage complexity in chat—Messages threads, Slack, browser tabs—and where ChatGPT breaks down when sessions get long.",
      blocks: [
        {
          heading: "Competitive & pattern audit",
          bullets: [
            "Browser tabs: each path gets its own lane; switching is low-cost, but tabs multiply fast.",
            "Slack threads: good for side conversations, but separate from the main flow.",
            "Segmented controls & chips: familiar for “pick one of these”—but chat UIs rarely treat them as persistent branches."
          ]
        },
        {
          heading: "User pain points (concept research)",
          bullets: [
            "“I had a great answer three prompts ago but I can’t find it.”",
            "“I wanted to try a different approach without losing my original thread.”",
            "“I don’t know which branch I’m in or how to get back to the main topic.”"
          ]
        },
        {
          heading: "Key insight",
          bullets: [
            "People don’t need infinite branches—they need choice points that feel like tabs, not dead-end replies.",
            "Collapse and markers turn a messy tree into something scannable; the main thread should stay the hero."
          ]
        }
      ]
    },
    {
      id: "process",
      title: "Design Process",
      summary:
        "I mapped the interaction in four beats—from offering a branch at a chip, to scoping content inside it, switching between explored paths, and collapsing back to a tidy main thread.",
      blocks: [
        {
          heading: "Key flows",
          layout: "flows",
          variant: "visual",
          flowBackground: BRANCHES_GREY,
          items: [
            {
              step: "01",
              label: "Assistant offers choices — hover a chip to branch",
              image: {
                src: FRAME_01,
                alt: "ChatGPT thread with choice chips and a Start a new branch tooltip on hover",
                background: BRANCHES_GREY
              }
            },
            {
              step: "02",
              label: "Inside the branch — selected chip becomes a tab, left rail marks scope",
              image: {
                src: FRAME_02,
                alt: "Branch view with an active tab and left rail scoping the response",
                background: BRANCHES_GREY
              }
            },
            {
              step: "03",
              label: "Switch tabs — explored option greys out, you can always return",
              image: {
                src: FRAME_03,
                alt: "Comfortable tab active with an explored Tight budget chip greyed out",
                background: BRANCHES_GREY
              }
            },
            {
              step: "04",
              label: "Collapse a branch — main thread stays readable, markers map where you've been",
              image: {
                src: FRAME_04,
                alt: "Collapsed branch row on the main thread with side markers",
                background: BRANCHES_GREY
              }
            }
          ]
        },
        {
          heading: "Concept components",
          layout: "wireframes",
          variant: "components",
          images: [
            {
              src: COMP_CHOICE_CHIPS,
              alt: "Choice chips with Tight budget hovered and a Start a new branch tooltip",
              caption: "Choice chips with branch affordance on hover"
            },
            {
              src: COMP_LEFT_RAIL,
              alt: "Active Tight budget chip with a left rail marking scoped branch content",
              caption: "Left rail (branching)"
            },
            {
              src: COMP_EXPLORED_CHIPS,
              alt: "Explored Tight budget chip greyed out beside an active Comfortable tab",
              caption: "Explored-state chips and switch footer"
            },
            {
              src: COMP_SIDE_MARKERS,
              alt: "Vertical side markers mapping branch points along the thread",
              caption: "Side markers",
              narrow: true
            },
            {
              src: COMP_COLLAPSED_ROW,
              alt: "Collapsed branch row summarizing Budget vs Comfortable with expand control",
              caption: "Collapsed branch row",
              fullRow: true
            }
          ]
        }
      ]
    },
    {
      id: "solution",
      title: "Solution",
      summary:
        "The concept treats assistant-offered options as first-class branches: chips open paths, tabs and a left rail keep each path scoped, and collapse plus markers preserve a readable main thread.",
      blocks: [
        {
          heading: "01 · Assistant offers choices",
          paragraphs: [
            "When the model surfaces a fork—budget vs. comfortable, tone A vs. B—each option appears as a chip. Hover reveals a branch affordance so exploration feels intentional, not accidental."
          ],
          image: {
            src: FRAME_01,
            alt: "ChatGPT interface where hovering a Tight budget chip shows a Start a new branch tooltip",
            caption: "01 · Assistant offers choices — hover a chip to branch",
            wide: true
          }
        },
        {
          heading: "02 · Inside the branch",
          paragraphs: [
            "Selecting a chip promotes it to an active tab. A left rail runs alongside the branch content so it’s visually scoped—this reply belongs to this path, not the whole thread."
          ],
          image: {
            src: FRAME_02,
            alt: "Branch view with Tight budget selected as a tab and a left rail marking scoped content",
            caption: "02 · Inside the branch — selected chip becomes a tab, left rail marks scope",
            wide: true
          }
        },
        {
          heading: "03 · Switch tabs",
          paragraphs: [
            "Explored options grey out with a checkmark; the active tab stays highlighted. A footer reminds you what you’ve already tried and that you can tap any chip to return."
          ],
          image: {
            src: FRAME_03,
            alt: "Comfortable tab active with Tight budget greyed out and an explored-state footer",
            caption: "03 · Switch tabs — explored option greys out, you can always return",
            wide: true
          }
        },
        {
          heading: "04 · Collapse a branch",
          paragraphs: [
            "When you’re done comparing, collapse the branch into a compact row—title, explored chips, expand control. The main thread continues below; side markers map branch points so you can jump back without losing the narrative."
          ],
          image: {
            src: FRAME_04,
            alt: "Collapsed Budget vs Comfortable branch with expand control and side markers on the main thread",
            caption: "04 · Collapse a branch — main thread stays readable, markers map where you've been",
            wide: true
          }
        },
        {
          heading: "Full interaction demo",
          paragraphs: [
            "A walkthrough of the full flow—hovering a chip to branch, switching tabs, and collapsing back to a readable main thread."
          ],
          layout: "videos",
          videoVariant: "desktop",
          videoAspectRatio: "1910 / 1176",
          videoBackground: BRANCHES_GREY,
          videos: [
            {
              src: DEMO_VIDEO,
              alt: "Screen recording demo of ChatGPT Branches chip hover, tab switching, and branch collapse",
              caption: "End-to-end interaction demo"
            }
          ]
        }
      ]
    },
    {
      id: "reflection",
      title: "Reflection",
      summary:
        "This is a concept study—not shipped work—but it sharpened how I think about AI product design: branch at natural choice points, scope content clearly, and always leave a path home.",
      blocks: [
        {
          heading: "Why this direction",
          bullets: [
            "Chips lower the cost of exploring alternatives—you don’t abandon the thread to try something new.",
            "Tabs and rails make each path legible without spawning separate chats.",
            "Collapse and markers keep long sessions scannable; the main thread stays the anchor."
          ]
        },
        {
          heading: "Open questions",
          bullets: [
            "How many simultaneous branches before tabs feel heavy?",
            "Should collapse happen automatically after a follow-up on the main thread?",
            "How does this interact with shared conversations or team workspaces?"
          ]
        },
        {
          heading: "What I’d explore next",
          bullets: [
            "Prototype the chip-to-branch interaction and test comprehension with 5–8 users.",
            "Compare collapsed rows vs. minimap markers for 20+ message sessions.",
            "Stress-test nested branches—branch inside a branch—and see where wayfinding breaks."
          ]
        }
      ]
    }
  ]
};
