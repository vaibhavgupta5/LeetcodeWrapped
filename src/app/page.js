"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, AlertCircle, Heart, Github } from "lucide-react";
import SlideManager from "@/components/SlideManager";
import ContributionGrid from "@/components/ContributionGrid";
import { fetchLeetCodeData } from "./actions";

// Mock Contribution Graph Component
const ContributionGraph = () => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    // Generate random contribution data
    const levels = [
      "bg-[#282828]",
      "bg-[#0e4429]",
      "bg-[#006d32]",
      "bg-[#26a641]",
      "bg-[#39d353]",
    ];
    const newSquares = Array.from(
      { length: 52 * 7 },
      () => levels[Math.floor(Math.random() * levels.length * 0.3)]
    ); // Bias towards empty/low
    setSquares(newSquares);
  }, []);

  return (
    <div className="flex gap-1 flex-wrap w-[300px] opacity-20 rotate-12 absolute -right-10 -top-10 z-0 pointer-events-none">
      {squares.map((color, i) => (
        <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
      ))}
    </div>
  );
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchLeetCodeData(username);

      if (result.error) {
        setError(result.error);
      } else if (!result.data || !result.data.matchedUser) {
        setError("User not found or data unavailable.");
      } else {
        setData(result.data);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (data) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ContributionGrid />
        </div>
        <div className="z-10 w-full h-full flex items-center k justify-center">
          <SlideManager data={data} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 " />

      <ContributionGrid />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md"
      >
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
              alt="LeetCode Logo"
              className="w-20 h-20 object-contain mb-4 opacity-80"
            />
          </div>
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-white mb-2 tracking-tight"
          >
            LeetCode Wrapped
          </motion.h1>
          <h2 className="text-xl text-gray-400">2025 Edition</h2>
        </div>

        <div className="notebook-card p-8 shadow-xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#3e3e3e] border border-transparent rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ffa116] transition-all pl-10 placeholder-gray-500"
                  placeholder="Enter your username"
                  autoComplete="off"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffa116] text-black font-bold py-3 rounded-md hover:bg-[#ffb84d] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Fetching Data...
                </>
              ) : (
                "Get Your Wrapped"
              )}
            </button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-3 bg-[#ef4743]/10 border border-[#ef4743]/20 rounded-md flex items-center gap-2 text-[#ef4743] text-sm"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}
        </div>

        {/* Made with love footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-3">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://github.com/vaibhavgupta5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffa116] hover:text-[#ffb84d] transition-colors font-medium"
            >
              Vaibhav Gupta
            </a>
          </div>
          <a
            href="https://github.com/vaibhavgupta5/leetcodewrapped"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <Github size={16} />
            <span>View on GitHub</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
