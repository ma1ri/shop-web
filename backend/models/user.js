const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    imagePath: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
