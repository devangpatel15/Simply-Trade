import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrgInput from "../components/common/OrgInput";
import OrgBranchInput from "../components/common/OrgBranchInput";
import { getProfitLoss } from "../apis/ProfitLossApi";

const ProfitLoseTable = () => {
    const [profitLoss, setProfitLoss] = useState([]);
  
    const callApi = async () => {
        try {
          const response = await getProfitLoss(
          ); // +1 because API uses 1-based indexing
          console.log(response.data, "API Response");
          setProfitLoss(response.data.data); 
        } catch (error) {
          console.error("Error fetching organization branch data:", error);
        }
      };
  
       // Fetch data when pagination model changes
        useEffect(() => {
          callApi(); 
        }, []);

    const columns = [
      { field: "deviceName", headerName: "Device", flex: 2 },
      { field: "categoryId", headerName: "Category", flex: 2 },
      { field: "modelId", headerName: "Model", flex: 2 },
      { field: "organization", headerName: "Organization", flex: 2 },
      { field: "branchName", headerName: "Branch Name", flex: 2 },
    ];

  // Prepare the rows for the DataGrid
  const rows = profitLoss.map((profitLoss) => ({
    id: profitLoss._id,
    deviceName: profitLoss.deviceName,
    categoryId: profitLoss?.categoryId?.categoryName,
    modelId: profitLoss?.modelId?.modelName,
    organization: profitLoss?.organization?.organizationName,
    branchName: profitLoss?.branchName?.branchName,
  }));

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div>
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
                PROFIT AND LOSS
              </Typography>
              <Box display="flex" gap={4}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#6c5ce7",
                    borderColor: "#6c5ce7",
                    textTransform: "none",
                  }}
                  // component={Link}
                  // to="/deviceForm"
                >
                  Download PDF
                </Button>
              </Box>
            </Box>
            <Box display="flex" gap={2}>
              <Grid container spacing={2} sx={{ marginTop: 0.5 }}>
                <Grid item xs={6}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    sx={{
                      fontWeight: "bold",
                      color: "#6c5ce7",
                      padding: "0.4rem",
                    }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Profit & Loss"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Stock"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Sell"
                    />
                    <FormControlLabel
                      value="repair"
                      // disabled
                      control={<Radio />}
                      label="Repair"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Box>

            <Box display="flex" gap={2}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <OrgInput />
                </Grid>
                <Grid item xs={3}>
                  <OrgBranchInput />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    name="date"
                    // value={formData.date}
                    // onChange={handleNativeDateChange}
                    // sx={{ backgroundColor: "white", borderRadius: 1, width: "50%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    name="date"
                    // value={formData.date}
                    // onChange={handleNativeDateChange}
                    // sx={{ backgroundColor: "white", borderRadius: 1, width: "50%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default ProfitLoseTable;
