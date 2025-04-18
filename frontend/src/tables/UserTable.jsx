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
import { Link } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import DeleteDialog from "../components/DeleteDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser, getAllUsers } from "../apis/UserApi";

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [userData, setUserData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const callApi = async () => {
    const response = await getAllUsers(
      paginationModel.page + 1,
      paginationModel.pageSize,
      searchTerm
    );
    console.log(response.data.data.items, "API Response");
    setUserData(response.data.data.items); // Set the items to orgData
    setTotalRows(response.data.data.totalCount); // Set the total count (rowCount) from API response
  };

  useEffect(() => {
    callApi();
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
    deleteUser(id);

    setDeleteOpen(false);
    handleClose();
    callApi();
  };

  // Column definition for DataGrid
  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpen(params.row)}>
            <VisibilityIcon sx={{ color: "#6c5ce7" }} />
          </IconButton>
          <Link to={`/userForm/${params.row.id}`}>
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
    { field: "userName", headerName: "User Name", flex: 2 },
    { field: "email", headerName: "email", flex: 2 },
    { field: "orgName", headerName: "Org Name", flex: 2 },
    { field: "branchName", headerName: "Branch Name", flex: 2 },
  ];

  // Prepare the rows for the DataGrid
  const rows = Array.isArray(userData)
    ? userData.map((userData) => ({
        id: userData._id,
        userName: userData.name,
        email: userData.email,
        orgName: userData.organization.organizationName,
        branchName: userData.orgBranch.branchName,
      }))
    : [];

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  // Filter categories based on search term
  // const filteredCategories = rows.filter((row) => {
  //   return row.userName.toLowerCase().includes(searchTerm.toLowerCase());
  // });

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
              Users
            </Typography>
            <Box display="flex" gap={2}>
              <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
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
                }}
                component={Link}
                to="/userForm"
              >
                Add User
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
            fieldName="userForm"
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

export default UserTable;
