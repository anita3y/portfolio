import { assetUrl } from "../../utils/assetUrl.js";

/*
 * Case study template v2. Anita's chapters (Overview / Process) with the
 * RevisionDojo-style beats inside: grey eyebrow -> one-line heading -> a
 * sentence or two -> a soft-grey visual panel with a short note under it.
 * The messy process lives in the deck. TODO = swap in real content.
 */

const frame = (n) => assetUrl(`/case-studies/ai-workflow/frame-${n}.svg`);

export const AI_WORKFLOW_CASE_STUDY = {
  id: "ai-workflow",
  template: "v2",
  title: "AI Workflow (Use-Research)",

  /* One motion showcase after the intro. Swap `src` for `video: assetUrl("/case-studies/ai-workflow/showcase.mp4")` when it's ready. */
  heroShowcase: {
    src: frame("01"),
    label: "TODO motion showcase",
    aspectRatio: "16 / 10"
  },

  intro: [
    "A semester of user research into how designers work now that their workflows have become AI-heavy, culminating in a set of Figma desktop features that support the industry's shift in how design work *actually* gets done."
  ],

  /* End card: "just a snapshot" + copy-email button. */
  snapshot: true,

  detailsVariant: "compact",
  details: [
    { label: "role", value: "UX Researcher, Product Designer" },
    { label: "timeline", value: "Sept–Nov 2026" },
    { label: "team", value: "Solo, advised by Akshay Verma" },
    { label: "skills", value: "Interviews, synthesis, product design" }
  ],

  sections: [
    {
      id: "overview",
      title: "overview",
      subsections: [
        {
          id: "findings",
          title: "Findings",
          blocks: [
            {
              eyebrow: "The problem",
              heading: "AI made design work faster, but catching up on it got harder.",
              text: "Work that used to live in a shared Figma file now happens in private AI chats, and teammates can't see what changed."
            },
            {
              eyebrow: "Insights",
              layout: "insightPanels",
              items: [
                { diagram: "reference", caption: "Figma became the **reference**, not the **canvas**." },
                { diagram: "trail", caption: "AI work leaves **no shared trail**." },
                { diagram: "alone", caption: "Everyone **patches it alone**." }
              ]
            }
          ]
        },
        {
          id: "interactive-chart",
          title: "Interactive chart",
          blocks: [
            {
              heading: "Six designers, six very different workflows.",
              layout: "researchGraph",
              bleed: true,
              note: "Where AI tools and Figma trade places."
            }
          ]
        },
        {
          id: "overview-showcase",
          title: "Product showcase",
          blocks: [
            {
              heading: "TODO one-line solution headline.",
              text: "TODO one sentence on what the Figma desktop features do.",
              layout: "mediaSlot",
              label: "TODO hero screen",
              aspectRatio: "16 / 10",
              note: "TODO caption."
            }
          ]
        }
      ]
    },
    {
      id: "process",
      title: "process",
      subsections: [
        {
          id: "hypothesis",
          title: "Hypothesis",
          blocks: [
            {
              layout: "findings",
              variant: "plain",
              items: [
                { tag: "H1", title: "The tool's job shifts from creation to reference." },
                { tag: "H2", title: "AI-native work creates a new catch-up gap." },
                { tag: "H3", title: "People compensate with personal, informal systems." }
              ]
            },
            {
              heading: "Six interviews, 88 quotes, 21 clusters.",
              text: "I graphed each designer's tools and the path they took through them, then clustered quotes by shared thoughts, attitudes, and concerns.",
              layout: "mediaSlot",
              video: assetUrl("/case-studies/ai-workflow/clusters-walkthrough.mp4"),
              label: "Walkthrough of the clusters board",
              aspectRatio: "16 / 9",
              note: "Affinity mapping."
            }
          ]
        },
        {
          id: "hypothesis-to-hmw",
          title: "Hypothesis → Findings → How might we",
          blocks: [
            {
              layout: "hmwFlow",
              rows: [
                {
                  hypothesis: "H1 · Creation → reference",
                  finding: "Figma is cycled back into, never opened first.",
                  hmw: "HMW make Figma the place AI work gets reviewed?"
                },
                {
                  hypothesis: "H2 · Catch-up gap",
                  finding: "No shared record of what AI produced, or why.",
                  hmw: "HMW show what changed since someone last looked?"
                },
                {
                  hypothesis: "H3 · Personal patches",
                  finding: "Every workaround is built by one person, for one person.",
                  hmw: "HMW turn private workarounds into a team default?"
                }
              ]
            }
          ]
        },
        {
          id: "quotes",
          title: "Standout quotes",
          blocks: [
            {
              layout: "quotes",
              variant: "stickies",
              items: [
                { quote: "Figma is now more like a file holder for all the source of truth.", who: "Quinn", role: "Product designer" },
                { quote: "What I'm losing the most is a sense of craft.", who: "Jordan", role: "Lead designer" },
                { quote: "It's so much easier to work on a single big project by yourself.", who: "Jamie", role: "Student designer" },
                { quote: "It's almost happening too fast. None of us have had time to slow down and process and understand where it's headed.", who: "Aiden", role: "UX researcher" },
                { quote: "You or I being able to move things around and make them look good won't be as valuable as us being able to tell a person... what to do and have that done for us.", who: "Sage", role: "AI-native designer" }
              ]
            }
          ]
        },
        {
          id: "product-showcase",
          title: "Product showcase",
          blocks: [
            {
              heading: "TODO final solution headline.",
              text: "TODO one or two lines on the final design and why.",
              layout: "showcase",
              items: [
                { label: "TODO flow / prototype video", aspectRatio: "16 / 9", wide: true },
                { label: "TODO component close-up", aspectRatio: "1 / 1" },
                { label: "TODO before / after", aspectRatio: "1 / 1" }
              ]
            }
          ]
        },
        {
          id: "key-learnings",
          title: "Key learnings",
          blocks: [
            {
              layout: "learnings",
              items: [
                {
                  lead: "Rejection is redirection.",
                  text: "Interviews on mobile-desktop kept running short. Bring up AI and people suddenly had a lot to say. I realized I couldn't research how designers work now without looking at AI, so that became the detour."
                },
                {
                  lead: "The insights came from synthesis, not the interviews.",
                  text: "88 quotes alone were hard to turn into insight. Clustering them, regrouping them, and testing each theme against my hypotheses is where patterns like the missing shared trail showed up."
                },
                {
                  lead: "AI is changing workflows faster than we can study them.",
                  text: "Tools shifted within weeks of the interviews. Mid-prototype, Figma Specs and agents viewing landed and I had to adjust."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "after",
      title: "after",
      blocks: [
        {
          heading: "Thanks to everyone who made time for an interview.",
          text: "This complicated AI workflow is a testament to the designers, researchers, and developers who see AI as raising the ceiling. Not just easier progress, but doing more. Daunting and exciting for the industry."
        }
      ]
    }
  ]
};
