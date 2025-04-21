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

  // Function to fetch data from the API based on pagination model
  const callApi = async () => {
    if (selectedOrganization && selectedCustomer) {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/stockByOrgAndCus`,
          {
            params: {
              orgId: selectedOrganization && selectedOrganization.value,
              cusId: selectedCustomer && selectedCustomer.value,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStockData(response.data.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    } else {
      try {
        const response = await allSellStockRepair(
          paginationModel.page + 1,
          paginationModel.pageSize
        ); // +1 because API uses 1-based indexing
        console.log(response, "API Response");
        setStock(response.data.items.stockData);
        setSell(response.data.items.sellData);
        setRepair(response.data.items.repairData);
        setTotalRows(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching organization branch data:", error);
      }
    }
  };

  // Fetch data when pagination model changes
  useEffect(() => {
    callApi(); // Call API when page or pageSize changes
  }, [paginationModel, selectedCustomer]);

  // Handle pagination model change (page or pageSize)
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
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 2,
    //   renderCell: (params) => (
    //     <>
    //       <Link to={`/stockForm/${params.row.id}`}>
    //         <IconButton>
    //           <EditIcon sx={{ color: "#6c5ce7" }} />
    //         </IconButton>
    //       </Link>
    //       <IconButton onClick={() => openDeleteDialog(params.row.id)}>
    //         <DeleteIcon sx={{ color: "#6c5ce7" }} />
    //       </IconButton>
    //       <IconButton sx={{ backgroundColor: "#f5f5f5" }} onClick={() => handlePaymentDialogOpen(params.row)}>
    //         <MonetizationOnIcon sx={{ color: "#6c5ce7" }} />
    //       </IconButton>
    //     </>
    //   ),
    // },

    { field: "customerName", headerName: "Customer Name", flex: 2 },
    { field: "deviceId", headerName: "Device", flex: 2 },
    { field: "totalAmount", headerName: "Total Amount", flex: 2 },
    { field: "paidToCustomer", headerName: "Paid Amount", flex: 2 },
    { field: "remainingAmount", headerName: "Remaining Amount", flex: 2 },
  ];

  let rows;

  if(stockData){
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

  if (selectedRadioFilter == "All") {
    const allCus=[...stock,...sell,...repair]
    console.log("allCussssssssssssssssssssssssssssssssssssssssssssss",allCus);
    
    rows = Array.isArray(allCus)
      ? allCus.map((stock) => ({
          id: stock._id,
          customerName: stock?.customerName?.customerName,
          deviceId: stock?.deviceName?.deviceName,
          totalAmount: stock.totalAmount ? stock.totalAmount : stock.amount ? stock.amount:"--",
          paidToCustomer: stock.paidToCustomer ? stock.paidToCustomer :stock.customerPaid ?stock.customerPaid:"--",
          remainingAmount: stock.remainingAmount?stock.remainingAmount:"--",
        }))
      : [];
  }else if(selectedRadioFilter == "Stock"){
    rows = Array.isArray(stock)
    ? stock.map((stock) => ({
        id: stock._id,
        customerName: stock?.customerName?.customerName,
        deviceId: stock?.deviceName?.deviceName,
        totalAmount: stock.totalAmount,
        paidToCustomer: stock.paidToCustomer,
        remainingAmount: stock.remainingAmount,
      }))
    : [];
  }else if(selectedRadioFilter == "Sell"){
    rows = Array.isArray(sell)
    ? sell.map((stock) => ({
        id: stock._id,
        customerName: stock?.customerName?.customerName,
        deviceId: stock?.deviceName?.deviceName,
        totalAmount: stock.amount,
        paidToCustomer: stock.customerPaid,
        remainingAmount: stock.remainingAmount,
      }))
    : [];
  }else if(selectedRadioFilter == "Repair"){
    rows = Array.isArray(repair)
    ? repair.map((stock) => ({
        id: stock._id,
        customerName: stock?.customerName?.customerName,
        deviceId: stock?.deviceName?.deviceName,
        totalAmount: stock.amount ,
        paidToCustomer: stock.paidToCustomer,
        remainingAmount: stock.remainingAmount,
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
