import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for email and password
    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `https://todo-app-backend-v402.onrender.com/api/user/register`,
        { name, email, password }
      );
      console.log(res);

      navigate("/login"); // Redirect to login
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const redicteToLogin = () => {
    navigate("/login");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Name Input */}
          <TextField
            label="Name"
            variant="outlined"
            type="name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Email Input */}
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error Message */}
          {error && <Typography color="error">{error}</Typography>}

          {/* Submit Button */}
          {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button> */}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>

        <Box>
          <Button
            variant="contained"
            style={{ backgroundColor: "gray", color: "#fff" }}
            sx={{
              mt: 3,
              color: "gray",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            fullWidth
            // sx={{ mt: 2 }}
            onClick={redicteToLogin}
            disabled={loading} // Disable button while loading
          >
            login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
