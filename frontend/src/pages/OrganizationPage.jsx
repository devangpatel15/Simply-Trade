import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Avatar,
  IconButton,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
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
import DialogBox from "../components/DialogBox";

const OrganizationPage = () => {
  const [orgData, setOrgData] = useState([]);

  const callApi = async () => {
    const response = await axios.get("http://localhost:4000/api/allUserOrg", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data.data);
    setOrgData(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpen = (data) => {
    console.log(data, "data-----");
    setData(data);
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

          <DialogBox
            handleClose={handleClose}
            open={open}
            data={data}
            callApi={callApi}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizationPage;
