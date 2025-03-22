import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const StockForm = () => {
  const [imeiOrSr, setImeiOrSr] = useState("IMEI");
  const [payments, setPayments] = useState([{ id: 1, account: "" }]);

  const addPayment = () => {
    setPayments([...payments, { id: payments.length + 1, account: "" }]);
  };

  const removePayment = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box
          sx={{
            padding: 3,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: "4rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#6c5ce7" }}
          >
            STOCK
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Organization</InputLabel>
                <Select>
                  <MenuItem value="org1">Organization 1</MenuItem>
                  <MenuItem value="org2">Organization 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Branch</InputLabel>
                <Select>
                  <MenuItem value="branch1">Branch 1</MenuItem>
                  <MenuItem value="branch2">Branch 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Customer Name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Phone Number" variant="outlined" />
            </Grid>
          </Grid>

          <Box mt={3} p={2} sx={{ border: "1px solid #ccc", borderRadius: 2 }}>
            <Button variant="contained" color="primary">
              Add Device
            </Button>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select>
                    <MenuItem value="cat1">Category 1</MenuItem>
                    <MenuItem value="cat2">Category 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Model</InputLabel>
                  <Select>
                    <MenuItem value="model1">Model 1</MenuItem>
                    <MenuItem value="model2">Model 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Device</InputLabel>
                  <Select>
                    <MenuItem value="device1">Device 1</MenuItem>
                    <MenuItem value="device2">Device 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={2}>
              <RadioGroup
                row
                value={imeiOrSr}
                onChange={(e) => setImeiOrSr(e.target.value)}
              >
                <FormControlLabel
                  value="IMEI"
                  control={<Radio />}
                  label="IMEI No."
                />
                <FormControlLabel
                  value="SR"
                  control={<Radio />}
                  label="SR. No."
                />
              </RadioGroup>
            </Box>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={imeiOrSr === "IMEI" ? "IMEI Number" : "Serial Number"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Total Amount" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Paid To Customer" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Remaining Amount" />
              </Grid>
            </Grid>
          </Box>

          <Box mt={3}>
            <Button variant="contained" component="label" fullWidth>
              Upload File
              <input type="file" hidden />
            </Button>
          </Box>

          <Box mt={3} p={2} sx={{ border: "1px solid #ccc", borderRadius: 2 }}>
            {payments.map((payment) => (
              <Grid container spacing={2} key={payment.id} alignItems="center">
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Account</InputLabel>
                    <Select>
                      <MenuItem value="ICICI">ICICI</MenuItem>
                      <MenuItem value="SBI">State Bank of India</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <TextField fullWidth label="Payment Account" />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => removePayment(payment.id)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={addPayment}>
                Add Payment
              </Button>
            </Box>
          </Box>

          <Box mt={2} display="flex" justifyContent="end" gap={2}>
            <Button variant="outlined" color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StockForm;
