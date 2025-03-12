require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { connectMongoDB } = require("./config/db");
const userRoute = require('./routes/user.js');
const organizationBranchRoute = require("./routes/OrganizationBranch.js");
const orgRouter = require("./routes/organization.js");
const colorRoute = require("./routes/color.js");
const deviceRoute = require("./routes/device.js");
const modelRoute = require("./routes/model.js");

const PORT = process.env.PORT;
connectMongoDB();

app.use(express.json());
app.use(cors());
app.use('/api',userRoute)
app.use('/api',organizationBranchRoute)
app.use("/api",orgRouter)
app.use("/api",colorRoute)
app.use("/api",deviceRoute)
app.use("/api",modelRoute)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
