const express = require("express");
const Product = require("../models/Product.js");
const auth = require("../middlewares/authMiddleware.js");

const router = express.Router();

// GET all
router.get("/", auth, async (req, res) => {
  const Products = await Product.find({ userId: req.userId });
  res.json(Products);
});

// GET one
router.get("/:id", auth, (req, res) => {
  const Product = req.params.id ;
   Product.findById(Product).then(Product => {
    if (!Product) {
      return res.status(403).json({ message: "Not allowed" });
    }else{
       res.status(200).json({
      status: "success",
      data: {
        Product
      }
    });
    }
  }).catch(err => res.status(500).json({
    status: "error",
    message: err.message
  }));

});

// CREATE
router.post("/", auth, async (req, res) => {
  const Product = await Product.create({
    ...req.body,
    userId: req.userId,
  });

  res.json(Product);
});

// UPDATE
router.patch("/:id", auth, async (req, res) => {
  const Product = await Product.findById(req.params.id);

  if (!Product || Product.userId.toString() !== req.userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  Object.assign(Product, req.body);
  await Product.save();

  res.json(Product);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  const Product = await Product.findById(req.params.id);

  if (!Product || Product.userId.toString() !== req.userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await Product.deleteOne();

  res.json({ message: "Deleted" });
});

module.exports = router;