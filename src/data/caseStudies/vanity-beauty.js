import { assetUrl } from "../../utils/assetUrl.js";

export const VANITY_BEAUTY_CASE_STUDY = {
  id: "vanity-beauty",
  breadcrumb: ["Portfolio", "Work: Vanity Beauty App"],
  title: "Vanity: Low-friction onboarding for iOS",
  subtitle:
    "Vanity needs to know your skin, shade and hair before it can be useful, but nobody wants a quiz. I designed a beauty profile you can skip at every step, that only asks about what you use, and that pays you back before you're done.",
  details: [
    { label: "role", value: "Product Designer [ADD: confirm scope]" },
    { label: "team", value: "Me + Vanity's founder [ADD: others]" },
    { label: "timeline", value: "[ADD]" },
    { label: "status", value: "[ADD: shipped / in build]" }
  ],
  meta: {
    role: "Product design",
    timeline: "2026",
    tools: ["Figma"]
  },
  heroPhone: assetUrl("/vanity/onboarding/index.html?embed=1"),
  heroPhoneMarker:
    "[VIDEO: live onboarding prototype in phone frame — public/vanity/onboarding]",
  sections: [
    {
      id: "problem",
      title: "the problem",
      summary: "Personal recs need personal data. Forms kill that.",
      blocks: [
        {
          paragraphs: [
            "Vanity's value depends on the details: undertone, shade, hair type. But the more we asked, the more the flow felt like intake paperwork. And some answers, like porosity, most people simply don't know."
          ]
        },
        {
          layout: "userFlowMap",
          variant: "vanity-before-after",
          marker:
            "[DIAGRAM: original 6-screen flow — Intro → Skin → Complexion → Makeup → Hair → Summary]",
          caption: "The original six-screen flow, with Hair doing the work of three screens."
        }
      ]
    },
    {
      id: "who",
      title: "who it's for",
      summary: "Not everyone needs the same questions.",
      blocks: [
        {
          paragraphs: [
            "Personas often end up as decoration. Here they earned their place: skincare, makeup and hair users need very different questions, so each persona only sees the sections that matter to them."
          ]
        },
        {
          layout: "userFlowMap",
          variant: "vanity-personas"
        }
      ]
    },
    {
      id: "others",
      title: "what others do",
      summary: "Thea hooks you first and asks questions second.",
      blocks: [
        {
          paragraphs: [
            "Skincare app Thea opens with a story, then questions, then lets you try a feature before asking for anything else. I borrowed the shape (hook, ask, prove value, commit) but not the tone. Thea feels diagnostic. Vanity should feel like a friend with great taste."
          ],
          layout: "markerSlot",
          markers: [
            "[DIAGRAM: competitive audit grid — apps compared and verdicts]",
            "[ADD: audit frames from Figma]"
          ],
          caption: "Onboarding patterns across the apps I audited."
        }
      ]
    },
    {
      id: "rules",
      title: "the rules",
      summary: "Ask less, and make every question earn its place.",
      blocks: [
        {
          paragraphs: ["Four rules shaped every screen."],
          layout: "userFlowMap",
          variant: "vanity-rules",
          marker: "[DIAGRAM: rules grid]"
        },
        {
          paragraphs: ["Pick Haircare only, and you never see a foundation question."]
        }
      ]
    },
    {
      id: "flow",
      title: "the flow",
      summary: "Hook, ask, prove it, reveal.",
      blocks: [
        {
          paragraphs: [
            "A short story intro sells the feeling, not the features. Then category-gated questions, written like a best friend, not a form: \"Let's get specific.\" Before the summary, you add one real product and get something back right away."
          ],
          layout: "shots",
          columns: 3,
          items: [
            { marker: "[SCREENSHOT: story intro]" },
            { marker: "[SCREENSHOT: category select]" },
            { marker: "[SCREENSHOT: skin profile]" }
          ],
          caption: "A short story intro, then only the questions that apply to you."
        }
      ],
      subsections: [
        {
          id: "personality",
          title: "A beauty personality, not a score.",
          prominent: true,
          blocks: [
            {
              paragraphs: [
                "A score implies good and bad. Your answers are descriptive, so the payoff is an archetype, like The Glow Minimalist, with three tags and a shareable card. It needs no AI, just a lookup against answers we already collect."
              ],
              layout: "shots",
              columns: 2,
              items: [
                { marker: "[SCREENSHOT: processing checklist]" },
                { marker: "[SCREENSHOT: beauty personality card]" }
              ],
              caption: "The beauty personality card, built from your profile answers."
            }
          ]
        }
      ]
    },
    {
      id: "changed",
      title: "what changed",
      summary: "Reviewing the flow showed where it asked too much.",
      blocks: [
        {
          heading: "Hair asked too much on one screen.",
          paragraphs: [
            "Hair packed about seven questions into one screen, so I split it into Hair type, Hair habits and Concerns & goals."
          ],
          layout: "shots",
          columns: 2,
          pair: true,
          items: [
            {
              kicker: "Before",
              marker: "[SCREENSHOT: before — single hair screen]",
              caption: "One heavy hair screen."
            },
            {
              kicker: "After",
              marker: "[SCREENSHOT: after — three lighter screens]",
              caption: "Split into three lighter ones."
            }
          ]
        },
        {
          heading: "Technical questions had no \"why.\"",
          paragraphs: [
            "Porosity and undertone got plain-language hints: \"Does your hair drink up product fast, or take a while?\""
          ],
          layout: "shots",
          columns: 2,
          pair: true,
          items: [
            {
              kicker: "Before",
              marker: "[SCREENSHOT: before — bare label]",
              caption: "Porosity, bare label."
            },
            {
              kicker: "After",
              marker: "[SCREENSHOT: after — \"why we ask\" hint]",
              caption: "With a plain-language hint."
            }
          ]
        },
        {
          heading: "Logging took three screens.",
          paragraphs: [
            "Logging a product took a 3-screen form with pop-up modals. Inspired by Beli, I collapsed it into one screen with skippable inline fields."
          ],
          layout: "userFlowMap",
          variant: "vanity-logging",
          marker: "[DIAGRAM: 3 screens → 1, \"inspired by Beli's logging model\"]",
          caption: "Product logging, from three screens with modals to one inline screen."
        },
        {
          paragraphs: [
            "Next, I'll test this with real users. [ADD only if Anita ran tests: participants, method, results]"
          ]
        }
      ]
    },
    {
      id: "next",
      title: "next",
      summary: "Where it's headed.",
      blocks: [
        {
          paragraphs: [
            "[ADD: next test, e.g. whether the archetype should change as you log products or stay a one-time badge.]"
          ]
        }
      ]
    },
    {
      id: "reflection",
      title: "reflection",
      blocks: [
        {
          heading: "Optional has to be visible.",
          paragraphs: ["\"Skip\" only counts if you can see it on every screen."]
        },
        {
          heading: "Pay people back early.",
          paragraphs: ["One real reaction to one real product beats a long promise."]
        },
        {
          heading: "Tone is a feature.",
          paragraphs: [
            "The same question feels like a quiz or a conversation depending on one line of copy."
          ]
        }
      ]
    }
  ]
};
