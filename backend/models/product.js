const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    price: Number,
    newPrice: Number,
    inStock: Boolean,
    onSale: Boolean,
    description: String,
    imageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
