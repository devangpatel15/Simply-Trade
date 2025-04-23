import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../components/DeleteDialog";
import { deleteStock, getAllStocks } from "../apis/StockApi";
import StockDialog from "../components/StockDialog";
import PaymentDialog from "../components/PaymentDialog";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import axios from "axios";
import { allSellStockRepair } from "../apis/SellApi";

const CustomerLedgerTable = ({
  selectedOrganization,
  selectedCustomer,
  selectedRadioFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [paymentDialog, setPaymentDialog] = React.useState(false);
  const [stock, setStock] = React.useState([]);
  const [stockData, setStockData] = React.useState([]);
  const [sell, setSell] = React.useState([]);
  const [repair, setRepair] = React.useState([]);
  const [payment, setPayment] = React.useState([]);
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
        selectedCustomer && selectedCustomer?.value
      ); 
      console.log(response, "API Response");

      if (selectedRadioFilter == "all") {
        setStock(response.data.items.stockData);
        setSell(response.data.items.sellData);
        setRepair(response.data.items.repairData);
        setTotalRows(response.data.totalCount);
      } else if (selectedRadioFilter == "stock") {
        setStock(response.data.items.stockData);
        setTotalRows(response.data.stockCount);
      } else if (selectedRadioFilter == "sell") {
        setSell(response.data.items.sellData);
        setTotalRows(response.data.sellCount);
      } else if (selectedRadioFilter == "repair") {
        setRepair(response.data.items.repairData);
        setTotalRows(response.data.repairCount);
      }
    } catch (error) {
      console.error("Error fetching organization branch data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, [paginationModel, selectedCustomer, selectedRadioFilter]);

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const handleOpen = (data) => {
    setData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentDialog(false); // Ensuring PaymentDialog closes separately
  };

  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDeleteDialog = (id) => {
    setDeleteOpen(id);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    callApi();
  };

  const handlePaymentDialogOpen = (data) => {
    setData(data);
    setPaymentDialog(true);
  };

  const handleDelete = async (id) => {
    deleteStock(id);

    setDeleteOpen(false);
    handleClose();
    callApi();
  };
  const columns = [
    { field: "customerName", headerName: "Customer Name", flex: 2 },
    { field: "role", headerName: "Role", flex: 2 },
    { field: "deviceId", headerName: "Device", flex: 2 },
    { field: "totalAmount", headerName: "Total Amount", flex: 2 },
    { field: "paidToCustomer", headerName: "Paid Amount", flex: 2 },
    { field: "remainingAmount", headerName: "Remaining Amount", flex: 2 },
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
        }))
      : [];
  }

  if (selectedRadioFilter == "all") {
    const allCus = [...stock, ...sell, ...repair];

    rows = Array.isArray(allCus)
      ? allCus.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
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
        }))
      : [];
  } else if (selectedRadioFilter == "stock") {
    rows = Array.isArray(stock)
      ? stock.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
          role: stock?.customerName?.role,
          deviceId: stock?.deviceName?.deviceName,
          totalAmount: stock.totalAmount,
          paidToCustomer: stock.paidToCustomer,
          remainingAmount: stock.remainingAmount,
        }))
      : [];
  } else if (selectedRadioFilter == "sell") {
    rows = Array.isArray(sell)
      ? sell.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
          role: stock?.customerName?.role,
          deviceId: stock?.deviceName?.deviceName,
          totalAmount: stock.amount,
          paidToCustomer: stock.customerPaid,
          remainingAmount: stock.remainingAmount,
        }))
      : [];
  } else if (selectedRadioFilter == "repair") {
    rows = Array.isArray(repair)
      ? repair.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
          role: stock?.customerName?.role,
          deviceId: stock?.deviceName?.deviceName,
          totalAmount: stock.amount,
          paidToCustomer: stock.paidToCustomer || "--",
          remainingAmount: stock.remainingAmount || "--",
        }))
      : [];
  }

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Paper sx={{ height: 400, width: "100%", marginTop: "2rem" }}>
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
      <StockDialog
        handleClose={handleClose}
        open={open}
        data={data}
        callApi={callApi}
        fieldName="stockForm"
      />
      <PaymentDialog
        handleClose={handleClose}
        open={paymentDialog}
        data={data}
        callApi={callApi}
        fieldName="paymentForm"
      />

      <DeleteDialog
        deleteOpen={deleteOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
        closeDeleteDialog={closeDeleteDialog}
      />
    </>
  );
};

export default CustomerLedgerTable;
