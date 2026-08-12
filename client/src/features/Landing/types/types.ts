interface Feature {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  badge: React.ReactNode;
}

interface PricingTier {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export type { Feature, PricingTier };
