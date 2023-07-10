import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("User at login", currentUser);
    if (currentUser) navigate("/posts");
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const existingData = JSON.parse(localStorage.getItem("User")) || [];
    const currentUser = existingData.filter(
      (user) => user.email === email && user.password === password
    );
    if (currentUser?.length !== 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser[0]));
      navigate("/posts");
      return;
    }

    console.log("Invalid email or Password");
    alert("Invalid email or password");
    setEmail("");
    setPassword("");
    emailRef.current.focus();
  };

  return (
    <div>
      <div className="login">
        <form className="form" onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your email"
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Your password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
