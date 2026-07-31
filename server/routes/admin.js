const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getUsers,
  getOrders,
  getProducts,
} = require("../controllers/adminController");

router.get("/dashboard", getDashboard);

router.get("/users", getUsers);

router.get("/orders", getOrders);

router.get("/products", getProducts);

module.exports = router;