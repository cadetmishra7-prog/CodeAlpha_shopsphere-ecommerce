const Product = require("../models/Product");


const cloudinary = require("../config/cloudinary");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      image: req.body.image,
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (err) {
    console.error(err);

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
      count: products.length,
      products,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Single Product
exports.getProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.json({
      success: true,
      product,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        image: req.body.image,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Product Updated",
      product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product Deleted",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};
// Add Review
exports.addReview = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.reviews.push({
      user: userId,
      name: "User",
      rating,
      comment,
    });

    await product.save();

    res.json({
      success: true,
      message: "Review Added",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};