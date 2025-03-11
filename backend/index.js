require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { connectMongoDB } = require("./config/db");
const userRoute = require('./routes/user.js');
<<<<<<< HEAD
const organizationBranchRoute = require("./routes/OrganizationBranch.js");
=======
const orgRouter = require("./routes/organization.js");
>>>>>>> c1c2445fdd5278df1075330197085bc6548ed208

const PORT = process.env.PORT;
connectMongoDB();

app.use(express.json());
app.use(cors());
app.use('/api',userRoute)
<<<<<<< HEAD
app.use('/api',organizationBranchRoute)
=======
app.use("/api",orgRouter)
>>>>>>> c1c2445fdd5278df1075330197085bc6548ed208

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
