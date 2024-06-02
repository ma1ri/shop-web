const express = require("express");

const app = express();

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log("firsts middleware");
  next();
});

app.use((req, res, next) => {
  res.send("hello from express");
});

module.exports = app;
