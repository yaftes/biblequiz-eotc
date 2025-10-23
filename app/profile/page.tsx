'use client';

import { useEffect, useState } from "react";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  totalScore: number;
  rank: number;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
      } else {
        setError(data.message || "Failed to fetch profile");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      {loading && <p className="text-gray-500 text-lg">Loading profile...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}
      {profile && (
        <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 flex flex-col items-center">
          <div className="w-32 h-32 bg-indigo-200 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4">
            {profile.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">{profile.name}</h1>
          <p className="text-gray-500 mb-4">{profile.email}</p>

          <div className="w-full grid grid-cols-2 gap-4 mt-6">
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">Total Score</p>
              <p className="text-xl font-bold text-indigo-600">{profile.totalScore}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">Rank</p>
              <p className="text-xl font-bold text-purple-600">{profile.rank}</p>
            </div>
          </div>

          <button
            onClick={fetchProfile}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
