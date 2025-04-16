import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../components/DeleteDialog";
import { deleteStock, getAllStocks } from "../apis/StockApi";
import StockDialog from "../components/StockDialog";
import PaymentDialog from "../components/PaymentDialog";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const StockTable = () => {
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [paymentDialog, setPaymentDialog] = React.useState(false);
  const [stock, setStock] = React.useState([]);
  const [payment, setPayment] = React.useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Function to fetch data from the API based on pagination model
  const callApi = async () => {
    try {
      const response = await getAllStocks(
        paginationModel.page + 1,
        paginationModel.pageSize
      ); // +1 because API uses 1-based indexing
      console.log(response, "API Response");
      setStock(response.data.data.items); // Set the items to orgData
      setTotalRows(response.data.data.totalCount); // Set the total count (rowCount) from API response
    } catch (error) {
      console.error("Error fetching organization branch data:", error);
    }
  };

  // Fetch data when pagination model changes
  useEffect(() => {
    callApi(); // Call API when page or pageSize changes
  }, [paginationModel]);

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
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <>
          <Link to={`/stockForm/${params.row.id}`}>
            <IconButton>
              <EditIcon sx={{ color: "#6c5ce7" }} />
            </IconButton>
          </Link>
          <IconButton onClick={() => openDeleteDialog(params.row.id)}>
            <DeleteIcon sx={{ color: "#6c5ce7" }} />
          </IconButton>
          <IconButton onClick={() => handlePaymentDialogOpen(params.row)}>
            <MonetizationOnIcon sx={{ color: "#6c5ce7" }} />
          </IconButton>
          <Link
            // to={`/expenseForm/${params.row.id}`}
            to={
              location.pathname.includes("stockPage")
                ? `/stockPage/expenseForm/${params.row.id}`
                : `/expenseForm/${params.row.id}`
            }
            stockId="stockId"
          >
            <IconButton>
              <AccountBalanceWalletIcon sx={{ color: "#6c5ce7" }} />
            </IconButton>
          </Link>
          <Link to={`/sellForm/${params.row.id}`}>
            <IconButton>
              <MobileFriendlyIcon sx={{ color: "#6c5ce7" }} />
            </IconButton>
          </Link>
        </>
      ),
    },
    { field: "organization", headerName: "organization", flex: 1.5 },
    { field: "categoryId", headerName: "Category", flex: 1.5 },
    { field: "modelId", headerName: "Model", flex: 1.5 },
    { field: "deviceId", headerName: "Device", flex: 1.5 },
    { field: "branchName", headerName: "Branch Name", flex: 1.5 },
  ];

  // Prepare the rows for the DataGrid
  const rows = Array.isArray(stock)
    ? stock.map((stock) => ({
        id: stock._id,
        organization: stock?.organization?.organizationName,
        categoryId: stock?.categoryName?.categoryName,
        modelId: stock?.modelName?.modelName,
        deviceId: stock?.deviceName?.deviceName,
        branchName: stock?.branch?.branchName,
      }))
    : [];

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories based on search term
  // const filteredDevice = rows.filter((row) => {
  //   return row.deviceName.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  return (
    <div>
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
    </div>
  );
};

export default StockTable;
