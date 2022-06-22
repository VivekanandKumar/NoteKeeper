require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { connect } = require("mongoose");
const userRoute = require("../routes/userRouter");
const noteRoute = require("../routes/noteRouter");
const cors = require('cors');
const app = express();

// Database Connection
connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connection established");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/note", noteRoute);

// server configuration
const PORT = process.env.PORT || 8080;
app.listen(8080, (err) => {
  if (err) throw err;
  console.log(`Server running on port ${PORT}`);
});
