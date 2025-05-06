import { useEffect, useState } from "react";
import { getAllCategory } from "../apis/CategoryApi";
import CategoryTable from "../tables/CategoryTable";

const Category = () => {
  const [category, setCategory] = useState([]);

  const callApi = async () => {
    const response = await getAllCategory();
    setCategory(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, []);



  return (
    <CategoryTable />
    // <Box sx={{ display: "flex", marginTop: "4rem" }}>
    //   <Sidebar />
    //   <Box sx={{ flexGrow: 1 }}>
    //     <Header />
    //     <Box sx={{ padding: 3 }}>
    //       <Box
    //         display="flex"
    //         alignItems="center"
    //         justifyContent="space-between"
    //       >
    //         <Typography
    //           variant="h4"
    //           sx={{ fontWeight: "bold", color: "#6c5ce7" }}
    //         >
    //           CATEGORY
    //         </Typography>
    //         <Box display="flex" gap={2}>
    //           <TextField
    //             variant="outlined"
    //             placeholder="Search"
    //             size="small"
    //             sx={{ backgroundColor: "white", borderRadius: 1 }}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment position="start">
    //                   <SearchIcon sx={{ color: "#6c5ce7" }} />
    //                 </InputAdornment>
    //               ),
    //             }}
    //           />
    //           <Button
    //             variant="outlined"
    //             sx={{
    //               color: "#6c5ce7",
    //               borderColor: "#6c5ce7",
    //               textTransform: "none",
    //             }}
    //             component={Link}
    //             to="/categoryForm"
    //           >
    //             Add Category
    //           </Button>
    //         </Box>
    //       </Box>

    //       {category &&
    //         category.map((category) => {
    //           return (
    //             <Box
    //               key={category._id}
    //               sx={{
    //                 display: "flex",
    //                 alignItems: "center",
    //                 justifyContent: "space-between",
    //                 backgroundColor: "white",
    //                 borderRadius: 10,
    //                 boxShadow: 1,
    //                 padding: 2,
    //                 marginTop: 3,
    //               }}
    //             >
    //               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    //                 <Avatar
    //                   src="/path/to/avatar.jpg"
    //                   alt="User Avatar"
    //                   sx={{ width: 50, height: 50 }}
    //                 />
    //                 <Box>
    //                   <Typography
    //                     variant="h6"
    //                     sx={{ fontWeight: "bold", color: "#6c5ce7" }}
    //                   >
    //                     {category.categoryName}
    //                   </Typography>

    //                   <Box sx={{ display: "flex", gap: 2 }}>
    //                     <Typography
    //                       variant="body2"
    //                       sx={{ color: "green", fontWeight: "bold" }}
    //                     >
    //                       Created At:{" "}
    //                       <span
    //                         style={{ color: "black", fontWeight: "normal" }}
    //                       >
    //                         {moment(category.createdAt).format("DD-MM-YYYY")}
    //                       </span>
    //                     </Typography>
    //                     <Typography
    //                       variant="body2"
    //                       sx={{ color: "brown", fontWeight: "bold" }}
    //                     >
    //                       BranchName:
    //                       <span
    //                         style={{ color: "black", fontWeight: "normal" }}
    //                       >
    //                         {category.orgBranchId.branchName}
    //                       </span>
    //                     </Typography>
    //                   </Box>
    //                 </Box>
    //               </Box>
    //               <IconButton
    //                 sx={{ backgroundColor: "#f5f5f5" }}
    //                 onClick={() => handleOpen(category)}
    //               >
    //                 <VisibilityIcon sx={{ color: "#6c5ce7" }} />
    //               </IconButton>
    //             </Box>
    //           );
    //         })}

    //       <DialogBox
    //         handleClose={handleClose}
    //         open={open}
    //         data={data}
    //         callApi={callApi}
    //         fieldName="categoryForm"
    //       />
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default Category;
