const Post = require("../models/postsModel");
const AppError = require("../utils/AppError");
const ResponseFormatter = require("../utils/ResponseFormatter");
const { isValidObjectId } = require("mongoose");

const createPost = async (req, res) => {
  try {
    const { body } = req;
    if (!body.title || !body.content) {
      new AppError("There is some missing data", 400);
    }

    const post = await Post.create({
      title: body.title,
      content: body.content,
      ownerID: req.user.id,
    });

    res
      .status(201)
      .json(
        new ResponseFormatter("Success", "Post created successfully", post)
      );
  } catch (err) {
    new AppError("Internal server error", 500);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}, { title: 1, content: 1 });
    res
      .status(200)
      .json(
        new ResponseFormatter("Success", "Posts fetched successfully", posts)
      );
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    new AppError("Invalid post id", 400);
  }

  const post = await Post.findById(id);

  if (!post) {
    new AppError("Post not found", 404);
  }
  res
    .status(200)
    .json(new ResponseFormatter("Success", "Post fetched successfully", post));
};

const updatePostById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!isValidObjectId(id)) {
    new AppError("Invalid post id", 400);
  }

  let post = await Post.findById(id);

  if (body.title) {
    post.title = body.title;
  }

  if (body.content) {
    post.content = body.content;
  }

  const updatedPost = await post.save();

  if (!updatedPost) {
    new AppError("Post not found", 404);
  }
  res
    .status(200)
    .json(
      new ResponseFormatter("Success", "Post updated successfully", updatedPost)
    );
};

const deletePostById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    new AppError("Invalid post id", 400);
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    new AppError("Post not found", 404);
  }

  res.status(204).send();
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
