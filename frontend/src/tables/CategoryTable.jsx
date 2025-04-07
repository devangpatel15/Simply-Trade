import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import { deleteCategory, getAllCategory } from "../apis/CategoryApi";
import { Link } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import DeleteDialog from "../components/DeleteDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryTable = ({ fieldName }) => {
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch categories from API
  const callApi = async () => {
    const response = await getAllCategory();
    setCategory(response.data.data);
  };

  // Fetch data on component mount
  useEffect(() => {
    callApi();
  }, []);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

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
    deleteCategory(id);

    setDeleteOpen(false);
    handleClose();
    callApi();
  };

  // Column definition for DataGrid
  const columns = [
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpen(params.row)}>
            <VisibilityIcon sx={{ color: "#6c5ce7" }} />
          </IconButton>
          <Link to={`/categoryForm/${params.row.id}`}>
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
    { field: "categoryName", headerName: "Category Name", flex: 2 },
    { field: "createdAt", headerName: "Created At", flex: 2 },
    { field: "branchName", headerName: "Branch Name", flex: 2 },
  ];

  // Prepare the rows for the DataGrid
  const rows = category.map((cat) => ({
    id: cat._id,
    categoryName: cat.categoryName,
    createdAt: cat.createdAt,
    branchName: cat.orgBranchId.branchName,
  }));

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories based on search term
  const filteredCategories = rows.filter((row) => {
    return row.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
  });


  const paginationModel = { page: 0, pageSize: 3 };


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
                sx={{
                  fontWeight: "bold",
                  color: "#6c5ce7", // Apply color to the header
                }}
              >
                CATEGORY
              </Typography>
              <Box display="flex" gap={2}>
                <TextField
                  variant="outlined"
                  placeholder="Search"
                  size="small"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: "#6c5ce7", // Border color for the search input
                      },
                    },
                  }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#6c5ce7" }} /> {/* Search icon color */}
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{
                    color: "#6c5ce7", // Text color of the button
                    borderColor: "#6c5ce7", // Border color of the button
                    textTransform: "none",
                  }}
                  component={Link}
                  to="/categoryForm"
                >
                  Add Category
                </Button>
              </Box>
            </Box>
            <Paper sx={{ height: 400, width: "100%" , marginTop: 5}}>
              <DataGrid
                rows={filteredCategories}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
                pa
              />
            </Paper>
            <DialogBox
              handleClose={handleClose}
              open={open}
              data={data}
              callApi={callApi}
              fieldName="categoryForm"
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
    </div>
  );
};

export default CategoryTable;
