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

//FIXME:edit,delete,update karvanu baki 6
const StockPage = () => {
  const [stock, setStock] = React.useState([]);
  const [payment, setPayment] = React.useState([]);

  const callApi = async () => {
    const response = await getAllStocks();
    setStock(response.data.data);
    setPayment(response.data.data);

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
<<<<<<< HEAD

          {stock &&
            stock.map((stock) => {
              return (
                <Box
                  key={stock._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderRadius: 10,
                    boxShadow: 1,
                    padding: 2,
                    marginTop: 3,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src="/path/to/avatar.jpg"
                      alt="User Avatar"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#6c5ce7" }}
                      >
                        {stock.modelName.modelName}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "green", fontWeight: "bold" }}
                        >
<<<<<<< HEAD
                          Customer Name:
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {stock.customerName}
                          </span>
=======
                          Customer Name:{stock?.customerName?.customerName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "red", fontWeight: "bold" }}
                        >
                          Organization Name:
                          {stock?.organization?.organizationName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "green", fontWeight: "bold" }}
                        >
                          Branch Name:
                          {stock?.branch?.branchName}
>>>>>>> fbe28e6bb59656ef8e1b9d40aaf48dae861b4791
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton
                      sx={{ backgroundColor: "#f5f5f5" }}
                      onClick={() => handlePaymentDialogOpen(payment)}
                    >
                      <MonetizationOnIcon sx={{ color: "#6c5ce7" }} />
                    </IconButton>

                    <IconButton
                      sx={{ backgroundColor: "#f5f5f5" }}
                      onClick={() => handleOpen(stock)}
                    >
                      <VisibilityIcon sx={{ color: "#6c5ce7" }} />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}

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
=======
>>>>>>> 1cfb5ec869eef89ef9aa10427ab8f79716b87090
        </Box>
        <StockTable stock={stock} payment={payment} callApi={callApi}/>
       
      </Box>
    </Box>
  );
};

export default StockPage;
