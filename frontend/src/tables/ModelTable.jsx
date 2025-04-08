import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../components/DeleteDialog";
import axios from "axios";

import DialogBox from "../components/DialogBox";
import { deleteModel } from "../apis/ModelApi";

const ModelTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpen = (data) => {
    setData(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [modelData, setModelData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const callApi = async (page = 1, limit = 5) => {
    const response = await axios.get("http://localhost:4000/api/findAllModel", {
      params: { page, limit },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    // Update the model data state with the response
    setModelData(response.data.data.items);
    
    // Set the total count (rowCount) from API response
    setTotalRows(response.data.data.totalCount);
  };
  

  // Fetch data when pagination model changes
  useEffect(() => {
    callApi(); // Call API when page or pageSize changes
  }, [paginationModel]);

  // Handle pagination model change (page or pageSize)
  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const openDeleteDialog = (id) => {
    setDeleteOpen(id);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    callApi();
  };

  const handleDelete = async (id) => {
    deleteModel(id);

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
          <Link to={`/modelForm/${params.row.id}`}>
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
    { field: "modelName", headerName: "Model Name", flex: 2 },
    { field: "categoryId", headerName: "Category", flex: 2 },
    { field: "organization", headerName: "Organization", flex: 2 },
    { field: "branchName", headerName: "Branch Name", flex: 2 },
  ];

  // Prepare the rows for the DataGrid
  const rows = modelData.map((modelData) => ({
    id: modelData._id,
    modelName: modelData.modelName,
    categoryId: modelData.categoryId.categoryName,
    organization: modelData?.organization?.organizationName,
    branchName: modelData?.branchName?.branchName,
  }));

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories based on search term
  const filteredDevice = rows.filter((row) => {
    return row.modelName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Paper sx={{ height: 400, width: "100%", marginTop: "2rem" }}>
        <DataGrid
          rows={filteredDevice}
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
        fieldName="modelForm"
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

export default ModelTable;
