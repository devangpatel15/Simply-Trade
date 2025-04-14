import * as React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomerLedgerTable from "../tables/CustomerLedgerTable";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import OrgInput from "../components/common/OrgInput";
import OrgBranchInput from "../components/common/OrgBranchInput";
import CustomerInput from "../components/common/CustomerInput";
import axios from "axios";
const CustomerLedgerPage = () => {
  const [selectedOrganization, setSelectedOrganization] = React.useState("");
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [filterData, setFilterData] = React.useState([]);

  const handleOrganizationChange = (selectedOrg) => {
    setSelectedOrganization(selectedOrg.value);
  };
  const handleCustomerChange = (selectedCustomer) => {
    setSelectedCustomer(selectedCustomer.value);
  };

  const callApi = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/stockByOrgAndCus`,
        {
          params: { orgId: selectedOrganization, cusId: selectedCustomer },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }, // Request headers
        }
      );
      // console.log(response.data, "RESPONSESSSSSSSSSSSSSSS");
      setFilterData(response.data.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };
  React.useEffect(() => {
    if (selectedCustomer) {
      callApi();
    }
  }, [selectedCustomer]);

  console.log(filterData,"filterData");
  
  return (
    <Box sx={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box sx={{ padding: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#6c5ce7" }}
            >
              CUSTOMER LEDGER
            </Typography>

            <Box display="flex" gap={2}>
              <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                sx={{ backgroundColor: "white", borderRadius: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#6c5ce7" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                sx={{
                  color: "#6c5ce7",
                  borderColor: "#6c5ce7",
                  textTransform: "none",
                }}
                // component={Link}
                // to="/stockForm"
              >
                Download PDF
              </Button>
            </Box>
          </Box>
          <Box
            sx={{ marginTop: 2, display: "flex", alignItems: "center", gap: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{
                    fontWeight: "bold",
                    color: "#6c5ce7",
                    padding: "0.4rem",
                  }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Stock"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Sell"
                  />
                  <FormControlLabel
                    value="repair"
                    // disabled
                    control={<Radio />}
                    label="Repair"
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={3}>
                <OrgInput onChange={handleOrganizationChange} />
              </Grid>

              <Grid item xs={3}>
                <CustomerInput
                  onChange={handleCustomerChange}
                  orgId={selectedOrganization}
                />
              </Grid>
            </Grid>
          </Box>
        {/* FIXME:show filterData is pending */}
          <CustomerLedgerTable filterData={filterData} />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerLedgerPage;
