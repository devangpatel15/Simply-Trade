import React, { useEffect, useState } from "react";
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
  CardMedia,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import DeleteDialog from "../components/DeleteDialog";
import { deleteAccount, getAllAccounts } from "../apis/AccountApi";
import image from "../assets/Rectangle 1900.png";

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountId, setAccountId] = useState("");

  const navigate = useNavigate();

  const callApi = async () => {
    const response = await getAllAccounts();
    setAccounts(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setAccountId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteOpen(false);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDeleteDialog = () => {
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    await deleteAccount(accountId);
    navigate("/accountPage");
    setDeleteOpen(false);
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {accounts &&
              accounts.map((option, index) => {
                return (
                  <>
                    <Card
                      sx={{
                        width: 230,
                        borderRadius: 2,
                        boxShadow: 3,
                        m: 1,
                        p: 1,
                      }}
                      key={index}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt="business logo"
                      />
                      <CardContent
                        sx={{
                          position: "relative", // Ensures the menu button is positioned correctly
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {/* More Icon Button - Positioned at Top Right */}
                        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                          <IconButton
                            size="small"
                            onClick={(event) => handleClick(event, option._id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>

                        {/* Branch Name */}

                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight="bold"
                        >
                          {option.branchName.branchName}
                        </Typography>

                        {/* accounts Name */}
                        <Box sx={{ mt: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            display="inline"
                          >
                            Acc. Name: :
                          </Typography>
                          <Typography variant="body2" display="inline">
                            {option.accountName}
                          </Typography>
                        </Box>

                        {/* accounts Balance */}
                        <Box sx={{ mt: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            display="inline"
                          >
                            Balance:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            {option.balance}
                          </Typography>
                        </Box>

                        {/* Dropdown Menu */}
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          sx={{ padding: 0 }}
                        >
                          <MenuItem
                            sx={{ p: 0 }}
                            onClick={() =>
                              navigate(`/accountForm/${accountId}`)
                            }
                          >
                            <EditIcon
                              sx={{ mr: 1, p: 0, m: 0, color: "green" }}
                            />
                          </MenuItem>
                          <MenuItem
                            onClick={() => openDeleteDialog()}
                            sx={{ color: "red", p: 0 }}
                          >
                            <DeleteIcon
                              sx={{ mr: 1, color: "red", p: 0, m: 0 }}
                            />
                          </MenuItem>
                        </Menu>
                      </CardContent>
                    </Card>
                    <DeleteDialog
                      deleteOpen={deleteOpen}
                      handleClose={handleClose}
                      handleDelete={handleDelete}
                      closeDeleteDialog={closeDeleteDialog}
                    />
                  </>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // return (
  //   <Box sx={{ display: "flex", marginTop: "4rem" }}>
  //     <Sidebar />
  //     <Box sx={{ flexGrow: 1 }}>
  //       <Header />
  //       <Box sx={{ padding: 3 }}>
  //         <Box
  //           display="flex"
  //           alignItems="center"
  //           justifyContent="space-between"
  //         >
  //           <Typography
  //             variant="h4"
  //             sx={{ fontWeight: "bold", color: "#6c5ce7" }}
  //           >
  //             ACCOUNT
  //           </Typography>

  //           <Box display="flex" gap={2}>
  //             <TextField
  //               variant="outlined"
  //               placeholder="Search"
  //               size="small"
  //               sx={{ backgroundColor: "white", borderRadius: 1 }}
  //               InputProps={{
  //                 startAdornment: (
  //                   <InputAdornment position="start">
  //                     <SearchIcon sx={{ color: "#6c5ce7" }} />
  //                   </InputAdornment>
  //                 ),
  //               }}
  //             />
  //             <Button
  //               variant="outlined"
  //               sx={{
  //                 color: "#6c5ce7",
  //                 borderColor: "#6c5ce7",
  //                 textTransform: "none",
  //               }}
  //               component={Link}
  //               to="/accountForm"
  //             >
  //               Add Account
  //             </Button>
  //           </Box>
  //         </Box>
  //         <Grid container spacing={2}>
  //           {accounts &&
  //             accounts.map((account) => (
  //               <Grid item xs={12} sm={6} md={4} lg={3} mt={2} key={account.id}>
  //                 <Card>
  //                   <CardHeader
  //                     avatar={<Avatar src={account.avatarSrc} />}
  //                     action={
  //                       <IconButton>
  //                         <MoreVertIcon />
  //                       </IconButton>
  //                     }
  //                     title={
  //                       <Typography variant="h6">{account.name}</Typography>
  //                     }
  //                   />
  //                   <CardContent>
  //                     <Typography variant="body2">
  //                       Acc. Name: {account.accountName}
  //                     </Typography>
  //                     <Typography variant="body2">
  //                       Balance: {account.balance}
  //                     </Typography>
  //                   </CardContent>
  //                 </Card>
  //               </Grid>
  //             ))}
  //         </Grid>
  //       </Box>
  //     </Box>
  //   </Box>
  // );
};

export default AccountPage;
