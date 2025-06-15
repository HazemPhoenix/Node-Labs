const { Router } = require("express");
const usersController = require("../controllers/usersController");
const authenticate = require("../middlewares/authenticate");
const router = Router();

router.post("/signup", usersController.register);
router.post("/login", usersController.login);

router.get("/", authenticate, usersController.getAllUsers);
router.get("/:id", authenticate, usersController.getUserById);
router.patch("/:id", authenticate, usersController.updateUserById);
router.delete("/:id", authenticate, usersController.deleteUserById);

module.exports = router;
