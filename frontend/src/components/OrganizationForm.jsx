import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    primaryAddress: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    district: "",
    zipCode: "",
    country: "",
    telePhone: "",
    email: "",
    upload: "",
    gstApplicable: "no",
    gstNumber: "",
    companyType: "",
  });

  const [gstApplicable, setGstApplicable] = useState("no");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/createOrg",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Response:", response.data);
      // Redirect or show success message
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  return (
    <Box sx={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box
          sx={{
            padding: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            margin: "auto",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: " #4C2D85" }}>
            Organizations
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Organization Name"
                variant="outlined"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address Line 1"
                variant="outlined"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Primary Address"
                variant="outlined"
                name="primaryAddress"
                value={formData.primaryAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address Line 2"
                variant="outlined"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="State"
                variant="outlined"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="District"
                variant="outlined"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Zip Code"
                variant="outlined"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Country"
                variant="outlined"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Telephone"
                variant="outlined"
                name="telePhone"
                value={formData.telePhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company Registration Type"
                variant="outlined"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl>
                <FormLabel>GST Applicable</FormLabel>
                <RadioGroup
                  row
                  name="gstApplicable"
                  value={formData.gstApplicable}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                    onChange={(e) => setGstApplicable(e.target.value)}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                    onChange={(e) => setGstApplicable(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="file"
                variant="outlined"
                name="upload"
                value={formData.upload}
                onChange={handleChange}
              />
            </Grid>

            {gstApplicable == "yes" && (
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="GST Number"
                  variant="outlined"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="contained" color="error">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                component={Link}
                to="/organizationPage"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizationForm;
