"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import SlideManager from "@/components/SlideManager";
import ContributionGrid from "@/components/ContributionGrid";
import { fetchLeetCodeData } from "../actions";

export default function UserWrapped() {
  const params = useParams();
  const router = useRouter();
  const username = params.username;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;

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

    loadData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
        <div className="text-center">
          <p className="text-gray-400">Loading {username}&apos;s wrapped...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] p-4">
        <div className="max-w-md w-full bg-[#2a2a2a] rounded-2xl p-8 text-center">
          <AlertCircle className="text-[#ef4743] mx-auto mb-4" size={48} />
          <h2 className="text-white text-xl font-bold mb-2">Oops!</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#FFA116] text-black font-bold py-3 px-8 rounded-full hover:bg-[#ffb84d] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ContributionGrid />
        </div>
        <div className="z-10 w-full h-full flex items-center justify-center">
          <SlideManager data={data} />
        </div>
      </div>
    );
  }

  return null;
}
