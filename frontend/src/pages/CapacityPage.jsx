import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DialogBox from "../components/DialogBox";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import { getAllCapacity } from "../apis/CapacityApi";

const CapacityPage = () => {
  const [capacity, setCapacity] = useState([]);

  const callApi = async () => {
    const response = await getAllCapacity();
    setCapacity(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpen = (data) => {
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
              CAPACITY
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
                to="/capacityForm"
              >
                Add Capacity
              </Button>
            </Box>
          </Box>

          {capacity &&
            capacity.map((capacity) => {
              return (
                <Box
                  key={capacity._id}
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
                        {capacity.capacityName}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "green", fontWeight: "bold" }}
                        >
                          DeviceName:{" "}
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {capacity?.deviceId?.deviceName}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "brown", fontWeight: "bold" }}
                        >
                          BranchName:{" "}
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {capacity?.branchName?.branchName}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <IconButton
                    sx={{ backgroundColor: "#f5f5f5" }}
                    onClick={() => handleOpen(capacity)}
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
            fieldName="capacityForm"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CapacityPage;
