import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  hoverScale?: number;
  tapScale?: number;
}

/**
 * AnimatedButton — Consistent interactive button component.
 *
 * Variants:
 *  primary   — Amber fill, dark text.  Used for main CTAs (Launch, Apply, Refresh).
 *  secondary — Transparent bg, subtle border.  Used for secondary actions.
 *  ghost     — Glass surface, subtle border. Used for toolbar actions.
 *  danger    — Red tint. Used for destructive / error actions.
 */
const AnimatedButton = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
  hoverScale = 1.02,
  tapScale = 0.97,
}: AnimatedButtonProps) => {
  const base = "inline-flex items-center gap-2 font-semibold transition-all duration-200 select-none";

  const variantClasses: Record<string, string> = {
    primary:
      "px-5 py-2.5 rounded-xl bg-pc-gold text-black hover:bg-pc-gold-light text-sm shadow-sm shadow-pc-gold/20",
    secondary:
      "px-5 py-2.5 rounded-xl bg-transparent border border-white/12 text-text-primary hover:bg-white/6 hover:border-white/18 text-sm",
    ghost:
      "px-4 py-2 rounded-lg glass border-white/8 text-text-secondary hover:text-text-primary hover:border-white/15 text-sm",
    danger:
      "px-5 py-2.5 rounded-xl bg-pc-red/10 border border-pc-red/25 text-red-400 hover:bg-pc-red/18 hover:border-pc-red/40 text-sm",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : hoverScale }}
      whileTap={{ scale: disabled ? 1 : tapScale }}
      className={`${base} ${variantClasses[variant]} ${
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
