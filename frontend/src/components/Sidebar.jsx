import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Badge,
  Collapse,
} from "@mui/material";
import {
  Dashboard,
  Notifications,
  Support,
  Settings,
  ExpandLess,
  ExpandMore,
  People,
  SupportAgent,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Group 18763.png";
import minimizedLogo from "../assets/Group 18761.png";
import SegmentIcon from "@mui/icons-material/Segment";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Inventory from "@mui/icons-material/Inventory";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import Business from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
import DevicesIcon from "@mui/icons-material/Devices";
import ColorizeIcon from "@mui/icons-material/Colorize";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BuildIcon from "@mui/icons-material/Build";
import Layout from "../pages/Layout";

const iconColor = "#5C4E89"; // Custom icon color
const activeColor = "#E0E0E0"; // Highlight color for selected item

const Sidebar = ({ setIsSidebarMinimized }) => {


  // const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
   const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    setIsSidebarMinimized(newState); // pass back to Layout
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState({});
  const [isMasterVisible, setIsMasterVisible] = useState(true);

  useEffect(() => {
    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem("role")) || {};
    console.log(userData, "userData");
    if (userData.isLoggedIn || userData.role === "user") {
      setIsMasterVisible(false);
    }
  }, []);

  const handleToggle = (label) => {
    setOpenMenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

 

  // const toggleSidebar = () => {
  //   setIsSidebarMinimized(!isSidebarMinimized);
  // };

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <Dashboard sx={{ color: iconColor }} />,
    },
    ...(isMasterVisible
      ? [
          {
            label: "Master",
            icon: <People sx={{ color: iconColor }} />,
            subMenu: [
              {
                path: "/organizationPage",
                label: "Organization",
                icon: <Business sx={{ color: iconColor }} />,
              },
              {
                path: "/organizationBranchPage",
                label: "Org. Branch",
                icon: <Business sx={{ color: iconColor }} />,
              },
              {
                path: "/category",
                label: "Category",
                icon: <CategoryIcon sx={{ color: iconColor }} />,
              },
              {
                path: "/modelPage",
                label: "Model",
                icon: <OnDeviceTrainingIcon sx={{ color: iconColor }} />,
              },
              {
                path: "/devicePage",
                label: "Device",
                icon: <DevicesIcon sx={{ color: iconColor }} />,
              },
              {
                path: "/colorPage",
                label: "Color",
                icon: <ColorizeIcon sx={{ color: iconColor }} />,
              },
              {
                path: "/capacityPage",
                label: "Capacity",
                icon: <StorageIcon sx={{ color: iconColor }} />,
              },
              {
                path: "/userPage",
                label: "Users",
                icon: <PeopleAltIcon sx={{ color: iconColor }} />,
              },
            ],
          },
        ]
      : []),
    {
      path: "/accountPage",
      label: "Account",
      icon: <AccountCircleRoundedIcon sx={{ color: iconColor }} />,
    },
    {
      path: "/stockPage",
      label: "Stock",
      icon: <Inventory sx={{ color: iconColor }} />,
    },
    {
      path: "/sellPage",
      label: "Sell Devices",
      icon: <MobileFriendlyIcon sx={{ color: iconColor }} />,
    },
    {
      label: "Report",
      icon: <ArticleIcon sx={{ color: iconColor }} />,
      subMenu: [
        {
          path: "/customerPage",
          label: "Customer",
          icon: <PersonIcon sx={{ color: iconColor }} />,
        },
        {
          path: "/expensePage",
          label: "Expense",
          icon: <AccountBalanceWalletIcon sx={{ color: iconColor }} />,
        },
        {
          path: "/customerLedgerPage",
          label: "Customer Ledger",
          icon: <MenuBookIcon sx={{ color: iconColor }} />,
        },
        {
          path: "/plTable",
          label: "Profit & Loss",
          icon: <AssessmentIcon sx={{ color: iconColor }} />,
        },
      ],
    },
    {
      path: "/repairPage",
      label: "Repair",
      icon: <BuildIcon sx={{ color: iconColor }} />,
    },
  ];
  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isMinimized ? 100 : 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width:isMinimized ? 100 : 240,
          boxSizing: "border-box",
          background: "#ffffff",
          color: iconColor,
          height: "100vh",
          overflowX: "auto",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* fixed header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          py: 2,
          px: isMinimized ? 1 : 2,
          position: "sticky",
          top: 0,
          background: "#ffffff",
          zIndex: 1000,
        }}
      >
        {isMinimized ? (
          <img
            src={minimizedLogo} // Replace with the path to your minimized logo
            alt="Minimized Logo"
            style={{ width: 40, cursor: "pointer" }} // Adjust size as needed
            onClick={() => navigate("/dashboard")}
          />
        ) : (
          <img
            src={logo} // Replace with the path to your normal logo
            alt="Logo"
            style={{ width: 160, cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          />
        )}
        <SegmentIcon
          sx={{
            height: 30,
            width: 30,
            borderRadius: 50,
            padding: 0.4,
            cursor: "pointer",
          }}
          onClick={toggleSidebar}
        />
      </Box>

      {/* Scrollable Menu Items */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <List>
          {menuItems.map((item) =>
            item.subMenu ? (
              <React.Fragment key={item.label}>
                <ListItemButton
                  onClick={() => handleToggle(item.label)}
                  sx={{
                    justifyContent: isMinimized
                      ? "center"
                      : "flex-start",
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {!isMinimized && <ListItemText primary={item.label} />}
                  {openMenu[item.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                {isMinimized ? (
                  // Submenu directly below in minimized state
                  openMenu[item.label] && (
                    <Box sx={{ pl: 2 }}>
                      {item.subMenu.map((subItem) => (
                        <ListItemButton
                          key={subItem.label}
                          sx={{
                            justifyContent: "center",
                            backgroundColor: isActive(subItem.path)
                              ? activeColor
                              : "transparent",
                          }}
                          onClick={() => {
                            if (isActive(subItem.path)) {
                              toggleSidebar();
                            } else {
                              navigate(subItem.path);
                            }
                          }}
                        >
                          <ListItemIcon>{subItem.icon}</ListItemIcon>
                        </ListItemButton>
                      ))}
                    </Box>
                  )
                ) : (
                  <Collapse
                    in={openMenu[item.label]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subMenu.map((subItem) => (
                        <ListItemButton
                          key={subItem.label}
                          sx={{
                            pl: 4,
                            backgroundColor: isActive(subItem.path)
                              ? activeColor
                              : "transparent",
                          }}
                          onClick={() => {
                            if (isActive(subItem.path)) {
                              toggleSidebar();
                            } else {
                              navigate(subItem.path);
                            }
                          }}
                        >
                          <ListItemIcon>{subItem.icon}</ListItemIcon>
                          <ListItemText primary={subItem.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ) : (
              <ListItemButton
                key={item.path}
                onClick={() => {
                  if (isActive(item.path)) {
                    toggleSidebar();
                  } else {
                    navigate(item.path);
                  }
                }}
                sx={{
                  backgroundColor: isActive(item.path)
                    ? activeColor
                    : "transparent",
                  "&:hover": { backgroundColor: activeColor },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!isMinimized && <ListItemText primary={item.label} />}
              </ListItemButton>
            )
          )}
        </List>
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: isMinimized ? 1 : 2, // Adjust padding based on sidebar state
          background: "#ffffff",
          position: "sticky",
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <ListItemButton
          sx={{
            justifyContent: isMinimized ? "center" : "flex-start",
          }}
        >
          <ListItemIcon>
            <Badge color="primary">
              <Notifications sx={{ color: iconColor }} />
            </Badge>
          </ListItemIcon>
          {!isMinimized && <ListItemText primary="Notification" />}
        </ListItemButton>

        <ListItemButton
          sx={{
            justifyContent: isMinimized ? "center" : "flex-start",
          }}
        >
          <ListItemIcon>
            <SupportAgent sx={{ color: iconColor }} />
          </ListItemIcon>
          {!isMinimized && <ListItemText primary="Support" />}
        </ListItemButton>

        <ListItemButton
          sx={{
            justifyContent: isMinimized ? "center" : "flex-start",
          }}
        >
          <ListItemIcon>
            <Settings sx={{ color: iconColor }} />
          </ListItemIcon>
          {!isMinimized && <ListItemText primary="Settings" />}
        </ListItemButton>
      </Box>
    </Drawer>

     
  );
};

export default Sidebar;

// import React, { useEffect, useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   Badge,
//   Collapse,
// } from "@mui/material";
// import {
//   Dashboard,
//   Notifications,
//   Support,
//   Settings,
//   ExpandLess,
//   ExpandMore,
//   People,
//   SupportAgent,
// } from "@mui/icons-material";
// import { useNavigate, useLocation } from "react-router-dom";
// import logo from "../assets/Group 18763.png";
// import SegmentIcon from "@mui/icons-material/Segment";
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// import Inventory from "@mui/icons-material/Inventory";
// import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
// import Business from "@mui/icons-material/Business";
// import CategoryIcon from "@mui/icons-material/Category";
// import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
// import DevicesIcon from "@mui/icons-material/Devices";
// import ColorizeIcon from "@mui/icons-material/Colorize";
// import StorageIcon from "@mui/icons-material/Storage";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import ArticleIcon from "@mui/icons-material/Article";
// import PersonIcon from "@mui/icons-material/Person";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import BuildIcon from "@mui/icons-material/Build";

// const iconColor = "#5C4E89"; // Custom icon color
// const activeColor = "#E0E0E0"; // Highlight color for selected item

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState({});
//   const [isMasterVisible, setIsMasterVisible] = useState(true);

//   const handleToggle = (label) => {
//     setOpenMenu((prev) => ({ ...prev, [label]: !prev[label] }));
//   };

//   useEffect(() => {
//     // Fetch user data from local storage
//     const userData = JSON.parse(localStorage.getItem("role")) || {};
//     // Assuming a key like `isLoggedIn` or a specific role is stored
//     if (userData.isLoggedIn || userData.role === "user") {
//       setIsMasterVisible(false);
//     }
//   }, []);

// const menuItems = [
//   {
//     path: "/dashboard",
//     label: "Dashboard",
//     icon: <Dashboard sx={{ color: iconColor }} />,
//   },
//   ...(isMasterVisible
//     ? [
//         {
//           label: "Master",
//           icon: <People sx={{ color: iconColor }} />,
//           subMenu: [
//             {
//               path: "/organizationPage",
//               label: "Organization",
//               icon: <Business sx={{ color: iconColor }} />,
//             },
//             {
//               path: "/organizationBranchPage",
//               label: "Org. Branch",
//               icon: <Business sx={{ color: iconColor }} />,
//             },
//             {
//               path: "/category",
//               label: "Category",
//               icon: <CategoryIcon sx={{ color: iconColor }} />,
//             },
//             {
//               path: "/modelPage",
//               label: "Model",
//               icon: <OnDeviceTrainingIcon sx={{ color: iconColor }} />,
//             },
//             {
//               path: "/devicePage",
//               label: "Device",
//               icon: <DevicesIcon sx={{ color: iconColor }} />,
//             },
//             {
//               path: "/colorPage",
//               label: "Color",
//               icon: <ColorizeIcon sx={{ color: iconColor }} />,
//             },
//             {
//               path: "/capacityPage",
//               label: "Capacity",
//               icon: <StorageIcon sx={{ color: iconColor }} />,
//             },
//             {
//               path: "/userPage",
//               label: "Users",
//               icon: <PeopleAltIcon sx={{ color: iconColor }} />,
//             },
//           ],
//         },
//       ]
//     : []),
//   {
//     path: "/accountPage",
//     label: "Account",
//     icon: <AccountCircleRoundedIcon sx={{ color: iconColor }} />,
//   },
//   {
//     path: "/stockPage",
//     label: "Stock",
//     icon: <Inventory sx={{ color: iconColor }} />,
//   },
//   {
//     path: "/sellPage",
//     label: "Sell Devices",
//     icon: <MobileFriendlyIcon sx={{ color: iconColor }} />,
//   },
//   {
//     label: "Report",
//     icon: <ArticleIcon sx={{ color: iconColor }} />,
//     subMenu: [
//       {
//         path: "/customerPage",
//         label: "Customer",
//         icon: <PersonIcon sx={{ color: iconColor }} />,
//       },
//       {
//         path: "/expensePage",
//         label: "Expense",
//         icon: <AccountBalanceWalletIcon sx={{ color: iconColor }} />,
//       },
//       {
//         path: "/customerLedgerPage",
//         label: "Customer Ledger",
//         icon: <MenuBookIcon sx={{ color: iconColor }} />,
//       },
//       {
//         path: "/plTable",
//         label: "Profit & Loss",
//         icon: <AssessmentIcon sx={{ color: iconColor }} />,
//       },
//     ],
//   },
//   {
//     path: "/repairPage",
//     label: "Repair",
//     icon: <BuildIcon sx={{ color: iconColor }} />,
//   },
// ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 240,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 240,
//           boxSizing: "border-box",
//           background: "#ffffff",
//           color: iconColor,
//           display: "flex",
//           flexDirection: "column",
//           height: "100vh",
//         },
//       }}
//     >
//       {/* Fixed Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-around",
//           py: 2,
//           position: "sticky",
//           top: 0,
//           background: "#ffffff",
//           zIndex: 1000,
//         }}
//       >
//         <img
//           src={logo}
//           alt="Simply Trade Logo"
//           style={{ width: 160, cursor: "pointer" }}
//           onClick={() => navigate("/dashboard")}
//         />
//         <SegmentIcon
//           sx={{
//             height: 30,
//             width: 30,
//             borderRadius: 50,
//             padding: 0.4,
//             boxShadow: 4,
//           }}
//         />
//       </Box>

//       {/* Scrollable Menu Items */}
//       <Box
//         sx={{
//           flex: 1,
//           overflowY: "auto",
//         }}
//       >
//         <List>
//           {menuItems.map((item) =>
//             item.subMenu ? (
//               <React.Fragment key={item.label}>
//                 <ListItemButton onClick={() => handleToggle(item.label)}>
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                   <ListItemText primary={item.label} />
//                   {openMenu[item.label] ? <ExpandLess /> : <ExpandMore />}
//                 </ListItemButton>
//                 <Collapse
//                   in={openMenu[item.label]}
//                   timeout="auto"
//                   unmountOnExit
//                 >
//                   <List component="div" disablePadding>
//                     {item.subMenu.map((subItem) => (
//                       <ListItemButton
//                         key={subItem.label}
//                         sx={{
//                           pl: 4,
//                           backgroundColor: isActive(subItem.path)
//                             ? activeColor
//                             : "transparent",
//                         }}
//                         onClick={() => navigate(subItem.path)}
//                       >
//                         <ListItemIcon>{subItem.icon}</ListItemIcon>
//                         <ListItemText primary={subItem.label} />
//                       </ListItemButton>
//                     ))}
//                   </List>
//                 </Collapse>
//               </React.Fragment>
//             ) : (
//               <ListItemButton
//                 key={item.path}
//                 onClick={() => navigate(item.path)}
//                 sx={{
//                   backgroundColor: isActive(item.path)
//                     ? activeColor
//                     : "transparent",
//                   "&:hover": { backgroundColor: activeColor },
//                 }}
//               >
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.label} />
//               </ListItemButton>
//             )
//           )}
//         </List>
//       </Box>

//       {/* Fixed Footer */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 1,
//           p: 2,
//           background: "#ffffff",
//           position: "sticky",
//           bottom: 0,
//           zIndex: 1000,
//         }}
//       >
//         <ListItemButton>
//           <ListItemIcon>
//             <Badge color="primary">
//               <Notifications sx={{ color: iconColor }} />
//             </Badge>
//           </ListItemIcon>
//           <ListItemText primary="Notification" />
//         </ListItemButton>
//         <ListItemButton>
//           <ListItemIcon>
//             <SupportAgent sx={{ color: iconColor }} />
//           </ListItemIcon>
//           <ListItemText primary="Support" />
//         </ListItemButton>
//         <ListItemButton>
//           <ListItemIcon>
//             <Settings sx={{ color: iconColor }} />
//           </ListItemIcon>
//           <ListItemText primary="Settings" />
//         </ListItemButton>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;

// import React, { useEffect, useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   Box,
//   Avatar,
//   Typography,
//   Badge,
// } from "@mui/material";
// import {
//   Dashboard,
//   People,
//   ExpandLess,
//   ExpandMore,
//   Business,
//   Build,
//   Inventory,
//   Devices,
//   Notifications,
//   Support,
//   Settings,
//   Logout,
// } from "@mui/icons-material";

// import logo from "../assets/Group 18763.png";
// import SegmentIcon from "@mui/icons-material/Segment";
// import { useNavigate } from "react-router-dom";
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import CategoryIcon from "@mui/icons-material/Category";
// import DevicesIcon from "@mui/icons-material/Devices";
// import ColorizeIcon from "@mui/icons-material/Colorize";
// import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import StorageIcon from "@mui/icons-material/Storage";
// import ArticleIcon from "@mui/icons-material/Article";
// import PersonIcon from "@mui/icons-material/Person";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
// import RestorePageIcon from "@mui/icons-material/RestorePage";
// import BuildIcon from "@mui/icons-material/Build";
// import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";

// const iconColor = "#5C4E89"; // Custom icon color

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const [openMaster, setOpenMaster] = useState(false);
//   const [openReport, setOpenReport] = useState(false);
//   const [userRole, setUserRole] = useState({});

//   useEffect(() => {
//     const role = localStorage.getItem("role");

//     setUserRole(JSON.parse(role));
//   }, []);

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 240,
//         flexShrink: 0,
//         height: "100vh",
//         "& .MuiDrawer-paper": {
//           width: 240,
//           boxSizing: "border-box",
//           background: "#ffffff",
//           color: iconColor,
//           height: "100vh",
//           overflow: "hidden", // Prevent scrolling
//         },
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-around",
//           py: 2,
//         }}
//       >
//         <img
//           src={logo}
//           alt="Simply Trade Logo"
//           style={{ width: 160 }}
//           onClick={() => navigate("/dashboard")}
//         />
//         <SegmentIcon
//           sx={{
//             // border: "1px solid",
//             height: 30,
//             width: 30,
//             borderRadius: 50,
//             padding: 0.4,
//             boxShadow: 4,
//           }}
//         />
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           height: "100%", // Ensure it takes full height
//           overflow: "hidden", // Prevent scrolling
//         }}
//       >
//         {/* Sidebar Content */}
//         <Box sx={{ flexGrow: 1, overflowY: "auto", paddingBottom: 2 }}>
//           <List>
//             {/* Dashboard */}
//             <ListItemButton onClick={() => navigate("/dashboard")}>
//               <ListItemIcon>
//                 <Dashboard sx={{ color: iconColor }} />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItemButton>

//             {userRole?.role == "admin" && (
//               <Box>
//                 {/* Master Section */}
//                 <ListItemButton onClick={() => setOpenMaster(!openMaster)}>
//                   <ListItemIcon>
//                     <People sx={{ color: iconColor }} />
//                   </ListItemIcon>
//                   <ListItemText primary="Master" />
//                   {openMaster ? (
//                     <ExpandLess sx={{ color: iconColor }} />
//                   ) : (
//                     <ExpandMore sx={{ color: iconColor }} />
//                   )}
//                 </ListItemButton>

//                 <Collapse in={openMaster} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItemButton
//                       sx={{ pl: 4 }}
//                       onClick={() => navigate("/organizationPage")}
//                     >
//                       <ListItemIcon>
//                         <Business sx={{ color: iconColor }} />
//                       </ListItemIcon>
//                       <ListItemText primary="Organization" />
//                     </ListItemButton>

//                     <ListItemButton
//                       sx={{ pl: 4 }}
//                       onClick={() => navigate("/organizationBranchPage")}
//                     >
//                       <ListItemIcon>
//                         <Business sx={{ color: iconColor }} />
//                       </ListItemIcon>
//                       <ListItemText primary="Org. Branch" />
//                     </ListItemButton>

//                     <ListItemButton
//                       sx={{ pl: 4, gap: "2rem" }}
//                       onClick={() => navigate("/category")}
//                     >
//                       <CategoryIcon>
//                         <Business sx={{ color: iconColor }} />
//                       </CategoryIcon>
//                       <ListItemText primary="Category" />
//                     </ListItemButton>

//                     <ListItemButton
//                       sx={{ pl: 4, gap: "2rem" }}
//                       onClick={() => navigate("/modelPage")}
//                     >
//                       <OnDeviceTrainingIcon>
//                         <Business sx={{ color: iconColor }} />
//                       </OnDeviceTrainingIcon>
//                       <ListItemText primary="Model" />
//                     </ListItemButton>

//                     <ListItemButton
//                       sx={{ pl: 4, gap: "2rem" }}
//                       onClick={() => navigate("/devicePage")}
//                     >
//                       <DevicesIcon>
//                         <Business sx={{ color: iconColor }} />
//                       </DevicesIcon>
//                       <ListItemText primary="Device" />
//                     </ListItemButton>

//                     <ListItemButton
//                       sx={{ pl: 4, gap: "2rem" }}
//                       onClick={() => navigate("/colorPage")}
//                     >
//                       <ColorizeIcon>
//                         <Business sx={{ color: iconColor }} />
//                       </ColorizeIcon>
//                       <ListItemText primary="Color" />
//                     </ListItemButton>

//                     <ListItemButton
//                       sx={{ pl: 4, gap: "2rem" }}
//                       onClick={() => navigate("/capacityPage")}
//                     >
//                       <StorageIcon>
//                         <Business sx={{ color: iconColor }} />
//                       </StorageIcon>
//                       <ListItemText primary="Capacity" />
//                     </ListItemButton>

//                     <ListItemButton
//                       sx={{ pl: 4, gap: "2rem" }}
//                       onClick={() => navigate("/userPage")}
//                     >
//                       <PeopleAltIcon>
//                         <Business sx={{ color: iconColor }} />
//                       </PeopleAltIcon>
//                       <ListItemText primary="Users" />
//                     </ListItemButton>
//                   </List>
//                 </Collapse>
//               </Box>
//             )}
//             {/* Other Sidebar Items */}
//             <ListItemButton onClick={() => navigate("/accountPage")}>
//               <ListItemIcon>
//                 <AccountCircleRoundedIcon sx={{ color: iconColor }} />
//               </ListItemIcon>
//               <ListItemText primary="Account" />
//             </ListItemButton>

//             <ListItemButton onClick={() => navigate("/stockPage")}>
//               <ListItemIcon>
//                 <Inventory sx={{ color: iconColor }} />
//               </ListItemIcon>
//               <ListItemText primary="Stock" />
//             </ListItemButton>
//             {/* sell device */}
//             <ListItemButton onClick={() => navigate("/sellPage")}>
//               <ListItemIcon>
//                 <MobileFriendlyIcon sx={{ color: iconColor }} />
//               </ListItemIcon>
//               <ListItemText primary="Sell Devices" />
//             </ListItemButton>

//             <ListItemButton onClick={() => setOpenReport(!openReport)}>
//               <ArticleIcon>
//                 <People sx={{ color: iconColor }} />
//               </ArticleIcon>
//               <ListItemText primary="Report" sx={{ paddingLeft: 4 }} />
//               {openReport ? (
//                 <ExpandLess sx={{ color: iconColor }} />
//               ) : (
//                 <ExpandMore sx={{ color: iconColor }} />
//               )}
//             </ListItemButton>

//             <Collapse in={openReport} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   sx={{ pl: 4, gap: "2rem" }}
//                   onClick={() => navigate("/customerPage")}
//                 >
//                   <PersonIcon>
//                     <Business sx={{ color: iconColor }} />
//                   </PersonIcon>
//                   <ListItemText primary="Customer" />
//                 </ListItemButton>

//                 <ListItemButton
//                   sx={{ pl: 4, gap: "2rem" }}
//                   onClick={() => navigate("/expensePage")}
//                 >
//                   <AccountBalanceWalletIcon>
//                     <Business sx={{ color: iconColor }} />
//                   </AccountBalanceWalletIcon>
//                   <ListItemText primary="Expense" />
//                 </ListItemButton>

//                 <ListItemButton
//                   sx={{ pl: 4, gap: "2rem" }}
//                   onClick={() => navigate("/customerLedgerPage")}
//                 >
//                   <MenuBookIcon>
//                     <Business sx={{ color: iconColor }} />
//                   </MenuBookIcon>
//                   <ListItemText primary="Customer Ledger" />
//                 </ListItemButton>

//                 <ListItemButton
//                   sx={{ pl: 4, gap: "2rem" }}
//                   onClick={() => navigate("/plTable")}
//                 >
//                   <AssessmentIcon>
//                     <Business sx={{ color: iconColor }} />
//                   </AssessmentIcon>
//                   <ListItemText primary="Profit & Loss" />
//                 </ListItemButton>

//                 {/* <ListItemButton
//                   sx={{ pl: 4, gap: "2rem" }}
//                   onClick={() => navigate("/expensePage")}
//                 >
//                   <CurrencyExchangeIcon>
//                     <Business sx={{ color: iconColor }} />
//                   </CurrencyExchangeIcon>
//                   <ListItemText primary="Transaction History" />
//                 </ListItemButton>

//                 <ListItemButton
//                   sx={{ pl: 4, gap: "2rem" }}
//                   onClick={() => navigate("/expensePage")}
//                 >
//                   <RestorePageIcon>
//                     <Business sx={{ color: iconColor }} />
//                   </RestorePageIcon>
//                   <ListItemText primary="Customer History" />
//                 </ListItemButton> */}
//               </List>
//             </Collapse>

//             {/* repair device */}
//             <ListItemButton onClick={() => navigate("/repairPage")}>
//               <ListItemIcon>
//                 <BuildIcon sx={{ color: iconColor }} />
//               </ListItemIcon>
//               <ListItemText primary="Repair" />
//             </ListItemButton>
//           </List>
//         </Box>

//         {/* Bottom Section */}
//         <Box sx={{ px: 2, pb: 2 }}>
//           <ListItemButton>
//             <ListItemIcon>
//               <Badge color="primary">
//                 <Notifications sx={{ color: iconColor }} />
//               </Badge>
//             </ListItemIcon>
//             <ListItemText primary="Notification" />
//           </ListItemButton>

//           <ListItemButton sx={{ gap: "2rem" }}>
//             <SupportAgentIcon>
//               <Support sx={{ color: iconColor }} />
//             </SupportAgentIcon>
//             <ListItemText primary="Support" />
//           </ListItemButton>

//           <ListItemButton>
//             <ListItemIcon>
//               <Settings sx={{ color: iconColor }} />
//             </ListItemIcon>
//             <ListItemText primary="Settings" />
//           </ListItemButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;
