const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    lastName: String,
    password: String,
    profilePicture: String,
    phone: String,
    mail: String,
    facebook: String,
    instagram: String,
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
