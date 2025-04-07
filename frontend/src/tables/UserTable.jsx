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
import { deleteUser } from "../apis/UserApi";

const UserTable = ({ userData, callApi }) => {
  const [searchTerm, setSearchTerm] = useState("");

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
    { field: "userName", headerName: "User Name", width: 250 },
    { field: "email", headerName: "email", width: 250 },
    { field: "orgName", headerName: "Org Name", width: 180 },
    { field: "branchName", headerName: "Branch Name", width: 180 },
  ];

  // Prepare the rows for the DataGrid
  const rows = userData.map((item) => ({
    id: item._id,
    userName: item.name,
    email: item.email,
    orgName: item.organization.organizationName,
    branchName: item.orgBranch.branchName,
  }));

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories based on search term
  const filteredCategories = rows.filter((row) => {
    return row.userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredCategories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          sx={{ border: 0 }}
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
    </div>
  );
};

export default UserTable;
