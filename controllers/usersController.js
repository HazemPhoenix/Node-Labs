const User = require("../models/usersModel");
const { isValidObjectId } = require("mongoose");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.name || !body.email || !body.password || !body.confirmPassword) {
      throw new AppError("Please enter all required data.", 400);
    }

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

    res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}, { name: 1, email: 1 });

  res.status(200).json({
    status: "Success",
    message: "Users fetched successfully",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: "Failure",
      message: "Invalid user id",
    });
  }

  //   const user = await User.findById(id);
  const user = await User.findOne({ _id: id }, { name: 1, email: 1 });

  if (!user) {
    return res.status(404).json({
      status: "Failure",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "User fetched successfully",
    data: user,
  });
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!body.name) {
    return res.status(400).json({
      status: "Failure",
      message: "Name is required",
    });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: "Failure",
      message: "Invalid user id",
    });
  }

  const user = await User.findByIdAndUpdate(
    id,
    { name: body.name },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      status: "Failure",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "User updated successfully",
    data: user,
  });
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: "Failure",
      message: "Invalid user id",
    });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({
      status: "Failure",
      message: "User not found",
    });
  }

  res.status(204).send();
};

module.exports = {
  register,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
