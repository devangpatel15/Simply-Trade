import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardPage = () => {
  const [loggedUserData, setLoggedUserData] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("role");

    if (userData) {
      const parsedData = JSON.parse(userData);

      setLoggedUserData(parsedData || {});
    }
  }, []);
  return (
    <Box sx={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box sx={{ textAlign: "center", fontSize: "1.5rem" }}>
          Welcome To {loggedUserData.role} Panel
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
