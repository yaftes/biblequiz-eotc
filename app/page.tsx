import Link from 'next/link';
import React from 'react';
import { FaBook, FaStar, FaChartLine, FaUsers } from 'react-icons/fa';

const features = [
  {
    icon: <FaBook className="text-4xl mb-4" />,
    title: 'Engaging Quizzes',
    description: 'Test your knowledge with fun and interactive Bible quizzes.',
  },
  {
    icon: <FaStar className="text-4xl mb-4" />,
    title: 'Track Progress',
    description: 'Keep track of your scores and improvement over time.',
  },
  {
    icon: <FaChartLine className="text-4xl mb-4" />,
    title: 'Learn & Grow',
    description: 'Expand your knowledge of the Bible while having fun.',
  },
  {
    icon: <FaUsers className="text-4xl mb-4" />,
    title: 'Share with Friends',
    description: 'Challenge your friends and see who knows the Bible best!',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-amber-100 flex flex-col items-center text-center p-8">

      <header className="mb-16">
        <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-800">
          Bible Quiz
        </h1>
        <p className="text-2xl mb-8 text-gray-800">
          Test your knowledge and grow in faith with fun quizzes!
        </p>
      </header>

      <main className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-8 shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center text-yellow-800">
              {feature.icon}
              <h3 className="text-2xl font-semibold mb-2 mt-2">{feature.title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </main>

      <footer className="mt-16 text-center">
        <p className="text-gray-700 mb-4">Ready to test your Bible knowledge?</p>
        <Link href={'/sign-in'}>
          <button className="bg-gradient-to-r from-yellow-800 to-yellow-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transform transition">
            Start Quiz
          </button>
        </Link>
        
        <p className="mt-8 text-gray-600">© 2025 Bible Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
