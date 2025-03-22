import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  IconButton,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const StockDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} handleClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#EEE", fontWeight: "bold" }}>
        STOCK
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Organization & Customer Details */}
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={6}>
            <Typography>
              <strong>Organization:</strong> Isscon
            </Typography>
            <Typography>
              <strong>Customer Name:</strong> Amit Satani
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Branch:</strong> Phone
            </Typography>
            <Typography>
              <strong>Customer Phone:</strong> +91 6353611517
            </Typography>
          </Grid>
        </Grid>

        {/* Device Details */}
        <Card sx={{ my: 2, p: 2 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <PhoneAndroidIcon sx={{ mr: 1 }} /> Device Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Avatar
                variant="rounded"
                sx={{ width: "100%", height: "auto" }}
                src="https://via.placeholder.com/100"
                alt="Device Image"
              />
            </Grid>
            <Grid item xs={9}>
              <Typography>
                <strong>Category:</strong> Mobile
              </Typography>
              <Typography>
                <strong>Model:</strong> Samsung
              </Typography>
              <Typography>
                <strong>Device:</strong> S24 Ultra
              </Typography>
              <Typography>
                <strong>Capacity:</strong> 512 Gb / 12 Gb
              </Typography>
              <Typography>
                <strong>Color:</strong> Black
              </Typography>
              <Typography>
                <strong>IMEI No.:</strong> 865577006455027
              </Typography>
              <Typography sx={{ color: "green" }}>
                <strong>Total Amount:</strong> 75,5678/-
              </Typography>
              <Typography sx={{ color: "red" }}>
                <strong>Remaining Amount:</strong> 75,5678/-
              </Typography>
            </Grid>
          </Grid>
        </Card>

        {/* Payment Details */}
        <Card sx={{ my: 2, p: 2 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <AccountBalanceIcon sx={{ mr: 1 }} /> Payment Details
          </Typography>
          <Typography>
            <strong>Payment Account:</strong> Sate Bank Of India
          </Typography>
          <Typography sx={{ color: "red" }}>
            <strong>Payment Amount:</strong> 75,5678/-
          </Typography>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default StockDialog;
