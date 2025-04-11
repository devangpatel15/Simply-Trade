import React, { useEffect, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { createStock, getOneStock, updateStock } from "../apis/StockApi";
import CustomerInput from "./common/CustomerInput";
import { getOneCustomer } from "../apis/CustomerApi";
import { errorMessage, formatMessage, lengthMessage } from "../../errorMessage";

const StockForm = () => {
  const [errors, setErrors] = useState({});

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
    upload: "",
  });

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [branchId, setBranchId] = useState("");
  const [catId, setCatId] = useState("");
  const [modelId, setModelId] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const [totalAmount, setTotalAmount] = useState(0);
  const [paidToCustomer, setPaidtoCustomer] = useState(0);

  const [loggedUserData, setLoggedUserData] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const file = files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      console.log("Base64 String:", base64); // optional
      // Now you can store base64 in your form state or send it to your database
      setFormData((prev) => ({ ...prev, upload: base64 }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // This returns base64 with data:[mime];base64,...
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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

  const handleCustomerChange = async (selectCustomer) => {
    if (selectCustomer && selectCustomer !== null) {
      const findCustomerPhoneNumber = await getOneCustomer(
        selectCustomer.value
      );

      setFormData({
        ...formData,
        customerPhone: findCustomerPhoneNumber?.data?.data?.customerPhone || "",
      });
    } else {
      setFormData({
        ...formData,
        customerPhone: "",
      });
    }

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
        modelName: null,
        deviceName: null,
        capacityName: null,
        color: null,
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
        capacityName: null,
        color: null,
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
        capacityName: null,
        color: null,
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
        capacityName: null,
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

  useEffect(() => {
    const userData = localStorage.getItem("role");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);

        setLoggedUserData(parsedData || {});
        if (!parsedData?.organization || !parsedData?.orgBranch) {
          console.warn("Organization or branch data is missing!");
        }

        // ✅ Set both organization and branch in a single update
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            organization: parsedData?.organization?._id
              ? {
                  label: parsedData?.organization?.organizationName,
                  value: parsedData.organization._id,
                }
              : null,
            branch: parsedData?.orgBranch?._id
              ? {
                  label: parsedData?.orgBranch?.branchName,
                  value: parsedData.orgBranch._id,
                }
              : null,
          };
          return updatedFormData;
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const callApi = async () => {
    try {
      if (!id) return; // Ensure ID is present

      const response = await getOneStock(id);

      // Check if response and data exist
      if (!response?.data?.data) {
        console.error("API response is empty or invalid");
        return;
      }

      const data = response.data.data;
      console.log("API update Response Data:", data); // Debugging

      setFormData({
        organization: {
          label: data?.organization?.organizationName || "",
          value: data?.organization?._id || "",
        },
        branch: {
          label: data?.branch?.branchName || "",
          value: data?.branch?._id || "",
        },
        customerName: {
          label: data?.customerName?.customerName || "",
          value: data?.customerName?._id || "",
        },
        customerPhone: data?.customerPhone || "",
        device: [
          {
            categoryName: {
              label: data?.categoryName?.categoryName || "",
              value: data?.categoryName?._id || "",
            },
            modelName: {
              label: data?.modelName?.modelName || "",
              value: data?.modelName?._id || "",
            },
            deviceName: {
              label: data?.deviceName?.deviceName || "",
              value: data?.deviceName?._id || "",
            },
            capacityName: {
              label: data?.capacityName?.capacityName || "",
              value: data?.capacityName?._id || "",
            },
            color: {
              label: data?.color?.colorName || "",
              value: data?.color?._id || "",
            },
            imei: [
              {
                imeiNo: data.imeiNo,
                srNo: data.srNo,
                totalAmount: data.totalAmount,
                paidToCustomer: data.paidToCustomer,
                remainingAmount: data.remainingAmount,
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error in callApi:", error);
    }
  };
  if (id) {
    console.log("update form data:", formData);
  }

  useEffect(() => {
    if (id) {
      callApi();
    }
  }, [id]);

  const validateStockForm = () => {
    let newErrors = {};

    // Validate organization, branch, and customerName
    if (!formData.organization)
      newErrors.organization = errorMessage.organizationName;
    if (!formData.branch) newErrors.branch = errorMessage.branchName;
    if (!formData.customerName)
      newErrors.customerName = errorMessage.customerName;
    if (!formData.customerPhone) newErrors.customerPhone = errorMessage.mobile;

    // Validate customerPhone format (assuming it's a phone number, simple example)
    if (formData.customerPhone && !/^\d+$/.test(formData.customerPhone)) {
      newErrors.customerPhone = formatMessage.customerPhone;
    } else if (formData.customerPhone && formData.customerPhone.length !== 10) {
      newErrors.customerPhone = lengthMessage.mobile;
    }

    // Validate deviceData array
    if (Array.isArray(formData.device)) {
      formData.device.forEach((device, index) => {
        if (!device.categoryName) {
          if (!newErrors.device) newErrors.device = [];
          newErrors.device[index] = newErrors.device[index] || {};
          newErrors.device[index].categoryName = errorMessage.categoryName;
        }
        if (!device.modelName) {
          if (!newErrors.device) newErrors.device = [];
          newErrors.device[index] = newErrors.device[index] || {};
          newErrors.device[index].modelName = errorMessage.modelName;
        }
        if (!device.deviceName) {
          if (!newErrors.device) newErrors.device = [];
          newErrors.device[index] = newErrors.device[index] || {};
          newErrors.device[index].deviceName = errorMessage.deviceName;
        }
        if (!device.capacityName) {
          if (!newErrors.device) newErrors.device = [];
          newErrors.device[index] = newErrors.device[index] || {};
          newErrors.device[index].capacityName = errorMessage.capacityName;
        }
        if (!device.color) {
          if (!newErrors.device) newErrors.device = [];
          newErrors.device[index] = newErrors.device[index] || {};
          newErrors.device[index].color = errorMessage.colorName;
        }

        console.log("newErrors",newErrors);
        
        // Validate imei array inside each device
        if (Array.isArray(device.imei)) {
          device.imei.forEach((imei, imeiIndex) => {
            if (!imei.imeiNo) {
              if (!newErrors.device[index].imei)
                newErrors.device[index].imei = [];
              newErrors.device[index].imei[imeiIndex] =
                newErrors.device[index].imei[imeiIndex] || {};
              newErrors.device[index].imei[imeiIndex].imeiNo =
                errorMessage.imeiNo;
            }
            if (!imei.totalAmount) {
              if (!newErrors.device[index].imei)
                newErrors.device[index].imei = [];
              newErrors.device[index].imei[imeiIndex] =
                newErrors.device[index].imei[imeiIndex] || {};
              newErrors.device[index].imei[imeiIndex].totalAmount =
                errorMessage.totalAmount;
            }
            if (!imei.paidToCustomer) {
              if (!newErrors.device[index].imei)
                newErrors.device[index].imei = [];
              newErrors.device[index].imei[imeiIndex] =
                newErrors.device[index].imei[imeiIndex] || {};
              newErrors.device[index].imei[imeiIndex].paidToCustomer =
                errorMessage.paidToCustomer;
            }
            if (!imei.remainingAmount) {
              if (!newErrors.device[index].imei)
                newErrors.device[index].imei = [];
              newErrors.device[index].imei[imeiIndex] =
                newErrors.device[index].imei[imeiIndex] || {};
              newErrors.device[index].imei[imeiIndex].remainingAmount =
                errorMessage.remainingAmount;
            }
          });
        }
      });
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async () => {
    console.log(formData,"formData");
    
    // if (!validateStockForm()) {
    //   return;
    // }

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
      if (id) {
        console.log("payload", payload);
        await updateStock(payload, id);
        navigate("/stockPage");
      } else {
        await createStock(payload);
        navigate("/stockPage");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("error", errors);

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
              {loggedUserData.role == "admin" ? (
                <OrgInput
                  role="admin"
                  onChange={handleOrganizationChange}
                  value={formData.organization} // Now it's an object, not undefined
                  error={errors.organization}
                />
              ) : (
                <OrgInput
                  role="user"
                  onChange={handleOrganizationChange}
                  value={formData.organization || null} // ✅ Prevent undefined
                  error={errors.organization}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              {loggedUserData.role == "admin" ? (
                <OrgBranchInput
                  role="admin"
                  onChange={handleOrganizationBranchChange}
                  value={formData.branch || null} // ✅ Ensure branch is always an object or null
                  selectedOrganization={selectedOrganization}
                  error={errors.branch}
                />
              ) : (
                <OrgBranchInput
                  role="user"
                  onChange={handleOrganizationBranchChange}
                  value={formData.branch || null} // ✅ Ensure branch is always an object or null
                  selectedOrganization={selectedOrganization}
                  // error={errors.branch}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <CustomerInput
                onChange={handleCustomerChange}
                value={formData.customerName}
                branchId={formData?.branch?.value}
                error={errors.customerName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                type="number"
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

          {formData?.device?.map((item, deviceIndex) => (
            <Box
              key={`device-${deviceIndex}`}
              mt={3}
              p={2}
              sx={{ border: "1px solid #ccc", borderRadius: 2 }}
            >
              <Grid container spacing={2} mt={1}>
                <Grid item sx={2}>
                  {id ? (
                    " "
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addDevice}
                    >
                      Add Device
                    </Button>
                  )}
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
                    branchId={formData?.branch?.value}
                    error={
                      (errors &&
                        errors.device &&
                        errors.device[deviceIndex] &&
                        errors.device[deviceIndex].categoryName) ||
                      ""
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <ModelInput
                    onChange={(selectedModel) =>
                      handleModelChange(deviceIndex, selectedModel)
                    }
                    value={formData.device[deviceIndex]?.modelName}
                    catId={catId}
                    error={
                      (errors &&
                        errors.device &&
                        errors.device[deviceIndex] &&
                        errors.device[deviceIndex].modelName) ||
                      ""
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <DeviceInput
                    onChange={(selectedDevice) =>
                      handleDeviceChange(deviceIndex, selectedDevice)
                    }
                    value={formData.device[deviceIndex]?.deviceName}
                    modelId={modelId}
                    error={
                      (errors &&
                        errors.device &&
                        errors.device[deviceIndex] &&
                        errors.device[deviceIndex].deviceName) ||
                      ""
                    }
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
                    error={
                      (errors &&
                        errors.device &&
                        errors.device[deviceIndex] &&
                        errors.device[deviceIndex].color) ||
                      ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <CapacityInput
                    onChange={(selectedCapacity) =>
                      handleCapacityChange(deviceIndex, selectedCapacity)
                    }
                    value={formData.device[deviceIndex]?.capacityName}
                    deviceId={deviceId}
                    error={
                      (errors &&
                        errors.device &&
                        errors.device[deviceIndex] &&
                        errors.device[deviceIndex].capacityName) ||
                      ""
                    }
                  />
                </Grid>
                {/* <Grid item xs={4}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Quantity "
                    variant="outlined"
                    name="quantity"
                    value={formData.quantity || ""}
                    onChange={handleChange}
                  />
                </Grid> */}
              </Grid>

              {item.imei.map((imeiItem, imeiIndex) => (
                <Box key={`imei-${deviceIndex}-${imeiIndex}`}>
                  <Box
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
                          {id ? (
                            " "
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => addImei(deviceIndex)}
                            >
                              Add Imei
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Grid container spacing={2} mt={1} key={imeiIndex}>
                    <Grid item xs={12}>
                      {imeiItem.useImei ? (
                        <TextField
                          label={`IMEI No ${imeiIndex + 1}`}
                          value={imeiItem.imeiNo}
                          onChange={(e) =>
                            handleImeiChange(
                              deviceIndex,
                              imeiIndex,
                              "imeiNo",
                              e.target.value
                            )
                          }
                          required
                         
                          error={
                            !!(
                              errors &&
                              errors.device &&
                              errors.device[deviceIndex] &&
                              errors.device[deviceIndex].imei[imeiIndex] &&
                              errors.device[deviceIndex].imei[imeiIndex].imeiNo
                            ) 
                          }
                          helperText={
                            (
                              errors &&
                              errors.device &&
                              errors.device[deviceIndex] &&
                              errors.device[deviceIndex].imei[imeiIndex] &&
                              errors.device[deviceIndex].imei[imeiIndex].imeiNo
                            ) || ""
                          }
                          fullWidth
                          margin="normal"
                        />
                      ) : (
                        <TextField
                          label={`Serial No ${imeiIndex + 1}`}
                          value={imeiItem.srNo}
                          onChange={(e) =>
                            handleImeiChange(
                              deviceIndex,
                              imeiIndex,
                              "srNo",
                              e.target.value
                            )
                          }
                          error={
                            !!(
                              errors &&
                              errors.device &&
                              errors.device[deviceIndex] &&
                              errors.device[deviceIndex].imei[imeiIndex] &&
                              errors.device[deviceIndex].imei[imeiIndex].srNo
                            ) 
                          }
                          helperText={
                            (
                              errors &&
                              errors.device &&
                              errors.device[deviceIndex] &&
                              errors.device[deviceIndex].imei[imeiIndex] &&
                              errors.device[deviceIndex].imei[imeiIndex].srNo
                            ) || ""
                          }
                          fullWidth
                          margin="normal"
                        />
                      )}
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Total Amount"
                        name="totalAmount"
                        value={imeiItem.totalAmount}
                        type="number"
                        onChange={(e) => {
                          handleImeiChange(
                            deviceIndex,
                            imeiIndex,
                            "totalAmount",
                            e.target.value
                          );
                          setTotalAmount(e.target.value);
                        }}
                        error={
                          !!(
                            errors &&
                            errors.device &&
                            errors.device[deviceIndex] &&
                            errors.device[deviceIndex].imei[imeiIndex] &&
                            errors.device[deviceIndex].imei[imeiIndex].totalAmount
                          ) 
                        }
                        helperText={
                          (
                            errors &&
                            errors.device &&
                            errors.device[deviceIndex] &&
                            errors.device[deviceIndex].imei[imeiIndex] &&
                            errors.device[deviceIndex].imei[imeiIndex].totalAmount
                          ) || ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Paid To Customer"
                        name="paidToCustomer"
                        value={imeiItem.paidToCustomer}
                        onChange={(e) => {
                          handleImeiChange(
                            deviceIndex,
                            imeiIndex,
                            "paidToCustomer",
                            e.target.value
                          );
                          setPaidtoCustomer(e.target.value);
                        }}
                        error={
                          !!(
                            errors &&
                            errors.device &&
                            errors.device[deviceIndex] &&
                            errors.device[deviceIndex].imei[imeiIndex] &&
                            errors.device[deviceIndex].imei[imeiIndex].paidToCustomer
                          ) 
                        }
                        helperText={
                          (
                            errors &&
                            errors.device &&
                            errors.device[deviceIndex] &&
                            errors.device[deviceIndex].imei[imeiIndex] &&
                            errors.device[deviceIndex].imei[imeiIndex].paidToCustomer
                          ) || ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        type="number"
                        aria-readonly
                        fullWidth
                        label="Remaining Amount"
                        name="remainingAmount"
                        value={
                          // imeiItem.remainingAmount ||
                          (imeiItem.remainingAmount =
                            totalAmount - paidToCustomer || "")
                        }
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
                </Box>
              ))}
            </Box>
          ))}

          <Box mt={3}>
            <Button variant="contained" component="label" fullWidth>
              Upload File
              <input type="file" onChange={handleChange} hidden />
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
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/stockPage"
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

export default StockForm;
