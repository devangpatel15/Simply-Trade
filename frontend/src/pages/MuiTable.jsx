import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getAllStocks } from "../apis/StockApi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StockTable from "../tables/StockTable";
import { Link } from "react-router-dom";

const MuiTable = () => {
  const [stock, setStock] = React.useState([]);

  const callApi = async () => {
    const response = await getAllStocks();
    setStock(response.data.data);
  };

  React.useEffect(() => {
    callApi();
  }, []);

  console.log(stock);
  
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
              STOCK
            </Typography>

            <Box display="flex" gap={2}>
              <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
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
                to="/stockForm"
              >
                Add Stock
              </Button>
            </Box>
          </Box>

          {/* <PaymentDialog
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
          /> */}
        </Box>
        <StockTable data={stock} />
       
      </Box>
    </Box>
  );
};

export default MuiTable;
