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
import CapacityInput from "./common/CapacityInput";
import { useNavigate, useParams } from "react-router-dom";
import { createStock, updateStock } from "../apis/StockApi";
import CustomerInput from "./common/CustomerInput";

const StockForm = () => {
  const [formData, setFormData] = useState({
    organization: null,
    branch: null,
    customerName: null,
    customerPhone: "",
    device: [
      {
        categoryName: null,
        modelName: null,
        deviceName: null,
        capacityName: null,
        color: null,
        imei: [
          {
            imeiNo: "",
            srNo: "",
            totalAmount: "",
            paidToCustomer: "",
            remainingAmount: "",
          },
        ],
      },
    ],
  });

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [branchId, setBranchId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [catId, setCatId] = useState("");
  const [modelId, setModelId] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const { paramsId } = useParams();
  const navigate = useNavigate();

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
      branch: selectedOrgBranch,
    }));
  };

  const handleCustomerChange = (selectCustomer) => {
    setSelectedCustomer(selectCustomer.value);
    setFormData((prev) => ({
      ...prev,
      customerName: selectCustomer,
    }));
  };

  const handleCategoryChange = (index, selectedCategory) => {
    setCatId(selectedCategory.value);
    setFormData((prev) => {
      const updatedDevices = [...prev.device];
      updatedDevices[index] = {
        ...updatedDevices[index],
        categoryName: selectedCategory,
        modelName: null, // Reset dependent values
        deviceName: null,
      };
      return { ...prev, device: updatedDevices };
    });
  };

  const handleModelChange = (index, selectedModel) => {
    setModelId(selectedModel.value);
    setFormData((prev) => {
      const updatedDevices = [...prev.device];
      updatedDevices[index] = {
        ...updatedDevices[index],
        modelName: selectedModel,
        deviceName: null, // Reset dependent values
      };
      return { ...prev, device: updatedDevices };
    });
  };

  const handleDeviceChange = (index, selectedDevice) => {
    setDeviceId(selectedDevice.value);
    setFormData((prev) => {
      const updatedDevices = [...prev.device];
      updatedDevices[index] = {
        ...updatedDevices[index],
        deviceName: selectedDevice,
      };
      return { ...prev, device: updatedDevices };
    });
  };

  const handleColorChange = (index, selectedColor) => {
    setFormData((prev) => {
      const updatedDevices = [...prev.device];
      updatedDevices[index] = {
        ...updatedDevices[index],
        color: selectedColor,
      };
      return { ...prev, device: updatedDevices };
    });
  };

  const handleCapacityChange = (index, selectedCapacity) => {
    setFormData((prev) => {
      const updatedDevices = [...prev.device];
      updatedDevices[index] = {
        ...updatedDevices[index],
        capacityName: selectedCapacity,
      };
      return { ...prev, device: updatedDevices };
    });
  };

  const handleImeiChange = (deviceIndex, imeiIndex, field, value) => {
    const updatedDeviceData = [...formData.device];
    updatedDeviceData[deviceIndex].imei[imeiIndex][field] = value;
    setFormData({ ...formData, device: updatedDeviceData });
  };

  const toggleImeiSr = (deviceIndex, imeiIndex, useImei) => {
    const updatedDeviceData = [...formData.device];
    updatedDeviceData[deviceIndex].imei[imeiIndex].useImei = useImei;
    setFormData({ ...formData, device: updatedDeviceData });
  };

  const addDevice = () => {
    setFormData((prev) => ({
      ...prev,
      device: [
        ...prev.device,
        {
          categoryName: null,
          modelName: null,
          deviceName: null,
          capacityName: null,
          color: null,
          imei: [
            {
              imeiNo: "",
              srNo: "",
              useImei: true,
              totalAmount: "",
              paidToCustomer: "",
              remainingAmount: "",
            },
          ],
        },
      ],
    }));
  };

  const removeDevice = (index) => {
    const updatedDeviceData = [...formData.device];
    updatedDeviceData.splice(index, 1);
    setFormData({ ...formData, device: updatedDeviceData });
  };

  const addImei = (deviceIndex) => {
    const updatedDeviceData = [...formData.device];
    updatedDeviceData[deviceIndex].imei.push({
      imeiNo: "",
      srNo: "",
      useImei: true,
      totalAmount: "",
      paidToCustomer: "",
      remainingAmount: "",
    });
    setFormData({ ...formData, device: updatedDeviceData });
  };

  const removeImei = (deviceIndex, imeiIndex) => {
    const updatedDeviceData = [...formData.device];
    updatedDeviceData[deviceIndex].imei.splice(imeiIndex, 1);
    setFormData({ ...formData, device: updatedDeviceData });
  };

  const handleSubmit = async () => {
    console.log(formData);

    try {
      const formattedDevices = formData.device.map((deviceItem) => ({
        categoryName: deviceItem.categoryName?.value || null,
        modelName: deviceItem.modelName?.value || null,
        deviceName: deviceItem.deviceName?.value || null,
        capacityName: deviceItem.capacityName?.value || null,
        color: deviceItem.color?.value || null,
        imei: deviceItem.imei.map((imeiItem) => ({
          imeiNo: imeiItem.imeiNo || "",
          srNo: imeiItem.srNo || "",
          totalAmount: imeiItem.totalAmount || "",
          paidToCustomer: imeiItem.paidToCustomer || "",
          remainingAmount: imeiItem.remainingAmount || "",
        })),
      }));

      const payload = {
        ...formData,
        organization: formData.organization?.value || null,
        branch: formData.branch?.value || null,
        customerName: formData.customerName?.value || null,
        customerPhone: formData.customerPhone,
        device: formattedDevices,
      };

      if (paramsId) {
        await updateStock(payload, paramsId);
      } else {
        await createStock(payload);
      }
    } catch (error) {
      console.log(error.message);
    }
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
                value={formData.branch}
                selectedOrganization={selectedOrganization}
              />
            </Grid>
            <Grid item xs={6}>
              {/* <TextField
                fullWidth
                label="Customer Name"
                variant="outlined"
                name="customerName"
                value={formData.customerName || ""}
                onChange={handleChange}
                required
              /> */}
              <CustomerInput
                onChange={handleCustomerChange}
                value={formData.customerName}
                selectedCustomer={selectedCustomer}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="customerPhone"
                value={formData.customerPhone || ""}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          {formData.device.map((item, deviceIndex) => (
            <Box
              key={deviceIndex}
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
                {deviceIndex > 0 && (
                  <Grid item sx={2}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeDevice(deviceIndex)}
                    >
                      Remove Device
                    </Button>
                  </Grid>
                )}
              </Grid>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={4}>
                  <CategoryInput
                    onChange={(selectedCategory) =>
                      handleCategoryChange(deviceIndex, selectedCategory)
                    }
                    value={formData.device[deviceIndex]?.categoryName}
                    branchId={branchId}
                  />
                </Grid>
                <Grid item xs={4}>
                  <ModelInput
                    onChange={(selectedModel) =>
                      handleModelChange(deviceIndex, selectedModel)
                    }
                    value={formData.device[deviceIndex]?.modelName}
                    catId={catId}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DeviceInput
                    onChange={(selectedDevice) =>
                      handleDeviceChange(deviceIndex, selectedDevice)
                    }
                    value={formData.device[deviceIndex]?.deviceName}
                    modelId={modelId}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                  <ColorInput
                    onChange={(selectedColor) =>
                      handleColorChange(deviceIndex, selectedColor)
                    }
                    value={formData.device[deviceIndex]?.color}
                    deviceId={deviceId}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CapacityInput
                    onChange={(selectedCapacity) =>
                      handleCapacityChange(deviceIndex, selectedCapacity)
                    }
                    value={formData.device[deviceIndex]?.capacityName}
                    deviceId={deviceId}
                  />
                </Grid>
              </Grid>

              {item.imei.map((imeiItem, imeiIndex) => (
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
                      value={imeiItem.useImei ? "imei" : "sr"}
                      onChange={(e) =>
                        toggleImeiSr(
                          deviceIndex,
                          imeiIndex,
                          e.target.value === "imei"
                        )
                      }
                    >
                      <FormControlLabel
                        value="imei"
                        control={<Radio />}
                        label="IMEI No"
                      />
                      <FormControlLabel
                        value="sr"
                        control={<Radio />}
                        label="Serial No"
                      />
                    </RadioGroup>

                    <Box>
                      <Grid container spacing={2}>
                        {imeiIndex > 0 && (
                          <Grid item sx={2}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => removeImei(deviceIndex, imeiIndex)}
                            >
                              Remove
                            </Button>
                          </Grid>
                        )}
                        <Grid item sx={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addImei(deviceIndex)}
                          >
                            Add Imei
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Grid container spacing={2} mt={1} key={imeiIndex}>
                    <Grid item xs={6}>
                      {imeiItem.useImei ? (
                        <TextField
                          label="IMEI No"
                          value={imeiItem.imeiNo}
                          onChange={(e) =>
                            handleImeiChange(
                              deviceIndex,
                              imeiIndex,
                              "imeiNo",
                              e.target.value
                            )
                          }
                          fullWidth
                          margin="normal"
                        />
                      ) : (
                        <TextField
                          label="Serial No"
                          value={imeiItem.srNo}
                          onChange={(e) =>
                            handleImeiChange(
                              deviceIndex,
                              imeiIndex,
                              "srNo",
                              e.target.value
                            )
                          }
                          fullWidth
                          margin="normal"
                        />
                      )}
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Total Amount"
                        name="totalAmount"
                        value={imeiItem.totalAmount}
                        onChange={(e) =>
                          handleImeiChange(
                            deviceIndex,
                            imeiIndex,
                            "totalAmount",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Paid To Customer"
                        name="paidToCustomer"
                        value={imeiItem.paidToCustomer}
                        onChange={(e) =>
                          handleImeiChange(
                            deviceIndex,
                            imeiIndex,
                            "paidToCustomer",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Remaining Amount"
                        name="remainingAmount"
                        value={imeiItem.remainingAmount}
                        onChange={(e) =>
                          handleImeiChange(
                            deviceIndex,
                            imeiIndex,
                            "remainingAmount",
                            e.target.value
                          )
                        }
                      />
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

          {/* <Box mt={3} p={2} sx={{ border: "1px solid #ccc", borderRadius: 2 }}>
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
          </Box> */}

          <Box mt={2} display="flex" justifyContent="end" gap={2}>
            <Button variant="outlined" color="primary">
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

export default StockForm;
