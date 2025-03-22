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
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import { useEffect, useState } from "react";
import { getAllDevice } from "../apis/DeviceApi";
import moment from "moment";
import StockDialog from "../components/StockDialog";
import PaymentDialog from "../components/PaymentDialog";
import { Payment } from "@mui/icons-material";

const StockPage = () => {
  const [stock, setStock] = useState([]);

  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState([]);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [data, setData] = useState({});

  const callApi = async () => {
    const response = await getAllDevice();
    setStock(response.data.data);
    setPayment(response.data.data);
    console.log("device=====", stock);
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleOpen = (data) => {
    console.log(data, "data-----");
    setData(data);
    setOpen(true);
  };
  const handlePaymentDialogOpen = (data) => {
    console.log(data, "data-----");
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
                        {/* {stock.deviceName} */}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "green", fontWeight: "bold" }}
                        >
                          Created At:{" "}
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {/* {moment(stock.createdAt).format("DD-MM-YYYY")} */}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "brown", fontWeight: "bold" }}
                        >
                          Update At:{" "}
                          <span
                            style={{ color: "black", fontWeight: "normal" }}
                          >
                            {/* {moment(stock.updatedAt).format("DD-MM-YYYY")} */}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

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
