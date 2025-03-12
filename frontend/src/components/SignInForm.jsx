import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/userLogIn",
        formData
      );

      // Assuming the API returns a token
      const token = response.data.token;
      localStorage.setItem("token", token); // Store token for authentication

      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard"; // Redirect after login
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        padding: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" textAlign="center" sx={{ color: " #4C2D85" }}>
        Sign In
      </Typography>
      <Typography
        variant="body2"
        textAlign="center"
        color="textSecondary"
        gutterBottom
      >
        Welcome back! Please enter your credentials.
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          }
          label="Remember Me"
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Sign In
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <a href="/signup" style={{ textDecoration: "none", color: "#3f51b5" }}>
          Sign Up
        </a>
      </Typography>
    </Box>
  );
};

export default SigninForm;
