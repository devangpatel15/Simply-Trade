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

  //

  //
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //     }
  //   }

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
        {loggedUserData.organization?.organizationName && (
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              fontSize: "2rem",
              gap: "3rem",
              marginTop: "2rem",
            }}
          >
            <Stack>
              Organization : {loggedUserData.organization?.organizationName}
            </Stack>
            <Stack>Branch Name : {loggedUserData.orgBranch?.branchName}</Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
