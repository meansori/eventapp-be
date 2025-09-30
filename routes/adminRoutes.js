const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/adminController");
const router = express.Router();

// Registrasi Admin
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username harus diisi"),
    body("password").isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),
  ],
  register
);

// Login Admin
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username harus diisi"),
    body("password").notEmpty().withMessage("Password harus diisi"),
  ],
  login
);

module.exports = router;
