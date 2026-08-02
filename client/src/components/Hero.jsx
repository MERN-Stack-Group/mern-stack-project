{
  /*Student home page & Alumni Home page */
}

import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-10">
      <div className="text-center max-w-4xl">
        <p className="text-[#7E8C54] tracking-[0.3em] text-sm font-semibold">
          UNIVERSITY ALUMNI & MENTORSHIP NETWORK
        </p>

        <h1 className="text-5xl md:text-6xl font-bold text-[#F5F1EA] mt-6 leading-tight">
          Bridging the gap between
          <span className="text-[#7E8C54]"> student ambition</span> and
          professional mastery.
        </h1>

        <p className="text-[#B8B0A8] mt-6 max-w-3xl mx-auto text-lg">
          Current students on one bank, seniors & alumni on the other —
          mentorship as the crossing.
        </p>

        <div className="flex justify-center gap-5 mt-10">
          <Link
            to="/signup"
            className="bg-[#7E8C54] hover:bg-[#8E9E84] px-8 py-3 rounded-xl text-[#F5F1EA] transition"
          >
            Join GradBridge
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
