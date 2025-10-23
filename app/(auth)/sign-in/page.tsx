'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignInPage() {


  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleSignIn = async () => {

    try {

      setMessage("");
      setLoading(true);

      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/quiz')
      } else {
        setMessage(data.error || "Sign in failed");
      }
    } catch (err) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-yellow-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-extrabold text-yellow-800 mb-6 text-center">
          Sign In
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-800 font-semibold"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleSignIn}
          disabled={loading}
          className={`w-full py-3 text-white font-bold rounded-full shadow-lg mb-4 transition transform ${
            loading
              ? "bg-yellow-500 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-800 to-yellow-600 hover:scale-105"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <p className="text-center text-gray-700">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-yellow-800 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
