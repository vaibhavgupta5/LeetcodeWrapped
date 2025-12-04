"use client";

import { motion } from "framer-motion";

export default function Difficulty({ data }) {
  const stats = data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
  const easy = stats.find((s) => s.difficulty === "Easy")?.count || 0;
  const medium = stats.find((s) => s.difficulty === "Medium")?.count || 0;
  const hard = stats.find((s) => s.difficulty === "Hard")?.count || 0;

  const max = Math.max(easy, medium, hard);

  const bars = [
    { label: "Easy", count: easy, color: "#00b8a3" },
    { label: "Medium", count: medium, color: "#ffc01e" },
    { label: "Hard", count: hard, color: "#ef4743" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00b8a3] rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#ef4743] rounded-full blur-[120px] opacity-10" />

      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 text-4xl font-black mb-16 text-center tracking-tight text-white"
      >
        The Grind
      </motion.h2>

      <div className="z-10 w-full max-w-sm flex items-end justify-between h-72 mb-12 px-4 gap-4">
        {bars.map((bar, index) => (
          <div
            key={bar.label}
            className="flex flex-col items-center gap-3 w-1/3 h-full justify-end group"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              className="font-bold text-2xl text-white"
            >
              {bar.count}
            </motion.div>

            <div className="w-full h-full max-h-[200px] flex items-end relative">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max((bar.count / max) * 100, 2)}%` }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                className="w-full rounded-lg relative shadow-lg"
                style={{
                  backgroundColor: bar.color,
                  boxShadow: `0 0 20px ${bar.color}40`,
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/30 rounded-t-lg" />
              </motion.div>
            </div>

            <span
              className="font-mono text-sm font-bold tracking-wider uppercase"
              style={{ color: bar.color }}
            >
              {bar.label}
            </span>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="z-10 bg-[#1a1a1a]/80 backdrop-blur-md p-6 rounded-2xl border border-[#333] max-w-sm w-full text-center shadow-xl"
      >
        <p className="text-[#FFA116] font-medium text-lg">
          {medium > easy
            ? "You didn't take the easy way out."
            : "Building a strong foundation."}
        </p>
      </motion.div>
    </div>
  );
}
