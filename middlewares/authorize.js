const AppError = require("../utils/AppError");
const authorize = (roles) => {
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
};

module.exports = authorize;
