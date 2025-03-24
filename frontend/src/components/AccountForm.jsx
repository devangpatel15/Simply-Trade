import React from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AccountForm = () => {
  const navigate = useNavigate();
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
              ACCOUNT
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: "#6c5ce7",
                borderColor: "#6c5ce7",
                textTransform: "none",
              }}
              component={Link}
              to="/accountForm"
            >
              Add Account
            </Button>
          </Box>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Organization"
                variant="outlined"
              >
                <MenuItem value={"org1"}>Organization 1</MenuItem>
                <MenuItem value={"org2"}>Organization 2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth select label="Branch" variant="outlined">
                <MenuItem value={"branch1"}>Branch 1</MenuItem>
                <MenuItem value={"branch2"}>Branch 2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter Account Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter Balance"
                variant="outlined"
                type="number"
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 2 }}
              onClick={() => navigate("/accountPage")}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountForm;
