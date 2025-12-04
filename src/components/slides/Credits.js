"use client";

import { motion } from "framer-motion";
import { Github, Heart } from "lucide-react";

export default function Credits() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#FFA116]/5" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">That's a Wrap!</h2>
          <p className="text-gray-400">Ready to create your own?</p>
        </motion.div>

      
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="p-6 bg-[#1a1a1a] rounded-2xl border border-[#333] flex flex-col items-center gap-4 hover:border-[#FFA116] transition-colors group cursor-pointer"
          onClick={() =>
            window.open("https://github.com/vaibhavgupta5/leetcodewrapped", "_blank")
          }
        >
          <div className="w-16 h-16 bg-[#222] rounded-full flex items-center justify-center group-hover:bg-[#FFA116] transition-colors">
            <Github size={32} className="text-white" />
          </div>

          <div>
            <div className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">
              Made with{" "}
              <Heart
                size={10}
                className="inline text-red-500 fill-red-500 mx-1"
              />{" "}
              by
            </div>
            <div className="text-xl font-bold text-white group-hover:text-[#FFA116] transition-colors">
              @vaibhavgupta5
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Star on GitHub ⭐
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 text-[10px] text-gray-600 font-mono"
      >
        LEETCODE WRAPPED 2025
      </motion.div>
    </div>
  );
}
