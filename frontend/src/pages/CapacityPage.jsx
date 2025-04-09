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
import CapacityTable from "../tables/CapacityTable";

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
   

          <CapacityTable capacity = {capacity} callApi = {callApi}/>

         
  );
};

export default CapacityPage;
