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
              {/* <TextField
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
              /> */}
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
          <OrganizationTable />
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizationPage;
