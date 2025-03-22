import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import image from "../assets/Rectangle 1900.png";
import { getAllCustomer } from "../apis/CustomerApi";

const CustomerPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [customer, setCustomer] = useState([]);

  const callApi = async () => {
    const response = await getAllCustomer();
    console.log("RESPONSE", response.data.data);
    setCustomer(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box sx={{ padding: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#6c5ce7" }}
            >
              Customer
            </Typography>
            <Box display="flex" gap={2}>
              <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                sx={{ backgroundColor: "white", borderRadius: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#6c5ce7" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                sx={{
                  color: "#6c5ce7",
                  borderColor: "#6c5ce7",
                  textTransform: "none",
                }}
                component={Link}
                to="/customerForm"
              >
                Add Customer
              </Button>
            </Box>
          </Box>

          {customer &&
            customer.map((option) => {
              return (
                <Card
                  sx={{
                    width: 250,
                    borderRadius: 2,
                    boxShadow: 3,
                    m: 1,
                    p: 1,
                    height: 285,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="business logo"
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                      >
                        Icon Emporia
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          display="inline"
                        >
                          Name
                        </Typography>
                        <Typography variant="body2" display="inline">
                          {option.customerName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          display="inline"
                        >
                          Phone:{" "}
                        </Typography>
                        <Typography variant="body2" display="inline">
                          {option.customerPhone}
                        </Typography>
                      </Box>
                    </Box>

                    {/* More Icon Button with Dropdown */}
                    <IconButton
                      size="small"
                      onClick={handleClick}
                      disableRipple
                      sx={{ padding: 0 }}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={handleClose}
                        sx={{
                          padding: 0,
                          backgroundColor: "transparent",
                        }}
                      >
                        <EditIcon sx={{ color: "black" }} />
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        sx={{
                          color: "red",
                          padding: 0,
                          backgroundColor: "transparent",
                        }}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </MenuItem>
                    </Menu>
                  </CardContent>
                </Card>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerPage;
