import * as React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomerLedgerTable from "../tables/CustomerLedgerTable";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import OrgInput from "../components/common/OrgInput";
import OrgBranchInput from "../components/common/OrgBranchInput";
import CustomerInput from "../components/common/CustomerInput";
import axios from "axios";
import { Link } from "react-router-dom";
const SellPage = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // setPaginationModel((prev) => ({ ...prev, page: 0 }));
      };
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
            SELL DEVICES
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
              Add TO DEVICES SELL
            </Button>
          </Box>
        </Box>
        {/* <Paper sx={{ height: 400, width: "100%", marginTop: "2rem" }}>
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
        </Paper> */}

        {/* <DialogBox
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
        /> */}
      </Box>
    </Box>
  </Box>  )
}

export default SellPage