import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedButton from "../ui/AnimatedButton";

const AboutCtaSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl border border-white/10 p-8 sm:p-10 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-oil-gold/5 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 rounded-lg bg-oil-gold/10 border border-oil-gold/20">
            <ExternalLink size={18} className="text-oil-gold" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Experience the Live System
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Explore real-time multi-horizon forecasts powered by this prediction pipeline
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link to="/dashboard">
            <AnimatedButton variant="primary" className="px-6 py-3 rounded-lg text-sm flex items-center gap-2">
              Open Dashboard
              <ArrowRight size={16} />
            </AnimatedButton>
          </Link>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
          >
            View Market Intelligence
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutCtaSection;
