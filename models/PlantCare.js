const mongoose = require("mongoose");

const PlantCareSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  dimensions: String,
  weight: String,
  made_in: String,
  image:String
});

const PlantCare  = mongoose.model("PlantCare", PlantCareSchema);

module.exports = PlantCare ;