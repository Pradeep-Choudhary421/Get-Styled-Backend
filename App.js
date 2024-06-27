const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const UserRoutes = require("./Routes/UserRoute");
const ProductRoutes = require("./Routes/ProductRoute");
const OrderRoutes = require("./Routes/OrderRoute");
const cookieParser = require("cookie-parser");
require("dotenv").config();


app.use(
  cors({
    origin: "*",
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ extended: true, limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use("/user", UserRoutes);
app.use("/product", ProductRoutes);
app.use("/order", OrderRoutes);
app.get("/", (res, req) => {
  res.send = "Server is running";
});

mongoose
  .connect(process.env.MONGODB_)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is connected to ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("err" + err.message);
  });
module.exports = app;
