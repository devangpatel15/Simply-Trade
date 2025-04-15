import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Avatar,
  Typography,
  Badge,
} from "@mui/material";
import {
  Dashboard,
  People,
  ExpandLess,
  ExpandMore,
  Business,
  Build,
  Inventory,
  Devices,
  Notifications,
  Support,
  Settings,
  Logout,
} from "@mui/icons-material";

import logo from "../assets/Group 18763.png";
import SegmentIcon from "@mui/icons-material/Segment";
import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CategoryIcon from "@mui/icons-material/Category";
import DevicesIcon from "@mui/icons-material/Devices";
import ColorizeIcon from "@mui/icons-material/Colorize";
import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorageIcon from "@mui/icons-material/Storage";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import BuildIcon from '@mui/icons-material/Build';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';

const iconColor = "#5C4E89"; // Custom icon color

const Sidebar = () => {
  const navigate = useNavigate();

  const [openMaster, setOpenMaster] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [userRole, setUserRole] = useState({});

  useEffect(() => {
    const role = localStorage.getItem("role");

    setUserRole(JSON.parse(role));
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        height: "100vh",
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          background: "#ffffff",
          color: iconColor,
          height: "100vh",
          overflow: "hidden", // Prevent scrolling
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          py: 2,
        }}
      >
        <img
          src={logo}
          alt="Simply Trade Logo"
          style={{ width: 160 }}
          onClick={() => navigate("/dashboard")}
        />
        <SegmentIcon
          sx={{
            // border: "1px solid",
            height: 30,
            width: 30,
            borderRadius: 50,
            padding: 0.4,
            boxShadow: 4,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%", // Ensure it takes full height
          overflow: "hidden", // Prevent scrolling
        }}
      >
        {/* Sidebar Content */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", paddingBottom: 2 }}>
          <List>
            {/* Dashboard */}
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <ListItemIcon>
                <Dashboard sx={{ color: iconColor }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            {userRole?.role == "admin" && (
              <Box>
                {/* Master Section */}
                <ListItemButton onClick={() => setOpenMaster(!openMaster)}>
                  <ListItemIcon>
                    <People sx={{ color: iconColor }} />
                  </ListItemIcon>
                  <ListItemText primary="Master" />
                  {openMaster ? (
                    <ExpandLess sx={{ color: iconColor }} />
                  ) : (
                    <ExpandMore sx={{ color: iconColor }} />
                  )}
                </ListItemButton>

                <Collapse in={openMaster} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => navigate("/organizationPage")}
                    >
                      <ListItemIcon>
                        <Business sx={{ color: iconColor }} />
                      </ListItemIcon>
                      <ListItemText primary="Organization" />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => navigate("/organizationBranchPage")}
                    >
                      <ListItemIcon>
                        <Business sx={{ color: iconColor }} />
                      </ListItemIcon>
                      <ListItemText primary="Org. Branch" />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ pl: 4, gap: "2rem" }}
                      onClick={() => navigate("/category")}
                    >
                      <CategoryIcon>
                        <Business sx={{ color: iconColor }} />
                      </CategoryIcon>
                      <ListItemText primary="Category" />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ pl: 4, gap: "2rem" }}
                      onClick={() => navigate("/modelPage")}
                    >
                      <OnDeviceTrainingIcon>
                        <Business sx={{ color: iconColor }} />
                      </OnDeviceTrainingIcon>
                      <ListItemText primary="Model" />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ pl: 4, gap: "2rem" }}
                      onClick={() => navigate("/devicePage")}
                    >
                      <DevicesIcon>
                        <Business sx={{ color: iconColor }} />
                      </DevicesIcon>
                      <ListItemText primary="Device" />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ pl: 4, gap: "2rem" }}
                      onClick={() => navigate("/colorPage")}
                    >
                      <ColorizeIcon>
                        <Business sx={{ color: iconColor }} />
                      </ColorizeIcon>
                      <ListItemText primary="Color" />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ pl: 4, gap: "2rem" }}
                      onClick={() => navigate("/capacityPage")}
                    >
                      <StorageIcon>
                        <Business sx={{ color: iconColor }} />
                      </StorageIcon>
                      <ListItemText primary="Capacity" />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ pl: 4, gap: "2rem" }}
                      onClick={() => navigate("/userPage")}
                    >
                      <PeopleAltIcon>
                        <Business sx={{ color: iconColor }} />
                      </PeopleAltIcon>
                      <ListItemText primary="Users" />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ pl: 4, gap: "2rem" }}
                      onClick={() => navigate("/accountPage")}
                    >
                      <AccountCircleRoundedIcon>
                        <Business sx={{ color: iconColor }} />
                      </AccountCircleRoundedIcon>
                      <ListItemText primary="Account" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </Box>
            )}
            {/* Other Sidebar Items */}
            <ListItemButton onClick={() => navigate("/stockPage")}>
              <ListItemIcon>
                <Inventory sx={{ color: iconColor }} />
              </ListItemIcon>
              <ListItemText primary="Stock" />
            </ListItemButton>


            {/* sell device */}
            <ListItemButton onClick={() => navigate("/sellPage")}>
              <ListItemIcon>
                <MobileFriendlyIcon sx={{ color: iconColor }} />
              </ListItemIcon>
              <ListItemText primary="Sell Devices" />
            </ListItemButton>

            <ListItemButton onClick={() => setOpenReport(!openReport)}>
              <ArticleIcon>
                <People sx={{ color: iconColor }} />
              </ArticleIcon>
              <ListItemText primary="Report" sx={{ paddingLeft: 4 }} />
              {openReport ? (
                <ExpandLess sx={{ color: iconColor }} />
              ) : (
                <ExpandMore sx={{ color: iconColor }} />
              )}
            </ListItemButton>

            <Collapse in={openReport} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4, gap: "2rem" }}
                  onClick={() => navigate("/customerPage")}
                >
                  <PersonIcon>
                    <Business sx={{ color: iconColor }} />
                  </PersonIcon>
                  <ListItemText primary="Customer" />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4, gap: "2rem" }}
                  onClick={() => navigate("/expensePage")}
                >
                  <AccountBalanceWalletIcon>
                    <Business sx={{ color: iconColor }} />
                  </AccountBalanceWalletIcon>
                  <ListItemText primary="Expense" />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4, gap: "2rem" }}
                  onClick={() => navigate("/customerLedgerPage")}
                >
                  <MenuBookIcon>
                    <Business sx={{ color: iconColor }} />
                  </MenuBookIcon>
                  <ListItemText primary="Customer Ledger" />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4, gap: "2rem" }}
                  onClick={() => navigate("/expensePage")}
                >
                  <AssessmentIcon>
                    <Business sx={{ color: iconColor }} />
                  </AssessmentIcon>
                  <ListItemText primary="Profit & Loss" />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4, gap: "2rem" }}
                  onClick={() => navigate("/expensePage")}
                >
                  <CurrencyExchangeIcon>
                    <Business sx={{ color: iconColor }} />
                  </CurrencyExchangeIcon>
                  <ListItemText primary="Transaction History" />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4, gap: "2rem" }}
                  onClick={() => navigate("/expensePage")}
                >
                  <RestorePageIcon>
                    <Business sx={{ color: iconColor }} />
                  </RestorePageIcon>
                  <ListItemText primary="Customer History" />
                </ListItemButton>
              </List>
            </Collapse>

              {/* repair device */}
            <ListItemButton onClick={() => navigate("/repairPage")}>
              <ListItemIcon>
                <BuildIcon sx={{ color: iconColor }} />
              </ListItemIcon>
              <ListItemText primary="Repair" />
            </ListItemButton>
           
          </List>
        </Box>

        {/* Bottom Section */}
        <Box sx={{ px: 2, pb: 2 }}>
          <ListItemButton>
            <ListItemIcon>
              <Badge color="primary">
                <Notifications sx={{ color: iconColor }} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Notification" />
          </ListItemButton>

          <ListItemButton sx={{ gap: "2rem" }}>
            <SupportAgentIcon>
              <Support sx={{ color: iconColor }} />
            </SupportAgentIcon>
            <ListItemText primary="Support" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Settings sx={{ color: iconColor }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
