const express = require("express");

const Brand = require("../models/brand");

const router = express.Router();

//create new brand
router.post("", (req, res, next) => {
  const brand = new Brand({
    brand: req.body.brand,
  });
  brand.save();
  res.status(201).json({
    message: "created brand",
  });
});

router.get("", (req, res, next) => {
  Brand.find()
    .then((documents) => {
      res.status(200).json({
        message: "successfully fetched data",
        data: {
          brands: documents,
        },
      });
    })
    .catch();
});

module.exports = router;
