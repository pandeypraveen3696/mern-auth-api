const express = require("express");
const router = express.Router();
// import controller

const {
  signup,
  accountActivation,
  signin,
  forgotPassword,
  resetPassword,
  googleLogin,
  facebookLogin
} = require("../controllers/auth");

// import validatotrs
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require("../validators/auth");
const { runValidation } = require("../validators/index");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", userSigninValidator, runValidation, signin);

// forgot reset route here
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

// google and facebook
router.post("/google-login", googleLogin);

router.post("/facebook-login", facebookLogin);

module.exports = router;
