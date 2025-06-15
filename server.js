const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
require("dotenv").config();
const AppError = require("./utils/AppError");
const errorHandler = require("./middlewares/errorHandler");
const { sanitizeMongoInput } = require("express-v5-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");

const app = express();

app.use(sanitizeMongoInput);
app.use(helmet());
app.use(xss());

// body parser
app.use(express.json()); // app.use => application level middleware , parses the request body to the json format
app.use(morgan("dev"));
app.use(cors());

// routes

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/posts", postsRoutes);

app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorHandler);

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
