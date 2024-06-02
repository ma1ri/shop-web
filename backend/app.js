const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://mar:MvQALjxi5Cpsy02i@cluster0.aoufh.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log("Connection Failed"));

app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.post("/api/posts/", (req, res, next) => {
  const post = new User({
    name: req.body.name,
  });
  console.log(post);
  post.save();
  res.status(201).json({
    message: "created",
  });
});

app.get("/api/posts/", (req, res, next) => {
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

module.exports = app;
