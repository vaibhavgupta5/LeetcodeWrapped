"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Share2, X as XIcon, Volume2, VolumeX, Play, Pause, Instagram, MessageCircle, Link as LinkIcon, Sparkles, Star } from "lucide-react";

import Intro from "./slides/Intro";
import Origin from "./slides/Origin";
import Language from "./slides/Language";
import Difficulty from "./slides/Difficulty";
import Nemesis from "./slides/Nemesis";
import Consistency from "./slides/Consistency";
import Arena from "./slides/Arena";
import Wealth from "./slides/Wealth";
import RecentWins from "./slides/RecentWins";
import Summary from "./slides/Summary";
import Credits from "./slides/Credits";

const SLIDES = [
  Intro,
  Origin,
  Language,
  Difficulty,
  Nemesis,
  Consistency,
  Arena,
  Wealth,
  RecentWins,
  Summary,
  Credits,
];

export default function SlideManager({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isWobbling, setIsWobbling] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const autoScrollTimerRef = useRef(null);

  // Filter out Wealth slide if points are 0
  const filteredSlides = SLIDES.filter((Slide) => {
    if (
      Slide === Wealth &&
      (data?.matchedUser?.contributions?.points || 0) === 0
    ) {
      return false;
    }
    return true;
  });

  const SlideComponent = filteredSlides[currentSlide];
  const isLastSlide = currentSlide === filteredSlides.length - 1;

  // Get stats for share captions
  const stats = data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
  const totalSolved = stats.find((s) => s.difficulty === "All")?.count || 0;
  const hard = stats.find((s) => s.difficulty === "Hard")?.count || 0;
  const ranking = data?.matchedUser?.profile?.ranking || "N/A";
  const username = data?.matchedUser?.username || "";

  const paginate = (newDirection) => {
    if (
      currentSlide + newDirection < 0 ||
      currentSlide + newDirection >= filteredSlides.length
    ) {
      return;
    }
    setDirection(newDirection);
    setCurrentSlide(currentSlide + newDirection);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") paginate(1);
    if (e.key === "ArrowLeft") paginate(-1);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Auto-scroll effect
  useEffect(() => {
    if (isAutoScrolling && currentSlide < filteredSlides.length - 1) {
      autoScrollTimerRef.current = setTimeout(() => {
        setDirection(1);
        setCurrentSlide(currentSlide + 1);
      }, 4000); // 3 seconds per slide
    } else if (currentSlide === filteredSlides.length - 1) {
      setIsAutoScrolling(false);
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrolling, currentSlide, filteredSlides.length]);

  useEffect(() => {
    audioRef.current = new Audio('/audio.mp3');
    audioRef.current.loop = true;
    
    // Auto-play music on load
    audioRef.current.play().catch(err => {
      console.log('Auto-play failed:', err);
      setIsPlaying(false);
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current && isPlaying) {
          audioRef.current.pause();
        }
      } else {
        if (audioRef.current && isPlaying) {
          audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying]);

  const toggleAutoScroll = () => {
    const newAutoScrollState = !isAutoScrolling;
    setIsAutoScrolling(newAutoScrollState);
    
    // Auto-play music when auto-scroll starts
    if (newAutoScrollState && audioRef.current && !isPlaying) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        setIsPlaying(true);
      }
    }
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/${encodeURIComponent(username)}`;
  };

  const getCaption = (platform) => {
    const shareUrl = getShareUrl();
    const baseUrl = window.location.origin;
    
    if (platform === "x") {
      return `#LeetCodeWrapped 🚀\n\nJust wrapped up 2025 on @LeetCode!\n\n✅ ${totalSolved} problems solved\n🏆 Global Rank #${ranking}\n💪 ${hard} Hard problems conquered\n\nCheck out my full wrapped: ${shareUrl}\n\nMake your own wrapped: ${baseUrl}\n\n#100DaysOfCode #CodingLife #LeetCode`;
    } else if (platform === "instagram") {
      return `#LeetCodeWrapped 💻✨\n\nMy LeetCode 2025 Journey:\n\n${totalSolved} problems crushed 💪\nGlobal Rank #${ranking} 🏆\n${hard} Hard problems down 🔥\n\nThe grind never stops! 🚀\n\nView my full wrapped: ${shareUrl}\n\nMake your own: ${baseUrl}\n\n#LeetCode #CodingLife #100DaysOfCode #ProgrammingJourney #TechLife #DeveloperLife #CodeNewbie`;
    }
    return `#LeetCodeWrapped\n\nCheck out my LeetCode 2025!\n\n✅ ${totalSolved} problems solved\n🏆 Global Rank #${ranking}\n💪 ${hard} Hard problems conquered\n\n${shareUrl}\n\nMake your own wrapped: ${baseUrl}\n\n#100DaysOfCode #LeetCode`;
  };

  const handleShareClick = async () => {
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 500);

    // Always show custom modal
    setShowShareMenu(true);
  };

  const handleShareOnX = async () => {
    const caption = getCaption("x");
    const shareUrl = getShareUrl();
    
    // Copy caption to clipboard
    try {
      await navigator.clipboard.writeText(caption);
      setFeedbackMessage("Caption copied! Opening X...");
      
      // Open Twitter with the caption
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
      window.open(tweetUrl, "_blank");
      
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (err) {
      // Fallback: just open Twitter
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
      window.open(tweetUrl, "_blank");
      setFeedbackMessage("Opening X...");
      setTimeout(() => setFeedbackMessage(""), 3000);
    }

    setTimeout(() => setShowShareMenu(false), 1000);
  };

  const handleShareOnInstagram = async () => {
    const caption = getCaption("instagram");
    const shareUrl = getShareUrl();
    
    try {
      await navigator.clipboard.writeText(caption);
      setFeedbackMessage("Caption & link copied!");
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (err) {
      setFeedbackMessage("Failed to copy. Check console.");
      console.log("Link: " + shareUrl + "\nCaption:\n" + caption);
      setTimeout(() => setFeedbackMessage(""), 3000);
    }

    setTimeout(() => setShowShareMenu(false), 1000);
  };

  const handleShareOnWhatsApp = async () => {
    const caption = getCaption();
    const shareUrl = getShareUrl();
    const message = encodeURIComponent(caption);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");

    setFeedbackMessage("Opening WhatsApp...");
    setTimeout(() => setFeedbackMessage(""), 3000);
    setTimeout(() => setShowShareMenu(false), 1000);
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setFeedbackMessage("Link copied!");
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (err) {
      setFeedbackMessage("Failed to copy link");
      console.log("Link: " + shareUrl);
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
    setTimeout(() => setShowShareMenu(false), 1000);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full max-w-md mx-auto flex flex-col overflow-hidden bg-black shadow-2xl border-1 border-r-3 border-b-3 border-[#333]"
    >
      {/* Progress Bars */}
      <div className="absolute top-4 left-0 right-0 z-50 flex gap-1 px-4">
        {filteredSlides.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              index <= currentSlide ? "bg-[#FFA116]" : "bg-[#333]"
            }`}
          />
        ))}
      </div>

      {/* Control Buttons */}
      <div className="absolute top-14 right-4 z-50 flex gap-2">
        <button
          onClick={toggleMusic}
          className="p-2 rounded-full bg-black/30 text-white/60 hover:text-white hover:bg-black/50 transition-all backdrop-blur-sm"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <Volume2 size={16} />
          ) : (
            <VolumeX size={16} />
          )}
        </button>
        <button
          onClick={toggleAutoScroll}
          className={`p-2 rounded-full transition-all backdrop-blur-sm ${
            isAutoScrolling
              ? "bg-[#FFA116]/80 text-black"
              : "bg-black/30 text-white/60 hover:text-white hover:bg-black/50"
          }`}
          title={isAutoScrolling ? "Stop Auto-Scroll" : "Start Auto-Scroll"}
        >
          {isAutoScrolling ? (
            <Pause size={16} />
          ) : (
            <Play size={16} />
          )}
        </button>
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Glowing Orbs Overlay */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#FFA116] rounded-full blur-[100px] opacity-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#2cbb5d] rounded-full blur-[100px] opacity-10" />
      </div>

      {/* LeetCode Logo Watermark */}
      <div className="absolute top-6 left-6 z-50 opacity-30">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
          alt="LeetCode Logo"
          className="w-8 h-8 object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative w-full h-full z-10">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <SlideComponent data={data} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Areas (Invisible) */}
      <div className="absolute inset-0 z-30 flex">
        <div className="w-1/3 h-full" onClick={() => paginate(-1)} />
        <div className="w-1/3 h-full" /> {/* Middle area doesn't navigate */}
        <div className="w-1/3 h-full" onClick={() => paginate(1)} />
      </div>

      {/* Visual Navigation Hints (Optional) */}
      {currentSlide > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            paginate(-1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] p-2 rounded-full bg-black/50 text-white/50 hover:text-white hover:bg-black/80 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {currentSlide < filteredSlides.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            paginate(1);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] p-2 rounded-full bg-black/50 text-white/50 hover:text-white hover:bg-black/80 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      )}

  {isLastSlide && !showShareMenu && (
  <motion.button
    initial={{ y: 50, opacity: 0 }}
    animate={{
      y: 0,
      opacity: 1,
      rotate: isWobbling ? [0, -10, 10, -10, 10, 0] : 0,
    }}
    transition={{
      y: { delay: 1 },
      opacity: { delay: 1 },
      rotate: { duration: 0.5 },
    }}
    onClick={handleShareClick}
    disabled={isGenerating}
    className="
      fixed bottom-5 left-1/2 -translate-x-1/2 
      text-center z-[100] flex items-center gap-2 
      bg-[#FFA116] text-black 
      px-12 py-3 rounded-full font-bold 
      hover:bg-[#ffb84d] transition-colors 
      disabled:opacity-50 shadow-lg cursor-pointer
      w-[300px] justify-center
    "
    style={{ pointerEvents: 'auto' }}
  >
    {isGenerating ? (
      <>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
        <span>Loading...</span>
      </>
    ) : (
      <>
        <Share2 size={20} />
        <span>Share on Socials</span>
      </>
    )}
  </motion.button>
)}

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

              {/* Feedback Message */}
              <AnimatePresence>
                {feedbackMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-[#2cbb5d]/20 border border-[#2cbb5d]/30 rounded-lg text-[#2cbb5d] text-sm text-center font-medium"
                  >
                    ✓ {feedbackMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
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
                        Post with link & caption
                      </div>
                    </div>
                  </div>
                </button>

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
                      <Instagram size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Share on Instagram
                      </div>
                      <div className="text-gray-500 text-xs">
                        Copy link & caption
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleShareOnWhatsApp}
                  disabled={isGenerating}
                  className="w-full bg-[#0a0a0a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#FFA116] p-4 rounded-xl transition-colors text-left disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Share on WhatsApp
                      </div>
                      <div className="text-gray-500 text-xs">
                        Send via WhatsApp
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full bg-[#0a0a0a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#FFA116] p-4 rounded-xl transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFA116] rounded-lg flex items-center justify-center">
                      <LinkIcon size={20} className="text-black" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Copy Wrapped Link
                      </div>
                      <div className="text-gray-500 text-xs">
                        Share your wrapped directly
                      </div>
                    </div>
                  </div>
                </button>

                {/* Divider */}
                <div className="border-t border-[#2a2a2a] pt-3 mt-4">
                  <div className="text-gray-500 text-xs text-center mb-3">
                    Create your own wrapped
                  </div>
                  <button
                    onClick={() => window.open("/", "_blank")}
                    className="w-full bg-[#0a0a0a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#FFA116] p-4 rounded-xl transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2cbb5d] rounded-lg flex items-center justify-center">
                        <Sparkles size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">
                          Make Your Own
                        </div>
                        <div className="text-gray-500 text-xs">
                          Get your LeetCode wrapped
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => window.open("https://github.com/vaibhavgupta5/leetcodewrapped", "_blank")}
                    className="w-full mt-3 bg-[#0a0a0a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#FFA116] p-4 rounded-xl transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#333] rounded-lg flex items-center justify-center">
                        <Star size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">
                          Star on GitHub
                        </div>
                        <div className="text-gray-500 text-xs">
                          @vaibhavgupta5/leetcodewrapped
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
