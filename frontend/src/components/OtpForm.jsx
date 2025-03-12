import React, { useState } from "react";
import axios from "axios";
import OtpInput from "react-otp-input";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const OtpForm = () => {
  const [otp, setOtp] = useState("");

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
        ENTER OTP
      </Typography>

      {/* <form>
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

        </form> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span style={{ width: "12px" }} />} // Increased spacing
          renderInput={(props) => (
            <input
              {...props}
              style={{
                padding: "16px",
                width: "40px", // Increased width
                height: "40px", // Increased height
                fontSize: "1.5rem", // Increased font size
                textAlign: "center",
                border: "2px solid #ccc",
                borderRadius: "8px",
              }}
            />
          )}
        />
      </Box>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Verify
      </Button>
      <Button type="submit" fullWidth sx={{ mt: 2 }}>
        Reset Otp
      </Button>
    </Box>
  );
};

export default OtpForm;
