const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Load models
const Bootcamp = require("./models/Bootcamp");

// DB connect
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Imported....".bgGreen);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

//Delete DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Destroyed....".bgRed);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
