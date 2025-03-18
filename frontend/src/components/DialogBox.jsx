import React, { useState } from "react";

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
import { deleteOrg } from "../apis/OrganizationApi";
import { deleteOrgBranch } from "../apis/OrganizationBranchApi";

const DialogBox = ({ handleClose, open, data, callApi, fieldName }) => {
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
    organization,
    branchName,
    name,
    orgBranch,
  } = data;

  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDeleteDialog = () => {
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    console.log("_id --", _id);

    fieldName == "organizationForm" ? deleteOrg(_id) : deleteOrgBranch(_id);

    alert("deleted");
    setDeleteOpen(false);
    handleClose();
    callApi();
  };

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
        {fieldName == "organizationForm"
          ? "ORGANIZATIONS"
          : fieldName == "organizationBranchForm"
          ? "ORGANIZATIONS BRANCH"
          : fieldName == "userForm"
          ? "USER"
          : ""}
      </DialogTitle>
      <DialogContent>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          {gstNumber && (
            <Typography variant="body1">
              <b>GST IN :</b> {gstNumber}
            </Typography>
          )}
          {primaryAddress && (
            <Typography variant="body1">
              <b>Primary Address :</b> {primaryAddress}
            </Typography>
          )}
          {organizationName && (
            <Typography variant="body1">
              <b>Organization Name :</b> {organizationName}
            </Typography>
          )}
          {branchName && (
            <Typography variant="body1">
              <b>BranchName :</b> {branchName}
            </Typography>
          )}
          {addressLine1 && (
            <Typography variant="body1">
              <b>Address Line 1 :</b> {addressLine1}
            </Typography>
          )}
          {city && (
            <Typography variant="body1">
              <b>City :</b>
              {city}
            </Typography>
          )}
          {addressLine2 && (
            <Typography variant="body1">
              <b>Address Line 2 :</b> {addressLine2}
            </Typography>
          )}
          {district && (
            <Typography variant="body1">
              <b>District :</b>
              {district}
            </Typography>
          )}
          {zipCode && (
            <Typography variant="body1">
              <b>Zip Code :</b> {zipCode}
            </Typography>
          )}
          {state && (
            <Typography variant="body1">
              <b>State :</b> {state}
            </Typography>
          )}
          {telePhone && (
            <Typography variant="body1">
              <b>Tele Phone :</b> {telePhone}
            </Typography>
          )}
          {country && (
            <Typography variant="body1">
              <b>Country :</b>
              {country}
            </Typography>
          )}
          {email && (
            <Typography variant="body1">
              <b>Email :</b>
              {email}
            </Typography>
          )}
          {companyType && (
            <Typography variant="body1">
              <b>Company Reg. Type :</b> {companyType}
            </Typography>
          )}
          {organization && (
            <Typography variant="body1">
              <b>Organization :</b> {organization}
            </Typography>
          )}
          {orgBranch && (
            <Typography variant="body1">
              <b>Organization Branch :</b> {orgBranch}
            </Typography>
          )}
          {name && (
            <Typography variant="body1">
              <b>Name :</b> {name}
            </Typography>
          )}

          {fieldName == "userForm" ? (
            ""
          ) : (
            <>
              <Typography variant="body1">
                <b>Dealing Currency :</b> Rupee's
              </Typography>
              <Typography variant="body1">
                <b>Financial Year :</b> 2024
              </Typography>
              <Typography variant="body1">
                <b>Default Stock Method :</b> mithilshah12@gmail.com
              </Typography>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Link
          to={
            fieldName == "organizationForm"
              ? `/organizationForm/${_id}`
              : fieldName == "userForm"
              ? `/userForm/${_id}`
              : `/organizationBranchForm/${_id}`
          }
        >
          <Button variant="outlined" color="success">
            Edit
          </Button>
        </Link>
        <Button variant="outlined" color="error" onClick={openDeleteDialog}>
          Delete
        </Button>
        <Dialog
          open={deleteOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Are Sure Delete</DialogTitle>
          <DialogActions>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={closeDeleteDialog}>No</Button>
          </DialogActions>
        </Dialog>
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
