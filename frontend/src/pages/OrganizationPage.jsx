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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrganizationForm from "../components/OrganizationForm";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const OrganizationPage = () => {
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/allUserOrg",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.data);
        setOrgData(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  

  const [open, setOpen] = useState(false);

  const handleOpen = (data) => {
    console.log(data, "data-----");

    setOpen(true);
  };

  const handleClose = () => setOpen(false);
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
              ORGANIZATIONS
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
                to="/organizationForm"
              >
                Add Organization
              </Button>
            </Box>
          </Box>
          {/* Organization Card */}
          {orgData &&
            orgData.map((org) => {
              return (
                <Box
                  key={org._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderRadius: 10,
                    boxShadow: 1,
                    padding: 2,
                    marginTop: 3,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src="/path/to/avatar.jpg"
                      alt="User Avatar"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#6c5ce7" }}
                      >
                        {org.organizationName}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "green", fontWeight: "bold" }}
                        >
                          Created At:{" "}
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {moment(org.createdAt).format("DD-MM-YYYY")}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "brown", fontWeight: "bold" }}
                        >
                          Update At:{" "}
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {moment(org.updatedAt).format("DD-MM-YYYY")}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <IconButton
                    sx={{ backgroundColor: "#f5f5f5" }}
                    onClick={() => handleOpen(org)}
                  >
                    <VisibilityIcon sx={{ color: "#6c5ce7" }} />
                  </IconButton>
                </Box>
              );
            })}
          {/* Organization Details Dialog */}
          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle
              sx={{
                backgroundColor: " #F8F8FF",
                color: "#4C2D85",
                fontWeight: "bold",
                borderBottom: "2px solid gray",
              }}
            >
              ORGANIZATIONS
            </DialogTitle>
            <DialogContent>
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                <Typography variant="body1">
                  <b>GST IN :</b> 25AASCA8384QIZM
                </Typography>
                <Typography variant="body1">
                  <b>Primary Address :</b> Laboris Labore Numqu
                </Typography>
                <Typography variant="body1">
                  <b>Organization Name :</b> Maxwell Pate Co
                </Typography>
                <Typography variant="body1">
                  <b>Address Line 1 :</b> Irure Voluptates Com
                </Typography>
                <Typography variant="body1">
                  <b>City :</b> Ahmedabad
                </Typography>
                <Typography variant="body1">
                  <b>Address Line 2 :</b> Ea Ut Consequuntur U
                </Typography>
                <Typography variant="body1">
                  <b>District :</b> Ahmedabad
                </Typography>
                <Typography variant="body1">
                  <b>Zip Code :</b> 3800015
                </Typography>
                <Typography variant="body1">
                  <b>State :</b> Gujarat
                </Typography>
                <Typography variant="body1">
                  <b>Mobile :</b> 9601128557
                </Typography>
                <Typography variant="body1">
                  <b>Country :</b> India
                </Typography>
                <Typography variant="body1">
                  <b>Email :</b> mithilshah12@gmail.com
                </Typography>
                <Typography variant="body1">
                  <b>Company Reg. Type :</b> Collab Sof Tech
                </Typography>
                <Typography variant="body1">
                  <b>Dealing Currency :</b> Rupee's
                </Typography>
                <Typography variant="body1">
                  <b>Financial Year :</b> 2024
                </Typography>
                <Typography variant="body1">
                  <b>Default Stock Method :</b> mithilshah12@gmail.com
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="success">
                Edit
              </Button>
              <Button variant="outlined" color="error">
                Delete
              </Button>
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizationPage;
