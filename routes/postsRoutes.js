const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const postsController = require("../controllers/postsController");
const router = Router();

router.post("/", authenticate, postsController.createPost);
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  postsController.getAllPosts
);
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  postsController.getPostById
);
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  postsController.updatePostById
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  postsController.deletePostById
);

module.exports = router;
