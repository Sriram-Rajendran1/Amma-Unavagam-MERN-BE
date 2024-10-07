require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const authrouter = require("./Router/authrouter");
const menurouter = require("./Router/menurouter");
const orderrouter = require("./Router/orderrouter");
const profilerouter = require("./Router/profilerouter");
const resetrouter = require("./Router/resetrouter");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/api/v1/auth", authrouter);
app.use("/api/v1/menu", menurouter);
app.use("/api/v1/order", orderrouter);
app.use("/api/v1/user", profilerouter);
app.use("/api/v1/reset", resetrouter);

const DBURL = process.env.MONGODB_URL.replace(
  "${DBPASSWORD}",
  `${process.env.DB_PASSWORD}`
);

const DBConnection = mongoose
  .connect(DBURL)
  .then(() => {
    console.log(`Mongo DB - Connected Successfully`);
    app.listen(process.env.PORT || 5000, () => {
      console.log(`App is Running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      `There is a error in connecting to DB - please check your connection "Might be network connecitivity issue too": ${error}`
    );
  });
