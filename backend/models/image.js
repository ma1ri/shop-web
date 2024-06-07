const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  imageLink: String,
});

module.exports = mongoose.model("Image", imageSchema);
