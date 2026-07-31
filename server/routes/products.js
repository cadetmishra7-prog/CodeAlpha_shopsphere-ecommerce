const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");

// Add Product
router.post("/", addProduct);

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

// Add Review
router.post("/:id/review", addReview);

module.exports = router;