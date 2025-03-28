import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import image from "../assets/Rectangle 1900.png";
import { getAllStocks } from "../apis/StockApi";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Home = () => {
  const [stocks, setStocks] = useState([]);

  const callApi = async () => {
    const response = await getAllStocks();
    console.log("RESPONSE==", response.data.data);
    setStocks(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
          Stocks
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {stocks &&
          stocks.map((option, index) => {
            return (
              <>
                <Card
                  sx={{
                    width: 280,
                    borderRadius: 2,
                    boxShadow: 3,
                    m: 1,
                    p: 1,
                  }}
                  key={index}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="business logo"
                  />
                  <CardContent
                    sx={{
                      position: "relative", // Ensures the menu button is positioned correctly
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* More Icon Button - Positioned at Top Right */}
                    <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                      <IconButton
                        size="small"
                        // onClick={(event) => handleClick(event, option._id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    {/* Branch Name */}
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {option.modelName.modelName}
                    </Typography>

                    {/* Customer Name */}
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        display="inline"
                      >
                        Customer Name:{" "}
                      </Typography>
                      <Typography variant="body2" display="inline">
                        {option.customerName}
                      </Typography>
                    </Box>

                    {/* Customer Phone */}
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        display="inline"
                      >
                        Phone Number:{" "}
                      </Typography>
                      <Typography variant="body2" display="inline">
                        {option.customerPhone}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </>
            );
          })}
      </Box>
    </Box>
  );
};

export default Home;
