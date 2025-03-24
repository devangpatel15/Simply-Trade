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
import { createStock } from "../apis/StockApi";

const StockForm = () => {
  const [formData, setFormData] = useState({
    organization: null,
    branch: null,
    customerName: "",
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

  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("IMEI");
  const [payments, setPayments] = useState([{ id: 1, account: "" }]);
  const [deviceForm, setDeviceForm] = useState([{ id: 1 }]);
  const [imeiForm, setImeiForm] = useState([{ id: 1 }]);

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [branchId, setBranchId] = useState("");
  const [catId, setCatId] = useState("");
  const [modelId, setModelId] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

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

  const addImei = (deviceIndex) => {
    setFormData((prev) => {
      const updatedDevices = [...prev.device];

      updatedDevices[deviceIndex].imei.push({
        imeiNo: "",
        srNo: "",
        totalAmount: "",
        paidToCustomer: "",
        remainingAmount: "",
      });

      return { ...prev, device: updatedDevices };
    });
  };

  const removeImei = (deviceIndex, imeiIndex) => {
    setFormData((prev) => {
      const updatedDevices = prev.device.map((device, dIndex) => {
        if (dIndex === deviceIndex) {
          return {
            ...device,
            imei: device.imei.filter((_, iIndex) => iIndex !== imeiIndex),
          };
        }
        return device;
      });

      return { ...prev, device: updatedDevices };
    });
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
      branch: selectedOrgBranch,
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

  const handleImeiChange = (deviceIndex, imeiIndex, name, value) => {
    setFormData((prev) => {
      const updatedDevices = [...prev.device];
      const updatedImei = [...updatedDevices[deviceIndex].imei];

      updatedImei[imeiIndex] = {
        ...updatedImei[imeiIndex],
        [name]: value,
      };

      updatedDevices[deviceIndex] = {
        ...updatedDevices[deviceIndex],
        imei: updatedImei,
      };

      return { ...prev, device: updatedDevices };
    });
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields before submission
      if (
        !formData.organization ||
        !formData.branch ||
        !formData.customerName ||
        !formData.customerPhone
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      // Map device data properly to ensure structured API submission
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

      // Construct the final payload
      const payload = {
        ...formData,
        organization: formData.organization?.value || null,
        branch: formData.branch?.value || null,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        device: formattedDevices,
      };

      console.log("Submitting Form Data:", JSON.stringify(payload, null, 2));

      if (id) {
        await updateStock(payload, id);
      } else {
        await createStock(payload);
      }

      alert("Stock successfully saved!");
      navigate("/stockPage");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
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
                value={formData.branch}
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
              {formData.device.map((item) => (
                <>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={4}>
                      <CategoryInput
                        onChange={(selectedCategory) =>
                          handleCategoryChange(index, selectedCategory)
                        }
                        value={formData.device[index]?.categoryName}
                        branchId={branchId}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <ModelInput
                        onChange={(selectedModel) =>
                          handleModelChange(index, selectedModel)
                        }
                        value={formData.device[index]?.modelName}
                        catId={catId}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <DeviceInput
                        onChange={(selectedDevice) =>
                          handleDeviceChange(index, selectedDevice)
                        }
                        value={formData.device[index]?.deviceName}
                        modelId={modelId}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={6}>
                      <ColorInput
                        onChange={(selectedColor) =>
                          handleColorChange(index, selectedColor)
                        }
                        value={formData.device[index]?.color}
                        deviceId={deviceId}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CapacityInput
                        onChange={(selectedCapacity) =>
                          handleCapacityChange(index, selectedCapacity)
                        }
                        value={formData.device[index]?.capacityName}
                        deviceId={deviceId}
                      />
                    </Grid>
                  </Grid>
                  {imeiForm.map((imei, index) => (
                    <>
                      <Box
                        key={index}
                        mt={2}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <RadioGroup
                          row
                          value={selectedOption}
                          onChange={handleRadioChange}
                        >
                          <FormControlLabel
                            value="IMEI"
                            control={<Radio />}
                            label="IMEI No."
                          />
                          <FormControlLabel
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
                                onClick={() => addImei(index)}
                              >
                                Add Imei
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                      {item.imei.map((imeiItem, imeiIndex) => (
                        <Grid container spacing={2} mt={1} key={imeiIndex}>
                          <Grid item xs={6}>
                            {selectedOption === "IMEI" ? (
                              <TextField
                                fullWidth
                                label="IMEI Number"
                                value={imeiItem.imeiNo}
                                name="imeiNo"
                                onChange={(e) =>
                                  handleImeiChange(
                                    index,
                                    imeiIndex,
                                    "imeiNo",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <TextField
                                fullWidth
                                label="SR Number"
                                value={imeiItem.srNo}
                                name="srNo"
                                onChange={(e) =>
                                  handleImeiChange(
                                    index,
                                    imeiIndex,
                                    "srNo",
                                    e.target.value
                                  )
                                }
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
                                  index,
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
                                  index,
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
                                  index,
                                  imeiIndex,
                                  "remainingAmount",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={2}>
                            {imeiIndex > 0 && (
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => removeImei(index, imeiIndex)}
                              >
                                Remove IMEI
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      ))}
                    </>
                  ))}
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
