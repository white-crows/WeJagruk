const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
const issueModel = require("../model/Issue");

const multer = require("multer");

//setting destination and file name-----------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

//setting upload for issue images-----------
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("issueImage");

//checkfiletype of issue image-----------
function checkFileType(file, cb) {
  //allowed ext
  const filetypes = /jpeg|png|jpg|gif/;

  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  //check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb("Error: Jpeg/png/jpg Images Only!");
  }
}

// post request with new issue---------------------------------------------------
router.post("/post", async (req, res) => {
  upload(req, res, async err => {
    if (err) {
      if (err.message) return res.send(err.message);
      res.send(err);
    } else {
      console.log(req.file);

      const newIssue = new issueModel({
        title: req.body.issueTitle,
        description: req.body.issueDescription,
        address: req.body.issueAddress,
        city: req.body.issueCity,
        state: req.body.issueState,
        zip: req.body.issueZip,
        image: req.file.filename,
        email: req.body.issueEmail,
        contributor: []
      });
      try {
        const ret = newIssue.save();
        res.redirect("http://127.0.0.1:5500/frontend/feed.html");
        console.log("issue reported successfully");
      } catch (err) {
        console.log(err);
        res.send("there is some issue, try again");
      }
    }
  });
  console.log("hii");
});

//get issues for feed page-------------------
router.get("/get", async (req, res) => {
  const ret = await issueModel
    .find()
    .sort({ _id: -1 })
    .exec();
  res.json(ret).status(200);
});

// add contributor --------------
router.post("/contributor", async (req, res) => {
  const issue = await issueModel.findOne({ _id: req.body.issueId });

  if (issue !== "") {
    // if (issue.contributor.find(req.body.email) !== "") {
    //   return res.send("already-contributed");
    // }

    const ret = await issueModel.update(
      { _id: req.body.issueId },
      { $push: { contribtor: req.body.email } }
    );
    console.log(ret);
    console.log(issue.contributor);
    return res.send("successful");
  } else {
    res.send("Issue no more exists");
  }
});
module.exports = router;
