import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DialogBox from "../components/DialogBox";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import ModelTable from "../tables/ModelTable";

const ModelPage = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpen = (data) => {
    setData(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return <ModelTable />;
};

export default ModelPage;
