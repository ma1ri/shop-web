const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    name: String,
    lastName: String,
    password: String,
    profilePicture: String,
    phone: String,
    mail: { type: String, unique: true },
    facebook: String,
    instagram: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userSchema);
