const express = require("express");
const router = express.Router();

//Importing verifying function for user
const verifyToken = require("./verifyToken");

router.get("/", verifyToken, (req, res) => {
  res.send("access-allowed");
});

module.exports = router;
