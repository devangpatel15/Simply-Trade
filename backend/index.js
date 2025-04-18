require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { connectMongoDB } = require("./config/db");
const organizationBranchRoute = require("./routes/OrganizationBranch.js");
const orgRouter = require("./routes/organization.js");
const colorRoute = require("./routes/color.js");
const deviceRoute = require("./routes/device.js");
const modelRoute = require("./routes/model.js");
const userRoute = require("./routes/user.js");
const catRouter = require("./routes/category.js");
const capRouter = require("./routes/capacity.js");
const cusRouter = require("./routes/customer.js");
const stockRouter = require("./routes/stock.js");
const paymentRouter = require("./routes/payment.js");
const accountRouter = require("./routes/account.js");
const expenseRouter = require("./routes/expense.js");
const sellRouter = require("./routes/sell.js");
const repairRouter = require("./routes/repair.js");
const cusLeaderRouter = require("./routes/cusLeadger.js");
const { promises } = require("nodemailer/lib/xoauth2/index.js");
const profitLossRouter = require("./routes/profitLoss.js");

const PORT = process.env.PORT;
connectMongoDB();

app.use(express.json());
app.use(cors());
app.use(
  "/api",
  userRoute,
  organizationBranchRoute,
  orgRouter,
  colorRoute,
  deviceRoute,
  modelRoute,
  catRouter,
  capRouter,
  cusRouter,
  stockRouter,
  paymentRouter,
  accountRouter,
  expenseRouter,
  sellRouter,
  repairRouter,
  cusLeaderRouter,
  profitLossRouter
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
