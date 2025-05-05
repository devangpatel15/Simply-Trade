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
  const [selectedBranch, setSelectedBranch] = React.useState(null);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [selectedRadioFilter, setSelectedRadioFilter] = React.useState("all");
  const [date, setDate] = React.useState([]);
  const [dateRange, setDateRange] = React.useState({
    startDate: "",
    endDate: "",
  });

  React.useEffect(() => {
    const userData = localStorage.getItem("role");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setSelectedBranch({
          label: parsedData?.orgBranch?.branchName,
          value: parsedData.orgBranch._id,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [selectedRadioFilter]);

  const handleOrganizationChange = (selectedOrg) => {
    setSelectedOrganization(selectedOrg);
    setSelectedCustomer(null);
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
  console.log(selectedOrganization, "selectedOrganization");

  const handleDownload = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/export-ledger`, {
        responseType: "blob",
        headers: { Accept: "application/pdf" },
      });

      // Create a blob URL from the PDF stream
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoiceCustomerLedger${Math.random()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF");
    }
  };

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
                name="startDate"
                value={dateRange.startDate}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
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
                name="endDate"
                value={dateRange.endDate}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
                // value={formData.date}
                // onChange={handleNativeDateChange}
                sx={{ backgroundColor: "white", borderRadius: 1, width: "50%" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* <TextField
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
              /> */}
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
                onClick={handleDownload}
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
                {selectedBranch ? (
                  <OrgBranchInput value={selectedBranch} role="user" />
                ) : (
                  <OrgInput
                    onChange={handleOrganizationChange}
                    value={selectedOrganization}
                  />
                )}
              </Grid>

              <Grid item xs={3}>
                {selectedBranch ? (
                  <CustomerInput
                    onChange={handleCustomerChange}
                    branchId={selectedBranch?.value}
                    value={selectedCustomer}
                    field={selectedRadioFilter}
                    pageName="customerLedger"
                  />
                ) : (
                  <CustomerInput
                    onChange={handleCustomerChange}
                    orgId={selectedOrganization}
                    value={selectedCustomer}
                    field={selectedRadioFilter}
                    pageName="customerLedger"
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          <CustomerLedgerTable
            selectedOrganization={selectedOrganization}
            selectedCustomer={selectedCustomer}
            selectedRadioFilter={selectedRadioFilter}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerLedgerPage;
