"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";
import { Share2, X as XIcon } from "lucide-react";

export default function Summary({ data }) {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isWobbling, setIsWobbling] = useState(false);

  const profile = data?.matchedUser?.profile;
  const stats = data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
  const totalSolved = stats.find((s) => s.difficulty === "All")?.count || 0;
  const easy = stats.find((s) => s.difficulty === "Easy")?.count || 0;
  const medium = stats.find((s) => s.difficulty === "Medium")?.count || 0;
  const hard = stats.find((s) => s.difficulty === "Hard")?.count || 0;
  const ranking = profile?.ranking || "N/A";
  const username = profile?.username || "";

  // Get top 5 tags for more content
  const tags = data?.matchedUser?.tagProblemCounts || {};
  const allTags = [
    ...(tags.advanced || []),
    ...(tags.intermediate || []),
    ...(tags.fundamental || []),
  ];
  const topTags = allTags
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, 5);

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const generateImage = async () => {
    if (cardRef.current === null) return null;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#1a1a1a",
      });
      return dataUrl;
    } catch (err) {
      console.error("Failed to generate image:", err);
      return null;
    }
  };

  const getCaption = (platform) => {
    if (platform === "x") {
      return `Just wrapped up 2025 on @LeetCode! 🚀\n\n✅ ${totalSolved} problems solved\n🏆 Global Rank #${ranking}\n💪 ${hard} Hard problems conquered\n\nReady to level up in 2025! #LeetCodeWrapped #100DaysOfCode`;
    } else if (platform === "instagram") {
      return `My LeetCode Wrapped 2025 💻✨\n\n${totalSolved} problems crushed 💪\nGlobal Rank #${ranking} 🏆\n${hard} Hard problems down 🔥\n\nThe grind never stops! 🚀\n\n#LeetCode #LeetCodeWrapped #CodingLife #100DaysOfCode #ProgrammingJourney #TechLife #DeveloperLife`;
    }
    return "";
  };

  const handleShareClick = async () => {
    // Trigger wobble animation

    console.log("Share clicked");

    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 500);

    // Try Web Share API first (native sharing on mobile/modern browsers)
    if (navigator.share && navigator.canShare) {
      setIsGenerating(true);

      try {
        const imageUrl = await generateImage();

        if (imageUrl) {
          // Convert data URL to blob
          const blob = await (await fetch(imageUrl)).blob();
          const file = new File([blob], "leetcode-wrapped-2025.png", {
            type: "image/png",
          });

          const caption = `Just wrapped up 2025 on LeetCode! 🚀\n\n✅ ${totalSolved} problems solved\n🏆 Global Rank #${ranking}\n💪 ${hard} Hard problems conquered\n\n#LeetCodeWrapped #100DaysOfCode`;

          // Check if we can share files
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "My LeetCode Wrapped 2025",
              text: caption,
              files: [file],
            });
            setIsGenerating(false);
            return; // Successfully shared via Web Share API
          }
        }
      } catch (err) {
        // User cancelled or error occurred, fall through to modal
        console.log("Web Share API failed, showing modal:", err);
      }

      setIsGenerating(false);
    }

    // Fallback: Show modal menu
    setShowShareMenu(true);
  };

  const handleShareOnX = async () => {
    setIsGenerating(true);
    const imageUrl = await generateImage();

    if (imageUrl) {
      const link = document.createElement("a");
      link.download = "leetcode-wrapped-2025.png";
      link.href = imageUrl;
      link.click();
    }

    const caption = getCaption("x");
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      caption
    )}`;
    window.open(tweetUrl, "_blank");

    setIsGenerating(false);
    setShowShareMenu(false);
  };

  const handleShareOnInstagram = async () => {
    setIsGenerating(true);
    const imageUrl = await generateImage();

    if (imageUrl) {
      const link = document.createElement("a");
      link.download = "leetcode-wrapped-2025.png";
      link.href = imageUrl;
      link.click();

      const caption = getCaption("instagram");
      try {
        await navigator.clipboard.writeText(caption);
        alert(
          "Image downloaded! Caption copied to clipboard. Post it on Instagram! 📸"
        );
      } catch (err) {
        alert("Image downloaded! Here's your caption:\n\n" + caption);
      }
    }

    setIsGenerating(false);
    setShowShareMenu(false);
  };

  const handleCopyLink = async () => {
    const profileUrl = `https://leetcode.com/${username}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
      alert("Profile link copied to clipboard! 🔗");
    } catch (err) {
      alert("Link: " + profileUrl);
    }
    setShowShareMenu(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div
          ref={cardRef}
          className="w-[340px]  bg-[#1a1a1a] rounded-2xl relative overflow-hidden flex flex-col shadow-2xl border-2 border-[#2a2a2a]  justify-center"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {/* Clean solid background */}
          <div className="absolute inset-0 bg-[#1a1a1a]" />

          {/* Header */}
          <div className="z-10 p-5 pb-3 border-b border-[#2a2a2a]">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h1 className="text-white font-black text-xl tracking-tight leading-tight">
                  LeetCode
                </h1>
                <h1 className="text-white font-black text-xl tracking-tight leading-tight">
                  Wrapped
                </h1>
              </div>
              <div className="text-[#FFA116] font-black text-3xl tracking-tighter">
                2025
              </div>
            </div>
            <div
              className="text-[9px] text-gray-600 font-mono cursor-pointer hover:text-gray-400 transition-colors"
              onClick={() =>
                window.open("https://github.com/vaibhavgupta5", "_blank")
              }
            >
              github.com/vaibhavgupta5
            </div>
          </div>

          {/* Profile Section */}
          <div className="z-10 px-5 pt-4 pb-3 border-b border-[#2a2a2a]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 rounded-full border-2 border-[#2a2a2a] overflow-hidden bg-[#0a0a0a] flex-shrink-0">
                {profile?.userAvatar ? (
                  <img
                    src={profile.userAvatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#2a2a2a]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-base mb-0.5 truncate">
                  {profile?.realName || profile?.username}
                </div>
                <div className="text-[#FFA116] text-xs font-bold mt-1">
                  Global Rank #{ranking}
                </div>
              </div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="z-10 px-5 py-4 border-b border-[#2a2a2a]">
            <div className="text-gray-500 text-[9px] font-bold uppercase tracking-wider mb-2">
              Year In Review
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#0a0a0a] p-2.5 rounded-lg border flex flex-col justify-center items-center border-[#2a2a2a]">
                <div className="text-[#00b8a3] text-xl font-black">{easy}</div>
                <div className="text-gray-600 text-[9px] font-bold uppercase tracking-wide">
                  Easy
                </div>
              </div>
              <div className="bg-[#0a0a0a] p-2.5 rounded-lg border flex flex-col justify-center items-center border-[#2a2a2a]">
                <div className="text-[#ffc01e] text-xl font-black">
                  {medium}
                </div>
                <div className="text-gray-600 text-[9px] font-bold uppercase tracking-wide">
                  Medium
                </div>
              </div>
              <div className="bg-[#0a0a0a] p-2.5 rounded-lg border flex flex-col justify-center items-center border-[#2a2a2a]">
                <div className="text-[#ef4743] text-xl font-black">{hard}</div>
                <div className="text-gray-600 text-[9px] font-bold uppercase tracking-wide">
                  Hard
                </div>
              </div>
            </div>
            <div className="mt-3 bg-[#0a0a0a] p-3 rounded-lg border border-[#2a2a2a] text-center">
              <div className="text-white text-3xl font-black">
                {totalSolved}
              </div>
              <div className="text-gray-600 text-[9px] font-bold uppercase tracking-wide">
                Total Problems Solved
              </div>
            </div>
          </div>

          {/* Top Skills */}
          <div className="z-10 px-5 py-4 flex-1 overflow-hidden">
            <div className="text-gray-500 text-[9px] font-bold uppercase tracking-wider mb-2">
              Most Solved Topics
            </div>
            <div className="space-y-1.5">
              {topTags.map((tag, i) => (
                <div
                  key={tag.tagName}
                  className="flex justify-between items-center bg-[#0a0a0a] px-2.5 py-2 rounded border border-[#2a2a2a]"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-gray-600 font-mono text-[10px] flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white font-semibold text-xs truncate">
                      {tag.tagName}
                    </span>
                  </div>
                  <span className="text-[#FFA116] font-bold text-xs flex-shrink-0 ml-2">
                    {tag.problemsSolved}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Share Menu Modal */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a1a1a] rounded-2xl p-6 max-w-sm w-full border-2 border-[#2a2a2a]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">
                  Share Your Wrapped
                </h3>
                <button
                  onClick={() => setShowShareMenu(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <XIcon size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {/* Share on X (Twitter) */}
                <button
                  onClick={handleShareOnX}
                  disabled={isGenerating}
                  className="w-full bg-[#0a0a0a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#FFA116] p-4 rounded-xl transition-colors text-left disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">𝕏</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Share on X
                      </div>
                      <div className="text-gray-500 text-xs">
                        Post with caption
                      </div>
                    </div>
                  </div>
                </button>

                {/* Share on Instagram */}
                <button
                  onClick={handleShareOnInstagram}
                  disabled={isGenerating}
                  className="w-full bg-[#0a0a0a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#FFA116] p-4 rounded-xl transition-colors text-left disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                      }}
                    >
                      <span className="text-white font-bold text-xl">📷</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Share on Instagram
                      </div>
                      <div className="text-gray-500 text-xs">
                        Download + Copy caption
                      </div>
                    </div>
                  </div>
                </button>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="w-full bg-[#0a0a0a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#FFA116] p-4 rounded-xl transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFA116] rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-xl">🔗</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Copy Profile Link
                      </div>
                      <div className="text-gray-500 text-xs">
                        Share your LeetCode profile
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

   
    </div>
  );
}
