const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').post(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
module.exports = router;