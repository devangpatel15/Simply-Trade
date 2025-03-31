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
import { errorMessage } from "../../errorMessage";

const CategoryForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    categoryName: "",
    orgBranchId: null,
    orgId: null,
  });

  const [selectedOrganization, setSelectedOrganization] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.orgId) newErrors.orgId = errorMessage.organizationName;
    if (!formData.orgBranchId) newErrors.orgBranchId = errorMessage.branchName;
    if (!formData.categoryName)
      newErrors.categoryName = errorMessage.categoryName;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      if (id) {
        await updateCategory(
          {
            ...formData,
            orgId: formData.orgId.value,
            orgBranchId: formData.orgBranchId.value,
          },
          id
        );
        navigate("/category");
      } else {
        await createCategory({
          ...formData,
          orgId: formData.orgId.value,
          orgBranchId: formData.orgBranchId.value,
        });
        navigate("/category");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneCategory(id);
      setFormData({
        ...response.data.data,
        orgId: {
          label: response.data.data.orgId.organizationName,
          value: response.data.data.orgId._id || "",
        },
        orgBranchId: {
          label: response.data.data.orgBranchId.branchName,
          value: response.data.data.orgBranchId._id || "",
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
      orgId: selectedOrg,
    }));
  };
  const handleOrganizationBranchChange = (selectedOrgBranch) => {
    setFormData((prev) => ({
      ...prev,
      orgBranchId: selectedOrgBranch,
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
            CATEGORY
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/* <TextField
                  select
                  fullWidth
                  label="Organization Name"
                  variant="outlined"
                  name="orgId"
                  value={formData.orgId || ""}
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
                  value={formData.orgId}
                  error={errors.orgId}
                />
              </Grid>
              <Grid item xs={6}>
                {/* <TextField
                  select
                  fullWidth
                  label="Organization Branch"
                  variant="outlined"
                  name="orgBranchId"
                  value={formData.orgBranchId || ""}
                  onChange={handleChange}
                  required
                >
                  {branchOptions.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.branchName}
                    </MenuItem>
                  ))}
                </TextField> */}
                <OrgBranchInput
                  onChange={handleOrganizationBranchChange}
                  value={formData.orgBranchId}
                  selectedOrganization={selectedOrganization}
                  error={errors.orgBranchId}
                />
              </Grid>
            </Grid>
          </Box>

          <TextField
            fullWidth
            label="Category"
            variant="outlined"
            name="categoryName"
            value={formData.categoryName || ""}
            onChange={handleChange}
            required
            error={!!errors.categoryName}
            helperText={errors.categoryName}
          />

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

export default CategoryForm;
