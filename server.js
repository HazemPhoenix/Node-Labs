const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
require("dotenv").config();

const app = express();

// body parser
app.use(express.json()); // app.use => application level middleware , parses the request body to the json format
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/posts", postsRoutes);

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server is running on port ${process.env.PORT_NUMBER}`);
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
});
