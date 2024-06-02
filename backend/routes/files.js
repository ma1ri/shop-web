const express = require("express");
const multer = require("multer");

const User = require("../models/user");

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
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post("", multer({ storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new User({
    name: req.body.name,
    imagePath: url + "/images/" + req.file.filename,
  });
  console.log(post);
  post.save();
  res.status(201).json({
    message: "created",
  });
});

router.get("", (req, res, next) => {
  //   User.find(() => {});
  User.find()
    .then((documents) => {
      console.log(documents);
      res.status(200).json({
        message: "successfully fetched data",
        data: {
          users: documents,
        },
      });
    })
    .catch();
});

module.exports = router;
