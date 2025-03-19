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
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getOneCategory,
  updateCategory,
} from "../apis/CategoryApi";
import { allUserOrg } from "../apis/OrganizationApi";
import { getOrgBranch } from "../apis/OrganizationBranchApi";

const CategoryForm = () => {
  const { id } = useParams();

  console.log("======id", id);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryName: "",
    orgBranchId: "",
    orgId: "",
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
        updateCategory(formData, id);
        navigate("/category");
      } else {
        createCategory(formData);
        navigate("/category");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("error");
    }
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneCategory(id);
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

  console.log("branchOption", branchOptions);

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
            CATEGORY
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
                  name="orgId"
                  value={formData.orgId || ""}
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
                  label="Organization Branch"
                  variant="outlined"
                  name="orgBranchId"
                  value={formData.orgBranchId || ""}
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
            </Grid>
          </Box>

          <TextField
            fullWidth
            label="Category"
            variant="outlined"
            name="categoryName"
            value={formData.categoryName || ""}
            onChange={handleChange}
            required
          />

          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="error"
              component={Link}
              to="/category"
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

export default CategoryForm;
