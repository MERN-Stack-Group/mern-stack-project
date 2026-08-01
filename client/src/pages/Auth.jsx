import { useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";

function Auth() {

  const [showSignup, setShowSignup] = useState(true);

  return (
    <div>

      {showSignup ? (
        <Signup 
          switchToSignin={() => setShowSignup(false)}
        />
      ) : (
        <Signin
          switchToSignup={() => setShowSignup(true)}
        />
      )}

    </div>
  );
}

export default Auth;