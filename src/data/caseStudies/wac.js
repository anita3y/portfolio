export const WAC_CASE_STUDY = {
  id: "world-affairs-conference",
  breadcrumb: ["Portfolio", "Work: World Affairs Conference"],
  title: "World Affairs Conference",
  meta: {
    role: "Product design · Systems",
    timeline: "2024",
    tools: ["Figma", "Google Sheets", "Notion"]
  },
  heroPlaceholder: "Hero — registration dashboard or check-in flow overview",
  sections: [
    {
      id: "problem",
      title: "The Problem",
      summary:
        "The gap between what attendees expected from online sign-up and what volunteers faced at the door is a classic mental model mismatch. This wasn't a prettier-form problem—it was about trust under pressure, when stressed volunteers need a system that doesn't fail them at the check-in desk.",
      blocks: [
        {
          heading: "Manual registration chaos",
          bullets: [
            "Sign-ups lived across multiple forms with no single source of truth.",
            "Organizers spent hours reconciling names, schools, and dietary restrictions before the event.",
            "Last-minute changes were hard to track and easy to miss."
          ]
        },
        {
          heading: "A physical event with digital gaps",
          bullets: [
            "Students arrived at registration tables with no clear status—paid, waitlisted, or missing info.",
            "Volunteers had to cross-reference printed lists and laptops under time pressure.",
            "The on-site experience didn’t match the polish of the conference itself."
          ]
        },
        {
          heading: "Organizational pain at scale",
          bullets: [
            "Each year’s process was rebuilt from scratch instead of improving on the last.",
            "Leadership turnover meant knowledge walked out the door every cycle.",
            "Small errors compounded into long lines, frustrated attendees, and stressed staff."
          ]
        }
      ]
    },
    {
      id: "goal",
      title: "The Goal",
      summary:
        "Design a registration system that reduces admin overhead, speeds up check-in, and bridges the gap between what happens online before the event and what happens at the door.",
      blocks: [
        {
          heading: "Objectives",
          bullets: [
            "Consolidate registration data into one reliable workflow.",
            "Cut time spent on pre-event data cleanup and day-of lookups.",
            "Give volunteers a clear, low-training interface at check-in.",
            "Support edge cases: walk-ins, no-shows, last-minute cancellations, dietary updates."
          ]
        },
        {
          heading: "Success criteria",
          bullets: [
            "Organizers can see attendee status at a glance before and during the event.",
            "Check-in takes seconds per person, not minutes.",
            "The system is simple enough for a new volunteer to use with minimal onboarding.",
            "Documentation exists so next year’s team doesn’t start from zero."
          ]
        }
      ]
    },
    {
      id: "research",
      title: "Research & Insights",
      summary:
        "I mapped how registration actually worked—not how it was supposed to work—by talking to organizers, volunteers, and attendees from previous years.",
      blocks: [
        {
          heading: "Stakeholder interviews",
          bullets: [
            "Organizers described the week before the conference as the most stressful part of planning.",
            "Volunteers said they never felt fully confident at the registration table.",
            "Attendees mostly cared about speed—long lines killed the opening energy of the day."
          ]
        },
        {
          heading: "Process audit",
          bullets: [
            "Documented the full journey: sign-up → confirmation → reminder → arrival → check-in → session access.",
            "Identified duplicate data entry as the biggest time sink.",
            "Found that printed backups were still necessary because the digital tool wasn’t trusted on event day."
          ]
        },
        {
          heading: "Key insights",
          bullets: [
            "Trust matters as much as speed—volunteers need to believe the system is right.",
            "Physical and digital have to feel like one experience, not two separate workflows.",
            "The best system is the one the next team will actually maintain."
          ]
        }
      ]
    },
    {
      id: "process",
      title: "Design Process",
      summary:
        "I focused on end-to-end flows first—registration, admin review, and on-site check-in—before polishing individual screens.",
      blocks: [
        {
          heading: "Key flows",
          layout: "flows",
          items: [
            "Attendee registration & confirmation",
            "Organizer review & export",
            "Day-of check-in & status updates"
          ]
        },
        {
          heading: "System components",
          layout: "cards",
          items: [
            "Unified attendee record",
            "Status tags & filters",
            "Volunteer check-in view"
          ]
        },
        {
          heading: "Wireframes & iterations",
          layout: "wireframes",
          placeholder: "Early wireframes — admin view and check-in screen"
        }
      ]
    },
    {
      id: "solution",
      title: "Solution",
      summary:
        "The fix wasn't visual polish—it was making online registration and day-of check-in aware of each other, so organizers and volunteers always work from the same attendee record.",
      blocks: [
        {
          paragraphs: [
            "Organizers get a dashboard-style view to filter by payment status, school, dietary needs, and check-in state. Instead of juggling spreadsheets, they work from one structured list that updates in real time.",
            "At the event, volunteers use a simplified check-in interface: search a name, confirm details, mark arrived. The design prioritizes legibility, large tap targets, and obvious success/error states—because this runs on a laptop at a crowded table, not in a quiet office."
          ]
        },
        {
          heading: "Physical × digital bridge",
          bullets: [
            "QR or confirmation codes tie online registration to on-site lookup.",
            "Printed backup lists auto-generate from the same data source—no separate manual export.",
            "Status changes at check-in sync back so session leads know who’s in the building."
          ]
        }
      ],
      media: {
        placeholder: "Final screens — organizer dashboard & volunteer check-in view"
      }
    },
    {
      id: "reflection",
      title: "Reflection",
      summary:
        "This project taught me that good event product design is mostly about reducing anxiety—for organizers, volunteers, and attendees.",
      blocks: [
        {
          heading: "Results",
          bullets: [
            "Consolidated registration into a single workflow with clearer attendee statuses.",
            "Reduced pre-event data cleanup time (placeholder—add your actual numbers).",
            "Volunteer check-in interface designed for low training and high-stress environments.",
            "Handoff docs for next year’s organizing team."
          ]
        },
        {
          heading: "What I’d improve",
          bullets: [
            "Earlier testing with real volunteers using mock check-in scenarios.",
            "Offline fallback for spotty venue Wi-Fi.",
            "Automated reminder emails tied directly to registration status."
          ]
        },
        {
          heading: "Lessons learned",
          bullets: [
            "Systems design shows up in unglamorous tools—spreadsheets, check-in screens, export buttons.",
            "Designing for volunteers means designing for distraction, noise, and zero patience for ambiguity.",
            "The physical event is the moment of truth; everything before it exists to make that moment smooth."
          ]
        }
      ]
    }
  ]
};
