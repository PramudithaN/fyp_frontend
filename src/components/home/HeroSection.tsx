import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Particle from "../ui/Particle";
import BackgroundGrid from "../ui/BackgroundGrid";
import GlowEffect from "../ui/GlowEffect";
import AnimatedButton from "../ui/AnimatedButton";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 overflow-hidden"
    >
      <BackgroundGrid opacity={30} />
      <GlowEffect
        color="gold"
        size="xl"
        position={{ top: "30%", left: "50%" }}
        blur={160}
        opacity={12}
      />
      <GlowEffect
        color="blue"
        size="lg"
        position={{ bottom: "10%", left: "20%" }}
        blur={140}
        opacity={8}
      />

      <Particle size={6} x="15%" y="25%" delay={0} />
      <Particle size={4} x="80%" y="20%" delay={1.5} />
      <Particle size={8} x="70%" y="60%" delay={0.8} />
      <Particle size={5} x="25%" y="70%" delay={2} />
      <Particle size={3} x="90%" y="45%" delay={1} />
      <Particle size={7} x="10%" y="50%" delay={0.5} />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 text-center max-w-5xl mr-20 ml-auto w-full pt-28 pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-end items-center"
        >
          <Link to="/dashboard">
            <AnimatedButton variant="primary" className="px-7 py-3.5 text-sm font-bold font-display shadow-xl shadow-oil-gold/25 hover:shadow-oil-gold/45">
              Launch Live Dashboard
              <TrendingUp size={18} />
            </AnimatedButton>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
