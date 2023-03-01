const express = require("express");

const authValidator = require("../utils/validators/authValidator");
const authService = require("../services/authService");

const router = express.Router();

router.post("/signup", authValidator.signupValidator, authService.signup);
router.post("/login", authValidator.loginValidator, authService.login);
router.post("/forgotPassword", authService.forgotPassword);
router.post("/verifyResetCode", authService.verifyPassResetCode);
router.patch("/resetPassword", authService.resetPassword);

module.exports = router;
