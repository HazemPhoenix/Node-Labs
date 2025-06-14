const { Router } = require("express");
const usersController = require("../controllers/usersController");
const router = Router();

router.post("/signup", usersController.register);
// router.post("/login", usersController.login);

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUserById);
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
