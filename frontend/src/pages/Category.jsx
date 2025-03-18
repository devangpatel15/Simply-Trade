import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const getCategory = async () => {
    const response = await axios.get("http://localhost:4000/api/allCat", {
      headers: { "Content-Type ": "application/json" },
    });

    console.log(response.data.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

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
              CATEGORY
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
                      {/* <SearchIcon sx={{ color: "#6c5ce7" }} /> */}
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
                to="/categoryForm"
              >
                Add Category
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderRadius: 10,
              boxShadow: 1,
              padding: 2,
              marginTop: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src="/path/to/avatar.jpg"
                alt="User Avatar"
                sx={{ width: 50, height: 50 }}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#6c5ce7" }}
                >
                  Electronics
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    Branch Name :
                  </Typography>
                </Box>
              </Box>
            </Box>
            <IconButton sx={{ backgroundColor: "#f5f5f5" }}>
              <VisibilityIcon sx={{ color: "#6c5ce7" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
