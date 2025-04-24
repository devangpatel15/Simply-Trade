import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OrgInput from "./common/OrgInput";
import OrgBranchInput from "./common/OrgBranchInput";
import CategoryInput from "./common/CategoryInput";
import ModelInput from "./common/ModelInput";
import DeviceInput from "./common/DeviceInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createStock, getOneStock, updateStock } from "../apis/StockApi";
import CustomerInput from "./common/CustomerInput";
import { getOneCustomer } from "../apis/CustomerApi";
import { errorMessage, formatMessage, lengthMessage } from "../../errorMessage";
import { toast } from "react-toastify";
import { createSell, getOneSell, updateSell } from "../apis/SellApi";
import PaymentInput from "./common/PaymentInput";

const SellForm = ({ stock }) => {
  console.log("stock", stock);
  const [formData, setFormData] = useState({
    organization: null,
    branch: null,
    customerName: null,
    customerPhone: "",
    device: [
      {
        modelName: null,
        deviceName: null,
        paymentType: "",
        amount: "",
        customerPaid: "",
        remainingAmount: "",
        upload: "",
        totalAmount: "",
        paidToCustomer: "",
      },
    ],
    payment: [
      {
        paymentAccount: null,
        paymentAmount: "",
      },
    ],
    stock: "",
  });

  console.log("Payment", formData.payment);

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [branchId, setBranchId] = useState("");
  const [modelId, setModelId] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [paymentId, setPaymentId] = useState("");

  // const [amount, setAmount] = useState(0);
  // const [remainingAmount, setRemainingAmount] = useState(0);

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
  const handleCustomerPaidChange = (index, customerPaid) => {
    setFormData((prev) => {
      const updatedDevices = [...prev.device];
      const amount = parseFloat(updatedDevices[index]?.amount) || 0;
      const parsedPaid = parseFloat(customerPaid) || 0;

      updatedDevices[index] = {
        ...updatedDevices[index],
        customerPaid: parsedPaid,
        remainingAmount: amount - parsedPaid,
      };

      return { ...prev, device: updatedDevices };
    });
  };

  const handleAmountChange = (index, amount) => {
    setFormData((prev) => {
      const updatedDevices = [...prev.device];
      const customerPaid = parseFloat(updatedDevices[index]?.customerPaid) || 0;
      const parsedAmount = parseFloat(amount) || 0;

      updatedDevices[index] = {
        ...updatedDevices[index],
        amount: parsedAmount,
        remainingAmount: parsedAmount - customerPaid,
      };

      return { ...prev, device: updatedDevices };
    });
  };

  // const handleRemainingAmountChange = (index, remainingAmount) => {
  //   setFormData((prev) => {
  //     const updatedDevices = [...prev.device];
  //     updatedDevices[index] = {
  //       ...updatedDevices[index],
  //       remainingAmount: remainingAmount,
  //     };
  //     return { ...prev, device: updatedDevices };
  //   });
  // };

  const handlePaymentTypeChange = (index, paymentType) => {
    setFormData((prev) => {
      const updatedDevices = [...prev.device];
      updatedDevices[index] = {
        ...updatedDevices[index],
        paymentType: paymentType,
      };
      return { ...prev, device: updatedDevices };
    });
  };
  const addDevice = () => {
    setFormData((prev) => ({
      ...prev,
      device: [
        ...prev.device,
        {
          modelName: null,
          deviceName: null,
          paymentType: "",
          amount: "",
          customerPaid: "",
          remainingAmount: "",
          upload: "",
        },
      ],
    }));
  };
  //for account part
  const handlePaymentChange = (index, selectAccount) => {
    setPaymentId(selectAccount.value);
    setFormData((prev) => {
      const updatedPayments = [...prev.payment];
      updatedPayments[index] = {
        ...updatedPayments[index],
        paymentAccount: selectAccount,
      };
      return { ...prev, payment: updatedPayments };
    });
  };

  const handlePaymentAmountChange = (index, selectAmount) => {
   
    setFormData((prev) => {
      const updatedPayments = [...prev.payment];
      updatedPayments[index] = {
        ...updatedPayments[index],
        paymentAmount: selectAmount,
      };
      return { ...prev, payment: updatedPayments };
    });
  };

  const addPayment = () => {
    setFormData((prev) => ({
      ...prev,
      payment: [
        ...(Array.isArray(prev.payment) ? prev.payment : []),
        { paymentAccount: null, paymentAmount: "" },
      ],
    }));
  };

  const removePayment = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      payment: prev.payment.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeDevice = (index) => {
    const updatedDeviceData = [...formData.device];
    updatedDeviceData.splice(index, 1);
    setFormData({ ...formData, device: updatedDeviceData });
  };

  const callApi = async () => {
    // console.log("call api by id...................");

    if (!id) return;

    try {
      let data;

      if (stock) {
        // console.log("getOneStock api call");
        const response = await getOneStock(id);
        data = response?.data?.data;
        setFormData({
          stock: id,
          organization: {
            label: data?.organization?.organizationName || "",
            value: data?.organization?._id || "",
          },
          branch: {
            label: data?.branch?.branchName || "",
            value: data?.branch?._id || "",
          },
          // customerName: {
          //   label: data?.customerName?.customerName || "",
          //   value: data?.customerName?._id || "",
          // },
          // customerPhone: data?.customerPhone || "",
          device: [
            {
              modelName: {
                label: data?.modelName?.modelName || "",
                value: data?.modelName?._id || "",
              },
              deviceName: {
                label: data?.deviceName?.deviceName || "",
                value: data?.deviceName?._id || "",
              },

              totalAmount: data.totalAmount,
            },
          ],
          payment: [
            {
              paymentAccount: {
                label: data?.paymentAccount?.accountName || "",
                value: data?.paymentAccount?._id || "",
              },
              paymentAmount: data?.paymentAmount || "",
            },
          ],
        });
      } else {
        // console.log("getOneSell api call");
        const response = await getOneSell(id);
        data = response.data.data;
        // console.log("dataaaaaaaaaaaa", data);
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
              modelName: {
                label: data?.modelName?.modelName || "",
                value: data?.modelName?._id || "",
              },
              deviceName: {
                label: data?.deviceName?.deviceName || "",
                value: data?.deviceName?._id || "",
              },
              paymentType: data?.paymentType,
              amount: data?.amount,
              customerPaid: data?.customerPaid,
              remainingAmount: data?.remainingAmount,
            },
          ],
          payment: [
            {
              paymentAccount: {
                label: data?.paymentAccount?.accountName || "",
                value: data?.paymentAccount?._id || "",
              },
              paymentAmount: data?.paymentAmount || "",
            },
          ],
        });
      }

      if (!data) {
        console.warn("No data found in response");
        return;
      }

      console.log("API data loaded successfully.");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleSubmit = async () => {
    // if (!validateStockForm()) {
    //   return;
    // }

    try {
      const formattedDevices = formData.device.map((deviceItem) => ({
        modelName: deviceItem.modelName?.value || null,
        deviceName: deviceItem.deviceName?.value || null,
        paymentType: deviceItem.paymentType || "",
        amount: deviceItem.amount || "",
        customerPaid: deviceItem.customerPaid || "",
        remainingAmount: deviceItem.remainingAmount || "",
        upload: deviceItem.upload || "",
      }));

      const formattedPayment = formData.payment.map((paymentItem) => ({
        paymentAccount: paymentItem.paymentAccount?.value || null,
        paymentAmount: paymentItem.paymentAmount || "",
      }));

      const payload = {
        stock: id || null,
        organization: formData.organization?.value || null,
        branch: formData.branch?.value || null,
        customerName: formData.customerName?.value || null,
        customerPhone: formData.customerPhone,
        device: formattedDevices,
        payment: formattedPayment,
      };

      console.log(payload, "payload");

      if (stock) {
        await createSell(payload);
        toast.success("sell added successfully!");
      } else if (id) {
        const response = await updateSell(payload, id);
        console.log(response, "updated Data");
        toast.success("sell updated successfully!");
      } else {
        await createSell(payload);
        toast.success("sell added successfully!");
      }
      navigate("/sellPage");
    } catch (error) {
      console.log(error.message);
      toast.error("Error creating/updating stock!");
    }
  };

  return (
    <>
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
              SELL DEVICE
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <OrgInput
                  role="admin"
                  onChange={handleOrganizationChange}
                  value={formData.organization} // Now it's an object, not undefined
                  // error={errors.organization}
                />
              </Grid>
              <Grid item xs={6}>
                <OrgBranchInput
                  role="admin"
                  onChange={handleOrganizationBranchChange}
                  value={formData.branch || null} // ✅ Ensure branch is always an object or null
                  selectedOrganization={selectedOrganization}
                  // error={errors.branch}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomerInput
                  onChange={handleCustomerChange}
                  value={formData.customerName}
                  branchId={formData?.branch?.value}

                  // error={errors.customerName}
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
                {id ? (
                  ""
                ) : (
                  <>
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
                  </>
                )}

                <Grid container spacing={2} mt={1}>
                  <Grid item xs={6}>
                    <ModelInput
                      onChange={(selectedModel) =>
                        handleModelChange(deviceIndex, selectedModel)
                      }
                      value={formData.device[deviceIndex]?.modelName}
                      branchId={formData?.branch?.value}
                      // error={
                      //   (errors &&
                      //     errors.device &&
                      //     errors.device[deviceIndex] &&
                      //     errors.device[deviceIndex].modelName) ||
                      //   ""
                      // }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DeviceInput
                      onChange={(selectedDevice) =>
                        handleDeviceChange(deviceIndex, selectedDevice)
                      }
                      value={formData.device[deviceIndex]?.deviceName}
                      modelId={modelId}
                      // error={
                      //   (errors &&
                      //     errors.device &&
                      //     errors.device[deviceIndex] &&
                      //     errors.device[deviceIndex].modelName) ||
                      //   ""
                      // }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      // error={!!errors.category}
                      required
                    >
                      <InputLabel id="paymentType-label">
                        Payment Type
                      </InputLabel>
                      <Select
                        labelId="paymentType-label"
                        id="paymentType"
                        name="paymentType"
                        value={
                          formData.device?.[deviceIndex]?.paymentType || ""
                        }
                        onChange={(e) =>
                          handlePaymentTypeChange(deviceIndex, e.target.value)
                        }
                        label="paymentType"
                      >
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Cheque">Cheque</MenuItem>
                        <MenuItem value="Upi">Upi</MenuItem>
                        <MenuItem value="Neft">Neft</MenuItem>
                        <MenuItem value="Card">Card</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      fullWidth
                      label="Stock Amount"
                      name="totalAmount"
                      value={formData.device?.[deviceIndex]?.totalAmount || ""}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Amount"
                      name="amount"
                      value={formData.device?.[deviceIndex]?.amount || ""}
                      type="number"
                      onChange={(e) =>
                        handleAmountChange(deviceIndex, e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="customerPaid"
                      name="customerPaid"
                      value={formData.device?.[deviceIndex]?.customerPaid || ""}
                      type="number"
                      onChange={(e) =>
                        handleCustomerPaidChange(deviceIndex, e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Remaining Amount"
                      name="remainingAmount"
                      value={
                        (formData.device?.[deviceIndex]?.amount || 0) -
                        (formData.device?.[deviceIndex]?.customerPaid || 0)
                      }
                      type="number"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

            <Box mt={3}>
              <Button variant="contained" component="label" fullWidth>
                Upload File
                <input type="file" onChange={handleChange} hidden />
              </Button>
            </Box>
            <>
              <Box mt={2} display="flex" gap={2} justifyContent="end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addPayment}
                >
                  Add Payment
                </Button>
              </Box>

              {Array.isArray(formData.payment) &&
                formData.payment.map((pay, index) => (
                  <Box key={index} mt={2}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={5}>
                        <PaymentInput
                          label="Payment Account"
                          value={
                            formData.payment?.[index]?.paymentAccount || ""
                          }
                          onChange={(selectAccount) =>
                            handlePaymentChange(index, selectAccount)
                          }
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          label="Payment Amount"
                          value={formData.payment?.[index]?.paymentAmount || ""}
                          onChange={(e) =>
                           handlePaymentAmountChange(
                              index,
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        {formData.payment.length > 1 && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removePayment(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                ))}
            </>
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
                to="/sellPage"
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
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SellForm;
