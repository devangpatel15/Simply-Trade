import React, { useEffect, useState } from "react";
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
  MenuItem,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import {
  createOrgBranch,
  updateOrgBranch,
} from "../apis/OrganizationBranchApi";
import OrgInput from "./common/OrgInput";

const OrganizationBranchForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization: null,
    branchName: "",
    primaryAddress: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    district: "",
    zipCode: "",
    country: "",
    telePhone: "",
    mobile: "",
    email: "",
    companyType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "name", "value");

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateOrgBranch(
          { ...formData, organization: formData.organization.value },
          id
        );
      } else {
        await createOrgBranch({
          ...formData,
          organization: formData.organization.value,
        });
      }
      navigate("/organizationBranchPage");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await axios.get(
        `http://localhost:4000/api/findOneOrganizationBranch/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response=========", response.data.data);
      setFormData({
        ...response.data.data,
        organization: {
          label: response.data.data.organization.organizationName,
          value: response.data.data.organization._id || "",
        },
      });
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleOrganizationChange = (selectedOrg) => {
    setFormData((prev) => ({
      ...prev,
      organization: selectedOrg,
      orgId: selectedOrg.value,
    }));
  };

  console.log("finallllllll form data==", formData);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box
          sx={{
            padding: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            margin: "auto",
            marginTop: "4rem",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: " #4C2D85" }}>
            Organizations Branch
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* <TextField
                select
                fullWidth
                label="Organization Name"
                variant="outlined"
                name="organization"
                value={formData.organization || ""}
                onChange={handleChange}
                required
              >
                {organizationOptions.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.organizationName}
                  </MenuItem>
                ))}
              </TextField> */}
              <OrgInput
                onChange={handleOrganizationChange}
                value={formData.organization}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Branch Name"
                variant="outlined"
                name="branchName"
                value={formData.branchName || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Primary Address"
                variant="outlined"
                name="primaryAddress"
                value={formData.primaryAddress || ""}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address Line 1"
                variant="outlined"
                name="addressLine1"
                value={formData.addressLine1 || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address Line 2"
                variant="outlined"
                name="addressLine2"
                value={formData.addressLine2 || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="District"
                variant="outlined"
                name="district"
                value={formData.district || ""}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="State"
                variant="outlined"
                name="state"
                value={formData.state || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Country"
                variant="outlined"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Zip Code"
                variant="outlined"
                name="zipCode"
                value={formData.zipCode || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mobile"
                variant="outlined"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Telephone"
                variant="outlined"
                name="telePhone"
                value={formData.telePhone || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company Registration type"
                variant="outlined"
                name="companyType"
                value={formData.companyType || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                color="error"
                component={Link}
                to="/organizationBranchPage"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
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

export default OrganizationBranchForm;
