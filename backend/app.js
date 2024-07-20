const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");
const brandRoutes = require("./routes/brands");
const productRoutes = require("./routes/products");

const path = require("path");

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
app.use("/images", express.static(path.join("backend/images")));

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

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
