const express = require('express')
const router = express.Router();

//Importing verifying function for user
const verifyToken = require('./verifyToken')

router.get('/', verifyToken, (req, res)=>{

    res.send("you can access posts");
}) 

module.exports = router; 