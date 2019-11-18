const express = require("express");
const router = express.Router();
//user database schema
const User = require("../model/User");

//bcrypt for password hashing
const bcrypt = require("bcryptjs");

//json web tokens
const jwt = require("jsonwebtoken");

//Joi Validation function
const { registerValidation, loginValidation } = require("../validation");

//sign up request------------------------
router.post("/register", async (req, res) => {
  // console.log(req.body)
  //data validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("email already exists");

  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //validation successful, Create a new user
  const temp = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const ret = await temp.save();
    res.send("congratulations!! your account has been created. Please log-in");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login creation-----------------------------------------

router.post("/login", async (req, res) => {
  console.log(req.body);
  //login data Validation with Joi
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //user existance check
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  //Password matching
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.SECKRET_KEY, {
    expiresIn: 6000
  });
  res
    .header("auth-token", token)
    .send({ message: "logged-in", authtoken: token });
  // res.send("You are logged In")
});

//LogOUT creation-----------------------------

router.post("/logout", (req, res) => {
  // req.header('auth-token', "");
  res.header("auth-token", "").send("successfully loged out");
});

router.get("/register", (req, res) => {
  res.send("Register");
});

module.exports = router;
