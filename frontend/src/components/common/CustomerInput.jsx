import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import CustomerDialog from "../CustomerDialog";

const CustomerInput = ({ onChange, value, branchId }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [customerData, setCustomerdata] = useState({});

  const callApi = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/findOneOrganizationBranch/${branchId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }, // Request headers
        }
      );
      console.log(response.data, "RESPONSESSSSSSSSSSSSSSS");
      setCustomerdata(response.data.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);

    callApi();
  };

  const handleClose = () => setOpen(false);

  // Debounced API call wrapped in useCallback to avoid unnecessary recreations
  const fetchOrganizations = useCallback(
    debounce(async (query) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/selectCustomer/${branchId}`,
          {
            params: { text: query }, // Query parameters
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }, // Request headers
          }
        );

        const formattedOptions = (response.data.data || []).map((org) => ({
          label: org.customerName,
          value: org._id,
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [branchId]
  );

  // Fetch organizations when inputValue changes
  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetchOrganizations(inputValue);
    } else {
      fetchOrganizations(""); // Load default options
    }
  }, [inputValue, fetchOrganizations]);

  return (
    <>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        loading={loading}
        value={value}
        isOptionEqualToValue={(option, val) => option.value === val?.value}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        onChange={(_, newValue) => {
          if (onChange) onChange(newValue); // Ensure onChange gets an object
        }}
        noOptionsText={<Button onClick={handleOpen}>Create Customer</Button>} //No Option to Create Customer Button Add//
        renderInput={(params) => (
          <TextField
            {...params}
            label="Customer"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <CustomerDialog
        customerData={customerData}
        customerDialog={open}
        handleClose={handleClose}
        fieldName="customerForm"
        setOpen={setOpen}
      />
    </>
  );
};

export default CustomerInput;
