import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getOneCategory,
  updateCategory,
} from "../apis/CategoryApi";

import OrgInput from "./common/OrgInput";
import OrgBranchInput from "./common/OrgBranchInput";
import {
  createCustomer,
  getOneCustomer,
  updateCustomer,
} from "../apis/CustomerApi";

const CustomerForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization: null,
    branchName: null,
    customerName: "",
    customerPhone: "",
  });

  const [selectedOrganization, setSelectedOrganization] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateCustomer(
          {
            ...formData,
            organization: formData.organization.value,
            branchName: formData.branchName.value,
          },
          id
        );
        navigate("/customerPage");
      } else {
        await createCustomer({
          ...formData,
          organization: formData.organization.value,
          branchName: formData.branchName.value,
        });
        navigate("/customerPage");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneCustomer(id);
      setFormData({
        ...response.data.data,
        organization: {
          label: response.data.data.organization.organizationName,
          value: response.data.data.organization._id || "",
        },
        branchName: {
          label: response.data.data.branchName.branchName,
          value: response.data.data.branchName._id || "",
        },
      });
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleOrganizationChange = (selectedOrg) => {
    setSelectedOrganization(selectedOrg.value);
    setFormData((prev) => ({
      ...prev,
      organization: selectedOrg,
    }));
  };
  const handleOrganizationBranchChange = (selectedOrgBranch) => {
    setFormData((prev) => ({
      ...prev,
      branchName: selectedOrgBranch,
    }));
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
            Customer
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <OrgInput
                  onChange={handleOrganizationChange}
                  value={formData.organization}
                />
              </Grid>
              <Grid item xs={6}>
                <OrgBranchInput
                  onChange={handleOrganizationBranchChange}
                  value={formData.branchName}
                  selectedOrganization={selectedOrganization}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  variant="outlined"
                  name="customerName"
                  value={formData.customerName || ""}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Customer Phone number"
                  variant="outlined"
                  name="customerPhone"
                  value={formData.customerPhone || ""}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="error"
              component={Link}
              to="/category"
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {id ? "Update" : "Add"}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerForm;
