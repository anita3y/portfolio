import { assetUrl } from "../../utils/assetUrl.js";

const HERO_IMAGE = assetUrl("/thumbnails/new-york-design-club-cover.png");
const INSTAGRAM_REELS = assetUrl("/case-studies/pivotal-moments/instagram-reels.png");
const INSTAGRAM_POSTS = assetUrl("/case-studies/pivotal-moments/instagram-posts.png");
const INSTAGRAM_LAUNCH_POSTS = assetUrl("/case-studies/pivotal-moments/instagram-launch-posts.png");
const MAGAZINE_POSTS = assetUrl("/case-studies/pivotal-moments/magazine-availability-posts.png");

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
      id: "background",
      title: "How I got involved",
      summary: "Volunteering with New York Design Club for the Pivotal Moments book launch.",
      blocks: [
        {
          paragraphs: [
            "I've been following New York Design Club for a long time. When they posted that they needed volunteers for the Pivotal Moments book launch, I reached out to Caroline—the founder of the NY branch—and have been part of this community of designers ever since.",
            "From there, I supported growth and marketing for the club's Instagram—designing posts that built momentum leading up to the Pivotal Moments launch, plus Reels and stories that highlighted the zine, events, and people behind NYDC."
          ]
        }
      ]
    },
    {
      id: "instagram",
      title: "Instagram growth",
      summary: "Designing launch content and growing reach for New York Design Club.",
      blocks: [
        {
          paragraphs: [
            "I designed Instagram posts leading up to the launch—speaker spotlights, zine teasers, and event callouts that kept the feed active before and during release week.",
            "During this push, the account grew to 10k+ views on Reels as launch content went out."
          ]
        },
        {
          image: {
            src: INSTAGRAM_LAUNCH_POSTS,
            alt: "Grid of New York Design Club Instagram posts designed leading up to the Pivotal Moments zine launch",
            wide: true,
            caption: "Posts leading up to launch"
          }
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
            "That outreach led to placements with Casa Magazines and Iconic Magazines, which we shared on Instagram so people knew where to pick up a copy."
          ]
        },
        {
          image: {
            src: MAGAZINE_POSTS,
            alt: "Instagram posts announcing Pivotal Moments zine availability at Iconic Magazines and Casa Magazines",
            wide: true,
            caption: "Get your zine at Iconic Magazines and Casa Magazines"
          }
        }
      ]
    }
  ]
};
