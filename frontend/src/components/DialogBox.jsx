import React from "react";

import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Link } from "react-router-dom";

const DialogBox = ({ handleClose, open, data, callApi }) => {
  const {
    primaryAddress,
    organizationName,
    addressLine1,
    city,
    addressLine2,
    district,
    zipCode,
    state,
    country,
    telePhone,
    email,
    gstNumber,
    companyType,
    _id,
  } = data;

  const handleDelete = async () => {
    console.log("_id --", _id);

    try {
      await axios.put(
        `http://localhost:4000/api/deleteOrg/${_id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("deleted");
      handleClose();
      callApi();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = () => {

    
    console.log("22222222");
    
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: " #F8F8FF",
          color: "#4C2D85",
          fontWeight: "bold",
          borderBottom: "2px solid gray",
        }}
      >
        ORGANIZATIONS
      </DialogTitle>
      <DialogContent>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          {gstNumber && (
            <Typography variant="body1">
              <b>GST IN :</b> {gstNumber}
            </Typography>
          )}
          <Typography variant="body1">
            <b>Primary Address :</b> {primaryAddress}
          </Typography>
          <Typography variant="body1">
            <b>Organization Name :</b> {organizationName}
          </Typography>
          <Typography variant="body1">
            <b>Address Line 1 :</b> {addressLine1}
          </Typography>
          <Typography variant="body1">
            <b>City :</b>
            {city}
          </Typography>
          <Typography variant="body1">
            <b>Address Line 2 :</b> {addressLine2}
          </Typography>
          <Typography variant="body1">
            <b>District :</b>
            {district}
          </Typography>
          <Typography variant="body1">
            <b>Zip Code :</b> {zipCode}
          </Typography>
          <Typography variant="body1">
            <b>State :</b> {state}
          </Typography>
          <Typography variant="body1">
            <b>Tele Phone :</b> {telePhone}
          </Typography>
          <Typography variant="body1">
            <b>Country :</b>
            {country}
          </Typography>
          <Typography variant="body1">
            <b>Email :</b>
            {email}
          </Typography>
          <Typography variant="body1">
            <b>Company Reg. Type :</b> {companyType}
          </Typography>
          <Typography variant="body1">
            <b>Dealing Currency :</b> Rupee's
          </Typography>
          <Typography variant="body1">
            <b>Financial Year :</b> 2024
          </Typography>
          <Typography variant="body1">
            <b>Default Stock Method :</b> mithilshah12@gmail.com
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Link to={`/organizationForm/${_id}`}>
          <Button variant="outlined" color="success">
            Edit
          </Button>
        </Link>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
