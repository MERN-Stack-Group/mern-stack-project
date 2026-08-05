import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { Link } from "react-router-dom";

// Content definitions for student and alumni roles
const studentData = {
  headline: "Step Into the Arena",
  subtext: "Find your path, forge connections, and take what's yours.",
  cta: "Get Hunting",
  to: "/search/mentorships",
  quotes: [
    {
      text: "He who has a why to live for can bear almost any how.",
      author: "Friedrich Nietzsche",
    },
    {
      text: "Do not pray for an easy life, pray for the strength to endure a difficult one.",
      author: "Bruce Lee",
    },
    {
      text: "It is not the critic who counts... The credit belongs to the man who is actually in the arena.",
      author: "Theodore Roosevelt",
    },
    { text: "Fortune favors the bold.", author: "Virgil" },
    {
      text: "I am the master of my fate, I am the captain of my soul.",
      author: "William Ernest Henley",
    },
    {
      text: "The future belongs to those who learn more skills and combine them in creative ways.",
      author: "Robert Greene",
    },
    {
      text: "A ship in harbor is safe, but that is not what ships are built for.",
      author: "John A. Shedd",
    },
    {
      text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
      author: "William Butler Yeats",
    },
    {
      text: "We suffer more often in imagination than in reality.",
      author: "Seneca",
    },
    {
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    },
    {
      text: "He who conquers himself is the mightiest warrior.",
      author: "Confucius",
    },
  ],
};

const alumniData = {
  headline: "Build Your Legacy",
  subtext: "Guide the next generation and find elite talent for your network.",
  cta: "Make an Impact",
  to: "mentor-dashboard",
  quotes: [
    {
      text: "The impediment to action advances action. What stands in the way becomes the way.",
      author: "Marcus Aurelius",
    },
    { text: "Discipline equals freedom.", author: "Jocko Willink" },
    {
      text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Will Durant",
    },
    {
      text: "If your actions inspire others to dream more, learn more, do more and become more, you are a leader.",
      author: "John Quincy Adams",
    },
    {
      text: "The supreme art of war is to subdue the enemy without fighting.",
      author: "Sun Tzu",
    },
    {
      text: "Mastering others is strength. Mastering yourself is true power.",
      author: "Lao Tzu",
    },
    {
      text: "Leadership is the capacity to translate vision into reality.",
      author: "Warren Bennis",
    },
    {
      text: "Example is not the main thing in influencing others. It is the only thing.",
      author: "Albert Schweitzer",
    },
    {
      text: "To handle yourself, use your head; to handle others, use your heart.",
      author: "Eleanor Roosevelt",
    },
    {
      text: "Great leaders are almost always great simplifiers, who can cut through argument, debate, and doubt to offer a solution everybody can understand.",
      author: "Colin Powell",
    },
  ],
};

export default function Home() {
  const { user, loading } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isStudent = user?.role?.includes("student");
  const content = isStudent ? studentData : alumniData;
  const quotes = content.quotes;

  // Rotate quotes every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 12000);

    // Clear interval on unmount
    return () => clearInterval(timer);
  }, [quotes.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 dark:bg-gray-950">
        <p className="text-xl font-bold text-gray-500 dark:text-gray-400 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8 font-sans bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 drop-shadow-sm">
          {content.headline}
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
          {content.subtext}
        </p>
      </header>

      <main className="w-full max-w-2xl">
        {/* Quote display container */}
        <div className="relative w-full h-48 mx-auto mb-12">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <blockquote className="text-2xl font-semibold italic text-gray-800 dark:text-gray-100 mb-4 drop-shadow-md">
                "{quote.text}"
              </blockquote>
              <cite className="text-base font-bold uppercase text-indigo-600 dark:text-indigo-400 not-italic tracking-wider">
                — <u>{quote.author}</u>
              </cite>
            </div>
          ))}
        </div>

        <Link
          to={content.to}
          className="bg-black dark:bg-white text-white dark:text-black py-4 px-10 text-lg font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] dark:hover:shadow-[0_0_20px_rgba(129,140,248,0.6)]"
        >
          {content.cta}
        </Link>
      </main>
    </div>
  );
}
