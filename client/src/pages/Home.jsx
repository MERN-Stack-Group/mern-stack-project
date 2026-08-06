import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

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

  // Rotate quotes every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 14000);

    // Clear interval on unmount
    return () => clearInterval(timer);
  }, [quotes.length]);

  if (loading) {
    return <LoadingScreen fullScreen={true} message="Loading..." />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8 font-sans bg-slate-50 dark:bg-[#0b0f17] transition-colors duration-500 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <header className="mb-12 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
          {content.headline}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          {content.subtext}
        </p>
      </header>

      <main className="w-full max-w-4xl relative z-10">
        {/* Quote display container */}
        <div className="relative w-full h-56 mx-auto mb-16 bg-white/50 dark:bg-[#111622]/50 backdrop-blur-md rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl overflow-hidden flex items-center justify-center p-8">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-1000 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 z-10 scale-100 translate-y-0"
                  : "opacity-0 z-0 pointer-events-none scale-95 translate-y-4"
              }`}
            >
              <blockquote className="text-2xl md:text-3xl font-semibold italic text-slate-800 dark:text-slate-200 mb-6 drop-shadow-md leading-relaxed">
                "{quote.text}"
              </blockquote>
              <cite className="text-sm font-bold uppercase text-sky-600 dark:text-sky-400 not-italic tracking-widest flex items-center gap-2">
                <span className="w-8 h-px bg-sky-600 dark:bg-sky-400"></span>
                {quote.author}
                <span className="w-8 h-px bg-sky-600 dark:bg-sky-400"></span>
              </cite>
            </div>
          ))}
        </div>

        <Link
          to={content.to}
          className="inline-flex items-center justify-center bg-sky-600 text-white py-4 px-12 text-lg font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
        >
          {content.cta}
        </Link>
      </main>
    </div>
  );
}
