const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { checkObjectId } = require('../middleware/checkObjectId');
router
  .route('/')
  .get(productController.getProducts)
  .post(protect, admin, productController.createProduct);

router.route('/top').get(productController.getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, productController.getProductsById)
  .put(protect, admin, checkObjectId, productController.updateProduct)
  .delete(protect, admin, checkObjectId, productController.deleteProduct);
router
  .route('/:id/reviews')
  .post(protect, checkObjectId, productController.reviewProduct);

module.exports = router;
