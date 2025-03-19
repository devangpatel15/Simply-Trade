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
import axios from "axios";

import { allUserOrg } from "../apis/OrganizationApi";
import {
  createModel,
  findOneModel,
  getBranchCategory,
  updateModel,
} from "../apis/ModelApi";
import { getOrgBranch } from "../apis/OrganizationBranchApi";
import OrgInput from "./common/OrgInput";

const ModelForm = () => {
  const { id } = useParams();
  console.log("======id", id);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization: "",
    orgBranch: "",
    modelName: "",
    categoryId: "",
  });

  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "name", "value");

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("callaed");
    try {
      if (id) {
        updateModel(formData, id);
        navigate("/modelPage");
      } else {
        createModel(formData);
        navigate("/modelPage");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await findOneModel(id);

      console.log(response.data, "data============");

      if (response && response.data) {
        let finalData = {
          organization:
            response &&
            response.data &&
            response.data.organization &&
            response.data.organization._id,
          categoryId:
            response &&
            response.data &&
            response.data.categoryId &&
            response.data.categoryId._id,
          modelName: response && response.data && response.data.modelName,
        };

        setFormData(finalData);
      } else {
        setFormData(null);
      }

      // setFormData(response.data.data { organization : response.data.data. , branchName:branchName , });
    }
  };

  const callGetAllOrg = async () => {
    const response = await allUserOrg();
    console.log("response", response.data.data);
    setOrganizationOptions(response.data.data);
  };

  const callGetOrgBranch = async () => {
    const response = await getOrgBranch(formData.organization);
    console.log("response of branch", response.data.data);
    setBranchOptions(response.data.data);
  };
  const callGetSelectedCategory = async () => {
    const response = await getBranchCategory(formData.orgBranch);
    console.log("response of category ", response.data.data);
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
    callGetSelectedCategory();
  }, [formData.orgBranch]);

  console.log("cat options", categoryOptions);

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
                <OrgInput />
                {/* <TextField
                  select
                  fullWidth
                  label="Organization Branch"
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
                </TextField> */}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Organization Branch"
                  variant="outlined"
                  name="orgBranch"
                  value={formData.orgBranch || ""}
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
                  name="categoryId"
                  value={formData.categoryId || ""}
                  onChange={handleChange}
                  required
                >
                  {categoryOptions.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Model"
                  variant="outlined"
                  name="modelName"
                  value={formData.modelName || ""}
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
              to="/modelPage"
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

export default ModelForm;
