const { Router } = require("express");
const usersController = require("../controllers/usersController");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const router = Router();

router.post("/signup", usersController.register);
router.post("/login", usersController.login);

router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  usersController.getAllUsers
);
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  usersController.getUserById
);
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  usersController.updateUserById
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  usersController.deleteUserById
);

module.exports = router;
