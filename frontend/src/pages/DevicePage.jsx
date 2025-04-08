import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import { useEffect, useState } from "react";
import { getAllDevice } from "../apis/DeviceApi";
import DeviceTable from "../tables/DeviceTable";

const DevicePage = () => {
  const [searchTerm, setSearchTerm] = useState(""); 


  // const callApi = async () => {
  //   const response = await getAllDevice();
  //   setDevice(response.data.data);
  //   setFilteredDevices(response.data.data);
  // };

  // useEffect(() => {
  //   callApi();
  // }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

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
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
              DEVICE
            </Typography>

            <Box display="flex" gap={2}>
              <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
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
                to="/deviceForm"
              >
                Add Device
              </Button>
            </Box>
          </Box>

          <DeviceTable />

          <DialogBox
            handleClose={handleClose}
            open={open}
            data={data}
            fieldName="deviceForm"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DevicePage;
