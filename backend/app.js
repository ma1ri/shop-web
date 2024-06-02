const bodyParser = require("body-parser");
const express = require("express");

const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "created",
  });
});

app.use("/api/posts/", (req, res, next) => {
  const bla = [
    {
      id: "alskjddaslkjd",
      value: "aklsjdajdalksjdslkajsdlkajsdlkj",
    },
  ];
  res.json({
    message: "success",
    bla,
  });
});

module.exports = app;
