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
import { getAllCapacity } from "../apis/CapacityApi";

const CategoryTable = () => {
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const callApi = async () => {
    const response = await getAllCategory(
      paginationModel.page + 1,
      paginationModel.pageSize,
      searchTerm
    );
    console.log(response, "responss");
    console.log(response.data.totalCount, "totalRows");

    setCategory(response.data.items);
    setTotalRows(response.data.totalCount);
  };

  useEffect(() => {
    callApi(); // +1 for 1-based API pagination
  }, [paginationModel.page, paginationModel.pageSize, searchTerm]);

  const handleOpen = (data) => {
    setData(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
    callApi(newPaginationModel.page + 1, newPaginationModel.pageSize); // Pass page + 1 since API is likely 1-based
  };

  // Column definition for DataGrid
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
    { field: "orgId", headerName: "Organization", flex: 2 },
    { field: "branchName", headerName: "Branch Name", flex: 2 },
  ];

  // Prepare the rows for the DataGrid
  const rows = Array.isArray(category)
    ? category.map((cat) => ({
        id: cat._id,
        categoryName: cat.categoryName,
        orgId: cat?.orgId?.organizationName,
        branchName: cat?.orgBranchId?.branchName,
      }))
    : [];

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  // Filter categories based on search term
  // const filteredCategories = rows.filter((row) => {
  //   return row.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  // const paginationModel = { page: 0, pageSize: 3 };

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
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#6c5ce7", // Border color for the search input
                      },
                    },
                  }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#6c5ce7" }} />{" "}
                        {/* Search icon color */}
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
