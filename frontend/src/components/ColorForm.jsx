import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import { SketchPicker } from "react-color";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createColor, getOneColor, updateColor } from "../apis/ColorApi";
import OrgInput from "./common/OrgInput";
import OrgBranchInput from "./common/OrgBranchInput";
import CategoryInput from "./common/CategoryInput";
import ModelInput from "./common/ModelInput";
import DeviceInput from "./common/DeviceInput";

function ColorForm() {
  const [color, setColor] = useState("#fff"); // Initial color
  const [openPicker, setOpenPicker] = useState(false); // State to toggle the color picker visibility
  const [formData, setFormData] = useState({
    colorName: "",
    organization: null,
    branchName: null,
    categoryId: null,
    modelId: null,
    deviceId: null,
  });

  // Handler when the color is selected
  const handleColorChange = (color) => {
    setColor(color.hex);
    setFormData((prev) => ({
      ...prev,
      colorName: color.hex, // Store selected color in formData
    }));
  };

  const { id } = useParams();

  const navigate = useNavigate();

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [branchId, setBranchId] = useState("");
  const [catId, setCatId] = useState("");
  const [modelId, setModelId] = useState("");

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateColor(
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
        navigate("/colorPage");
      } else {
        await createColor({
          ...formData,
          organization: formData.organization.value,
          branchName: formData.branchName.value,
          categoryId: formData.categoryId.value,
          modelId: formData.modelId.value,
          deviceId: formData.deviceId.value,
        });
        navigate("/colorPage");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneColor(id);
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
          label: response.data.data.modelId.modelName,
          value: response.data.data.modelId._id || "",
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

  console.log("formData==========================", formData);

  return (
    <Box sx={{ display: "flex", marginTop: "4rem" }}>
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
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#6c5ce7" }}
          >
            COLOR
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
                value={formData.branchName}
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
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ height: 55 }}
                onClick={() => setOpenPicker(!openPicker)}
              >
                {openPicker ? "Close Picker" : "Open color Picker"}
              </Button>
            </Grid>
          </Grid>

          {/* Button to toggle the color picker */}

          {/* Conditional rendering of the color picker */}
          {openPicker && (
            <Box sx={{ marginTop: 2 }}>
              <SketchPicker
                color={color}
                onChangeComplete={handleColorChange}
              />
            </Box>
          )}

          {/* Display selected color */}
          <Box
            sx={{
              marginTop: 4,
              padding: "20px",
              backgroundColor: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              color: "white",
            }}
          >
            <Typography variant="h6">Selected Color</Typography>
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
              to="/colorPage"
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
}

export default ColorForm;
