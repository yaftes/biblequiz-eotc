'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

type Quiz = {
  id: string;
  question: string;
  choices: string[];
  hint?: string;
  category: string;
  isAnswered: boolean;
};

type SubmitResult = {
  correct: boolean;
};

export default function QuizPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [resultMap, setResultMap] = useState<Record<string, SubmitResult>>({});

  const categories = ["all", "Old Testament", "New Testament", "Characters", "Places", "Events"];

  const fetchQuizzes = async (cat?: string) => {
    setLoading(true);
    try {
      const url = `/api/quiz${cat && cat !== "all" ? `?category=${cat}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setQuizzes(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes(category);
  }, [category]);

  const handleSubmit = async (quizId: string, choice: string) => {
    setSubmittingId(quizId);
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, answers: choice }),
      });
      const data = await res.json();
      if (data.success) {
        setResultMap((prev) => ({ ...prev, [quizId]: data.data }));
        setQuizzes((prev) =>
          prev.map((q) =>
            q.id === quizId ? { ...q, isAnswered: true } : q
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Biblical Quizzes</h1>
          <div className="flex items-center gap-4">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm hover:border-indigo-400 transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={() => router.push("/profile")}
              className="text-gray-700 hover:text-indigo-600 transition transform hover:scale-110"
              title="Go to Profile"
            >
              <FaUserCircle size={30} />
            </button>
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">Loading quizzes...</p>
        )}

        <div className="space-y-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{quiz.question}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quiz.choices.map((choice) => {
                  const result = resultMap[quiz.id];
                  const isSelected = quiz.isAnswered && result?.correct;
                  return (
                    <button
                      key={choice}
                      onClick={() => handleSubmit(quiz.id, choice)}
                      disabled={quiz.isAnswered || submittingId === quiz.id}
                      className={`px-4 py-2 rounded-lg font-medium transition 
                        ${isSelected ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
                        ${submittingId === quiz.id ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
              {quiz.hint && !quiz.isAnswered && (
                <p className="mt-2 text-gray-400 italic text-sm">Hint: {quiz.hint}</p>
              )}
              {quiz.isAnswered && (
                <p className={`mt-2 font-medium ${resultMap[quiz.id]?.correct ? "text-green-600" : "text-red-600"}`}>
                  {resultMap[quiz.id]?.correct ? "✅ Correct!" : "❌ Wrong! Try again."}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
