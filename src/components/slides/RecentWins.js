"use client";

import { motion } from "framer-motion";

export default function RecentWins({ data }) {
  const recent = data?.recentAcSubmissionList || [];
  const top3 = recent.slice(0, 3);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 text-3xl font-bold mb-12 text-center"
      >
        Recent Wins
      </motion.h2>

      <div className="z-10 w-full max-w-sm space-y-6">
        {top3.map((sub, index) => (
          <motion.div
            key={sub.id}
            initial={{
              x: index % 2 === 0 ? -100 : 100,
              opacity: 0,
              rotate: index % 2 === 0 ? -2 : 2,
            }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: index * 0.3, type: "spring" }}
            className="bg-white text-black p-4 font-mono text-sm shadow-lg transform hover:scale-105 transition-transform"
            style={{
              backgroundImage: "radial-gradient(#ddd 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          >
            <div className="border-b-2 border-dashed border-black pb-2 mb-2 flex justify-between">
              <span>RECEIPT #{sub.id.slice(-4)}</span>
              <span>
                {new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="font-bold text-lg mb-1 truncate">{sub.title}</div>
            <div className="flex justify-between items-center">
              <span className="bg-black text-white px-2 py-0.5 text-xs rounded-sm uppercase">
                {sub.lang}
              </span>
              <span className="font-bold">ACCEPTED</span>
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">
              **********************************
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
