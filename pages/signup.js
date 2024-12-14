import React, { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logic to handle user registration
    // Save the user details to your backend or local storage
    // Redirect to login or home page upon success
    alert("Account created successfully!");
    router.push("/login");
  };

  return (
    <div>
      <h2>Create an Account</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
