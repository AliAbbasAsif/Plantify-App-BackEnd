const mongoose = require("mongoose");

const PlantSchema = mongoose.Schema({
  name: String,
  price: Number,
  size: String,
  overview: Object,
  plant_bio: String,
  category: String,
  image: String
});

const PlantModel = mongoose.model("Plant", PlantSchema);

module.exports = PlantModel;
