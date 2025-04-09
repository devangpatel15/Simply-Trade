import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import { useEffect, useState } from "react";
import { getAllDevice } from "../apis/DeviceApi";
import DeviceTable from "../tables/DeviceTable";

const DevicePage = () => {
 

  return (
    

          <DeviceTable />

          
  );
};

export default DevicePage;
