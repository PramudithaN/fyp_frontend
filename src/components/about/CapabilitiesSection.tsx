import { BrainCircuit, Code, Layers, Network, Zap } from "lucide-react";

const CapabilitiesSection = () => {
  const capabilityGroups = [
    {
      icon: <Zap className="text-oil-gold" size={18} />,
      title: "Forecast Consumption",
      bullets: [
        "Multi-horizon forecast outputs for H5, H7, and H14.",
        "Fan-range interpretation using quantile envelopes.",
        "Direction-focused usage for tactical market workflows.",
      ],
    },
    {
      icon: <Network className="text-oil-gold" size={18} />,
      title: "Platform Integration",
      bullets: [
        "REST-friendly endpoints for dashboard and external services.",
        "Stable API contracts for forecast, fan, and explanation payloads.",
        "Metadata hooks for model-version and freshness checks.",
      ],
    },
    {
      icon: <Code className="text-oil-gold" size={18} />,
      title: "Engineering Readiness",
      bullets: [
        "Type-safe frontend implementation with composable UI blocks.",
        "Consistent component boundaries for rapid extension.",
        "Operationally clear documentation for onboarding and handoff.",
      ],
    },
    {
      icon: <Layers className="text-oil-gold" size={18} />,
      title: "Analytics Views",
      bullets: [
        "Comparative horizon reporting for error and directional signals.",
        "Contribution-focused model explainability context.",
        "Uncertainty cues to support risk-aware decision making.",
      ],
    },
    {
      icon: <BrainCircuit className="text-oil-gold" size={18} />,
      title: "Model Intelligence",
      bullets: [
        "Specialist-model design for heterogeneous market dynamics.",
        "Sentiment context blended through robust ensemble stacking.",
        "Transparent evaluation metrics aligned with business use.",
      ],
    },
  ];

  return (
    <div className="space-y-7">
      <p className="text-base text-gray-300 leading-8 max-w-4xl">
        Capabilities are grouped by reader outcome, so stakeholders can quickly map PetroCast outputs
        to their implementation, analysis, and operational decision needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {capabilityGroups.map((group) => (
          <article key={group.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-3">
              {group.icon}
              <h3 className="text-lg font-display font-bold text-white">{group.title}</h3>
            </div>
            <ul className="space-y-2.5">
              {group.bullets.map((bullet) => (
                <li key={bullet} className="text-base text-gray-300 leading-7 flex items-start gap-2">
                  <span className="text-oil-gold mt-2 text-[10px]">●</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CapabilitiesSection;
