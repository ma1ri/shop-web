const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Category", categorySchema);
