import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createDevice, getOneDevice, updateDevice } from "../apis/DeviceApi";
import { allUserOrg } from "../apis/OrganizationApi";
import { getOrgBranch } from "../apis/OrganizationBranchApi";

const DeviceForm = () => {
  const { id } = useParams();

  console.log("======id", id);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization: "",
    branchName: "",
    deviceName: "",
    modelId: "",
  });

  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        updateDevice(formData, id);
        navigate("/category");
      } else {
        createDevice(formData);
        navigate("/category");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneDevice(id);
      console.log("response========", response.data.data);
      setFormData(response.data.data);
    }
  };

  const callGetAllOrg = async () => {
    const response = await allUserOrg();
    console.log("response", response.data.data);
    setOrganizationOptions(response.data.data);
  };

  const callGetOrgBranch = async () => {
    console.log("hello");
    const response = await getOrgBranch(formData.orgId);
    console.log("response of branch", response.data.data);
    setBranchOptions(response.data.data);
  };

  console.log("formData", formData);

  useEffect(() => {
    callApi();
    callGetAllOrg();
  }, []);

  useEffect(() => {
    callGetOrgBranch();
  }, [formData.orgId]);

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
            MODEL
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Organization Name"
                  variant="outlined"
                  name="organization"
                  value={formData.organization || ""}
                  onChange={handleChange}
                  required
                >
                  {organizationOptions.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.organizationName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="OrganizationBranch Name"
                  variant="outlined"
                  name="branchName"
                  value={formData.branchName || ""}
                  onChange={handleChange}
                  required
                >
                  {branchOptions.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.branchName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  variant="outlined"
                  required
                >
                  <MenuItem></MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Device"
                  variant="outlined"
                  name="deviceName"
                  value={formData.deviceName || ""}
                  onChange={handleChange}
                  required
                />
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
              to="/devicePage"
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
};

export default DeviceForm;
