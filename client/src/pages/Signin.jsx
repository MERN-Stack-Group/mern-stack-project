import {Link, useNavigate} from "react-router-dom";

function Signin({ setIsLoggedIn, setRole }) {
  const navigate = useNavigate();
   function handleLogin(e) {
        e.preventDefault();
        // temporary testing login
        setIsLoggedIn(true);
        // change this to test different navbars
        setRole("student");

        navigate("/");
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0d0b] gap-6">
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
    <div className="bg-[#24201D] w-full max-w-md p-8 rounded-2xl shadow-xl border border-stone-800">
      <h1 className="text-3xl font-bold text-[#F5F1EA] text-center">
        GradBridge
        </h1>

      <h2 className="text-xl text-center mt-2 text-[#B8B0A8]">
        Student Mentorship & Alumni Network
        </h2>

        <p className="text-center mt-2 text-[#B8B0A8]"> 
            Welcome Back!
        </p>

        <form 
        onSubmit={handleLogin}
        className="flex flex-col gap-3 mt-6">

      <input required className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500"
      placeholder="Email" />

      <input required className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Password" type="password"
      />

      <button type="submit" className="bg-[#7E8C54] hover:bg-[#8E9E84] text-white p-3 rounded-lg mt-3 transition">
        Sign In
      </button>

      <p className="text-center text-[#B8B0A8] mt-4">
        Don't have an account?

        <Link 
    to="/signup"
    className="text-[#7E8C54] ml-2"
>
    Sign Up
</Link>
      </p>

        </form>
    </div>
    </div>
  );
}

export default Signin;