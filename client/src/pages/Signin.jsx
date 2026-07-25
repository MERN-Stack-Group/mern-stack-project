function Signin({ switchToSignup }) {
  return (
    <div>
      <h1>GradBridge</h1>

      <h2>Welcome Back</h2>

      <input placeholder="Email" />

      <input 
        placeholder="Password"
        type="password"
      />

      <button>
        Sign In
      </button>

      <p>
        Don't have an account?

        <button onClick={switchToSignup}>
          Sign Up
        </button>
      </p>

    </div>
  );
}

export default Signin;