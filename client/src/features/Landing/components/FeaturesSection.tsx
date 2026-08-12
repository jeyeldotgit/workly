import { FEATURES } from "../data/FeaturesData";

function FeaturesSection() {
  return (
    <section
      className="py-24 px-margin-page bg-surface-container-lowest border-y border-surface-container-highest"
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-headline-md text-headline-md text-primary mb-2">
            Engineered for Velocity
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Everything you need to move fast, without breaking things. Designed
            to keep your hands on the keyboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="glass-panel p-container-padding rounded-xl flex flex-col gap-stack-compact hover:border-primary/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-surface-container-highest flex items-center justify-center mb-2">
                <span
                  className={`material-symbols-outlined ${feature.iconColor}`}
                >
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm">
                {feature.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant grow">
                {feature.description}
              </p>
              {feature.badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
