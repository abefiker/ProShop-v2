const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const {protect,admin} = require('../middleware/authMiddleware')

router.route('/').get(protect,admin,getUsers).post(registerUser);
router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router
  .route('/:id')
  .put(protect,admin,updateUser)
  .delete(protect,admin,deleteUser)
  .get(protect,admin,getUserById);

module.exports = router;
