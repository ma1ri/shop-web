const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
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
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.put(
  "/:id",
  checkauth,
  multer({ storage }).single("image"),
  (req, res, next) => {
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

    User.updateOne({ _id: req.params.id }, updatedUser)
      .then((result) => {
        if (result.matchedCount > 0) {
          if (result.modifiedCount > 0) {
            res.status(200).json({ message: "User updated successfully!" });
          } else {
            res.status(200).json({ message: "No changes made to the user!" });
          }
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
  }
);

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .select("-password")
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => res.status(404).json({ message: "User not found!" }));
});

//create new user
router.post(
  "/signup",
  multer({ storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        const post = new User({
          name: req.body.name,
          password: hashedPassword,
          lastName: req.body.lastName,
          phone: req.body.phone,
          mail: req.body.mail,
          facebook: req.body.facebook,
          instagram: req.body.instagram,
          profilePicture: req.file
            ? url + "/images/" + req.file.filename
            : null,
        });
        post
          .save()
          .then((newUser) => {
            res.status(201).json(newUser);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ mail: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { mail: fetchedUser.mail, userId: fetchedUser._id },
        "here_is_temporary_secret",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
      });
    });
});

module.exports = router;
