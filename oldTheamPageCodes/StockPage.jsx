import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Sidebar from "../frontend/src/components/Sidebar";
import Header from "../frontend/src/components/Header";
import { Link } from "react-router-dom";
import DialogBox from "../frontend/src/components/DialogBox";
import { useEffect, useState } from "react";
import moment from "moment";
import StockDialog from "../frontend/src/components/StockDialog";
import PaymentDialog from "../frontend/src/components/PaymentDialog";
import { Payment } from "@mui/icons-material";
import { getAllStocks } from "../frontend/src/apis/StockApi";

const StockPage = () => {
  const [stock, setStock] = useState([]);

  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState([]);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [data, setData] = useState({});

  const callApi = async () => {
    const response = await getAllStocks();

    setStock(response.data.data);
    setPayment(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, []);

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
        </Box>
      </Box>
    </Box>
  );
};

export default StockPage;
