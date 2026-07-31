const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place Order
exports.placeOrder = async (req, res) => {
  try {
    const { userId, shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
      totalAmount += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = await Order.create({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      orderStatus: "Pending",
    });

    await Cart.findOneAndDelete({ userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// User Orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "orderItems.product"
    );

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Admin Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Update Order Status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};