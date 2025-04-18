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
import { deleteCapacity, getAllCapacity } from "../apis/CapacityApi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";

const CapacityTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [capacity, setCapacity] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const callApi = async () => {
    const response = await getAllCapacity(
      paginationModel.page + 1,
      paginationModel.pageSize,
      searchTerm
    );
    console.log(response, "responss");
    console.log(response.data.totalCount, "totalRows");

    setCapacity(response.data.items);
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
    deleteCapacity(id);

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
          <Link to={`/capacityForm/${params.row.id}`}>
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
    { field: "capacityName", headerName: "Capacity", flex: 2 },
    { field: "categoryId", headerName: "Category", flex: 2 },
    { field: "modelId", headerName: "Model", flex: 2 },
    { field: "deviceId", headerName: "Device", flex: 2 },
    { field: "organization", headerName: "Organization", flex: 2 },
    { field: "branchName", headerName: "Branch", flex: 2 },
  ];

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
    callApi(newPaginationModel.page + 1, newPaginationModel.pageSize); // Pass page + 1 since API is likely 1-based
  };

  // Prepare the rows for the DataGrid
  const rows = Array.isArray(capacity)
    ? capacity.map((capacity) => ({
        id: capacity._id,
        capacityName: capacity.capacityName,
        categoryId: capacity?.categoryId?.categoryName,
        modelId: capacity?.modelId?.modelName,
        deviceId: capacity?.deviceId?.deviceName,
        organization: capacity?.organization?.organizationName,
        branchName: capacity?.branchName?.branchName,
      }))
    : [];

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  // Filter categories based on search term
  // const filteredDevice = rows.filter((row) => {
  //   return row.capacityName.toLowerCase().includes(searchTerm.toLowerCase());
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
              CAPACITY
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
                to="/capacityForm"
              >
                Add Capacity
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
            fieldName="capacityForm"
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

export default CapacityTable;
