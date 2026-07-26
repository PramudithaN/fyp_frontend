import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Users, Landmark, BarChart3, ChevronRight } from "lucide-react";

const audiences = [
  {
    icon: <Users size={22} />,
    title: "Researchers & Analysts",
    desc: "Access granular model metrics (MAE, RMSE, MAPE), SHAP feature attribution, and ensemble composition details for academic benchmarking and validation.",
    link: "/about",
    linkText: "View Methodology",
  },
  {
    icon: <Landmark size={22} />,
    title: "Policymakers & Government",
    desc: "Data-driven macro insights for energy strategy and fiscal planning, supported by probabilistic multi-horizon crude price forecasts across four benchmarks.",
    link: "/dashboard",
    linkText: "Open Dashboard",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Energy Traders & Investors",
    desc: "Actionable 5-day forecasts with multi-currency spreads across Brent, WTI, OPEC, and Dubai crude to support strategic trading and risk management decisions.",
    link: "/dashboard",
    linkText: "See Forecasts",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const childFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AudienceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-14"
        >
          <motion.p variants={childFade} className="label-xs mb-4">Target Applications</motion.p>
          <motion.h2 variants={childFade} className="font-display font-bold text-3xl md:text-5xl text-text-primary tracking-tight max-w-2xl">
            Designed for Institutional Professionals
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {audiences.map((item) => (
            <motion.div
              key={item.title}
              variants={childFade}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group pc-card p-7 flex flex-col justify-between gap-6 hover:border-white/12 transition-all duration-300"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 text-pc-gold w-fit mb-5 group-hover:bg-pc-gold/12 group-hover:border-pc-gold/22 transition-all duration-250">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>
              <Link
                to={item.link}
                className="inline-flex items-center gap-1.5 text-pc-gold text-[12px] font-semibold uppercase tracking-[0.1em] group-hover:gap-2.5 transition-all duration-200"
              >
                {item.linkText}
                <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AudienceSection;
