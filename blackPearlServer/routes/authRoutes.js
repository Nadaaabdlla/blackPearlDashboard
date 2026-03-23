const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    password: hashed,
  });

  res.json(user);
});

// Login
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "Week" });
  res.status(200).json({ status: 'success', data: { user, token } });
});

module.exports = router;