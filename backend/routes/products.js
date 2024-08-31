const express = require("express");
const multer = require("multer");

const Product = require("../models/product");
const User = require("../models/user");
const Category = require("../models/category");
const Brand = require("../models/brand");
const Image = require("../models/image");
const checkauth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images/products");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

//create new product
router.post("", checkauth, async (req, res, next) => {
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
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//update product
router.put("/:id", checkauth, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { userId, categoryId, brandId } = req.body;

    // Check if product exists
    const productExists = await Product.exists({ _id: productId });
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if userId exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    // Check if categoryId exists
    const categoryExists = await Category.exists({ _id: categoryId });
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid categoryId" });
    }

    // Check if brandId exists
    const brandExists = await Brand.exists({ _id: brandId });
    if (!brandExists) {
      return res.status(400).json({ error: "Invalid brandId" });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    )
      .populate("userId")
      .populate("categoryId")
      .populate("brandId")
      .populate("imageIds");

    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const queryParams = {};
    const perPage = parseInt(req.query.perPage) || 30; // Number of results per page
    const currentPage = parseInt(req.query.currentPage) || 1; // Current page number

    if (req.query.productName) {
      queryParams.productName = {
        $regex: req.query.productName,
        $options: "i",
      };
    }
    if (req.query.categoryId) {
      queryParams.categoryId = req.query.categoryId;
    }
    if (req.query.brandId) {
      queryParams.brandId = req.query.brandId;
    }

    if (req.query.userId) {
      queryParams.userId = req.query.userId;
    }

    if (req.query.onSale) {
      queryParams.onSale = req.query.onSale === "true";
    }
    if (req.query.minPrice || req.query.maxPrice) {
      queryParams.price = {};
      if (req.query.minPrice) {
        queryParams.price.$gte = parseFloat(req.query.minPrice); //price >= minPrice
      }
      if (req.query.maxPrice) {
        queryParams.price.$lte = parseFloat(req.query.maxPrice); // price <= maxPrice
      }
    }

    const products = await Product.find(queryParams)
      .limit(perPage)
      .skip((currentPage - 1) * perPage)
      .populate("userId")
      .populate("categoryId")
      .populate("brandId")
      .populate("imageIds");

    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post(
  "/:productId/upload",
  checkauth,
  multer({ storage }).array("image", 2),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No images uploaded" });
      }
      const url = req.protocol + "://" + req.get("host");

      // Save each image to the database and collect the image IDs
      const imageIds = await Promise.all(
        files.map(async (file) => {
          const newImage = new Image({
            imageLink: url + "/images/products/" + file.filename,
          });
          const savedImage = await newImage.save();
          return savedImage._id;
        })
      );

      const createdProduct = await Product.findByIdAndUpdate(
        productId,
        { $push: { imageIds: { $each: imageIds } } },
        { new: true }
      )
        .populate("userId")
        .populate("categoryId")
        .populate("brandId")
        .populate("imageIds");

      if (!createdProduct) {
        return res.status(404).json({ error: "Product not found." });
      }

      res.status(201).json(createdProduct);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

router.get("", (req, res, next) => {
  Product.find()
    .populate("userId")
    .populate("imageIds")
    .then((documents) => {
      res.status(200).json({
        products: documents,
      });
    })
    .catch();
});

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
      .populate("userId")
      .populate("categoryId")
      .populate("brandId")
      .populate("imageIds");

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
