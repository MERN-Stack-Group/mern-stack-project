import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-10 py-6">

        <div>
            {/*CHANGE!!!*/}
            <h1 className="text-2xl font-bold text-[#F5F1EA]">
                GB <span className="font-normal"> GradBridge</span>
            </h1>
        </div>


            <div className="flex gap-4">

                <Link 
                to="/signin" 
                className="px-5 py-2 rounded-lg border text-[#F5F1EA] hover:text-[#8E9E84] transition">
                    Log In
                </Link>

                <Link to="/signup" className="px-5 py-2 rounded-lg bg-[#7E8C54] hover:bg-[#8E9E84] text-[#F5F1EA] transition">
                    Register
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;