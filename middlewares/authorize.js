const AppError = require("../utils/AppError");
const Post = require("../models/postsModel");
const authorize = {
  authorizeUsers: (roles) => {
    return (req, res, next) => {
      const { id } = req.params;
      if (id) {
        const currentUserId = req.user.id;
        if (id == currentUserId) return next();
      }
      if (!roles.includes(req.user.role)) {
        throw new AppError("Forbidden", 403);
      }
      next();
    };
  },
  authorizePosts: (roles) => {
    return async (req, res, next) => {
      const { id: postID } = req.params;

      if (postID) {
        const post = await Post.findById(postID);

        if (!post) {
          throw new AppError("Post not found", 404);
        }

        const isCurrentUserOwner =
          post.ownerID.toString() === req.user.id.toString();

        if (isCurrentUserOwner) {
          // The current user is the owner, proceed
          return next();
        }
      }

      if (!roles.includes(req.user.role)) {
        throw new AppError("Forbidden", 403);
      }

      next();
    };
  },
};

module.exports = authorize;
