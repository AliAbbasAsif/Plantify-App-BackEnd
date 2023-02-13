const mongoose = require("mongoose");

const SeedSchema = mongoose.Schema({
  name: String,
  price: Number,
  sub: Object,
  seed_bio: String,
  image: String,
});

const SeedModel = mongoose.model("Seed", SeedSchema);

module.exports = SeedModel;
