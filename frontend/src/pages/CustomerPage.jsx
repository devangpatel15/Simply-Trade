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
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import image from "../assets/Rectangle 1900.png";
import { deleteCustomer, getAllCustomer } from "../apis/CustomerApi";
import DeleteDialog from "../components/DeleteDialog";

const CustomerPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [customer, setCustomer] = useState([]);
  const [customerId, setCustomerId] = useState("");

  const navigate = useNavigate();

  const callApi = async () => {
    const response = await getAllCustomer();
    console.log("RESPONSE==", response.data.data);
    setCustomer(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCustomerId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteOpen(false);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDeleteDialog = () => {
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    await deleteCustomer(customerId);
    // navigate("/customerPage");
    setDeleteOpen(false);
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {customer &&
              customer.map((option, index) => {
                return (
                  <>
                    <Card
                      sx={{
                        width: 230,
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
                            onClick={(event) => handleClick(event, option._id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>

                        {/* Branch Name */}
                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight="bold"
                        >
                          {option.branchName.branchName}
                        </Typography>

                        {/* Customer Name */}
                        <Box sx={{ mt: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            display="inline"
                          >
                            Name:{" "}
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
                            Phone:{" "}
                          </Typography>
                          <Typography variant="body2" display="inline">
                            {option.customerPhone}
                          </Typography>
                        </Box>

                        {/* Dropdown Menu */}
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          sx={{ padding: 0 }}
                        >
                          <MenuItem
                            sx={{ p: 0 }}
                            onClick={() =>
                              navigate(`/customerForm/${customerId}`)
                            }
                          >
                            <EditIcon
                              sx={{ mr: 1, p: 0, m: 0, color: "green" }}
                            />
                          </MenuItem>
                          <MenuItem
                            onClick={() => openDeleteDialog()}
                            sx={{ color: "red", p: 0 }}
                          >
                            <DeleteIcon
                              sx={{ mr: 1, color: "red", p: 0, m: 0 }}
                            />
                          </MenuItem>
                        </Menu>
                      </CardContent>
                    </Card>
                    <DeleteDialog
                      deleteOpen={deleteOpen}
                      handleClose={handleClose}
                      handleDelete={handleDelete}
                      closeDeleteDialog={closeDeleteDialog}
                    />
                  </>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerPage;
