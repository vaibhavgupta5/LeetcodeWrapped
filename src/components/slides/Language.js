"use client";

import { motion } from "framer-motion";

export default function Language({ data }) {
  const languages = data?.matchedUser?.languageProblemCount || [];

  // Sort by problems solved
  const sortedLanguages = [...languages].sort(
    (a, b) => b.problemsSolved - a.problemsSolved
  );
  const topLanguage = sortedLanguages[0] || {
    languageName: "Binary",
    problemsSolved: 0,
  };
  const totalSolved = sortedLanguages.reduce(
    (acc, curr) => acc + curr.problemsSolved,
    0
  );

  // Calculate percentage for the top language
  const percentage =
    totalSolved > 0
      ? Math.round((topLanguage.problemsSolved / totalSolved) * 100)
      : 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 text-4xl font-black mb-12 text-center text-white tracking-tight"
      >
        Your Native Tongue
      </motion.h2>

      <div className="z-10 relative w-64 h-64 mb-12 flex items-center justify-center">
        {/* Glowing Background */}
        <div className="absolute inset-0 bg-[#FFA116] rounded-full blur-[80px] opacity-20" />

        {/* Pie Chart */}
        <motion.div
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="w-full h-full rounded-full relative"
          style={{
            background: `conic-gradient(#FFA116 ${percentage}%, #222 ${percentage}% 100%)`,
            boxShadow: "0 0 50px rgba(255,161,22,0.1)",
          }}
        >
          {/* Inner Circle */}
          <div className="absolute inset-2 bg-[#0a0a0a] rounded-full flex flex-col items-center justify-center z-10 border border-[#333]">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="text-6xl font-black text-[#FFA116]"
            >
              {percentage}
              <span className="text-2xl align-top">%</span>
            </motion.span>
            <span className="text-gray-400 font-mono mt-1 text-sm uppercase tracking-widest">
              {topLanguage.languageName}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="z-10 w-full max-w-sm space-y-3">
        {sortedLanguages.slice(0, 3).map((lang, index) => (
          <motion.div
            key={lang.languageName}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded-lg border border-[#333] hover:border-[#FFA116]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500">
                0{index + 1}
              </span>
              <span className="font-bold text-gray-200">
                {lang.languageName}
              </span>
            </div>
            <span className="text-[#2cbb5d] font-mono font-bold text-sm bg-[#2cbb5d]/10 px-2 py-1 rounded">
              {lang.problemsSolved} SOLVED
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="z-10 mt-10 text-center text-gray-400 italic font-medium"
      >
        {topLanguage.languageName === "Java"
          ? "You speak the JVM."
          : `You are fluent in ${topLanguage.languageName}.`}
      </motion.p>
    </div>
  );
}
