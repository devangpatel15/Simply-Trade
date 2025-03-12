import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import userImage from "../assets/Ellipse 2332.png";
import moment from "moment";

const Header = () => {
  const formattedDate = moment().format("DD MMM. YYYY");

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: 1,
        paddingX: 2,
        zIndex: 1100, // Ensures it stays above other elements
        top: 0,
        width: "100%",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Organizations
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            color="inherit"
            sx={{ border: "1px solid #ddd", borderRadius: "50%" }}
          >
            <NotificationsIcon sx={{ color: "#5C4E89" }} />
          </IconButton>
          <Button
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderColor: "#5C4E89",
              color: "#6c5ce7",
              textTransform: "none",
            }}
          >
            <CalendarMonthIcon sx={{ color: "#5C4E89" }} />
            {formattedDate}
          </Button>
          <Button
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              borderColor: "#ddd",
              color: "black",
              textTransform: "none",
              padding: "5px 10px",
            }}
          >
            <Box>
              <Typography variant="body2">Welcome</Typography>
              <Typography variant="body2" fontWeight="bold" color=" #5C4E89">
                Rushit!
              </Typography>
            </Box>
            <Avatar src={userImage} sx={{ width: 32, height: 32 }} />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// Ensure the main content has a top margin equal to AppBar's height
export const headerHeight = 64;
