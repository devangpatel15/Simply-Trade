import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PaymentDialog from "../components/PaymentDialog";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StockDialog from "../components/StockDialog";

const StockTable = ({ stock, payment, callApi }) => {
  const [open, setOpen] = React.useState(false);
  const [paymentDialog, setPaymentDialog] = React.useState(false);
  const [data, setData] = React.useState({});
  const columns = [
    { id: "customerName", label: "Customer Name", minWidth: 170 },
    { id: "organizationName", label: "Organization Name", minWidth: 100 },
    {
      id: "branchName",
      label: "Branch Name",
      minWidth: 170,
      align: "center",
    },
    { id: "actions", label: "actions", minWidth: 100 },
  ];

  function createData(
    customerName,
    organizationName,
    branchName,
    actions
  ) {
    return { customerName, organizationName, branchName, actions };
  }

  const row = stock.map((item) => {
    return createData(
      item?.customerName?.customerName,
      item?.organization?.organizationName,
      item?.branch?.branchName,
      <>
        <IconButton
          sx={{ backgroundColor: "#f5f5f5" }}
          onClick={() => handlePaymentDialogOpen(payment)}
        >
          <MonetizationOnIcon sx={{ color: "#6c5ce7" }} />
        </IconButton>

        <IconButton
          sx={{ backgroundColor: "#f5f5f5" }}
          onClick={() => handleOpen(item)}
        >
          <VisibilityIcon sx={{ color: "#6c5ce7" }} />
        </IconButton>
      </>
    );
  });

  console.log("row", row);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = (data) => {
    setData(data);
    setOpen(true);
  };
  const handlePaymentDialogOpen = (data) => {
    setData(data);
    setPaymentDialog(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentDialog(false);
  };
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {row
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5]}
          component="div"
          count={row.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <PaymentDialog
        handleClose={handleClose}
        open={paymentDialog}
        data={data}
        callApi={callApi}
        fieldName="paymentForm"
      />

      <StockDialog
        handleClose={handleClose}
        open={open}
        data={data}
        callApi={callApi}
        fieldName="stockForm"
      />
    </>
  );
};

export default StockTable;
