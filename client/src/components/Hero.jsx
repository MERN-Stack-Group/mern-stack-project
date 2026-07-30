function Hero() {
    return (
        <section className="text-center px-10 py-20">

            <p className="text-sm tracking-widest">
                UNIVERSITY ALUMNI & MENTORSHIP NETWORK
            </p>

            <h1 className="text-5xl font-bold mt-6">
                Bridging the gap between <br />
                student ambition and professional mastery.
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg">
                "Current students on one bank, seniors & alumni on the other —
                mentorship as the crossing."
            </p>
            <div className="flex justify-center gap-5 mt-10">

                <button className="px-8 py-3 rounded-xl bg-black text-white">
                    Joing GradBridge
                </button>

                <button className="px-8 py-3 rounded-xl border">
                    Log In
                </button>
            </div>
        </section>
    );
}

export default Hero;