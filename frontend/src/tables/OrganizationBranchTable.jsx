import { IconButton, styled } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../components/DeleteDialog";
import DialogBox from "../components/DialogBox";
import { deleteOrgBranch } from "../apis/OrganizationBranchApi";

const OrganizationBranchTable = ({ orgData, callApi }) => {
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
    deleteOrgBranch(id);

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
          <IconButton onClick={() => handleOpen(params.row)}>
            <VisibilityIcon sx={{ color: "#6c5ce7" }} />
          </IconButton>
          <Link to={`/organizationBranchForm/${params.row.id}`}>
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
    { field: "branchName", headerName: "Branch Name", flex: 2 },
    { field: "organization", headerName: "organization", flex: 2 },
    { field: "email", headerName: "email", flex: 2 },
    { field: "telePhone", headerName: "telePhone", flex: 2 },
  ];

  // Prepare the rows for the DataGrid
  const rows = orgData.map((orgData) => ({
    id: orgData._id,
    branchName: orgData?.branchName,
    organization: orgData.organization.organizationName,
    email: orgData.email,
    telePhone: orgData?.telePhone,
  }));

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories based on search term
  const filteredOrganizationBranch = rows.filter((row) => {
    return row.branchName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredOrganizationBranch}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeader": {
              background: "#C4BDFF",  // Inline background color for the header
              color: "White",  // Inline text color for header
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",  // Inline font weight for header text
            },
          }}
        />
      </Paper>
      <DialogBox
        handleClose={handleClose}
        open={open}
        data={data}
        callApi={callApi}
        fieldName="organizationBranchForm"
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

export default OrganizationBranchTable;
