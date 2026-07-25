import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 240;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 z-50 h-11 w-11 rounded-full border border-oil-gold/40 bg-oil-black/85 text-oil-gold shadow-lg shadow-black/40 backdrop-blur-sm transition hover:scale-105 hover:border-oil-gold hover:bg-oil-black/95 focus:outline-none focus:ring-2 focus:ring-oil-gold/50"
        >
          <ArrowUp size={18} className="mx-auto" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
