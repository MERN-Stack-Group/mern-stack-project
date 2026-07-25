import { useState } from "react";

function Signup() {
    const [role, setRole] = useState("");
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.placeholder]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(role);
    };

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

      <form onSubmit={handleSubmit}>
        {role === "mentor" && (
            <>
            <input placeholder="Name" onChange={handleChange}/>
            <input placeholder="NIC" onChange={handleChange}/>
            <input placeholder="University" onChange={handleChange}/>
            </>
        )}
        
        <input placeholder="Email" onChange={handleChange}/>

        <input placeholder="Password" type="password" onChange={handleChange}/>

        <button type="submit">
        Sign Up
        </button>
        <p>{JSON.stringify(formData)}</p>
        </form>
        
    </div>
  );
}

export default Signup;