const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", authController.getSignIn);

router.post("/signin", authController.postSignIn);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", authController.logout);

router.get("/forgot", authController.getforgotPassword);

router.post("/forgot", authController.postforgotPassword);

router.get("/reset-password", authController.getResetPassword);

router.post("/reset-password", authController.postResetPassword);

module.exports = router;