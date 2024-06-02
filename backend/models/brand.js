const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    brand: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Brand", brandSchema);
