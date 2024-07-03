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

const corsOptions = {
  origin: "https://get-styled.vercel.app/",
  methods: ["GET", "POST"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ extended: true, limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use("/user", UserRoutes);
app.use("/product", ProductRoutes);
app.use("/order", OrderRoutes);


app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose
  .connect(process.env.MONGODB_)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is connected to ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error: " + err.message);
  });

module.exports = app;
