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
  const [selectedOrganization, setSelectedOrganization] = React.useState(null);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [selectedRadioFilter, setSelectedRadioFilter] = React.useState("all");

  const handleOrganizationChange = (selectedOrg) => {
    setSelectedOrganization(selectedOrg);
  };
  const handleCustomerChange = (selectedCustomer) => {
    setSelectedCustomer(selectedCustomer);
  };
  const handleRadioFilter = (e) => {
    setSelectedCustomer(null);
    setSelectedOrganization(null);
    setSelectedRadioFilter(e.target.value);
  };
  console.log(selectedRadioFilter, "selectedRadioFilter");

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

            <Box display="flex" gap={2} width={"60%"} alignContent={"center"}>
              <TextField
                disabled={selectedRadioFilter == "all"}
                fullWidth
                type="date"
                label="Start Date"
                name="date"
                // value={formData.date}
                // onChange={handleNativeDateChange}
                sx={{ backgroundColor: "white", borderRadius: 1, width: "50%" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                disabled={selectedRadioFilter == "all"}
                fullWidth
                type="date"
                label="End Date"
                name="date"
                // value={formData.date}
                // onChange={handleNativeDateChange}
                sx={{ backgroundColor: "white", borderRadius: 1, width: "50%" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                variant="outlined"
                placeholder="Search"
                size="medium"
                sx={{ backgroundColor: "white", borderRadius: 1, width: "50%" }}
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
                  // fontWeight: "bold",
                  fontSize: "1rem",
                  width: "30%",
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
                  name="radioFilter"
                  defaultValue="all"
                  onChange={handleRadioFilter}
                  sx={{
                    fontWeight: "bold",
                    color: "#6c5ce7",
                    padding: "0.4rem",
                  }}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="stock"
                    control={<Radio />}
                    label="Stock"
                  />
                  <FormControlLabel
                    value="sell"
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
                <OrgInput
                  onChange={handleOrganizationChange}
                  value={selectedOrganization}
                />
              </Grid>

              <Grid item xs={3}>
                <CustomerInput
                  onChange={handleCustomerChange}
                  orgId={selectedOrganization}
                  value={selectedCustomer}
                  field={selectedRadioFilter}
                />
              </Grid>
            </Grid>
          </Box>
          <CustomerLedgerTable
            selectedOrganization={selectedOrganization}
            selectedCustomer={selectedCustomer}
            selectedRadioFilter={selectedRadioFilter}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerLedgerPage;
