import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../components/DeleteDialog";
import DialogBox from "../components/DialogBox";
import { allUserOrg, deleteOrg } from "../apis/OrganizationApi";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const OrganizationTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [orgData, setOrgData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const callApi = async () => {
    const response = await allUserOrg(
      paginationModel.page + 1,
      paginationModel.pageSize,
      searchTerm
    );
    console.log(response, "responss");
    console.log(response.data.totalCount, "totalRows");

    setOrgData(response.data.items);
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
    deleteOrg(id);
    setDeleteOpen(false);
    handleClose();
    callApi();
  };

  // const handlePaginationModelChange = (newPaginationModel) => {
  //   setPaginationModel(newPaginationModel);
  //   const currentPage = newPaginationModel.page;

  //   console.log("Current page:", currentPage);
  // };

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
    callApi(newPaginationModel.page + 1, newPaginationModel.pageSize); // Pass page + 1 since API is likely 1-based
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
          <Link to={`/organizationForm/${params.row.id}`}>
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
    { field: "organizationName", headerName: "Organization Name", flex: 2 },
    { field: "primaryAddress", headerName: "Primary Address", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "telePhone", headerName: "Telephone", flex: 2 },
  ];

  // Safeguard the orgData mapping with Array.isArray check
  const rows = Array.isArray(orgData)
    ? orgData.map((orgData) => ({
        id: orgData._id,
        organizationName: orgData?.organizationName,
        primaryAddress: orgData.primaryAddress,
        email: orgData.email,
        telePhone: orgData?.telePhone,
      }))
    : []; // Default to empty array if orgData is not an array

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  // const filteredOrganization = rows.filter((row) => {
  //   return row.organizationName
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  // });

  // const paginationModel = { page: 0, pageSize: 5 };

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
              ORGANIZATIONS
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
                to="/organizationForm"
              >
                Add Organization
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
  fieldName="organizationForm"
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

export default OrganizationTable;
