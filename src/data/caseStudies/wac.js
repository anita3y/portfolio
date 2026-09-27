import { assetUrl } from "../../utils/assetUrl.js";
import { CASE_STUDY_PASSWORD } from "./access.js";

const HERO_POSTER = assetUrl("/case-studies/wac/hero/poster.png");
const HERO_DESKTOP = assetUrl("/case-studies/wac/hero/desktop-dashboard.png");
const HERO_IPHONE = assetUrl("/case-studies/wac/hero/iphone-checkin.png");
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
  subtitle: "Redesigning registration and check-in for a 1,000-person student conference",
  gated: true,
  access: {
    password: CASE_STUDY_PASSWORD,
    requestEmail: "anita3yan@gmail.com"
  },
  details: [
    {
      label: "role",
      value: "Product design,\nsystems thinking,\nvisual design"
    },
    {
      label: "type",
      value: "Concept redesign,\ninformed by time on\nthe WAC organizing team"
    },
    {
      label: "timeline",
      value: "2025"
    },
    {
      label: "tools",
      value: "Figma,\nGoogle Sheets,\nNotion"
    }
  ],
  meta: {
    role: "Product design, systems thinking, visual design",
    timeline: "2025",
    tools: ["Figma", "Google Sheets", "Notion"]
  },
  heroBento: {
    poster: {
      src: HERO_POSTER,
      alt: "World Affairs Conference 2025 poster — to the future"
    },
    desktop: {
      src: HERO_DESKTOP,
      alt: "World Affairs Conference desktop dashboard with registration and check-in stats"
    },
    iphone: {
      src: HERO_IPHONE,
      alt: "World Affairs Conference iPhone check-in screen"
    }
  },
  heroAspectRatio: "688 / 508",
  /** Public teaser — always visible before the password gate. */
  teaserSections: [
    {
      id: "overview",
      title: "overview",
      summary:
        "8:42am. The keynote starts at 9. More than a hundred students are waiting in the hallway, and a volunteer is scrolling a spreadsheet looking for one name.",
      blocks: [
        {
          paragraphs: [
            "The World Affairs Conference brings together over 1,000 students each year. Online, registering feels simple. At the door, it falls apart: duplicate sign-ups, printed lists nobody trusts, and volunteers making judgment calls under pressure. Each year a new organizing team rebuilds the process from scratch, and each year the same problems come back.",
            "I set out to redesign the system end to end, from the moment a student signs up to the moment they walk into the room."
          ]
        }
      ]
    },
    {
      id: "challenge",
      title: "the challenge",
      summary:
        "How might we make online registration and day-of check-in feel like one experience, and build something simple enough that next year's team will actually keep it running?",
      blocks: []
    },
    {
      id: "inside",
      title: "inside the case study",
      summary: "What you’ll find once you unlock the full writeup.",
      blocks: [
        {
          bullets: [
            "Research with organizers, volunteers, attendees, and faculty advisors, and the one quote that reshaped the project",
            "How other conferences, hackathons, and event platforms handle check-in",
            "An answer to the obvious question: why not just use Google Sheets?",
            "A mobile check-in experience designed for noise, crowds, and zero patience",
            "A physical identity system of badges, posters, and wayfinding built from the same data"
          ]
        }
      ]
    }
  ],
  /** Full writeup — shown after password unlock. */
  sections: [
    {
      id: "research",
      title: "research",
      summary:
        "I talked to organizers, volunteers, attendees, and faculty advisors—and one quote reframed the entire project.",
      blocks: [
        {
          heading: "Who I talked to",
          bullets: [
            "Organizers described the week before the conference as the most stressful part of planning.",
            "Volunteers said they never felt fully confident at the registration table.",
            "Attendees mostly cared about speed—long lines killed the opening energy of the day.",
            "Faculty advisors wanted a process that wouldn’t collapse when student leadership turned over."
          ]
        },
        {
          heading: "The quote that reshaped the project",
          paragraphs: [
            "“We don’t need a better spreadsheet. We need to trust that the person at the door has the same truth we have online.”",
            "That line shifted the brief from “clean up registration forms” to “make online and day-of feel like one system”—and made handoff to next year’s team a first-class requirement."
          ]
        },
        {
          heading: "Process audit",
          paragraphs: [
            "I mapped how registration actually worked—not how it was supposed to work—from sign-up through confirmation, arrival, and session access."
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
      id: "competitive",
      title: "competitive & analog research",
      summary:
        "I looked at how other conferences, hackathons, and event platforms handle check-in—and what student organizers can actually sustain.",
      blocks: [
        {
          heading: "What I looked at",
          paragraphs: [
            "[Placeholder — copy/visual] Competitive and analog scan across student conferences, hackathons, and tools like Eventbrite, Grip, and custom Notion/Airtable setups. Swap in the final research board and annotated takeaways when visuals are ready."
          ],
          layout: "wireframes",
          placeholder: "[Placeholder — visual] Competitive / analog research board"
        },
        {
          heading: "Patterns that transferred",
          bullets: [
            "One attendee record, multiple views (admin vs door staff).",
            "Status that is obvious at a glance—paid, pending, checked in, walk-in.",
            "Mobile-first door tools with large tap targets and forgiving search.",
            "Printed backups generated from the same source of truth, not a parallel list."
          ]
        },
        {
          heading: "What didn’t fit WAC",
          bullets: [
            "Heavy enterprise event platforms priced and scoped for professional ops teams.",
            "QR-only flows that fail when phones die, badges tear, or Wi-Fi drops.",
            "Anything that requires a dedicated technical owner every year."
          ]
        }
      ]
    },
    {
      id: "why-not-sheets",
      title: "why not google sheets?",
      summary:
        "Sheets already lived in the workflow. The question was whether the pain was the tool—or the lack of a shared mental model around it.",
      blocks: [
        {
          heading: "What Sheets was already doing well",
          bullets: [
            "Familiar to every organizer and easy to hand off in theory.",
            "Flexible enough for last-minute columns and one-off notes.",
            "Fine for small events where one person owns the list."
          ]
        },
        {
          heading: "Where it broke at 1,000 people",
          bullets: [
            "Duplicate rows and conflicting edits with no clear “source of truth” at the door.",
            "Printed exports drifted from the live sheet within hours.",
            "Volunteers scrolled under pressure instead of confirming a status in one look.",
            "Each new team rebuilt tabs and naming conventions from scratch."
          ]
        },
        {
          heading: "The decision",
          paragraphs: [
            "I didn’t throw Sheets away as a backend idea—I stopped asking volunteers to use a spreadsheet as a check-in UI. The redesign keeps a structured attendee record (exportable, auditable) and gives organizers and door staff purpose-built views on top of it.",
            "[Placeholder — diagram] Optional: simple “Sheets as database vs Sheets as interface” comparison visual."
          ]
        }
      ]
    },
    {
      id: "process",
      title: "design process",
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
        }
      ]
    },
    {
      id: "mobile-check-in",
      title: "mobile check-in",
      summary:
        "A door experience designed for noise, crowds, and zero patience—search, confirm, mark arrived.",
      blocks: [
        {
          paragraphs: [
            "Volunteers needed a phone-friendly view: search by name, filter by status, expand a record, and mark arrived—or scan a QR code at the door. Legibility and large tap targets mattered more than density."
          ],
          image: {
            src: MOBILE_CHECK_IN,
            alt: "Four iPhone wireframes showing check-in list with All, search, Checked in, and Not Arrived filter states",
            caption: "Mobile check-in — search, filter, and one-tap arrival",
            wide: true
          }
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
          heading: "Volunteer check-in",
          paragraphs: [
            "At the event, volunteers use a simplified interface: search a name, confirm details, mark arrived. This runs on a laptop or phone at a crowded table—not in a quiet office."
          ],
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
          heading: "Phone demo",
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
      id: "physical-identity",
      title: "physical identity",
      summary:
        "Badges, posters, and wayfinding built from the same attendee data—so the hallway matches the dashboard.",
      blocks: [
        {
          heading: "Same data, physical outputs",
          bullets: [
            "Name badges and dietary indicators generated from the unified attendee record.",
            "Door lists and session signs that don’t require a separate manual export ritual.",
            "Wayfinding and check-in signage that reuse the same status language as the digital UI."
          ]
        },
        {
          heading: "Badge & print system",
          paragraphs: [
            "[Placeholder — visual] Badge mockups, poster set, and wayfinding samples tied to registration fields (name, school, role, dietary tags). Replace with final print comps when ready."
          ],
          layout: "wireframes",
          placeholder: "[Placeholder — visual] Badges, posters, and wayfinding"
        },
        {
          heading: "Physical × digital bridge",
          bullets: [
            "QR or confirmation codes tie online registration to on-site lookup.",
            "Printed backup lists auto-generate from the same data source—no parallel manual list.",
            "Status changes at check-in sync back so session leads know who’s in the building."
          ]
        }
      ]
    },
    {
      id: "reflection",
      title: "reflection",
      summary:
        "Good event product design is mostly about reducing anxiety—for organizers, volunteers, and attendees.",
      blocks: [
        {
          heading: "Results",
          bullets: [
            "Consolidated registration into a single workflow with clearer attendee statuses.",
            "Cut pre-event data cleanup from hours of spreadsheet reconciliation to a single exportable list.",
            "Volunteer check-in interface designed for low training and high-stress environments.",
            "Handoff docs so next year’s organizing team doesn’t start from zero."
          ]
        },
        {
          heading: "What I’d improve",
          bullets: [
            "Earlier testing with real volunteers using mock check-in scenarios.",
            "Offline fallback for spotty venue Wi-Fi.",
            "Automated reminder emails tied directly to registration status.",
            "[Placeholder — metrics] Add post-event quantitative outcomes when available."
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
