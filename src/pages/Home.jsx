import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Handle login (simulating token storage in localStorage)
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="home-container"
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "50px",
        textAlign: "center",
      }}
    >
      <h1>Welcome to the Home Page</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Home;
