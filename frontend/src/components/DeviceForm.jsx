import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Link } from "react-router-dom";

const DeviceForm = () => {
  return (
    <Box sx={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box
          sx={{
            padding: 3,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#6c5ce7" }}
          >
            MODEL
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Organization Name"
                  variant="outlined"
                  required
                >
                  <MenuItem></MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="OrganizationBranch Name"
                  variant="outlined"
                  required
                >
                  <MenuItem></MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  variant="outlined"
                  required
                >
                  <MenuItem></MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Model"
                  variant="outlined"
                  required
                >
                  <MenuItem></MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Device"
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="error"
              component={Link}
              to="/category"
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Add
            </Button>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DeviceForm;
