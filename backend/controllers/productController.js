const Product = require('../models/productsModel');
const asyncHandler = require('../middleware/asynchandler');
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
exports.getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});
