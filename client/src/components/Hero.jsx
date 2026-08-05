import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-4xl">
        <p className="text-primary tracking-widest text-xs font-bold uppercase mb-4">
          University Alumni & Mentorship Network
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
          Bridging the gap between
          <span className="text-primary"> student ambition</span> and
          professional mastery.
        </h1>

        <p className="text-text-secondary mt-6 max-w-2xl mx-auto text-base leading-relaxed">
          Current students on one bank, seniors & alumni on the other —
          mentorship as the crossing.
        </p>

        <div className="flex justify-center mt-10">
          <Link
            to="/signup"
            className="bg-primary hover:bg-primary-hover px-6 py-3 rounded text-sm font-medium text-white transition-colors focus:outline-none border border-transparent"
          >
            Join GradBridge
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
