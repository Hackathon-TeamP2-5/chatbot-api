const express = require("express");
const router = express.Router(); // Use router, not app
const User = require("../models/User"); // Adjust the path if necessary
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send("Username already exists");
    }

    const user = new User({ username, password });
    await user.save();
    const token = generateToken(user._id.toString());
    res.status(201).send({ user, token });
  } catch (error) {
    console.error("Failed to register user:", error);
    res.status(400).send(error.message);
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send("Authentication failed");
    }
    const token = generateToken(user._id);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Logout User
router.post("/logout", (req, res) => {
  res.send("Logout successful");
});

module.exports = router; // Make sure to export the router
