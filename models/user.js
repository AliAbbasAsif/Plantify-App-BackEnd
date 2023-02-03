const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  company: String,
  color: String,
  horse_power: String
});

const userModal = mongoose.model("Car", userSchema);

module.exports = userModal;
