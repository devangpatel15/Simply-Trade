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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { allUserOrg } from "../apis/OrganizationApi";
import { getOrgBranch } from "../apis/OrganizationBranchApi";
import {
  createCapacity,
  getOneCapacity,
  updateCapacity,
} from "../apis/CapacityApi";
import { getAllDevice } from "../apis/DeviceApi";
import OrgInput from "./common/OrgInput";
import OrgBranchInput from "./common/OrgBranchInput";
import CategoryInput from "./common/CategoryInput";
import ModelInput from "./common/ModelInput";
import DeviceInput from "./common/DeviceInput";

const CapacityForm = () => {
  const { id } = useParams();

  console.log("======id", id);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization: null,
    branchName: null,
    deviceId: null,
    categoryId: null,
    modelId: null,
    capacityName: "",
  });

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [branchId, setBranchId] = useState("");
  const [catId, setCatId] = useState("");
  const [modelId, setModelId] = useState("");

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
        await updateCapacity(
          {
            ...formData,
            organization: formData.organization.value,
            branchName: formData.branchName.value,
            categoryId: formData.categoryId.value,
            modelId: formData.modelId.value,
            deviceId: formData.deviceId.value,
          },
          id
        );
        navigate("/capacityPage");
      } else {
        await createCapacity({
          ...formData,
          organization: formData.organization.value,
          branchName: formData.branchName.value,
          categoryId: formData.categoryId.value,
          modelId: formData.modelId.value,
          deviceId: formData.deviceId.value,
        });
        navigate("/capacityPage");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneCapacity(id);
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
        categoryId: {
          label: response.data.data.categoryId.categoryName,
          value: response.data.data.categoryId._id || "",
        },
        modelId: {
          label: response.data.data.categoryId.modelName,
          value: response.data.data.categoryId._id || "",
        },
        deviceId: {
          label: response.data.data.deviceId.deviceName,
          value: response.data.data.deviceId._id || "",
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
    setBranchId(selectedOrgBranch.value);
    setFormData((prev) => ({
      ...prev,
      branchName: selectedOrgBranch,
    }));
  };
  const handleCategoryChange = (selectedCategory) => {
    setCatId(selectedCategory.value);
    setFormData((prev) => ({
      ...prev,
      categoryId: selectedCategory,
    }));
  };
  const handleModelChange = (selectedModel) => {
    setModelId(selectedModel.value);
    setFormData((prev) => ({
      ...prev,
      modelId: selectedModel,
    }));
  };
  const handleDeviceChange = (selectedDevice) => {
    setFormData((prev) => ({
      ...prev,
      deviceId: selectedDevice,
    }));
  };

  console.log("formData===============", formData);

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
            CAPACITY
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
                  value={formData.orgBranch}
                  selectedOrganization={selectedOrganization}
                />
              </Grid>
              <Grid item xs={6}>
                <CategoryInput
                  onChange={handleCategoryChange}
                  value={formData.categoryId}
                  branchId={branchId}
                />
              </Grid>
              <Grid item xs={6}>
                <ModelInput
                  onChange={handleModelChange}
                  value={formData.modelId}
                  catId={catId}
                />
              </Grid>
              <Grid item xs={6}>
                <DeviceInput
                  onChange={handleDeviceChange}
                  value={formData.deviceId}
                  modelId={modelId}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Capacity"
                  variant="outlined"
                  name="capacityName"
                  value={formData.capacityName || ""}
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
              to="/capacityPage"
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CapacityForm;
