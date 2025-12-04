"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function Arena({ data }) {
  const history = data?.userContestRankingHistory || [];
  const attendedContests = history.filter((c) => c.attended);
  
  // Calculate average rating from all attended contests
  const avgRating = attendedContests.length > 0
    ? Math.round(
        attendedContests.reduce((sum, contest) => sum + contest.rating, 0) / 
        attendedContests.length
      )
    : 1500;

  const badges = data?.matchedUser?.badges || [];
  
  // Find the badge with highest display order (best badge)
  const bestBadge = badges.length > 0 
    ? badges.reduce((best, current) => 
        (current.displayOrder || 0) > (best.displayOrder || 0) ? current : best
      )
    : null;

  // Get top 10 contests by rating from all attended contests
  const top10Contests = attendedContests.length > 0
    ? [...attendedContests]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10)
        .sort((a, b) => a.contest.startTime - b.contest.startTime) // Sort chronologically for display
    : [];
  
  const recentHistory = top10Contests;
  const maxRating = recentHistory.length > 0 
    ? Math.max(...recentHistory.map(c => c.rating))
    : 3000;
  const minRating = recentHistory.length > 0
    ? Math.min(...recentHistory.map(c => c.rating))
    : 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 flex items-center gap-2 mb-8"
      >
        <Trophy className="text-[#FFA116]" />
        <h2 className="text-2xl font-bold text-white">THE ARENA</h2>
      </motion.div>

      {/* Rating Graph */}
      <div className="z-10 w-full max-w-sm h-40 flex items-end justify-between gap-1 mb-8 border-b border-[#333] pb-2 px-2">
        {recentHistory.length > 0 ? (
          recentHistory.map((contest, i) => {
            const heightPercentage = ((contest.rating - minRating) / (maxRating - minRating + 100)) * 100;
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(heightPercentage, 5)}%` }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="w-full bg-[#FFA116] opacity-60 rounded-t-sm hover:opacity-100 transition-opacity"
                title={`Rating: ${Math.round(contest.rating)}`}
              />
            );
          })
        ) : (
          <div className="w-full text-center text-gray-500 text-sm">
            No contest history
          </div>
        )}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="z-10 text-center mb-12"
      >
        <div className="text-5xl font-bold text-white mb-2">
          {avgRating}
        </div>
        <div className="text-gray-400 font-mono">AVERAGE RATING</div>
      </motion.div>

      {bestBadge && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="z-10 flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-[#333]"
        >
          <img src={bestBadge.icon} alt="Badge" className="w-12 h-12" />
          <div className="text-left">
            <div className="text-[#FFA116] font-bold text-sm">
              BEST BADGE
            </div>
            <div className="text-white font-bold">
              {bestBadge.displayName}
            </div>
          </div>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="z-10 mt-8 text-gray-500 italic"
      >
        "A true competitor."
      </motion.p>
    </div>
  );
}
