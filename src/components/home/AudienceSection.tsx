import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Users, Landmark, BarChart3, ChevronRight } from "lucide-react";
import BackgroundGrid from "../ui/BackgroundGrid";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const childFade = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const AudienceSection = () => {
  const [audienceRef, audienceInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const audiences = [
    {
      icon: <Users size={28} />,
      title: "Researchers & Analysts",
      desc: "Access granular model metrics (MAE, RMSE, MAPE), SHAP feature attribution, and ensemble weights for academic benchmarking.",
      link: "/about",
      linkText: "View Methodology",
    },
    {
      icon: <Landmark size={28} />,
      title: "Policymakers & Strategists",
      desc: "Data-driven macro insights for energy policy decisions supported by multi-horizon crude price forecasts.",
      link: "/dashboard",
      linkText: "View Live Dashboard",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Energy Traders & Investors",
      desc: "Actionable 5-day forecasts with multi-currency spreads (Brent, WTI, OPEC, Dubai) to support strategic trading decisions.",
      link: "/dashboard",
      linkText: "See Forecasts",
    },
  ];

  return (
    <section ref={audienceRef} className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 relative">
      <BackgroundGrid opacity={15} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={audienceInView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p
            variants={childFade}
            className="text-oil-gold text-xs font-bold uppercase tracking-widest mb-3 font-display"
          >
            Target Applications
          </motion.p>
          <motion.h2
            variants={childFade}
            className="text-3xl md:text-5xl font-black font-display text-white mb-4 tracking-tight"
          >
            Who Uses PetroCast?
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={audienceInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {audiences.map((item) => (
            <motion.div
              key={item.title}
              variants={childFade}
              whileHover={{ y: -6 }}
              className="group glass-card p-8 rounded-3xl hover:border-oil-gold/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 p-4 rounded-2xl bg-oil-gold/10 border border-oil-gold/20 w-fit text-oil-gold group-hover:bg-oil-gold/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>
              <Link
                to={item.link}
                className="inline-flex items-center gap-1.5 text-oil-gold text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all font-display"
              >
                {item.linkText}
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AudienceSection;
