import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <div>
                <h1>GB GradBridge</h1>
            </div>

            <div>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;