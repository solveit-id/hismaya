"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up";
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const initialPosition = {
    left: {
      x: -70,
      y: 0,
    },
    right: {
      x: 70,
      y: 0,
    },
    up: {
      x: 0,
      y: 40,
    },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialPosition[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
