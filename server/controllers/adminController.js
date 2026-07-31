const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// Dashboard Statistics
exports.getDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    res.json({
      success: true,
      users,
      products,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("orderItems.product");

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};