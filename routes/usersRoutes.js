const { Router } = require("express");
const usersController = require("../controllers/usersController");
const requestDetailsLogger = require("../middlewares/requestDetailsLogger");
const router = Router();

router.post("/", requestDetailsLogger, usersController.createUser);
router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUserById);
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
