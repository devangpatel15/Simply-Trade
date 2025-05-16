import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { getProfitLoss } from "../apis/ProfitLossApi";

const DashboardPage = () => {
  const [loggedUserData, setLoggedUserData] = useState({});
  const [profitLoss, setProfitLoss] = useState([]);
  const [overAllData, setOverAllData] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("role");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setLoggedUserData(parsedData || {});
    }
  }, []);

  const callApi = async () => {
    try {
      const response = await getProfitLoss();
      setProfitLoss(response.data.individualDetails);
      setOverAllData(response.data.overall);
    } catch (error) {
      console.error("Error fetching organization branch data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <Grid container spacing={2}>
      {/* First Card */}
      <Grid item xs={12} sm={6} md={3}>
        <Box
          sx={{
            backgroundColor: "#AFF2D2",
            borderRadius: 2,
            p: 2,
            height: 120,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Icon */}
          <Box
            sx={{
              position: "absolute",
              right: 8,
              fontSize: 100,
              color: "rgba(0, 128, 0, 0.1)",
            }}
          >
            <ShoppingCartIcon fontSize="inherit" />
          </Box>

          {/* Foreground Icon & Amount */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <ShoppingCartIcon sx={{ color: "green", fontSize: 30 }} />
            <Typography
              variant="h6"
              sx={{ color: "green", fontWeight: "bold", marginTop: 2 }}
            >
              Stock : ₹ {overAllData.totalAmount}
            </Typography>
          </Box>
        </Box>
      </Grid>
      {/* second card */}
      <Grid item xs={12} sm={6} md={3}>
        <Box
          sx={{
            backgroundColor: "#F2AFB0",
            borderRadius: 2,
            p: 2,
            height: 120,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Icon */}
          <Box
            sx={{
              position: "absolute",
              right: 8,
              fontSize: 100,
              color: "rgba(205, 87, 69, 0.1)",
            }}
          >
            <StorefrontRoundedIcon fontSize="inherit" />
          </Box>

          {/* Foreground Icon & Amount */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <StorefrontRoundedIcon sx={{ color: "#EF6F71", fontSize: 30 }} />
            <Typography
              variant="h6"
              sx={{ color: "#EF6F71", fontWeight: "bold", marginTop: 2 }}
            >
              Sell : ₹ {overAllData.totalSellingAmount}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
