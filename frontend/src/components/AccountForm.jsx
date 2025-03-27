import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OrgInput from "./common/OrgInput";
import OrgBranchInput from "./common/OrgBranchInput";
import {
  createAccount,
  getOneAccount,
  updateAccount,
} from "../apis/AccountApi";

const AccountForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization: null,
    branchName: null,
    accountName: "",
    balance: "",
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
        await updateAccount(
          {
            ...formData,
            organization: formData.organization.value,
            branchName: formData.branchName.value,
          },
          id
        );
        navigate("/accountPage");
      } else {
        await createAccount({
          ...formData,
          organization: formData.organization.value,
          branchName: formData.branchName.value,
        });
        navigate("/accountPage");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneAccount(id);
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
    setFormData((prev) => ({
      ...prev,
      organization: selectedOrg,
    }));
    setSelectedOrganization(selectedOrg.value);
  };

  const handleOrganizationBranchChange = (selectedOrgBranch) => {
    setFormData((prev) => ({
      ...prev,
      branchName: selectedOrgBranch,
    }));
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
              ACCOUNT
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: "#6c5ce7",
                borderColor: "#6c5ce7",
                textTransform: "none",
              }}
              component={Link}
              to="/accountForm"
            >
              Add Account
            </Button>
          </Box>
          <Grid container spacing={2} mt={2}>
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter Account Name"
                variant="outlined"
                name="accountName"
                value={formData.accountName || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter Balance"
                variant="outlined"
                type="number"
                name="balance"
                value={formData.balance || ""}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 2 }}
              onClick={() => navigate("/accountPage")}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountForm;
