import React from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Box } from "@mui/material";

const Layout = ({children}) => {
  return (
      <Box sx={{ display: "flex", marginTop: "4rem" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Header />
          <Box sx={{ padding: 3 }}>
            {children}
          </Box>
        </Box>
      </Box>
  );
};

export default Layout;
