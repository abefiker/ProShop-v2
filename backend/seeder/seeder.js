const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('../data/users');
const Product = require('../models/productsModel');
const User = require('../models/userModel');
const connectDB = require('../config/db');
// const Order = require('../models/orderModel');
const colors = require('colors');
const products = require('../data/products');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    const createUsers = await User.insertMany(users);
    const adminUsers = createUsers[0]._id;
    const sampleProduct = products.map((p) => {
      return { ...p, user: adminUsers };
    });
    await Product.insertMany(sampleProduct);
    console.log('Data imported and seeded!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    // await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    console.log('Data destroyed!'.cyan.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
