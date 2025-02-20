const express = require("express");
const router = express.Router(); // Use router, not app
const userController = require("../controllers/UserController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router; // Make sure to export the router
