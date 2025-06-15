const User = require("../models/usersModel");
const { isValidObjectId } = require("mongoose");
const AppError = require("../utils/AppError");
const ResponseFormatter = require("../utils/ResponseFormatter");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const jwtSign = promisify(jwt.sign);

const register = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.name || !body.email || !body.password || !body.confirmPassword) {
      throw new AppError("Please enter all required data.", 400);
    }

    // Check if the input email already exists in the database
    const userAlreadyExists = (await User.findOne({ email: body.email }))
      ? true
      : false;

    if (userAlreadyExists) {
      throw new AppError("Email already exists", 400);
    }

    // Check if the password and the confirmation password match
    if (body.password !== body.confirmPassword) {
      throw new AppError("Passwords do not match", 400);
    }

    const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user.id,
    };
    res
      .status(201)
      .json(
        new ResponseFormatter("Success", "User created successfully", userData)
      );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.email || !body.password) {
      throw new AppError("Please enter all required fields", 400);
    }
    // Check if the email is correct
    const user = await User.findOne({ email: body.email });

    if (!user) {
      throw new AppError("Invalid Credentials", 401);
    }

    // Check if the password is correct
    const isCorrectPassword = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!isCorrectPassword) {
      throw new AppError("Invalid Credentials", 401);
    }

    // Email and password are both correct, now we generate a token and send it in the ResponseFormatter
    const token = await jwtSign(
      { id: user._id, role: user.role },
      process.env.PRIVATE_KEY,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .json(
        new ResponseFormatter("Success", "Logged in Successfully!", { token })
      );
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}, { name: 1, email: 1 });
  res
    .status(200)
    .json(
      new ResponseFormatter("Success", "Users fetched successfully", users)
    );
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    new AppError("Invalid user id", 400);
  }

  //   const user = await User.findById(id);
  const user = await User.findOne({ _id: id }, { name: 1, email: 1 });

  if (!user) {
    new AppError("User not found", 404);
  }
  res
    .status(200)
    .json(new ResponseFormatter("Success", "User fetched successfully", user));
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!body.name) {
    new AppError("Name is required", 400);
  }

  if (!isValidObjectId(id)) {
    new AppError("Invalid user id", 400);
  }

  const user = await User.findByIdAndUpdate(
    id,
    { name: body.name },
    { new: true }
  );

  if (!user) {
    new AppError("User not found", 404);
  }

  res
    .status(200)
    .json(new ResponseFormatter("Success", "User updated successfully", user));
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    new AppError("Invalid user id", 400);
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    new AppError("User not found", 404);
  }

  res.status(204).send();
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
