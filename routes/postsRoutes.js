const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const postsController = require("../controllers/postsController");
const router = Router();

router.post("/", authenticate, postsController.createPost);
router.get(
  "/",
  authenticate,
  authorize.authorizePosts(["admin", "user"]),
  postsController.getAllPosts
);
router.get(
  "/:id",
  authenticate,
  authorize.authorizePosts(["admin", "user"]),
  postsController.getPostById
);
router.patch(
  "/:id",
  authenticate,
  authorize.authorizePosts(["admin"]),
  postsController.updatePostById
);
router.delete(
  "/:id",
  authenticate,
  authorize.authorizePosts(["admin"]),
  postsController.deletePostById
);

module.exports = router;
