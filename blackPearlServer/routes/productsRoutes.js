const express = require("express");
const Product = require("../models/Product.js");
const auth = require("../middlewares/authMiddleware.js");

const router = express.Router();

// GET all
router.get("/", auth, async (req, res) => {
  try {
    const Products = await Product.find();
    res.status(200).json({
      status: "success",
      data: {
        Products
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
});

// GET one
router.get("/:id", auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(403).json({ message: "Not allowed" });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          product
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }

});

// CREATE
router.post("/", auth, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message
    });
  }
});

// UPDATE
router.patch("/:id", auth, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(403).json({ message: "Not allowed" });
  }

  Object.assign(product, req.body);
  await product.save();

  res.json(product);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await product.deleteOne();

  res.json({ message: "Deleted" });
});

module.exports = router;