const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
