import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OrgInput from "./common/OrgInput";
import OrgBranchInput from "./common/OrgBranchInput";
import CategoryInput from "./common/CategoryInput";
import ModelInput from "./common/ModelInput";
import DeviceInput from "./common/DeviceInput";
import ColorInput from "./common/ColorInput";

const StockForm = () => {
  const [formData, setFormData] = useState({
    organization: null,
    branchName: null,
    customerName: "",
    customerPhone: "",
    categoryName: null,
    modelName: null,
    deviceName: null,
    capacityName: null,
    color: null,
    imeiNo: "",
    srNo: "",
    totalAmount: "",
    paidToCustomer: "",
    remainingAmount: "",
  });

  const [imeiOrSr, setImeiOrSr] = useState("IMEI");
  const [payments, setPayments] = useState([{ id: 1, account: "" }]);
  const [deviceForm, setDeviceForm] = useState([{ id: 1 }]);
  const [imeiForm, setImeiForm] = useState([{ id: 1 }]);

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [branchId, setBranchId] = useState("");
  const [catId, setCatId] = useState("");
  const [modelId, setModelId] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const addPayment = () => {
    setPayments([...payments, { id: payments.length + 1, account: "" }]);
  };

  const removePayment = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const addDevice = () => {
    setDeviceForm([...deviceForm, { id: deviceForm.length + 1 }]);
  };

  const removeDevice = (id) => {
    setDeviceForm(deviceForm.filter((payment) => payment.id !== id));
  };

  const addImei = () => {
    setImeiForm([...imeiForm, { id: imeiForm.length + 1 }]);
  };

  const removeImei = (id) => {
    setImeiForm(imeiForm.filter((imei) => imei.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    setDeviceId(selectedDevice.value);
    setFormData((prev) => ({
      ...prev,
      deviceId: selectedDevice,
    }));
  };
  const handleColorChange = (selectedColor) => {
    setFormData((prev) => ({
      ...prev,
      color: selectedColor,
    }));
  };

  console.log("formDAta==", formData);

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
            STOCK
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
                label="Phone Name"
                variant="outlined"
                name="customerPhone"
                value={formData.customerPhone || ""}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          {deviceForm.map((item, index) => (
            <Box
              key={index}
              mt={3}
              p={2}
              sx={{ border: "1px solid #ccc", borderRadius: 2 }}
            >
              <Grid container spacing={2} mt={1}>
                <Grid item sx={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addDevice}
                  >
                    Add Device
                  </Button>
                </Grid>
                {item.id > 1 && (
                  <Grid item sx={2}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeDevice(item.id)}
                    >
                      Remove Device
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={4}>
                  <CategoryInput
                    onChange={handleCategoryChange}
                    value={formData.categoryName}
                    branchId={branchId}
                  />
                </Grid>
                <Grid item xs={4}>
                  <ModelInput
                    onChange={handleModelChange}
                    value={formData.modelName}
                    catId={catId}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DeviceInput
                    onChange={handleDeviceChange}
                    value={formData.deviceName}
                    modelId={modelId}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                  <ColorInput
                    onChange={handleColorChange}
                    value={formData.color}
                    deviceId={deviceId}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Capacity</InputLabel>
                    <Select>
                      <MenuItem value="capacity1">Capacity 1</MenuItem>
                      <MenuItem value="capacity2">Capacity 2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {imeiForm.map((imei, imeiIndex) => (
                <>
                  <Box
                    key={imeiIndex}
                    mt={2}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <RadioGroup
                      row
                      value={imeiOrSr}
                      onChange={(e) => setImeiOrSr(e.target.value)}
                    >
                      <FormControlLabel
                        name="Imei"
                        value="IMEI"
                        control={<Radio />}
                        label="IMEI No."
                      />
                      <FormControlLabel
                        name="sr"
                        value="SR"
                        control={<Radio />}
                        label="SR. No."
                      />
                    </RadioGroup>
                    <Box>
                      <Grid container spacing={2}>
                        {imei.id > 1 && (
                          <Grid item sx={2}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => removeImei(imei.id)}
                            >
                              Remove
                            </Button>
                          </Grid>
                        )}
                        <Grid item sx={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={addImei}
                          >
                            Add Imei
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>

                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label={
                          imeiOrSr === "IMEI" ? "IMEI Number" : "Serial Number"
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Total Amount" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Paid To Customer" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Remaining Amount" />
                    </Grid>
                  </Grid>
                </>
              ))}
            </Box>
          ))}

          <Box mt={3}>
            <Button variant="contained" component="label" fullWidth>
              Upload File
              <input type="file" hidden />
            </Button>
          </Box>

          <Box mt={3} p={2} sx={{ border: "1px solid #ccc", borderRadius: 2 }}>
            {payments.map((payment) => (
              <Grid container spacing={2} key={payment.id} alignItems="center">
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Account</InputLabel>
                    <Select>
                      <MenuItem value="ICICI">ICICI</MenuItem>
                      <MenuItem value="SBI">State Bank of India</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <TextField fullWidth label="Payment Account" />
                </Grid>

                <Grid item xs={2}>
                  {payment.id > 1 && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => removePayment(payment.id)}
                    >
                      Remove
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={addPayment}>
                Add Payment
              </Button>
            </Box>
          </Box>

          <Box mt={2} display="flex" justifyContent="end" gap={2}>
            <Button variant="outlined" color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StockForm;
