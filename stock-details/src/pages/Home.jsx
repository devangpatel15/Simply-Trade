import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import image from "../assets/Rectangle 1900.png";
import { getAllStocks } from "../apis/StockApi";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import noDataFoundImage from "../assets/Group 18992.png";

const Home = () => {
  const [stocks, setStocks] = useState([]);

  const callApi = async () => {
    const response = await getAllStocks();
    setStocks(response?.data?.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
          Stocks
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {stocks.length > 0 ? (
          stocks.map((option, index) => {
            return (
              <>
                <Card
                  sx={{
                    width: 278,
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
                        // onClick={(event) => handleClick(event, option._id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    {console.log(option, "option")}

                    {/* Branch Name */}
                    <Typography variant="h6" color="#6c5ce7" fontWeight="bold">
                      {`${option?.modelName?.modelName} - ${option?.deviceName?.deviceName}(${option?.color?.colorName})`}
                    </Typography>

                    {/* Customer Name */}
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        display="inline"
                      >
                        Buyer Name:{" "}
                      </Typography>
                      <Typography variant="body2" display="inline">
                        {option?.customerName?.customerName}
                      </Typography>
                    </Box>

                    {/* Customer Phone */}
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        display="inline"
                      >
                        Phone Number:{" "}
                      </Typography>
                      <Typography variant="body2" display="inline">
                        {option.customerPhone}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </>
            );
          })
        ) : (
          <Box sx={{ margin: "5rem auto" }}>
            <img src={noDataFoundImage} alt="no data found image" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;

// // =========================================================================================================================

// // import React, { useEffect, useState } from "react";
// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   IconButton,
// //   Typography,
// //   Card,
// //   CardContent,
// //   CardMedia,
// // } from "@mui/material";
// // import { getAllStocks } from "../apis/StockApi";
// // import MoreVertIcon from "@mui/icons-material/MoreVert";
// // import noDataFoundImage from "../assets/Group 18992.png";
// // import defaultDeviceImage from "../assets/Rectangle 1900.png"; // fallback image

// // const API_TOKEN = "ae41fb86c2766e9e662f924a07bca78a4828838a";
// // const BASE_URL = "https://mobileapi.dev";

// // const Home = () => {
// //   const [stocks, setStocks] = useState([]);
// //   const [deviceImages, setDeviceImages] = useState({});

// //   useEffect(() => {
// //     callApi();
// //   }, []);

// //   const callApi = async () => {
// //     try {
// //       const response = await getAllStocks();
// //       const data = response?.data?.data || [];
// //       setStocks(data);

// //       // Extract unique device/model names to avoid duplicate API calls
// //       const uniqueNames = [
// //         ...new Set(
// //           data.map(
// //             (stock) =>
// //               stock?.modelName?.modelName || stock?.deviceName?.deviceName
// //           )
// //         ),
// //       ];

// //       // Fetch images in parallel for all unique names
// //       const imageFetches = uniqueNames.map(async (name) => {
// //         try {
// //           const searchRes = await fetch(
// //             `${BASE_URL}/devices/search/?name=${encodeURIComponent(name)}`,
// //             {
// //               headers: {
// //                 Authorization: `Token ${API_TOKEN}`,
// //               },
// //             }
// //           );
// //           const searchData = await searchRes.json();
// //           const deviceId = searchData?.results?.[0]?.id;

// //           if (!deviceId) {
// //             return { name, image: defaultDeviceImage };
// //           }

// //           const detailRes = await fetch(`${BASE_URL}/devices/${deviceId}/`, {
// //             headers: {
// //               Authorization: `Token ${API_TOKEN}`,
// //             },
// //           });
// //           const detailData = await detailRes.json();
// //           const imageUrl = detailData?.image || defaultDeviceImage;
// //           return { name, image: imageUrl };
// //         } catch (error) {
// //           console.error(`Failed to fetch image for ${name}:`, error);
// //           return { name, image: defaultDeviceImage };
// //         }
// //       });

// //       const results = await Promise.all(imageFetches);

// //       // Create a name -> image URL map
// //       const imageMap = {};
// //       results.forEach(({ name, image }) => {
// //         imageMap[name] = image;
// //       });

// //       setDeviceImages(imageMap);
// //     } catch (error) {
// //       console.error("Failed to load stocks or device images:", error);
// //       setStocks([]);
// //     }
// //   };

// //   return (
// //     <Box sx={{ padding: 3 }}>
// //       <Box display="flex" alignItems="center" justifyContent="center">
// //         <Typography variant="h4" sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
// //           Stocks
// //         </Typography>
// //       </Box>
// //       <Box sx={{ display: "flex", flexWrap: "wrap" }}>
// //         {stocks.length > 0 ? (
// //           stocks.map((option, index) => {
// //             const name =
// //               option?.modelName?.modelName || option?.deviceName?.deviceName;
// //             const imageUrl = deviceImages[name] || defaultDeviceImage;

// //             return (
// //               <Card
// //                 key={index}
// //                 sx={{ width: 278, borderRadius: 2, boxShadow: 3, m: 1, p: 1 }}
// //               >
// //                 <CardMedia
// //                   component="img"
// //                   height="140"
// //                   image={imageUrl}
// //                   alt={name}
// //                 />
// //                 <CardContent
// //                   sx={{
// //                     position: "relative",
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     alignItems: "flex-start",
// //                   }}
// //                 >
// //                   <Box sx={{ position: "absolute", top: 0, right: 0 }}>
// //                     <IconButton size="small">
// //                       <MoreVertIcon />
// //                     </IconButton>
// //                   </Box>

// //                   <Typography variant="h6" color="#6c5ce7" fontWeight="bold">
// //                     {`${option?.modelName?.modelName} - ${option?.deviceName?.deviceName} (${option?.color?.colorName})`}
// //                   </Typography>

// //                   <Box sx={{ mt: 1 }}>
// //                     <Typography
// //                       variant="body2"
// //                       fontWeight="bold"
// //                       display="inline"
// //                     >
// //                       Buyer Name:{" "}
// //                     </Typography>
// //                     <Typography variant="body2" display="inline">
// //                       {option?.customerName?.customerName}
// //                     </Typography>
// //                   </Box>

// //                   <Box sx={{ mt: 1 }}>
// //                     <Typography
// //                       variant="body2"
// //                       fontWeight="bold"
// //                       display="inline"
// //                     >
// //                       Phone Number:{" "}
// //                     </Typography>
// //                     <Typography variant="body2" display="inline">
// //                       {option.customerPhone}
// //                     </Typography>
// //                   </Box>
// //                 </CardContent>
// //               </Card>
// //             );
// //           })
// //         ) : (
// //           <Box sx={{ margin: "5rem auto" }}>
// //             <img src={noDataFoundImage} alt="no data found" />
// //           </Box>
// //         )}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Home;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   IconButton,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
// } from "@mui/material";
// import defaultImage from "../assets/Rectangle 1900.png";
// import { getAllStocks } from "../apis/StockApi";
// import { getDeviceImage } from "../apis/getDeviceImage";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import noDataFoundImage from "../assets/Group 18992.png";

// const Home = () => {
//   const [stocks, setStocks] = useState([]);
//   const [deviceImages, setDeviceImages] = useState({});

//   const callApi = async () => {
//     const response = await getAllStocks();
//     const data = response?.data?.data || [];

//     // Fetch images for each device
//     const imagePromises = data.map(async (item) => {
//       const brand = item?.deviceName?.deviceName || "";
//       const model = item?.modelName?.modelName || "";
//       const imageUrl = await getDeviceImage(brand, model);
//       return { id: item._id, url: imageUrl };
//     });

//     const results = await Promise.all(imagePromises);
//     const imageMap = {};
//     results.forEach((img) => {
//       imageMap[img.id] = img.url;
//     });

//     setDeviceImages(imageMap);
//     setStocks(data);
//   };

//   useEffect(() => {
//     callApi();
//   }, []);

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Box display="flex" alignItems="center" justifyContent="center">
//         <Typography variant="h4" sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
//           Stocks
//         </Typography>
//       </Box>
//       <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//         {stocks.length > 0 ? (
//           stocks.map((option, index) => (
//             <Card
//               key={index}
//               sx={{
//                 width: 278,
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 m: 1,
//                 p: 1,
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={deviceImages[option._id] || defaultImage}
//                 alt="device"
//               />
//               <CardContent
//                 sx={{
//                   position: "relative",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <Box sx={{ position: "absolute", top: 0, right: 0 }}>
//                   <IconButton size="small">
//                     <MoreVertIcon />
//                   </IconButton>
//                 </Box>

//                 <Typography variant="h6" color="primary" fontWeight="bold">
//                   {`${option?.modelName?.modelName} - ${option?.deviceName?.deviceName} (${option?.color?.colorName})`}
//                 </Typography>

//                 <Box sx={{ mt: 1 }}>
//                   <Typography
//                     variant="body2"
//                     fontWeight="bold"
//                     display="inline"
//                   >
//                     Buyer Name:{" "}
//                   </Typography>
//                   <Typography variant="body2" display="inline">
//                     {option?.customerName?.customerName}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ mt: 1 }}>
//                   <Typography
//                     variant="body2"
//                     fontWeight="bold"
//                     display="inline"
//                   >
//                     Phone Number:{" "}
//                   </Typography>
//                   <Typography variant="body2" display="inline">
//                     {option.customerPhone}
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Box sx={{ margin: "5rem auto" }}>
//             <img src={noDataFoundImage} alt="no data found" />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Home;import React, { useEffect, useState } from "react";

// import {
//   Box,
//   IconButton,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
// } from "@mui/material";
// import defaultImage from "../assets/Rectangle 1900.png";
// import { getAllStocks } from "../apis/StockApi";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import noDataFoundImage from "../assets/Group 18992.png";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const Home = () => {
//   const [stocks, setStocks] = useState([]);
//   const [deviceImages, setDeviceImages] = useState({});

//   const callApi = async () => {
//     try {
//       const response = await getAllStocks();
//       const data = response?.data?.data || [];

//       const imagePromises = data.map(async (item) => {
//         const name =
//           item?.deviceName?.deviceName || item?.modelName?.modelName || "";
//         if (!name) return { id: item._id, url: defaultImage };

//         try {
//           const res = await axios.get(
//             `http://localhost:4000/api/proxy/device-search?name=${encodeURIComponent(
//               name
//             )}`
//           );

//           const base64 = res?.data?.image_b64;
//           const url = base64 ? `data:image/png;base64,${base64}` : defaultImage;

//           return { id: item._id, url };
//         } catch (err) {
//           console.warn(`Failed to get image for: ${name}`, err);
//           return { id: item._id, url: defaultImage };
//         }
//       });

//       const results = await Promise.all(imagePromises);
//       const imageMap = {};
//       results.forEach(({ id, url }) => {
//         imageMap[id] = url;
//       });

//       setDeviceImages(imageMap);
//       setStocks(data);
//     } catch (error) {
//       console.error("Error loading stocks or images:", error);
//       setStocks([]);
//     }
//   };

//   useEffect(() => {
//     callApi();
//   }, []);

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Box display="flex" alignItems="center" justifyContent="center">
//         <Typography variant="h4" sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
//           Stocks
//         </Typography>
//       </Box>
//       <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//         {stocks.length > 0 ? (
//           stocks.map((option, index) => (
//             <Card
//               key={index}
//               sx={{
//                 width: 278,
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 m: 1,
//                 p: 1,
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="auto"
//                 image={deviceImages[option._id] || defaultImage}
//                 alt={option?.deviceName?.deviceName || "device"}
//               />
//               <CardContent
//                 sx={{
//                   position: "relative",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <Box sx={{ position: "absolute", top: 0, right: 0 }}>
//                   <IconButton size="small">
//                     <MoreVertIcon />
//                   </IconButton>
//                 </Box>

//                 <Typography variant="h6" color="primary" fontWeight="bold">
//                   {`${option?.modelName?.modelName} - ${option?.deviceName?.deviceName} (${option?.color?.colorName})`}
//                 </Typography>

//                 <Box sx={{ mt: 1 }}>
//                   <Typography
//                     variant="body2"
//                     fontWeight="bold"
//                     display="inline"
//                   >
//                     Buyer Name:{" "}
//                   </Typography>
//                   <Typography variant="body2" display="inline">
//                     {option?.customerName?.customerName}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ mt: 1 }}>
//                   <Typography
//                     variant="body2"
//                     fontWeight="bold"
//                     display="inline"
//                   >
//                     Phone Number:{" "}
//                   </Typography>
//                   <Typography variant="body2" display="inline">
//                     {option.customerPhone}
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Box sx={{ margin: "5rem auto" }}>
//             <img src={noDataFoundImage} alt="no data found" />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Home;
