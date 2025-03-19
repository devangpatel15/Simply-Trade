import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { debounce } from "lodash"; // Import lodash debounce
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const OrgInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // Debounced API call
  const fetchOrganizations = useMemo(
    () =>
      debounce(async (query) => {
        setLoading(true);
        try {
          const response = await axios.get(
            "http://localhost:4000/api/searchOrg",
            { params: { text: query } } // Correctly passing as query param
          );

          const formattedOptions = (response.data.data || []).map((org) => ({
            label: org.organizationName, // Ensure this matches your backend response
            value: org._id,
          }));

          setOptions(formattedOptions);
        } catch (error) {
          console.error("Error fetching organizations:", error);
          setOptions([]);
        } finally {
          setLoading(false);
        }
      }, 500), // 500ms debounce
    []
  );

  // Fetch on mount (default load) and when inputValue changes
  useEffect(() => {
    fetchOrganizations(inputValue);
  }, [inputValue, fetchOrganizations]);

  // Fetch default organizations on mount
  useEffect(() => {
    fetchOrganizations(""); // Load default data when component mounts
  }, [fetchOrganizations]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      loading={loading}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => setSelectedOrg(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Organization"
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

export default OrgInput;
