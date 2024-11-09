const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(productController.getProducts)
  .post(protect, admin, productController.createProduct);
router
  .route('/:id')
  .get(productController.getProductsById)
  .put(protect, admin, productController.updateProduct);

module.exports = router;
