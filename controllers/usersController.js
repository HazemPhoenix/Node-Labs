const User = require("../models/usersModel");
const { isValidObjectId } = require("mongoose");

const createUser = async (req, res) => {
  try {
    const { body } = req;
    if (!body.name || !body.email || !body.password) {
      return res.status(400).json({
        status: "Failure",
        message: "there is some missing data",
      });
    }

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failure",
      message: "Internal server error",
    });
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
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
