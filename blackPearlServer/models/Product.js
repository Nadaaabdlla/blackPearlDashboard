const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    default: 0
  },
  onSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    enum: ["necklace", "ring", "plushies","SS-Set","bracelet","embroidery","bag","charm","keychain","bouquet" ,"hair-accessories","special-order","earrings"]
  }
});

module.exports = mongoose.model("Product", productSchema);
