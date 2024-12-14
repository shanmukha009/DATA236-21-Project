import React, { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // No validation needed for username and password
    // Store user login status in localStorage (if needed)
    localStorage.setItem("user", username);

    // Redirect to the homepage
    router.push("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username" // Changed placeholder to "Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Changed to use username
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Create one</a>
      </p>
    </div>
  );
};

export default Login;
