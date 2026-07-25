import { Code, Cpu, Database } from "lucide-react";

const stackGroups = [
  {
    title: "Frontend Experience Layer",
    icon: <Code className="w-4 h-4 text-oil-gold" />,
    summary: "User interface, route orchestration, data presentation, and interaction patterns.",
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts", "Vite"],
  },
  {
    title: "Modeling and Inference Layer",
    icon: <Cpu className="w-4 h-4 text-oil-gold" />,
    summary: "Feature engineering, specialist-model training, stacking, and forecast serving.",
    technologies: ["Python", "FastAPI", "PyTorch", "FinBERT", "Scikit-learn", "XGBoost", "VMD"],
  },
  {
    title: "Data and Storage Layer",
    icon: <Database className="w-4 h-4 text-oil-gold" />,
    summary: "Market source acquisition, news context ingestion, and local persistence workflows.",
    technologies: ["Yahoo Finance", "OilPrice.com", "Trading Economics", "BOE reports", "FT.com", "SQLite", "Pandas"],
  },
];

const TechStackSection = () => {
  return (
    <div className="space-y-7">
      <p className="text-base text-gray-300 leading-8 max-w-4xl">
        The stack is presented as an implementation matrix, similar to product documentation systems,
        so each layer can be reviewed independently during onboarding or architecture decisions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stackGroups.map((group) => (
          <article key={group.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-3">
              {group.icon}
              <h3 className="text-lg font-display font-bold text-white">{group.title}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-7">{group.summary}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {group.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full border border-white/12 bg-oil-black/30 text-xs text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-500 font-semibold">Status</p>
              <p className="text-sm text-gray-300 mt-1.5">Production aligned</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TechStackSection;
