import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const ActivityLogTable = () => {
  const [logs, setLogs] = useState([]);
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

//   const  = async () => {
//     try {
//       const params = {};
//       if (userId) params.userId = userId;
//       if (startDate && endDate) {
//         params.startDate = startDate;
//         params.endDate = endDate;
//       }

//       const res = await axios.get("/api/activityLog");
//   console.log("Logs fetched successfully", res.data.logs);

//       setLogs(res.data.logs);
//     } catch (err) {
//       console.error("Error fetching logs:", err);
//     }
//   };

const api_call = import.meta.env.VITE_API_URL


  const fetchLogs = async () => {
      try {
        const response = await axios.get(`${api_call}/activityLog`, {
          
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLogs(response.data.data)
        console.log(response);
        
      } catch (error) {
        console.log(error, "data not found");
      }
    };

  useEffect(() => {
    fetchLogs();
  }, []);


  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Activity Logs
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button variant="contained" onClick={fetchLogs}>
          Filter
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(logs) && logs.length > 0 ? (
            logs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>{log.userId?.name || "-"}</TableCell>
                <TableCell>{log.organization?.organizationName || "-"}</TableCell>
                <TableCell>{log.branchName?.branchName || "-"}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>
                  {new Date(log.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No logs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ActivityLogTable;
