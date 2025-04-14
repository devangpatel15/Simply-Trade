import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OrgInput from "./common/OrgInput";
import OrgBranchInput from "./common/OrgBranchInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createExpense,
  getOneExpense,
  updateExpense,
} from "../apis/ExpenseApi";
import ModelInput from "./common/ModelInput";
import DeviceInput from "./common/DeviceInput";

const RepairForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    organization: null,
    branchName: null,
    date: "",
    category: "",
    amount: "",
    description: "",
  });

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [branchId, setBranchId] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [catId, setCatId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.organization)
      newErrors.organization = "Organization is required";
    if (!formData.branchName) newErrors.branchName = "Branch Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.category == "Phone") {
      if (!formData.modelName) newErrors.modelName = "modelName is required";
      if (!formData.deviceName) newErrors.deviceName = "deviceName is required";
    }
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.description)
      newErrors.description = "Description is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    console.log("Submitting form data: ", formData);

    let payload;
    if (formData.category == "Phone") {
      payload = {
        organization: formData.organization?.value || "",
        branchName: formData.branchName?.value || "",
        category: formData.category || "",
        modelName: formData.modelName?.value || "",
        deviceName: formData.deviceName?.value || "",
        amount: formData.amount || "",
        date: formData.date || "",
        description: formData.description || "",
      };
    } else {
      payload = {
        organization: formData.organization?.value || "",
        branchName: formData.branchName?.value || "",
        category: formData.category || "",
        amount: formData.amount || "",
        date: formData.date || "",
        description: formData.description || "",
      };
    }

    try {
      if (id) {
        await updateExpense(payload, id); // Update expense using API call
        toast.success("Expense updated successfully!");
      } else {
        await createExpense(payload); // Create new expense using API call
        toast.success("Expense added successfully!");
      }
      navigate("/expensePage");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneExpense(id);
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
    setBranchId(selectedOrgBranch.value);
    setFormData((prev) => ({
      ...prev,
      branchName: selectedOrgBranch,
    }));
  };

  const handleModelChange = (selectedModel) => {
    console.log(selectedModel);
    setSelectedModel(selectedModel?.value);
    setFormData((prev) => ({
      ...prev,
      modelName: selectedModel,
    }));
  };
  const handleDeviceChange = (selectedDevice) => {
    setSelectedDevice(selectedDevice.value);
    setFormData((prev) => ({
      ...prev,
      deviceName: selectedDevice,
    }));
  };

  const handleNativeDateChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      date: value,
    }));
  };

  return (
    <div>
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
              REPAIR
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
                    error={errors.organization}
                  />
                </Grid>

                <Grid item xs={6}>
                  <OrgBranchInput
                    onChange={handleOrganizationBranchChange}
                    value={formData.branchName}
                    selectedOrganization={selectedOrganization}
                    error={errors.branchName}
                  />
                </Grid>

                <Grid item xs={6}>
                  {/* textfield for phonenumber change values and onChange also validation */}
                  <TextField
                    fullWidth
                    type="text"
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.date}
                    onChange={handleNativeDateChange}
                    error={!!errors.date}
                    helperText={errors.date}
                  />
                </Grid>

                <Grid item xs={6}>
                  {/* textfield for customerName change values and onChange also validation */}
                  <TextField
                    fullWidth
                    label="Customer Name"
                    variant="outlined"
                    name="customerName"
                    value={formData.description || ""}
                    onChange={handleChange}
                    required
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </Grid>

                <Grid item xs={12}>
                  {/* textfield for email change values and onChange also validation */}
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={formData.description || ""}
                    onChange={handleChange}
                    required
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      ADD DEVICE
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <ModelInput
                    branchId={branchId}
                    onChange={handleModelChange}
                    value={formData.modelName}
                    error={errors.modelName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DeviceInput
                    modelId={selectedModel}
                    onChange={handleDeviceChange}
                    value={formData.deviceName}
                    error={errors.deviceName}
                  />
                </Grid>

                <Grid item xs={6}>
                  {/* textfield for amount change values and onChange also validation */}
                  <TextField
                    fullWidth
                    label="Amount"
                    variant="outlined"
                    name="amount"
                    value={formData.amount || ""}
                    onChange={handleChange}
                    required
                    error={!!errors.amount}
                    helperText={errors.amount}
                  />
                </Grid>

                <Grid item xs={6}>
                  {/* textfield for estimatedCost change values and onChange also validation */}
                  <TextField
                    fullWidth
                    label="Estimated Cost"
                    variant="outlined"
                    name="estimatedCost"
                    value={formData.amount || ""}
                    onChange={handleChange}
                    required
                    error={!!errors.amount}
                    helperText={errors.amount}
                  />
                </Grid>

                <Grid item xs={6}>
                  {/* textfield for status change values and onChange also validation */}
                  <TextField
                    fullWidth
                    label="Status"
                    variant="outlined"
                    name="status"
                    value={formData.description || ""}
                    onChange={handleChange}
                    required
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    name="date"
                    value={formData.date}
                    onChange={handleNativeDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.date}
                    helperText={errors.date}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Stack>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      UPLOAD
                    </Button>
                  </Stack>
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
                to="/repairPage"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {id ? "Update" : "Add"}
              </Button>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default RepairForm;
