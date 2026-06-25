export const DFA_CASE_STUDY = {
  id: "design-for-america",
  breadcrumb: ["Portfolio", "Work: Design for America"],
  title: "Design for America x NYU",
  meta: {
    role: "Product design · Web",
    timeline: "2024–2025",
    tools: ["Framer", "Figma", "Notion"]
  },
  heroPlaceholder: "Hero — final site overview or key screen",
  sections: [
    {
      id: "problem",
      title: "The Problem",
      summary:
        "The problem wasn't aesthetics—it was that alumni, partners, and new members had no clear entry point, and content scattered across folders made the chapter's work invisible. Engagement died at the front door before anyone could see the impact.",
      blocks: [
        {
          heading: "A disconnected network",
          bullets: [
            "Project work lived in scattered folders and outdated pages.",
            "Alumni and partners had no clear entry point to stay involved.",
            "New members struggled to understand what DFA @ NYU does."
          ]
        },
        {
          heading: "Scaling across chapters",
          bullets: [
            "Other DFA chapters needed a model they could adapt—not a one-off NYU site.",
            "Content had to stay maintainable without a dedicated dev team."
          ]
        },
        {
          heading: "An outdated web presence",
          bullets: [
            "The previous site didn’t showcase impact or current projects.",
            "Visual hierarchy and navigation didn’t match the chapter’s growth."
          ]
        }
      ]
    },
    {
      id: "goal",
      title: "The Goal",
      summary: "Build a professional, scalable platform that showcases impact and hands off cleanly to future leaders.",
      blocks: [
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
      id: "research",
      title: "Research & Insights",
      summary: "Understanding how members, alumni, and visitors actually use (or avoid) the old site.",
      blocks: [
        {
          heading: "Competitive audit",
          bullets: [
            "Reviewed peer university chapters and nonprofit portfolio sites.",
            "Noted patterns for project storytelling, team pages, and CTAs.",
            "Identified gaps where DFA @ NYU could differentiate through clarity and warmth."
          ]
        },
        {
          heading: "Interviews",
          bullets: [
            "Spoke with current members about onboarding and project discovery pain points.",
            "Gathered alumni input on staying connected after graduation.",
            "Synthesized themes around trust, impact visibility, and low-friction updates."
          ]
        }
      ]
    },
    {
      id: "process",
      title: "Design Process",
      summary: "From key flows to a modular visual system—designed to scale beyond a single semester.",
      blocks: [
        {
          heading: "Key flows",
          layout: "flows",
          items: [
            "Discover projects & impact",
            "Join / get involved",
            "Contact & partner outreach"
          ]
        },
        {
          heading: "Visual hierarchy & scalability",
          layout: "cards",
          items: [
            "Typography & spacing tokens",
            "Reusable section modules",
            "Content templates for projects"
          ]
        },
        {
          heading: "Wireframes & iterations",
          layout: "wireframes",
          placeholder: "Wireframe and iteration screens"
        }
      ]
    },
    {
      id: "solution",
      title: "Solution",
      summary:
        "The site addresses a structural trust problem—information architecture and scannable project stories so each audience can form an accurate picture of what the chapter does.",
      blocks: [
        {
          paragraphs: [
            "Final design prioritizes scannable project stories, a welcoming team presence, and clear paths for visitors to participate.",
            "Components map to real content types so future leads swap copy and imagery without redesigning from scratch."
          ]
        }
      ],
      media: {
        placeholder: "Final high-fidelity screens — homepage & project template"
      }
    },
    {
      id: "reflection",
      title: "Reflection",
      summary: "What shipped, what scales, and what I’d carry into the next nonprofit or community product.",
      blocks: [
        {
          heading: "Results",
          bullets: [
            "Unified project showcase and clearer chapter narrative.",
            "Reduced friction for content handoffs between leadership cycles.",
            "Foundation other chapters can reference when building their own presence."
          ]
        },
        {
          heading: "Scaling for the future",
          bullets: [
            "Modular Framer components map to repeatable content patterns.",
            "Documented structure for onboarding new chapter leads.",
            "System designed for iteration—not a frozen one-off launch."
          ]
        },
        {
          heading: "Lessons learned",
          bullets: [
            "Stakeholder alignment early prevents rework on IA and tone.",
            "Designing for maintainability is as important as designing for launch day.",
            "Nonprofit work rewards clarity over complexity—every section should earn its place."
          ]
        }
      ]
    }
  ]
};
