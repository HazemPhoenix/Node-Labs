const { Router } = require("express");
const usersController = require("../controllers/usersController");
const authenticate = require("../middlewares/authenticate");
const joiValidator = require("../middlewares/joiValidator");
const userLoginSchema = require("../utils/schemas/userLogin");
const userRegisterSchema = require("../utils/schemas/userRegister");
const authorize = require("../middlewares/authorize");
const router = Router();

router.post(
  "/signup",
  joiValidator(userRegisterSchema),
  usersController.register
);
router.post("/login", joiValidator(userLoginSchema), usersController.login);

router.get(
  "/",
  authenticate,
  authorize.authorizeUsers(["admin"]),
  usersController.getAllUsers
);
router.get(
  "/:id",
  authenticate,
  authorize.authorizeUsers(["admin"]),
  usersController.getUserById
);
router.patch(
  "/:id",
  authenticate,
  authorize.authorizeUsers(["admin"]),
  usersController.updateUserById
);
router.delete(
  "/:id",
  authenticate,
  authorize.authorizeUsers(["admin"]),
  usersController.deleteUserById
);

module.exports = router;
