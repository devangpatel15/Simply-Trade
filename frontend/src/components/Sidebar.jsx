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
  AccountCircle,
  Store,
  Report,
  QueryStats,
  ExpandLess,
  ExpandMore,
  Business,
  Build,
  Inventory,
  Devices,
  Notifications,
  Support,
  Settings,
} from "@mui/icons-material";

import logo from "../assets/Group 18763.png";
import SegmentIcon from "@mui/icons-material/Segment";
import userImage from "../assets/Ellipse 2332.png";
import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const iconColor = "#5C4E89"; // Custom icon color

const Sidebar = () => {
  const [openMaster, setOpenMaster] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  const navigate = useNavigate();

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
              <List
                component="div"
                disablePadding
                onClick={() => navigate("/organizationPage")}
              >
                <ListItemButton sx={{ pl: 4 }}>
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
              <Badge badgeContent={4} color="primary">
                <Notifications sx={{ color: iconColor }} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Notification" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Support sx={{ color: iconColor }} />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Settings sx={{ color: iconColor }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>

          {/* User Profile */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              background: "#EFEAF5",
              borderRadius: 2,
              p: 1,
              mt: 2,
              width: 220,
            }}
          >
            <Avatar src={userImage} alt="Anita Cruz" />
            <Box sx={{ width: 100 }}>
              <Typography variant="body1" fontWeight="bold">
                Anita Cruz
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Anitacruz123@gmail.com
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
