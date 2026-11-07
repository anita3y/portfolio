import { assetUrl } from "../../utils/assetUrl.js";

/*
 * Case study template v2. Stub for Tangents — structure matches AI Workflow.
 * Swap placeholders for real copy and media when ready.
 */

const frame = (n) => assetUrl(`/case-studies/tangents/frame-${n}.svg`);

export const TANGENTS_CASE_STUDY = {
  id: "tangents",
  template: "v2",
  title: "Tangents",

  heroShowcase: {
    src: frame("01"),
    label: "TODO motion showcase",
    aspectRatio: "16 / 10"
  },

  intro: [
    "TODO one or two sentences on what Tangents is and what you shipped or studied."
  ],

  snapshot: true,

  detailsVariant: "compact",
  details: [
    { label: "role", value: "TODO role" },
    { label: "timeline", value: "TODO timeline" },
    { label: "team", value: "TODO team" },
    { label: "skills", value: "TODO skills" }
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
              heading: "TODO one-line problem.",
              text: "TODO one sentence on the gap or friction."
            },
            {
              eyebrow: "Insights",
              layout: "insightPanels",
              items: [
                { diagram: "reference", caption: "TODO insight one." },
                { diagram: "trail", caption: "TODO insight two." },
                { diagram: "alone", caption: "TODO insight three." }
              ]
            }
          ]
        },
        {
          id: "overview-showcase",
          title: "Product showcase",
          blocks: [
            {
              heading: "TODO one-line solution headline.",
              text: "TODO one sentence on what the product or outcome does.",
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
          id: "approach",
          title: "Approach",
          blocks: [
            {
              layout: "findings",
              variant: "plain",
              items: [
                { tag: "01", title: "TODO process beat one." },
                { tag: "02", title: "TODO process beat two." },
                { tag: "03", title: "TODO process beat three." }
              ]
            },
            {
              heading: "TODO process visual headline.",
              text: "TODO one or two lines on how you got there.",
              layout: "mediaSlot",
              label: "TODO process visual",
              aspectRatio: "16 / 9",
              note: "TODO caption."
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
                { label: "TODO flow / prototype", aspectRatio: "16 / 9", wide: true },
                { label: "TODO detail", aspectRatio: "1 / 1" },
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
                  lead: "TODO learning one.",
                  text: "TODO short note."
                },
                {
                  lead: "TODO learning two.",
                  text: "TODO short note."
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
          heading: "TODO closing line.",
          text: "TODO thanks or what comes next."
        }
      ]
    }
  ]
};
