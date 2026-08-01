import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, role }) {
    return (
        <nav className="flex justify-between items-center px-10 py-6 bg-[#0c0a0a] border-b border-[#4A433E]">

            <div>
                {/*CHANGE!!!*/}
                <Link to="/" className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#7E8C54] flex items-center justify-center">
                <span className="font-bold text-[#F5F1EA]">GB</span></div>
                <h1 className="text-2xl font-bold text-[#F5F1EA]">
                    GradBridge
                    </h1>
                </Link>
            </div>


            <div className="flex gap-5 items-center">
                {/*Guess NAvbar*/}
                {!isLoggedIn && (
                    <>
                        <Link
                            to="/signin"
                            className="px-5 py-2 rounded-lg border text-[#F5F1EA] hover:text-[#8E9E84] transition">
                            Log In
                        </Link>

                        <Link to="/signup" className="px-5 py-2 rounded-lg bg-[#7E8C54] hover:bg-[#8E9E84] text-[#F5F1EA] transition">
                            Register
                        </Link>
                    </>
                )}

                {/*Student navbar */}
                {isLoggedIn && role === "student" && (
                    <>
                        <Link className="text-[#F5F1EA]">
                            Discover Mentors
                        </Link>

                        <Link className="text-[#F5F1EA]">
                            Mentorships
                        </Link>

                        <Link className="text-[#F5F1EA]">
                            Opportunities
                        </Link>

                        <Link className="text-[#F5F1EA]">
                            Saved
                        </Link>


                        <span className="text-[#B8B0A8]">
                            Role: Student
                        </span>
                    </>
                )}

                {/*Alumni Navbar */}
                {isLoggedIn && role === "alumni" && (
                    <>
                        <Link className="text-[#F5F1EA]">
                            Requests
                        </Link>

                        <Link className="text-[#F5F1EA]">
                            My Mentees
                        </Link>

                        <Link className="text-[#F5F1EA]">
                            Opportunities
                        </Link>


                        <span className="text-[#B8B0A8]">
                            Role: Alumni
                        </span>
                    </>
                )}

            </div>
        </nav >
    );
}

export default Navbar;