const asyncHandler = require('../middleware/asynchandler');
const Order = require('../models/orderModel');
// @desc Creates new order
//@route POST /api/orders
//@access Private
exports.addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No order items');
  }else{
    const order = new Order({
      orderItems:orderItems.map((x)=>{
        return {
          ...x,
          product: x._id,
          _id:undefined,
        }
      }),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
// @desc get logged in user orders
//@route GET /api/orders/myorders
//@access Private
exports.getMyOrders = asyncHandler(async (req, res) => {
  // const order = await Order.create();
  res.json('get my order');
});
// @desc get order by ID
//@route GET /api/orders/:id
//@access Private
exports.getOrderById = asyncHandler(async (req, res) => {
  // const order = await Order.create();
  res.json('get order by id');
});
// @desc update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  // const order = await Order.create();
  res.json('update order to paid');
});

// @desc update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  // const order = await Order.create();
  res.json('update order to delivered');
});
// @desc Get all orders
//@route GET /api/orders
//@access Private/admin
exports.getOrders = asyncHandler(async (req, res) => {
  // const order = await Order.create();
  res.json('get all orders');
});
