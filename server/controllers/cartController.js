const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Item to Cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Cart
exports.getCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      userId: req.params.userId,
    }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      });
    }

    res.json({
      success: true,
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Remove Item
exports.removeItem = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      userId: req.params.userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.json({
      success: true,
      message: "Item removed",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// Update Item Quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({
      success: true,
      message: "Quantity updated",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {

  try {

    await Cart.findOneAndDelete({
      userId: req.params.userId,
    });

    res.json({
      success: true,
      message: "Cart cleared",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};