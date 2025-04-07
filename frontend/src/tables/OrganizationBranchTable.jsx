import { IconButton, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../components/DeleteDialog";
import DialogBox from "../components/DialogBox";
import { deleteOrgBranch, getAllUserOrgBranch } from "../apis/OrganizationBranchApi";
import { allUserOrg } from "../apis/OrganizationApi";

const OrganizationBranchTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpen = (data) => {
    setData(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [orgData, setOrgData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const callApi = async () => {
    const response = await getAllUserOrgBranch(paginationModel.page + 1, paginationModel.pageSize)
    console.log(response, "responss");
    console.log(response.data.totalCount, "totalRows");
    
    setOrgData(response.data.data);
    setTotalRows(response.data.totalCount);
  };
  
  useEffect(() => {
    callApi(); // +1 for 1-based API pagination
  }, [paginationModel.page, paginationModel.pageSize]);

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
    callApi(newPaginationModel.page + 1, newPaginationModel.pageSize); // Pass page + 1 since API is likely 1-based
  };

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
    { field: "organization", headerName: "Organization", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "telePhone", headerName: "TelePhone", flex: 4 },
  ];

  // Prepare the rows for the DataGrid
  const rows = Array.isArray(orgData)
  ? orgData.map((orgData) => ({
    id: orgData._id,
    branchName: orgData?.branchName,
    organization: orgData.organization.organizationName,
    email: orgData.email,
    telePhone: orgData?.telePhone,
  }))
  : [];;

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories based on search term
  const filteredOrganizationBranch = rows.filter((row) => {
    return row.branchName.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <div>
      <Paper sx={{ height: 400, width: "100%" , marginTop: "2rem"}}>
        <DataGrid
          rows={filteredOrganizationBranch}
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
