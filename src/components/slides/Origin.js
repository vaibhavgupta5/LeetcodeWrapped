"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";

export default function Origin({ data }) {
  const profile = data?.matchedUser?.profile;
  const school = profile?.school || "The World Wide Web";
  const country = profile?.countryName || "Unknown Location";
  const avatar = profile?.userAvatar;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="z-10 w-32 h-32 rounded-full border-4 border-[#FFA116] overflow-hidden mb-8 shadow-[0_0_20px_rgba(255,161,22,0.5)]"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl">
            👾
          </div>
        )}
      </motion.div>

      <div className="z-10 w-full max-w-sm space-y-6">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="notebook-card bg-[#1a1a1a] p-6 border border-[#333]"
        >
          <div className="flex items-center gap-4 mb-2">
            <GraduationCap className="text-[#2cbb5d]" size={24} />
            <span className="text-gray-400 text-sm font-mono">ORIGIN</span>
          </div>
          <h2 className="text-xl font-bold text-white">{school}</h2>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="notebook-card bg-[#1a1a1a] p-6 border border-[#333]"
        >
          <div className="flex items-center gap-4 mb-2">
            <MapPin className="text-[#ef4743]" size={24} />
            <span className="text-gray-400 text-sm font-mono">
              SERVER LOCATION
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{country}</h2>
        </motion.div>
      </div>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="z-10 mt-12 text-[#FFA116] font-mono text-center"
      >
        "Compiling locally, deploying globally."
      </motion.p>
    </div>
  );
}
