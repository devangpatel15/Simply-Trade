import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getProfitLoss } from "../apis/ProfitLossApi";

const ProfitLoseTable = () => {
  const [profitLoss, setProfitLoss] = useState([]);
  const [overAllData, setOverAllData] = useState({});

  const callApi = async () => {
    try {
      const response = await getProfitLoss(); // +1 because API uses 1-based indexing
      setProfitLoss(response.data.individualDetails);
      setOverAllData(response.data.overall);
    } catch (error) {
      console.error("Error fetching organization branch data:", error);
    }
  };

  // Fetch data when pagination model changes
  useEffect(() => {
    callApi();
  }, []);

  const columns = [
    { field: "organization", headerName: "Organization", flex: 2 },
    { field: "branch", headerName: "Branch", flex: 2 },
    { field: "modelName", headerName: "Model", flex: 2 },
    { field: "deviceName", headerName: "Device", flex: 2 },
    { field: "totalAmount", headerName: "Product Price", flex: 2 },
    { field: "totalExpense", headerName: "Expense", flex: 2 },
    { field: "totalCost", headerName: "Total Cost", flex: 2 },
    { field: "totalSellingAmount", headerName: "Selling Amount", flex: 2 },
    { field: "profitOrLoss", headerName: "Profit/Loss", flex: 2 },
    {
      field: "status",
      headerName: "status",
      flex: 2,
      renderCell: (params) => (
        <span
          style={{
            color:
              params.value?.toLowerCase() === "profit"
                ? "green"
                : params.value?.toLowerCase() === "loss"
                ? "red"
                : "inherit",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {params.value}
        </span>
      ),
    },
  ];

  // Prepare the rows for the DataGrid
  const rows = profitLoss.map((profitLoss) => ({
    id: profitLoss._id,
    organization: profitLoss?.organization?.organizationName,
    branch: profitLoss?.branch?.branchName,
    modelName: profitLoss?.modelName?.modelName,
    deviceName: profitLoss?.deviceName?.deviceName,
    totalAmount: profitLoss.totalAmount,
    totalExpense: profitLoss?.totalExpense,
    totalCost: profitLoss?.totalCost,
    totalSellingAmount: profitLoss?.totalSellingAmount,
    profitOrLoss: profitLoss?.profitOrLoss,
    totalGeneralExpense: profitLoss?.totalGeneralExpense || "-",
    status: profitLoss?.status,
  }));

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
          PROFIT AND LOSS
        </Typography>
      </Box>

      <Box display="flex" gap={2} sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: "1.3rem",
                color: "#4C2D85",
                fontWeight: 700,
              }}
            >
              Total Product Price : {overAllData.totalAmount}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: "1.3rem",
                color: "#4C2D85",
                fontWeight: 700,
              }}
            >
              Total Expense : {overAllData.totalExpense}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: "1.3rem",
                color: "#4C2D85",
                fontWeight: 700,
              }}
            >
              Total Cost : {overAllData.totalCost}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: "1.3rem",
                color: "#4C2D85",
                fontWeight: 700,
              }}
            >
              Total Selling Amount : {overAllData.totalSellingAmount}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: "1.3rem",
                color: "#4C2D85",
                fontWeight: 700,
              }}
            >
              Total Profit Or Loss : {overAllData.profitOrLoss}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: "1.3rem",
                color: "#4C2D85",
                fontWeight: 700,
              }}
            >
              General Expense : {overAllData.totalGeneralExpense}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: "1.3rem",
                color: "#4C2D85",
                fontWeight: 700,
              }}
            >
              OverAll P/L : {overAllData.overAllProfitLoss}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                color: overAllData.status == "profit" ? "Green" : "Red",
                fontWeight: "Bold",
                fontSize: "1.3rem",
              }}
            >
              Status : {overAllData.status}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Paper
        sx={{
          height: "auto",
          width: "100%",
          padding: 2,
          overflowX: "auto",
          boxSizing: "border-box",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeader": {
              background: "#C4BDFF",
              color: "White",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              fontSize: "1.2rem",
            },
          }}
        />
      </Paper>

      <Grid container spacing={2} sx={{ marginTop: 2, padding: 2 }}>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
};

export default ProfitLoseTable;
