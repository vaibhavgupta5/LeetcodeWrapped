"use client";

import { motion } from "framer-motion";
import { Coins, TrendingUp } from "lucide-react";

export default function Wealth({ data }) {
  const points = data?.matchedUser?.contributions?.points || 0;

  // Generate random data for the "Stonks" chart
  const generateChartData = () => {
    const dataPoints = 20;
    const data = [];
    let currentValue = 100;
    for (let i = 0; i < dataPoints; i++) {
      // Upward trend with some randomness
      const change = Math.random() * 50 - 10;
      currentValue += change;
      data.push(currentValue);
    }
    // Normalize to 0-100 range for SVG
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map((val) => ((val - min) / (max - min)) * 100);
  };

  const chartData = generateChartData();
  const pointsString = chartData
    .map((val, i) => {
      const x = (i / (chartData.length - 1)) * 100;
      const y = 100 - val; // Invert Y for SVG
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFA116]/10 via-transparent to-transparent opacity-40" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Falling Coins Animation */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, opacity: 0, rotate: 0 }}
          animate={{
            y: 1000,
            opacity: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          className="absolute text-[#FFA116]/30 z-0"
          style={{ left: `${Math.random() * 100}%` }}
        >
          <Coins size={16 + Math.random() * 24} />
        </motion.div>
      ))}

      <div className="z-10 w-full max-w-md flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8 p-6 bg-gradient-to-br from-[#FFA116]/20 to-[#FFA116]/5 rounded-full border border-[#FFA116]/30 shadow-[0_0_30px_rgba(255,161,22,0.2)]"
        >
          <Coins size={64} className="text-[#FFA116]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl font-black text-white mb-2 tracking-tighter">
            {points}
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFA116]/10 border border-[#FFA116]/20 text-[#FFA116] font-mono font-bold text-sm tracking-wider">
            <Coins size={14} />
            LEETCOINS COLLECTED
          </div>
        </motion.div>

        {/* Stonks Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full h-48 bg-[#1a1a1a]/50 rounded-2xl border border-[#333] p-6 relative overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[#2cbb5d]">
            <TrendingUp size={16} />
            <span className="font-bold text-xs tracking-wider">
              MARKET TREND
            </span>
          </div>

          <div className="w-full h-full flex items-end pt-8">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              {/* Gradient definition */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2cbb5d" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#2cbb5d" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area under the curve */}
              <motion.path
                d={`M 0 100 L ${pointsString} L 100 100 Z`}
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              />

              {/* The Line */}
              <motion.polyline
                points={pointsString}
                fill="none"
                stroke="#2cbb5d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-gray-400 font-bold text-2xl italic"
        >
          "Crypto Rich."
        </motion.p>
      </div>
    </div>
  );
}
