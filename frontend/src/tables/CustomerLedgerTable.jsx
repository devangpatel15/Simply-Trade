import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { allSellStockRepair } from "../apis/SellApi";
import moment from "moment";

const CustomerLedgerTable = ({
  selectedOrganization,
  selectedCustomer,
  selectedRadioFilter,
  startDate,
  endDate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stock, setStock] = React.useState([]);
  const [stockData, setStockData] = React.useState([]);
  const [sell, setSell] = React.useState([]);
  const [repair, setRepair] = React.useState([]);
  const [total, setTotal] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const type = selectedRadioFilter;
  const callApi = async () => {
    try {
      const response = await allSellStockRepair(
        paginationModel.page + 1,
        paginationModel.pageSize,
        type,
        selectedOrganization && selectedOrganization?.value,
        selectedCustomer && selectedCustomer?.value,
        startDate,
        endDate
      );

      if (selectedRadioFilter == "all") {
        setStock(response.data.items.stockData);
        setSell(response.data.items.sellData);
        setRepair(response.data.items.repairData);
        setTotalRows(response.data.totalCount);
      } else if (selectedRadioFilter == "stock") {
        setTotal(response.data.stockTotals);
        setStock(response.data.items.stockData);
        setTotalRows(response.data.stockCount);
      } else if (selectedRadioFilter == "sell") {
        setTotal(response.data.sellTotals);
        setSell(response.data.items.sellData);
        setTotalRows(response.data.sellCount);
      } else if (selectedRadioFilter == "repair") {
        setTotal(response.data.repairTotals);
        setRepair(response.data.items.repairData);
        setTotalRows(response.data.repairCount);
      }
    } catch (error) {
      console.error("Error fetching organization branch data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, [paginationModel, selectedCustomer, selectedRadioFilter, endDate]);

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const columns = [
    { field: "customerName", headerName: "Customer Name", flex: 2 },
    { field: "organization", headerName: "Organization", flex: 2 },
    { field: "branch", headerName: "Branch", flex: 2 },
    { field: "role", headerName: "Role", flex: 2 },
    { field: "deviceId", headerName: "Device", flex: 2 },
    { field: "totalAmount", headerName: "Total Amount", flex: 2 },
    { field: "paidToCustomer", headerName: "Paid Amount", flex: 2 },
    { field: "remainingAmount", headerName: "Remaining Amount", flex: 2 },
    { field: "createdAt", headerName: "Date", flex: 2 },
  ];

  let rows;

  if (stockData) {
    rows = Array.isArray(stockData)
      ? stockData.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
          deviceId: stock?.deviceName?.deviceName,
          totalAmount: stock.totalAmount,
          paidToCustomer: stock.paidToCustomer,
          remainingAmount: stock.remainingAmount,
          createdAt: moment(stock.createdAt).format("DD-MM-YYYY"),
        }))
      : [];
  }

  if (selectedRadioFilter == "all") {
    const allCus = [...stock, ...sell, ...repair];

    rows = Array.isArray(allCus)
      ? allCus.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
          organization: stock?.organization?.organizationName,
          branch: stock?.branch?.branchName,
          role: stock?.customerName?.role,
          deviceId: stock?.deviceName?.deviceName,
          totalAmount: stock.totalAmount
            ? stock.totalAmount
            : stock.amount
            ? stock.amount
            : "--",
          paidToCustomer: stock.paidToCustomer
            ? stock.paidToCustomer
            : stock.customerPaid
            ? stock.customerPaid
            : "--",
          remainingAmount: stock.remainingAmount ? stock.remainingAmount : "--",
          createdAt: moment(stock.createdAt).format("DD-MM-YYYY"),
        }))
      : [];
  } else if (selectedRadioFilter == "stock") {
    rows = Array.isArray(stock)
      ? stock.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
          organization: stock?.organization?.organizationName,
          branch: stock?.branch?.branchName,
          role: stock?.customerName?.role,
          deviceId: stock?.deviceName?.deviceName,
          totalAmount: stock.totalAmount,
          paidToCustomer: stock.paidToCustomer,
          remainingAmount: stock.remainingAmount,
          createdAt: moment(stock.createdAt).format("DD-MM-YYYY"),
        }))
      : [];
  } else if (selectedRadioFilter == "sell") {
    rows = Array.isArray(sell)
      ? sell.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
          organization: stock?.organization?.organizationName,
          branch: stock?.branch?.branchName,
          role: stock?.customerName?.role,
          deviceId: stock?.deviceName?.deviceName,
          totalAmount: stock.amount,
          paidToCustomer: stock.customerPaid,
          remainingAmount: stock.remainingAmount,
          createdAt: moment(stock.createdAt).format("DD-MM-YYYY"),
        }))
      : [];
  } else if (selectedRadioFilter == "repair") {
    rows = Array.isArray(repair)
      ? repair.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
          organization: stock?.organization?.organizationName,
          branch: stock?.branch?.branchName,
          role: stock?.customerName?.role,
          deviceId: stock?.deviceName?.deviceName,
          totalAmount: stock.amount,
          paidToCustomer: stock.paidToCustomer || "--",
          remainingAmount: stock.remainingAmount || "--",
          createdAt: moment(stock.createdAt).format("DD-MM-YYYY"),
        }))
      : [];
  }

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Box gap={2} sx={{ marginTop: 2 }}>
        {selectedRadioFilter == "all" ? (
          ""
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  color: "#4C2D85",
                  fontWeight: 700,
                }}
              >
                Total Amount : {total?.totalAmount || "0"}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  color: "#4C2D85",
                  fontWeight: 700,
                }}
              >
                Total Paid Amount : {total?.paidAmount || "0"}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  color: "#4C2D85",
                  fontWeight: 700,
                }}
              >
                Total Remaining Amount : {total?.remainingAmount || "0"}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
      <Paper
        sx={{
          height: 400,
          width: "100%",
          marginTop: "2rem",
          overflowX: "auto",
          boxSizing: "border-box",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={paginationModel.pageSize}
          rowCount={totalRows}
          paginationMode="server"
          onPaginationModelChange={handlePaginationModelChange}
          paginationModel={paginationModel}
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
    </>
  );
};

export default CustomerLedgerTable;
