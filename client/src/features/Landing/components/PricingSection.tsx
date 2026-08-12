import { PRICING_TIERS } from "../data/pricing-tiers";

function PricingSection() {
  return (
    <section className="py-24 px-margin-page max-w-5xl mx-auto" id="pricing">
      <div className="text-center mb-16">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
          Simple, transparent pricing
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Start for free, upgrade when you need team power.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-3xl mx-auto">
        {PRICING_TIERS.map((tier, index) => (
          <div
            key={index}
            className={`glass-panel p-6 rounded-xl flex flex-col border relative overflow-hidden ${
              tier.isPopular
                ? "border-primary/50"
                : "border-surface-container-highest"
            }`}
          >
            {tier.isPopular && (
              <div className="absolute top-0 right-0 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-bl-lg">
                Popular
              </div>
            )}
            <h3
              className={`font-headline-sm text-headline-sm mb-1 ${
                tier.isPopular ? "text-primary" : "text-on-surface"
              }`}
            >
              {tier.name}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              {tier.description}
            </p>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="font-display-lg text-display-lg text-on-surface">
                {tier.price}
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                {tier.period}
              </span>
            </div>
            <ul className="flex flex-col gap-3 mb-8 font-body-sm text-body-sm text-on-surface-variant">
              {tier.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-center gap-2">
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      tier.isPopular ? "text-primary" : "text-secondary"
                    }`}
                  >
                    check
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`mt-auto font-label-md text-label-md h-10 rounded transition-colors w-full ${
                tier.isPopular
                  ? "bg-primary text-on-primary hover:bg-primary-fixed"
                  : "border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {tier.ctaText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
