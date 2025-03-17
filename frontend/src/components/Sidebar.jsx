// import React from "react";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import BusinessIcon from "@mui/icons-material/Business";

// const Sidebar = () => {
//   return (
//     <>
//       <Drawer variant="permanent" sx={{ width: 187, flexShrink: 0 }}>
//         <List>
//           <ListItem button component={Link} to="/dashboard">
//             <ListItemIcon>
//               <DashboardIcon />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <ListItem button component={Link} to="/organizationPage">
//             <ListItemIcon>
//               <BusinessIcon />
//             </ListItemIcon>
//             <ListItemText primary="Organizations" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CategoryIcon from '@mui/icons-material/Category';
import DevicesIcon from '@mui/icons-material/Devices';
import ColorizeIcon from '@mui/icons-material/Colorize';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import InventoryIcon from '@mui/icons-material/Inventory';

const iconColor = "#5C4E89"; // Custom icon color

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("location", location);

  const [openMaster, setOpenMaster] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("logout");
    navigate("/signIn");
  };

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
        <img src={logo} alt="Simply Trade Logo" style={{ width: 160 }} />
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

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Business sx={{ color: iconColor }} />
                  </ListItemIcon>
                  <ListItemText primary="Org. Branch" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4, gap: "2rem" }}>
                  <PeopleAltIcon>
                    <Business sx={{ color: iconColor }} />
                  </PeopleAltIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4, gap: "2rem" }}>
                  <CategoryIcon>
                    <Business sx={{ color: iconColor }} />
                  </CategoryIcon>
                  <ListItemText primary="Category" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4, gap: "2rem" }}>
                  <DevicesIcon>
                    <Business sx={{ color: iconColor }} />
                  </DevicesIcon>
                  <ListItemText primary="Device" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4, gap: "2rem" }}>
                  <OnDeviceTrainingIcon>
                    <Business sx={{ color: iconColor }} />
                  </OnDeviceTrainingIcon>
                  <ListItemText primary="Model" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4, gap: "2rem" }}>
                  <ColorizeIcon>
                    <Business sx={{ color: iconColor }} />
                  </ColorizeIcon>
                  <ListItemText primary="Color" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4, gap: "2rem" }}>
                  <InventoryIcon>
                    <Business sx={{ color: iconColor }} />
                  </InventoryIcon>
                  <ListItemText primary="Stock" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4, gap: "2rem" }}>
                  <AccountCircleRoundedIcon>
                    <Business sx={{ color: iconColor }} />
                  </AccountCircleRoundedIcon>
                  <ListItemText primary="Account" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Other Sidebar Items */}
            <ListItemButton>
              <ListItemIcon>
                <Inventory sx={{ color: iconColor }} />
              </ListItemIcon>
              <ListItemText primary="Stock" />
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

          <ListItemButton sx={{ gap: "2rem" }} onClick={handleLogout}>
            <LogoutIcon>
              <Logout sx={{ color: iconColor }} />
            </LogoutIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
