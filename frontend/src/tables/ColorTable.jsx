import { IconButton } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../components/DeleteDialog";
import DialogBox from "../components/DialogBox";
import { deleteColor } from "../apis/ColorApi";


const ColorTable = ({color , callApi}) => {

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
      deleteColor(id);
  
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
            <Link to={`/colorForm/${params.row.id}`}>
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
      { field: "colorName", headerName: "Color Name", flex: 2 },
      { field: "modelId", headerName: "Model", flex: 2 },
      { field: "deviceId", headerName: "Device", flex: 2 },
      { field: "organization", headerName: "Organization", flex: 2 },
      { field: "branchName", headerName: "Branch", flex: 2 },
    ];
  
    // Prepare the rows for the DataGrid
    const rows = color.map((color) => ({
      id: color._id,
     colorName: color.colorName,
     modelId: color.modelId.modelName,
     deviceId: color?.deviceId.deviceName,
     organization: color?.organization?.organizationName,
      branchName: color?.branchName?.branchName,
    }));
  
    // Handle search term change
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    // Filter categories based on search term
    const filteredColor = rows.filter((row) => {
      return row.colorName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    const paginationModel = { page: 0, pageSize: 5 };

  return (

    <div>
       <Paper sx={{ height: 400, width: "100%" , marginTop: "2rem"}}>
        <DataGrid
          rows={filteredColor}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
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
              fieldName="colorForm"
            />
            <DeleteDialog
              deleteOpen={deleteOpen}
              handleClose={handleClose}
              handleDelete={handleDelete}
              closeDeleteDialog={closeDeleteDialog}
              />
    </div>
  )
}

export default ColorTable
