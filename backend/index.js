const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const parser = require("body-parser");
//access control allow origin
app.use("*", function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Methods", "*");
  next();
});
app.set("view engine", "ejs");
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
//env file reading using dotenv
const dotenv = require("dotenv");
dotenv.config();

//Import routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const issueRoutes = require("./routes/issue");

//connect to database
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to database");
  }
);

//middlewares
app.use(express.json());

//Import middleware
app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/issue", issueRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server ${process.env.PORT} is running`)
);
