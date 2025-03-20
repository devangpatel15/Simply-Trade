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
import { getBranchModel } from "../apis/ModelApi";

const DeviceForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization: "",
    branchName: "",
    deviceName: "",
    modelId: "",
  });

  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [modelOptions, setCategoryOptions] = useState([]);

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
        navigate("/devicePage");
      } else {
        createDevice(formData);
        navigate("/devicePage");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneDevice(id);
      setFormData(response.data.data);
    }
  };

  const callGetAllOrg = async () => {
    const response = await allUserOrg();
    setOrganizationOptions(response.data.data);
  };

  const callGetOrgBranch = async () => {
    const response = await getOrgBranch(formData.organization);
    setBranchOptions(response.data.data);
  };

  const callGetSelectedModel = async () => {
    const response = await getBranchModel(formData.branchName);
    setCategoryOptions(response.data.data);
  };


  useEffect(() => {
    callApi();
    callGetAllOrg();
  }, []);

  useEffect(() => {
    callGetOrgBranch();
  }, [formData.organization]);

  useEffect(() => {
    callGetSelectedModel();
  }, [formData.branchName]);

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
            DEVICE
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
                  label="Model"
                  variant="outlined"
                  name="modelId"
                  value={formData.modelId}
                  onChange={handleChange}
                  required
                >
                  {modelOptions.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.modelId}
                    </MenuItem>
                  ))}
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
