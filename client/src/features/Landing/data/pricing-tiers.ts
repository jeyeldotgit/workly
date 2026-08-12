import type { PricingTier } from "../types/types";

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    description: "For individuals seeking focus.",
    price: "$0",
    period: "/forever",
    features: ["Unlimited local tasks", "Command Palette", "Basic NLP parsing"],
    ctaText: "Get Started",
  },
  {
    name: "Pro",
    description: "For high-output teams.",
    price: "$12",
    period: "/user/mo",
    features: [
      "Everything in Free",
      "Real-time CRDT Sync",
      "Team Workspaces",
      "Advanced integrations",
    ],
    ctaText: "Start 14-Day Trial",
    isPopular: true,
  },
];
