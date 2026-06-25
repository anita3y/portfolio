export const CHATGPT_BRANCHES_CASE_STUDY = {
  id: "chatgpt-branches",
  breadcrumb: ["Portfolio", "Work: ChatGPT Branches"],
  title: "ChatGPT Branches",
  meta: {
    role: "Concept · Product design",
    timeline: "2025",
    tools: ["Figma", "Research", "Prototyping"]
  },
  heroPlaceholder: "Hero — inline reply + chapter navigation concept",
  sections: [
    {
      id: "problem",
      title: "The Problem",
      summary:
        "I studied why existing patterns work—iMessage, Slack, Notion—and what cognitive job they do: reduce search load in long conversations. The insight isn't a novel interaction language; familiarity beats novelty when people need to find their way back.",
      blocks: [
        {
          heading: "Linear threads don’t match how people think",
          bullets: [
            "Real conversations branch—one question leads to a side exploration, then you come back.",
            "ChatGPT treats everything as one flat timeline, even when topics have clearly shifted.",
            "Revisiting an earlier idea means re-prompting from scratch or manually copying old messages."
          ]
        },
        {
          heading: "No anchor to a specific moment",
          bullets: [
            "Sometimes you want to respond to one particular message—not the last thing ChatGPT said.",
            "In Messages, you can reply inline to a specific text; ChatGPT has no equivalent mental model.",
            "Without that anchor, follow-ups feel vague and context gets muddled."
          ]
        },
        {
          heading: "Branches exist, but wayfinding doesn’t",
          bullets: [
            "Branching features help you explore alternatives, but long sessions still feel disorienting.",
            "It’s hard to see what you explored, what you abandoned, and what’s worth returning to.",
            "Users need structure—not more threads, but a way to organize them."
          ]
        }
      ]
    },
    {
      id: "goal",
      title: "The Goal",
      summary:
        "Explore a concept where users reply to specific messages (like iMessage) and navigate long conversations through chapters—so branching feels intentional, not chaotic.",
      blocks: [
        {
          heading: "Core ideas",
          bullets: [
            "Inline reply: tap or hover a message to branch from that exact point.",
            "Chapters: group related branches into named sections you can jump between.",
            "Persistent context: each branch remembers what came before without cluttering the main view."
          ]
        },
        {
          heading: "Design principles",
          bullets: [
            "Familiar patterns first—borrow from Messages, not invent new interaction language.",
            "Keep the main conversation readable; branches shouldn’t explode the UI.",
            "Make exploration reversible—you should always find your way back."
          ]
        }
      ]
    },
    {
      id: "research",
      title: "Research & Insights",
      summary:
        "I looked at how people already manage complexity in chat—Messages threads, Notion outlines, browser tabs—and where ChatGPT breaks down today.",
      blocks: [
        {
          heading: "Competitive & pattern audit",
          bullets: [
            "iMessage inline reply: clear anchor, minimal UI, reply lives visually connected to source.",
            "Slack threads: good for side conversations, but separate from the main flow.",
            "Notion / outline tools: chapters and headings help scan long documents—chat lacks this layer."
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
            "People don’t need infinite branches—they need two things: reply-to-specific-message and a map of where they’ve been.",
            "Chapters aren’t just labels; they’re navigation for memory."
          ]
        }
      ]
    },
    {
      id: "process",
      title: "Design Process",
      summary:
        "Two interaction models drove the exploration: inline reply as the entry point, chapters as the wayfinding layer on top.",
      blocks: [
        {
          heading: "Key flows",
          layout: "flows",
          items: [
            "Reply to a specific message → new branch",
            "Name & save branch as a chapter",
            "Jump between chapters without losing context"
          ]
        },
        {
          heading: "Concept components",
          layout: "cards",
          items: [
            "Inline reply affordance on hover/tap",
            "Chapter sidebar or rail",
            "Branch breadcrumb & return path"
          ]
        },
        {
          heading: "Wireframes & iterations",
          layout: "wireframes",
          placeholder: "Concept screens — inline reply trigger and chapter navigator"
        }
      ]
    },
    {
      id: "solution",
      title: "Solution",
      summary:
        "The concept borrows proven mental models—inline reply and chapter navigation—so exploration feels reversible and the main thread stays readable.",
      blocks: [
        {
          heading: "Inline reply to any message",
          paragraphs: [
            "Hover or long-press any message in the thread to reveal a reply action—just like responding to a specific text in Messages. The new branch starts from that message’s context, not from the bottom of the chat.",
            "A subtle connector line or quote preview shows what you’re replying to, so you never wonder “what was I responding to?”"
          ]
        },
        {
          heading: "Chapters as conversation memory",
          paragraphs: [
            "When a branch grows into its own topic, you can promote it to a chapter—give it a name like “Pricing options” or “Tone rewrite v2” and it appears in a sidebar rail.",
            "Chapters aren’t separate chats; they’re lenses on the same conversation. Jump between them to compare paths, then return to the main thread without scrolling through everything."
          ]
        },
        {
          heading: "Wayfinding",
          bullets: [
            "Chapter list shows active branch, last updated time, and a one-line preview.",
            "Breadcrumb at the top: Main thread → Chapter name → current branch depth.",
            "“Return to main” always one tap away—exploration shouldn’t feel like getting lost."
          ]
        }
      ],
      media: {
        placeholder: "Concept mockups — inline reply UI and chapter navigation rail"
      }
    },
    {
      id: "reflection",
      title: "Reflection",
      summary:
        "This is a concept study—not shipped work—but it sharpened how I think about AI product design: familiar patterns, clear anchors, and structure for long sessions.",
      blocks: [
        {
          heading: "Why this direction",
          bullets: [
            "Inline reply lowers the cost of exploring alternatives—you don’t abandon the thread to try something new.",
            "Chapters turn a messy branch tree into something scannable and memorable.",
            "Together they mirror how people actually think: point at something specific, go deeper, come back."
          ]
        },
        {
          heading: "Open questions",
          bullets: [
            "How many chapters before the UI feels heavy?",
            "Should chapters auto-suggest based on topic shifts, or stay fully user-created?",
            "How does this interact with shared conversations or team workspaces?"
          ]
        },
        {
          heading: "What I’d explore next",
          bullets: [
            "Prototype the inline reply interaction and test comprehension with 5–8 users.",
            "Compare chapter rail vs. outline view vs. minimap for long conversations.",
            "Stress-test with a 50+ message session to see where wayfinding breaks."
          ]
        }
      ]
    }
  ]
};
