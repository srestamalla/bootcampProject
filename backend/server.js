const express = require("express");
const dotenv = require("dotenv");

//bring in route file
const bootcamps = require("./routes/bootcamps");

//load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

//Mount the routes
app.use("/api/v1/bootcamps", bootcamps);
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
