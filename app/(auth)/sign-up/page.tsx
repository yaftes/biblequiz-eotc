'use client';

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Welcome, ${data.email}!`);
      } else {
        setMessage(data.error || "Sign up failed");
      }
    } catch (err) {
      setMessage("An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-amber-900 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">
        <h1 className="text-4xl font-extrabold mb-6 text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border border-white rounded-lg bg-amber-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-white rounded-lg bg-amber-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border border-white rounded-lg bg-amber-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          onClick={handleSignUp}
          className="w-full py-3 bg-white text-amber-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition mb-4"
        >
          Sign Up
        </button>

        {message && (
          <p className="text-center text-red-300 mb-4">{message}</p>
        )}

        <p className="text-center text-white">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
