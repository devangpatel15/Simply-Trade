// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
// } from "@mui/material";
// import axios from "axios";

// const ActivityLogTable = () => {
//   const [logs, setLogs] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

// //   const  = async () => {
// //     try {
// //       const params = {};
// //       if (userId) params.userId = userId;
// //       if (startDate && endDate) {
// //         params.startDate = startDate;
// //         params.endDate = endDate;
// //       }

// //       const res = await axios.get("/api/activityLog");
// //   console.log("Logs fetched successfully", res.data.logs);

// //       setLogs(res.data.logs);
// //     } catch (err) {
// //       console.error("Error fetching logs:", err);
// //     }
// //   };

// const api_call = import.meta.env.VITE_API_URL


//   const fetchLogs = async () => {
//       try {
//         const response = await axios.get(`${api_call}/getActivityLog`, {
          
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setLogs(response.data.data)
//         console.log(response);
        
//       } catch (error) {
//         console.log(error, "data not found");
//       }
//     };

//   useEffect(() => {
//     fetchLogs();
//   }, []);


//   return (
//     <Container>
//       <Typography variant="h5" gutterBottom>
//         Activity Logs
//       </Typography>

//       <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//         <TextField
//           label="User ID"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <TextField
//           type="date"
//           label="Start Date"
//           InputLabelProps={{ shrink: true }}
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//         <TextField
//           type="date"
//           label="End Date"
//           InputLabelProps={{ shrink: true }}
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//         <Button variant="contained" onClick={fetchLogs}>
//           Filter
//         </Button>
//       </Box>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>User</TableCell>
//             <TableCell>Role</TableCell>
//             <TableCell>Organization</TableCell>
//             <TableCell>Branch</TableCell>
//             <TableCell>Message</TableCell>
//             <TableCell>Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {Array.isArray(logs) && logs.length > 0 ? (
//             logs.map((log) => (
//               <TableRow key={log._id}>
//                 <TableCell>{log.userId?.name || "-"}</TableCell>
//                 <TableCell>{log.role || "-"}</TableCell>
//                 <TableCell>{log.organization?.organizationName || "-"}</TableCell>
//                 <TableCell>{log.branchName?.branchName || "-"}</TableCell>
//                 <TableCell>{log.message}</TableCell>
//                 <TableCell>
//                   {new Date(log.createdAt).toLocaleString()}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={5} align="center">
//                 No logs found.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </Container>
//   );
// };

// export default ActivityLogTable;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";

const ActivityLogTable = () => {
  const [logs, setLogs] = useState([]);
  const [userId, setUserId] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const api_call = import.meta.env.VITE_API_URL;

  // Fetch Activity Logs from API
  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${api_call}/getActivityLog`, {
        // params: {
        //   userId: userId || undefined,
        //   startDate: dateRange.startDate,
        //   endDate: dateRange.endDate,
        //   page: paginationModel.page + 1,
        //   pageSize: paginationModel.pageSize,
        // },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLogs(response.data.data);
      setTotalRows(10);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [paginationModel, userId, dateRange]);

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
    setPaginationModel((prev) => ({ ...prev, page: 0 })); // Reset to first page
  };

  const columns = [
    { field: "user", headerName: "User", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "organization", headerName: "Organization", flex: 1 },
    { field: "branch", headerName: "Branch", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => moment(params.row.date).format('DD-MM-YYYY, h:mm a'),
    },
  ];

  console.log("logs",logs);
  
  const rows =  Array.isArray(logs)?
  logs.map((log) => ({
    id: log._id,
    user: log.userId?.name || "N/A",
    role: log.role || "N/A",
    organization: log.organization?.organizationName || "N/A",
    branch: log.branchName?.branchName || "N/A",
    message: log.message || "No message",
    date: log.createdAt || null,
  })):[];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
        Activity Logs
      </Typography>

      <Box display="flex" gap={2} my={2}>
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ flex: 1, backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          type="date"
          label="Start Date"
          value={dateRange.startDate}
          onChange={(e) => handleDateChange("startDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1, backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          type="date"
          label="End Date"
          value={dateRange.endDate}
          onChange={(e) => handleDateChange("endDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1, backgroundColor: "white", borderRadius: 1 }}
        />
        <Button
          variant="contained"
          onClick={fetchLogs}
          sx={{ textTransform: "none", backgroundColor: "#6c5ce7" }}
        >
          Filter
        </Button>
      </Box>

      <Paper
        sx={{
          height: "auto",
          width: "100%",
          marginTop: "2rem",
          overflowX: "auto",
          boxSizing: "border-box",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={paginationModel.pageSize}
          rowCount={totalRows}
          paginationMode={'server'}
          onPaginationModelChange={handlePaginationModelChange}
          paginationModel={paginationModel}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            minWidth: "100%",
            "& .MuiDataGrid-columnHeader": {
              background: "#C4BDFF",
              color: "white",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              fontSize: "1.2rem",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ActivityLogTable;

