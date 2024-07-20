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

//create new user
router.post("", multer({ storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new User({
    name: req.body.name,
    profilePicture: req.file ? url + "/images/" + req.file.filename : null,
  });
  console.log(post);
  post.save();
  res.status(201).json({
    message: "created",
  });
});

router.put("/:id", multer({ storage }).single("image"), (req, res, next) => {
  let profilePicture = req.body.profilePicture;

  // If a new image is uploaded, update the profile picture URL
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    profilePicture = url + "/images/" + req.file.filename;
  }

  const updatedUser = {
    ...req.body,
    profilePicture: profilePicture,
  };

  // Find the user by ID and update their details
  User.updateOne({ _id: req.params.id }, updatedUser)
    .then((result) => {
      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update user!",
        error: error,
      });
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
