import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Container, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Handle login (simulating token storage in localStorage)
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: "white",
          boxShadow: 3,
          maxWidth: 500,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🚧 Coming Soon!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Something incredible is on the way! 🚀 We're working tirelessly to
          bring you an amazing experience. Stay tuned for the big reveal! In the
          meantime, check out the Login and explore the Dashboard.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
