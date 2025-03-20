import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const CategoryInput = ({ onChange, value, branchId }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced API call wrapped in useCallback to avoid unnecessary recreations
  const fetchOrganizations = useCallback(
    debounce(async (query) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/selectCategoryByBranch/${branchId}`
        );

        const formattedOptions = (response.data.data || []).map((org) => ({
          label: org.categoryName,
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
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Category"
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
  );
};

export default CategoryInput;
