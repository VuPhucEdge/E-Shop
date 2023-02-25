const express = require("express");

const userValidator = require("../utils/validators/userValidator");
const userService = require("../services/userService");
const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect);

router.get("/getMe", userService.getLoggedUserData, userService.getUser);
router.put("/changeMyPassword", userService.updateLoggedUserPassword);
router.put(
   "/updateMe",
   userValidator.updateLoggedUserValidator,
   userService.updateLoggedUserData
);
router.delete("/deleteMe", userService.deleteLoggedUserData);

// Admin
router.use(authService.allowedTo("admin", "manager"));
router.put(
   "/changePassword/:id",
   userValidator.changeUserPasswordValidator,
   userService.changeUserPassword
);
router
   .route("/")
   .get(userService.getUsers)
   .post(
      userService.uploadUserImage,
      userService.resizeImage,
      userValidator.createUserValidator,
      userService.createUser
   );
router
   .route("/:id")
   .get(userValidator.getUserValidator, userService.getUser)
   .put(
      userService.uploadUserImage,
      userService.resizeImage,
      userValidator.updateUserValidator,
      userService.updateUser
   )
   .delete(userValidator.deleteUserValidator, userService.deleteUser);

module.exports = router;
