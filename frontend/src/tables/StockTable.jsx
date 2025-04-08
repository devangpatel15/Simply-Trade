// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import PaymentDialog from "../components/PaymentDialog";
// import { IconButton } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import StockDialog from "../components/StockDialog";

// const StockTable = ({ stock, payment, callApi }) => {
//   const [open, setOpen] = React.useState(false);
//   const [paymentDialog, setPaymentDialog] = React.useState(false);
//   const [data, setData] = React.useState({});
//   const columns = [
//     { id: "customerName", label: "Customer Name", minWidth: 170 },
//     { id: "organizationName", label: "Organization Name", minWidth: 100 },
//     {
//       id: "branchName",
//       label: "Branch Name",
//       minWidth: 170,
//       align: "center",
//     },
//     { id: "actions", label: "actions", minWidth: 100 },
//   ];

//   function createData(
//     customerName,
//     organizationName,
//     branchName,
//     actions
//   ) {
//     return { customerName, organizationName, branchName, actions };
//   }

//   const row = stock.map((item) => {
//     return createData(
//       item?.customerName?.customerName,
//       item?.organization?.organizationName,
//       item?.branch?.branchName,
//       <>
//         <IconButton
//           sx={{ backgroundColor: "#f5f5f5" }}
//           onClick={() => handlePaymentDialogOpen(payment)}
//         >
//           <MonetizationOnIcon sx={{ color: "#6c5ce7" }} />
//         </IconButton>

//         <IconButton
//           sx={{ backgroundColor: "#f5f5f5" }}
//           onClick={() => handleOpen(item)}
//         >
//           <VisibilityIcon sx={{ color: "#6c5ce7" }} />
//         </IconButton>
//       </>
//     );
//   });

//   console.log("row", row);

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleOpen = (data) => {
//     setData(data);
//     setOpen(true);
//   };
//   const handlePaymentDialogOpen = (data) => {
//     setData(data);
//     setPaymentDialog(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setPaymentDialog(false);
//   };
//   return (
//     <>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ minWidth: column.minWidth }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {row
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => {
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={row.code}
//                     >
//                       {columns.map((column) => {
//                         const value = row[column.id];
//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             {column.format && typeof value === "number"
//                               ? column.format(value)
//                               : value}
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[3, 5]}
//           component="div"
//           count={row.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>

//       <PaymentDialog
//         handleClose={handleClose}
//         open={paymentDialog}
//         data={data}
//         callApi={callApi}
//         fieldName="paymentForm"
//       />

//       <StockDialog
//         handleClose={handleClose}
//         open={open}
//         data={data}
//         callApi={callApi}
//         fieldName="stockForm"
//       />
//     </>
//   );
// };

// export default StockTable;

import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDevice, getAllDevice } from "../apis/DeviceApi";
import DialogBox from "../components/DialogBox";
import DeleteDialog from "../components/DeleteDialog";
import { deleteStock, getAllStocks } from "../apis/StockApi";
import StockDialog from "../components/StockDialog";
import PaymentDialog from "../components/PaymentDialog";

const StockTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [paymentDialog, setPaymentDialog] = React.useState(false);
  const [stock, setStock] = React.useState([]);
  const [payment, setPayment] = React.useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Function to fetch data from the API based on pagination model
  const callApi = async () => {
    try {
      const response = await getAllStocks(
        paginationModel.page + 1,
        paginationModel.pageSize
      ); // +1 because API uses 1-based indexing
      console.log(response, "API Response");
      setStock(response.data.data.items); // Set the items to orgData
      setTotalRows(response.data.data.totalCount); // Set the total count (rowCount) from API response
    } catch (error) {
      console.error("Error fetching organization branch data:", error);
    }
  };

  // Fetch data when pagination model changes
  useEffect(() => {
    callApi(); // Call API when page or pageSize changes
  }, [paginationModel]);

  // Handle pagination model change (page or pageSize)
  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const handleOpen = (data) => {
    setData(data);
    setOpen(true);
  };

  const handleClose = () => {setOpen(false);
    setPaymentDialog(false);
  }

  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDeleteDialog = (id) => {
    setDeleteOpen(id);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    callApi();
  };

  const handlePaymentDialogOpen = (data) => {
        setData(data);
        setPaymentDialog(true);
      };

  const handleDelete = async (id) => {
    deleteStock(id);

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
        // <>
        //   {/* <IconButton onClick={() => handleOpen(params.row)}>
        //         <VisibilityIcon sx={{ color: "#6c5ce7" }} />
        //       </IconButton> */}
        //   <Link to={`/stockForm/${params.row.id}`}>
        //     <IconButton>
        //       <EditIcon sx={{ color: "#6c5ce7" }} />
        //     </IconButton>
        //   </Link>
        //   <IconButton onClick={() => openDeleteDialog(params.row.id)}>
        //     <DeleteIcon sx={{ color: "#6c5ce7" }} />
        //   </IconButton>
        // </>
        <>
          //{" "}
          <IconButton
            sx={{ backgroundColor: "#f5f5f5" }}
            onClick={() => handlePaymentDialogOpen(payment)}
          >
            <MonetizationOnIcon sx={{ color: "#6c5ce7" }} />
          </IconButton>
          {/* <IconButton
                  sx={{ backgroundColor: "#f5f5f5" }}
                  onClick={() => handleOpen(item)}
                >
                  <VisibilityIcon sx={{ color: "#6c5ce7" }} />
                </IconButton> */}
          <Link to={`/stockForm/${params.row.id}`}>
            <IconButton>
              <EditIcon sx={{ color: "#6c5ce7" }} />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => openDeleteDialog(params.row.id)}
          ></IconButton>
        </>
      ),
    },
    { field: "organization", headerName: "organization", flex: 2 },
    { field: "categoryId", headerName: "Category", flex: 2 },
    { field: "modelId", headerName: "Model", flex: 2 },
    { field: "organization", headerName: "Organization", flex: 2 },
    { field: "branchName", headerName: "Branch Name", flex: 2 },
  ];

  // Prepare the rows for the DataGrid
  const rows =Array.isArray(stock)
  ? stock.map((stock) => ({
    id: stock._id,
    organization: stock.organization.organizationName,
    categoryId: stock.categoryId.categoryName,
    modelId: stock.modelId.modelName,
    organization: stock?.organization?.organizationName,
    branchName: stock?.branchName?.branchName,
  }))
  : []; 

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories based on search term
  // const filteredDevice = rows.filter((row) => {
  //   return row.deviceName.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  return (
    <div>
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
      <StockDialog
        handleClose={handleClose}
        open={open}
        data={data}
        callApi={callApi}
        fieldName="stockForm"
      />
      <PaymentDialog
        handleClose={handleClose}
        open={PaymentDialog}
        data={data}
        callApi={callApi}
        fieldName="paymentForm"
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

export default StockTable;
