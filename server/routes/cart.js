const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeItem,
  clearCart,
  updateQuantity,
} = require("../controllers/cartController");


router.post("/", addToCart);

router.get("/:userId", getCart);

router.delete("/:userId/:productId", removeItem);

router.delete("/:userId", clearCart);

router.put("/:userId/:productId", updateQuantity);

module.exports = router;