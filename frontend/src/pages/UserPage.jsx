import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrganizationForm from "../components/OrganizationForm";
import { Link } from "react-router-dom";
import moment from "moment";
import DialogBox from "../components/DialogBox";
import { getAllUsers } from "../apis/UserApi";
import UserTable from "../tables/UserTable";

const UserPage = () => {
  const [userData, setUserData] = useState([]);

  const callApi = async () => {
    const response = await getAllUsers();
    console.log(response.data.data);
    setUserData(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  console.log(userData)
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpen = (data) => {
    console.log(data);
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
              Users
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
                to="/userForm"
              >
                Add User
              </Button>
            </Box>
          </Box>

          <UserTable userData={userData} callApi={callApi}/>
          {/* {userData &&
            userData.map((user) => {
              return (
                <Box
                  key={user._id}
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
                        {user.name}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "green", fontWeight: "bold" }}
                        >
                          Organization Name:{" "}
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {user.organization?.organizationName}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "brown", fontWeight: "bold" }}
                        >
                          Branch Name:{" "}
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {user.orgBranch?.branchName}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "brown", fontWeight: "bold" }}
                        >
                          Email :{" "}
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {user.email}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <IconButton
                    sx={{ backgroundColor: "#f5f5f5" }}
                    onClick={() => handleOpen(user)}
                  >
                    <VisibilityIcon sx={{ color: "#6c5ce7" }} />
                  </IconButton>
                </Box>
              );
            })} */}

          <DialogBox
            handleClose={handleClose}
            open={open}
            data={data}
            callApi={callApi}
            fieldName="userForm"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
