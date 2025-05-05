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
import CustomerTable from "../tables/CustomerTable";

const CustomerPage = () => {
  return <CustomerTable />;
};

export default CustomerPage;
