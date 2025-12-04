"use client";

import { motion } from "framer-motion";
import { Sword } from "lucide-react";

export default function Nemesis({ data }) {
  const tags = data?.matchedUser?.tagProblemCounts || {};
  const allTags = [
    ...(tags.advanced || []),
    ...(tags.intermediate || []),
    ...(tags.fundamental || []),
  ];

  // Find the tag with most solved problems
  const topTag = allTags.reduce(
    (prev, current) =>
      prev.problemsSolved > current.problemsSolved ? prev : current,
    { tagName: "None", problemsSolved: 0 }
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="z-10 mb-8 text-[#ef4743]"
      >
        <Sword size={64} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="z-10 text-xl text-gray-400 font-mono mb-2"
      >
        YOUR NEMESIS
      </motion.h2>

      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="z-10 text-4xl md:text-5xl font-bold text-center text-white mb-4"
      >
        {topTag.tagName}
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="z-10 bg-[#1a1a1a] px-6 py-2 rounded-full border border-[#ef4743]"
      >
        <span className="text-[#ef4743] font-bold text-xl">
          {topTag.problemsSolved} CONQUERED
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="z-10 mt-12 text-gray-400 text-center max-w-xs"
      >
        "You defeated the final boss."
      </motion.p>
    </div>
  );
}
