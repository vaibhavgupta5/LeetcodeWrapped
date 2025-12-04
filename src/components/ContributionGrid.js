"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ContributionGrid() {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const cols = Math.ceil(window.innerWidth / 15);
    const rows = Math.ceil(window.innerHeight / 15);
    const total = cols * rows;

    const colors = [
      "#282828",
      "#282828",
      "#333333",
      "#444444",
      "#ffffff",
      "#FFA116",
      "#FFA116",
      "#ffb84d",
    ];

    const newCells = Array.from({ length: total }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15,
    }));

    // Defer the state update to avoid synchronous setState warning
    const timer = setTimeout(() => {
      setCells(newCells);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 flex flex-wrap content-start overflow-hidden opacity-10 pointer-events-none">
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          className="w-4 h-4 m-[1px] rounded-[2px]"
          style={{ backgroundColor: cell.color }}
          animate={{ opacity: [0.9, 0.6, 0.3, 0.6, 0.5] }}
          transition={{
            duration: cell.duration,
            repeat: Infinity,
            delay: cell.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
