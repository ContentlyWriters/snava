"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  speed?: number;
}

export default function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  className = "",
  speed = 42,
}: Props) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        className={`flex w-max gap-5 ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((child, index) => (
          <div key={index} className="shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
