const express = require("express");

const Product = require("../models/product");
const User = require("../models/user");
const Category = require("../models/category");
const Brand = require("../models/brand");

const router = express.Router();

//create new product
router.post("", async (req, res, next) => {
  try {
    const { userId, categoryId, brandId } = req.body;
    //check if userid exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    // check if categoryId exists
    const categoryExists = await Category.exists({ _id: categoryId });
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid categoryId" });
    }

    // check if brandId exists
    const brandExists = await Brand.exists({ _id: brandId });
    if (!brandExists) {
      return res.status(400).json({ error: "Invalid brandId" });
    }

    //if everything is ok, save product
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json({
      message: "created product",
      data: {
        product: createdProduct,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("", (req, res, next) => {
  Product.find()
    .then((documents) => {
      res.status(200).json({
        message: "successfully fetched data",
        data: {
          products: documents,
        },
      });
    })
    .catch();
});

module.exports = router;
