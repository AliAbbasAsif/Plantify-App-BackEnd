const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  dob: String,
  mobile_number: String,
});

const SignupModal = mongoose.model("User", SignupSchema);

module.exports = SignupModal;
