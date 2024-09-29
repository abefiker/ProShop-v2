const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/').get(getUsers).post(registerUser);
router.route('/login').post(authUser)
router.route('/logout').post(logoutUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router
  .route('/:id')
  .put(updateUser)
  .delete(deleteUser)
  .get(getUsersById);

module.exports = router;
