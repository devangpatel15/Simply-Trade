import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrganizationTable from "../tables/OrganizationTable";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import { allUserOrg } from "../apis/OrganizationApi";

const OrganizationPage = () => {
  return (
    
          <OrganizationTable />
      
  );
};

export default OrganizationPage;
