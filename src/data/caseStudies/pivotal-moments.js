import { assetUrl } from "../../utils/assetUrl.js";

const HERO_IMAGE = assetUrl("/thumbnails/new-york-design-club-cover.png");
const INSTAGRAM_REELS = assetUrl("/case-studies/pivotal-moments/instagram-reels.png");
const INSTAGRAM_POSTS = assetUrl("/case-studies/pivotal-moments/instagram-posts.png");

export const PIVOTAL_MOMENTS_CASE_STUDY = {
  id: "pivotal-moments",
  breadcrumb: ["Portfolio", "Work: Pivotal Moments"],
  backTab: "work",
  title: "Pivotal Moments",
  meta: {
    role: "Growth · Marketing",
    timeline: "2025",
    tools: ["Instagram", "Community", "Editorial"]
  },
  heroSlides: [{ src: HERO_IMAGE, alt: "Pivotal Moments zine edition and launch cards" }],
  heroAspectRatio: "16 / 10",
  heroFlat: true,
  heroFit: "cover",
  sections: [
    {
      id: "instagram",
      title: "Instagram growth",
      summary:
        "Marketing support for New York Design Club during the Pivotal Moments bookclub launch.",
      blocks: [
        {
          paragraphs: [
            "I supported growth and marketing for New York Design Club's Instagram around the Pivotal Moments launch—helping shape Reels and posts that highlighted the zine, events, and community behind the club.",
            "During this push, the account grew to 10k+ views on Reels as launch content went out."
          ]
        }
      ],
      media: {
        images: [
          {
            src: INSTAGRAM_REELS,
            alt: "Grid of New York Design Club Instagram Reels during the Pivotal Moments launch",
            caption: "Reels during launch"
          },
          {
            src: INSTAGRAM_POSTS,
            alt: "Grid of New York Design Club Instagram posts during the Pivotal Moments launch",
            caption: "Posts during launch"
          }
        ]
      }
    },
    {
      id: "distribution",
      title: "Magazine distribution",
      summary: "Getting Pivotal Moments onto shelves in New York.",
      blocks: [
        {
          paragraphs: [
            "Beyond social, I helped push distribution for the zine—researching where Pivotal Moments could be sold in NYC and connecting the club with local magazine retailers.",
            "That outreach led to placements with Casa Magazines and Iconic Magazines."
          ]
        }
      ]
    }
  ]
};
