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
  const isStudent = user?.userType === "student";
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
      <div className="flex items-center justify-center min-h-[80vh] bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin"></div>
          <p className="text-sm font-semibold text-text-secondary">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
        <header className="mb-10 max-w-3xl mx-auto">
          <div className="inline-block mb-6 px-3 py-1 rounded bg-surface border border-border text-text-secondary text-[11px] font-bold uppercase tracking-widest shadow-sm">
            {isStudent ? "For Ambitious Students" : "For Industry Leaders"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary leading-tight">
            {content.headline}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary font-medium max-w-2xl mx-auto">
            {content.subtext}
          </p>
        </header>

        <main className="w-full max-w-3xl">
          {/* Quote display container */}
          <div className="relative w-full h-56 mx-auto mb-10 bg-surface border border-border rounded p-8 shadow-sm flex items-center justify-center">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-surface-hover border border-border rounded flex items-center justify-center">
              <span className="text-xl font-serif text-text-secondary leading-none">
                "
              </span>
            </div>

            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <blockquote className="text-lg md:text-xl font-medium text-text-primary mb-4 italic">
                  {quote.text}
                </blockquote>
                <div className="flex items-center gap-2">
                  <div className="h-px w-6 bg-border"></div>
                  <cite className="text-xs font-bold uppercase tracking-widest text-text-secondary not-italic">
                    {quote.author}
                  </cite>
                  <div className="h-px w-6 bg-border"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={content.to}
              className="group relative inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white py-2.5 px-8 text-sm font-bold rounded transition-colors w-full sm:w-auto focus:outline-none"
            >
              <span className="flex items-center gap-2">
                {content.cta}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </span>
            </Link>

            {!user && (
              <Link
                to="/search/mentors"
                className="inline-flex items-center justify-center bg-surface hover:bg-surface-hover text-text-primary py-2.5 px-8 text-sm font-bold rounded border border-border transition-colors w-full sm:w-auto focus:outline-none"
              >
                Explore Network
              </Link>
            )}
          </div>
        </main>
    </div>
  );
}
