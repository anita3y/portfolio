import { assetUrl } from "../../utils/assetUrl.js";

const BANNER = assetUrl("/case-studies/wac/banner.png");
const REGISTRATION_MAP = assetUrl("/case-studies/wac/registration-map.png");
const KEY_FLOWS = assetUrl("/case-studies/wac/key-flows.png");
const MOBILE_CHECK_IN = assetUrl("/case-studies/wac/mobile-check-in.png");
const UNIFIED_RECORD = assetUrl("/case-studies/wac/unified-attendee-record.png");
const STATUS_TAGS = assetUrl("/case-studies/wac/status-tags.png");
const VOLUNTEER_CHECK_IN = assetUrl("/case-studies/wac/volunteer-check-in.png");
const DEMO_PHONE = assetUrl("/case-studies/wac/demos/phone-demo.mov");
const DEMO_CHECKIN_OMAR = assetUrl("/case-studies/wac/demos/check-in-omar.mov");
const DEMO_ADMIN_TAGS = assetUrl("/case-studies/wac/demos/admin-tags.mov");
const DEMO_ADMIN_CHECK_PENDING = assetUrl("/case-studies/wac/demos/admin-check-pending.mov");

export const WAC_CASE_STUDY = {
  id: "world-affairs-conference",
  breadcrumb: ["Portfolio", "Work: World Affairs Conference"],
  title: "World Affairs Conference",
  meta: {
    role: "Product design · Systems",
    timeline: "2024",
    tools: ["Figma", "Google Sheets", "Notion"]
  },
  heroSlides: [
    {
      src: BANNER,
      alt: "World Affairs Conference dashboard showing 847 registered, 612 checked in, and 235 pending"
    }
  ],
  heroAspectRatio: "1358 / 438",
  heroFlat: true,
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
          ],
          image: {
            src: REGISTRATION_MAP,
            alt: "Before and after diagram comparing fragmented Google Form to spreadsheet to printed list workflow against a unified attendee record with organizer and volunteer views",
            caption: "Before: sign-up reality ≠ day-of reality. After: one record, two views.",
            wide: true
          }
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
          paragraphs: [
            "Three flows anchored the system: what attendees experience online, what organizers need before and during the event, and what volunteers do at the door."
          ],
          image: {
            src: KEY_FLOWS,
            alt: "Three user flows for attendee registration and confirmation, organizer review and export, and day-of check-in with status updates",
            caption: "Registration → review → check-in",
            wide: true
          }
        },
        {
          heading: "System components",
          layout: "wireframes",
          images: [
            {
              src: UNIFIED_RECORD,
              alt: "Organizer dashboard showing registered, checked in, and pending counts with attendee table",
              caption: "Unified attendee record"
            },
            {
              src: STATUS_TAGS,
              alt: "Attendee list with All, Checked in, and Pending status filter tags",
              caption: "Status tags & filters"
            },
            {
              src: VOLUNTEER_CHECK_IN,
              alt: "Volunteer check-in view with searchable attendee list and mark-as-checked-in action",
              caption: "Volunteer check-in view"
            }
          ]
        },
        {
          heading: "Mobile check-in",
          paragraphs: [
            "Volunteers needed a phone-friendly view: search by name, filter by status, expand a record, and mark arrived—or scan a QR code at the door."
          ],
          image: {
            src: MOBILE_CHECK_IN,
            alt: "Four iPhone wireframes showing check-in list with All, search, Checked in, and Not Arrived filter states",
            caption: "Mobile check-in — search, filter, and one-tap arrival",
            wide: true
          }
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
            "Organizers get a dashboard-style view to filter by payment status, school, dietary needs, and check-in state. Instead of juggling spreadsheets, they work from one structured list that updates in real time."
          ]
        },
        {
          heading: "Organizer dashboard",
          layout: "videos",
          videoVariant: "desktop",
          videos: [
            {
              src: DEMO_ADMIN_TAGS,
              alt: "Organizer filtering the attendee list by status tags",
              caption: "Status tags — filter by checked in, pending, and more"
            }
          ]
        },
        {
          layout: "videos",
          videoVariant: "desktop",
          videos: [
            {
              src: DEMO_ADMIN_CHECK_PENDING,
              alt: "Organizer reviewing check-in progress and pending attendees",
              caption: "Check-in progress — see who’s arrived vs. still pending"
            }
          ]
        },
        {
          paragraphs: [
            "At the event, volunteers use a simplified check-in interface: search a name, confirm details, mark arrived. The design prioritizes legibility, large tap targets, and obvious success/error states—because this runs on a laptop at a crowded table, not in a quiet office."
          ]
        },
        {
          heading: "Volunteer check-in",
          layout: "videos",
          videoVariant: "desktop",
          videos: [
            {
              src: DEMO_CHECKIN_OMAR,
              alt: "Volunteer searching for Omar and marking them as checked in on desktop",
              caption: "Check someone in — search, confirm, mark arrived"
            }
          ]
        },
        {
          heading: "Physical × digital bridge",
          bullets: [
            "QR or confirmation codes tie online registration to on-site lookup.",
            "Printed backup lists auto-generate from the same data source—no separate manual export.",
            "Status changes at check-in sync back so session leads know who’s in the building."
          ]
        },
        {
          heading: "Phone demo",
          paragraphs: [
            "On event day, volunteers can also run check-in from a phone—search by name, filter by arrival status, or scan a QR code at the door."
          ],
          layout: "videos",
          videoVariant: "phone",
          videoAspectRatio: "1860 / 1432",
          videos: [
            {
              src: DEMO_PHONE,
              alt: "Full mobile check-in demo showing search, status filters, and QR scan",
              caption: "Mobile check-in — search, filter, and scan"
            }
          ]
        }
      ]
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
            "Cut pre-event data cleanup from hours of spreadsheet reconciliation to a single exportable list.",
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
