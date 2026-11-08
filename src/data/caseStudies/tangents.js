/*
 * Case study template v2. Stub for Tangents — structure matches AI Workflow.
 * Swap placeholders for real copy and media when ready.
 */

export const TANGENTS_CASE_STUDY = {
  id: "tangents",
  template: "v2",
  title: "Tangents",

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
          id: "placeholders",
          title: "Placeholders",
          blocks: [
            {
              layout: "showcase",
              items: [
                { label: "Dot animation", aspectRatio: "16 / 10", wide: true },
                { label: "Collage 1", aspectRatio: "1 / 1" },
                { label: "Collage 2", aspectRatio: "1 / 1" }
              ]
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
