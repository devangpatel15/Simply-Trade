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
  expenseRouter
);
// app.use("/api", organizationBranchRoute);
// app.use("/api", orgRouter);
// app.use("/api", colorRoute);
// app.use("/api", deviceRoute);
// app.use("/api", modelRoute);
// app.use("/api", catRouter);
// app.use("/api", capRouter);
// app.use("/api", cusRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
