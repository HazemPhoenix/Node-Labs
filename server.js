const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

// body parser
app.use(express.json()); // app.use => application level middleware , parses the request body to the json format
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/users", usersRoutes);

app.listen(3000, () => {
  console.log("✅✅ Server is running on port 3000");
  mongoose
    .connect("mongodb://localhost:27017/blog-api")
    .then(() => {
      console.log("✅✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.log("❌❌ Error connecting to MongoDB", err);
    });
});
