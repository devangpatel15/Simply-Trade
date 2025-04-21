import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DialogBox from "../components/DialogBox";
import SearchIcon from "@mui/icons-material/Search";
import DeleteDialog from "../components/DeleteDialog";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteExpense, getAllExpense } from "../apis/ExpenseApi";
import moment from "moment";
import axios from "axios";

const ExpenseTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [expense, setExpense] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Function to fetch data from the API based on pagination model
  const callApi = async () => {
    try {
      const response = await getAllExpense(
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchTerm
      ); // +1 because API uses 1-based indexing
      console.log(response.data.items, "API Response");
      setExpense(response.data.items); // Set the items to orgData
      setTotalRows(response.data.totalCount); // Set the total count (rowCount) from API response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/expenseByDate", {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      });
      
      setExpense(response.data.data); // ✅ Update the table rows
      setTotalRows(response.data.data.length); // ✅ Optional: update total count
    } catch (error) {
      console.error("Error fetching filtered expenses:", error);
    }
  };
  

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      fetchExpenses();
    }
  }, [dateRange.startDate, dateRange.endDate]);
  
  
  // Fetch data when pagination model changes
  useEffect(() => {
    callApi(); // Call API when page or pageSize changes
  }, [paginationModel, searchTerm]);

  // Handle pagination model change (page or pageSize)
  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const handleOpen = (data) => {
    setData(data); 
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDeleteDialog = (id) => {
    setDeleteOpen(id);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    callApi();
  };

  const handleDelete = async (id) => {
    deleteExpense(id);

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
          {/* <IconButton onClick={() => handleOpen(params.row)}>
                <VisibilityIcon sx={{ color: "#6c5ce7" }} />
              </IconButton> */}
          <Link to={`/expenseForm/${params.row.id}`}>
            <IconButton>
              <EditIcon sx={{ color: "#6c5ce7" }} />
            </IconButton>
          </Link>
          <IconButton onClick={() => openDeleteDialog(params.row.id)}>
            <DeleteIcon sx={{ color: "#6c5ce7" }} />
          </IconButton>
        </>
      ),
    },
    { field: "organization", headerName: "Organization", flex: 2 },
    { field: "branchName", headerName: "Branch", flex: 2 },
    { field: "category", headerName: "Category", flex: 2 },
    { field: "modelName", headerName: "Model", flex: 2 },
    { field: "deviceName", headerName: "Device", flex: 2 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "amount", headerName: "Amount", flex: 2 },
    { field: "date", headerName: "Date", flex: 2 },
  ];

  // Prepare the rows for the DataGrid
  const rows = expense.map((expense) => ({
    id: expense._id,
    organization: expense.organization.organizationName,
    branchName: expense.branchName.branchName,
    modelName: expense.modelName?.modelName || "N/A",
    deviceName: expense.deviceName?.deviceName || "N/A",
    description: expense.description,
    date: moment(expense.date).format("DD-MM-YYYY"),
    amount: expense.amount,
    category: expense.category,
  }));


  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

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
              EXPENSE
            </Typography>

            <Box display="flex" gap={2} width={"60%"} alignContent={"center"}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                name="startDate"
                value={dateRange.startDate}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                // value={formData.date}
                // onChange={handleNativeDateChange}
                sx={{ backgroundColor: "white", borderRadius: 1, width: "50%" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="endDate"
                value={dateRange.endDate}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
                }
                // value={formData.date}
                // onChange={handleNativeDateChange}
                sx={{ backgroundColor: "white", borderRadius: 1, width: "50%" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                variant="outlined"
                placeholder="Search"
                size="medium"
                sx={{ backgroundColor: "white", borderRadius: 1, width: "50%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#6c5ce7" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                sx={{
                  color: "#6c5ce7",
                  borderColor: "#6c5ce7",
                  textTransform: "none",
                  // fontWeight: "bold",
                  fontSize: "1rem",
                  width: "30%",
                }}
                component={Link}
                to="/expenseForm"
              >
                Add Expense
              </Button>
            </Box>
          </Box>
          <Paper sx={{ height: 400, width: "100%", marginTop: "2rem" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={paginationModel.pageSize}
              rowCount={totalRows} // Ensure this is set to the total count of records
              paginationMode="server" // Enable server-side pagination
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
          <DialogBox
            handleClose={handleClose}
            open={open}
            data={data}
            callApi={callApi}
            fieldName="expenseForm"
          />
          <DeleteDialog
            deleteOpen={deleteOpen}
            handleClose={handleClose}
            handleDelete={handleDelete}
            closeDeleteDialog={closeDeleteDialog}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ExpenseTable;
