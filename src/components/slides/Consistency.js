"use client";

import { motion } from "framer-motion";

export default function Consistency({ data }) {
  const calendar = data?.matchedUser?.userCalendar || {};
  const streak = calendar.streak || 0;
  const totalActiveDays = calendar.totalActiveDays || 0;
  const activePercentage = Math.round((totalActiveDays / 365) * 100);

  // Generate a grid of squares to represent the year
  const squares = Array.from({ length: 100 }, (_, i) => i);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="z-10 text-3xl font-bold mb-8 text-left w-full max-w-sm"
      >
        Consistency
        <br />
        <span className="text-[#2cbb5d]">is Key.</span>
      </motion.h2>

      {/* Heatmap Visual */}
      <div className="z-10 grid grid-cols-10 gap-2 mb-8 opacity-50">
        {squares.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: Math.random() > 0.3 ? 1 : 0.2 }}
            transition={{ delay: i * 0.01 }}
            className={`w-4 h-4 rounded-sm ${
              Math.random() > 0.5 ? "bg-[#2cbb5d]" : "bg-[#333]"
            }`}
          />
        ))}
      </div>

      <div className="z-10 w-full max-w-sm grid grid-cols-2 gap-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="notebook-card bg-[#1a1a1a] p-4 border border-[#333]"
        >
          <div className="text-gray-400 text-xs font-mono mb-1">
            LONGEST STREAK
          </div>
          <div className="text-3xl font-bold text-white">
            {streak}{" "}
            <span className="text-sm font-normal text-gray-500">days</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="notebook-card bg-[#1a1a1a] p-4 border border-[#333]"
        >
          <div className="text-gray-400 text-xs font-mono mb-1">
            TOTAL ACTIVE
          </div>
          <div className="text-3xl font-bold text-white">
            {totalActiveDays}{" "}
            <span className="text-sm font-normal text-gray-500">days</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="z-10 mt-8 bg-[#2cbb5d]/10 px-6 py-3 rounded-full border border-[#2cbb5d]"
      >
        <span className="text-[#2cbb5d] font-bold">
          {activePercentage}% of the year active
        </span>
      </motion.div>
    </div>
  );
}
