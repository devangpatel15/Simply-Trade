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
  return <UserTable />;
};

export default UserPage;
