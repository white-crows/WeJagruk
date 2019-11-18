const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 100
  },
  email: {
    type: String
  },
  description: {
    type: String,
    required: true,
    min: 4,
    max: 500
  },
  address: {
    type: String,
    required: true,
    max: 80
  },
  city: {
    type: String,
    required: true,
    max: 20,
    min: 2
  },
  state: {
    type: String,
    required: true,
    max: 20,
    min: 2
  },
  zip: {
    type: String,
    required: true,
    max: 6,
    min: 6
  },
  image: {
    type: String
  },
  contributor: []
});

module.exports = mongoose.model("Issue", issueSchema);
