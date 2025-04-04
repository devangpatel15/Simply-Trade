import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";
import DialogBox from "../components/DialogBox";
import { Link } from "react-router-dom";
import DeleteDialog from "../components/DeleteDialog";
import { deleteOrg } from "../apis/OrganizationApi";

const OrganizationTable = ({ orgData, callApi }) => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const columns = [
    { id: "organizationName", label: "Organization Name" },
    { id: "createBy", label: "Create By" },
    {
      id: "createAt",
      label: "Create At",
      align: "center",
    },
    { id: "actions", label: "actions" },
  ];

  function createData(organizationName, createBy, createAt, actions) {
    return { organizationName, createBy, createAt, actions };
  }

  const row = orgData.map((item) => {
    return createData(
      item?.organizationName,
      item?.userId.name,
      moment(item?.createdAt).format("DD-MM-YYYY"),
      <>
        <IconButton
          sx={{ backgroundColor: "#f5f5f5" }}
          onClick={() => handleOpen(item)}
        >
          <VisibilityIcon sx={{ color: "#6c5ce7" }} />
        </IconButton>{" "}
        <Link to={`/organizationForm/${item._id}`}>
          <Button variant="outlined" color="success">
            Edit
          </Button>
        </Link>{" "}
        <Button variant="outlined" color="error" onClick={()=>openDeleteDialog(item._id)}>
          Delete
        </Button>
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

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const openDeleteDialog = (_id) => {
    setDeleteOpen(_id);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    callApi()
  };
  const handleDelete = async (_id) => {
    deleteOrg(_id);
    setDeleteOpen(false);
    handleClose();
    callApi();
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
    </>
  );
};

export default OrganizationTable;
