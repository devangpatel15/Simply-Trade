import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { SketchPicker } from "react-color";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Link } from "react-router-dom";

function ColorForm() {
  const [color, setColor] = useState("#fff"); // Initial color
  const [openPicker, setOpenPicker] = useState(false); // State to toggle the color picker visibility

  // Handler when the color is selected
  const handleColorChange = (color) => {
    setColor(color.hex); // Update state with selected color
  };

  return (
    <Box sx={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box
          sx={{
            padding: 3,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#6c5ce7" }}
          >
            COLOR
          </Typography>

          {/* Button to toggle the color picker */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenPicker(!openPicker)}
          >
            {openPicker ? "Close Picker" : "Open Picker"}
          </Button>

          {/* Conditional rendering of the color picker */}
          {openPicker && (
            <Box sx={{ marginTop: 2 }}>
              <SketchPicker
                color={color}
                onChangeComplete={handleColorChange}
              />
            </Box>
          )}

          {/* Display selected color */}
          <Box
            sx={{
              marginTop: 4,
              padding: "20px",
              backgroundColor: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              color: "white",
            }}
          >
            <Typography variant="h6">Selected Color</Typography>
          </Box>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="error"
              component={Link}
              to="/colorPage"
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Add
            </Button>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default ColorForm;
