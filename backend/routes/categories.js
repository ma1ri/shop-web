const express = require("express");

const Category = require("../models/category");

const router = express.Router();

//create new category
router.post("", (req, res, next) => {
  const category = new Category({
    category: req.body.category,
  });
  category.save();
  res.status(201).json({
    message: "created category",
  });
});

router.get("", (req, res, next) => {
  Category.find()
    .then((documents) => {
      res.status(200).json({
        message: "successfully fetched data",
        data: {
          categories: documents,
        },
      });
    })
    .catch();
});

router.get("/:id", (req, res, next) => {
  Category.findById(req.params.id)
    .then((documents) => {
      res.status(200).json({
        message: "successfully fetched data",
        data: {
          categories: documents,
        },
      });
    })
    .catch();
});

module.exports = router;
