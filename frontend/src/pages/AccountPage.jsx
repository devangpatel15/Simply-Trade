import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const accounts = Array.from({ length: 1 }, (_, index) => ({
  id: index,
  name: "Collab Softech PVT.",
  accountHolder: "Chudasama Kripalsinh Digvijaysinh",
  balance: "₹ 6865799",
  avatarSrc: `https://via.placeholder.com/50?text=A${index + 1}`,
}));

const AccountPage = () => {
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
              ACCOUNT
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
                component={Link}
                to="/accountForm"
              >
                Add Account
              </Button>
            </Box>
          </Box>
          <Grid container spacing={2}>
            {accounts.map((account) => (
              <Grid item xs={12} sm={6} md={4} lg={3} mt={2} key={account.id}>
                <Card>
                  <CardHeader
                    avatar={<Avatar src={account.avatarSrc} />}
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={<Typography variant="h6">{account.name}</Typography>}
                  />
                  <CardContent>
                    <Typography variant="body2">
                      Acc. Name: {account.accountHolder}
                    </Typography>
                    <Typography variant="body2">
                      Balance: {account.balance}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountPage;
