import { useState } from "react";

function Signup() {
    const [role, setRole] = useState("");
  return (
    <div>
      <h1>GradBridge Signup Page</h1>
      <h2>Create Account</h2>

      <p>Select your role:</p>

      <button onClick={() => setRole("alumni")}>
        Alumni
        </button>
      <button onClick={() => setRole("mentor")}>
        Mentor</button>

        <p>
            Selected role: {role}
        </p>

      <form>
        {role === "mentor" && (
            <>
            <input placeholder="Name"/>
            <input placeholder="Email"/>
            <input placeholder="University"/>
            </>
        )}
        
        <input placeholder="Email"/>
        
        <input placeholder="Password" type="password"/>

        <button type="submit">
        Sign Up
        </button>

        </form>
    </div>
  );
}

export default Signup;