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
import { createUser, getOneUser, updateUser } from "../apis/UserApi";
import OrgInput from "./common/OrgInput";
import OrgBranchInput from "./common/OrgBranchInput";

const UserForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization: null,
    orgBranch: null,
    name: "",
    email: "",
    mobileNo: "",
    password: "",
  });
  const [selectedOrganization, setSelectedOrganization] = useState("");

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
        await updateUser(
          {
            ...formData,
            organization: formData.organization.value,
            orgBranch: formData.orgBranch.value,
          },
          id
        );
        navigate("/userPage");
      } else {
        await createUser({
          ...formData,
          organization: formData.organization.value,
          orgBranch: formData.orgBranch.value,
        });
        navigate("/userPage");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneUser(id);
      console.log("response=========", response.data.data);
      setFormData({
        ...response.data.data,
        organization: {
          label: response.data.data.organization.organizationName,
          value: response.data.data.organization._id || "",
        },
        orgBranch: {
          label: response.data.data.orgBranch.branchName,
          value: response.data.data.orgBranch._id || "",
        },
      });
    }
  };

  console.log("formData", formData);

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
      orgBranch: selectedOrgBranch,
    }));
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
            User
          </Typography>

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
                value={formData.orgBranch}
                selectedOrganization={selectedOrganization}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter Name"
                variant="outlined"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter Email Address"
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
                label="Enter Phone Number"
                variant="outlined"
                name="mobileNo"
                value={formData.mobileNo || ""}
                onChange={handleChange}
                required
              />
            </Grid>
            {!id && (
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Enter Password"
                  variant="outlined"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                color="error"
                component={Link}
                to="/userPage"
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

export default UserForm;
