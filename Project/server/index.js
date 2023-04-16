const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection success!");
});

const userRouter = require("./routes/user.js");

app.use("/user", userRouter);

const specialistRouter = require("./routes/specialists.js");

app.use("/specialist", specialistRouter);

const reportRouter = require("./routes/report.js");

app.use("/report", reportRouter);

const appointmentRouter = require("./routes/appointments.js");

app.use("/appointment", appointmentRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number : ${PORT}`);
});
