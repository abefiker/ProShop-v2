const asyncHandler = require('./middleware/asynchandler');
const jwt = require('jwt');
const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookie.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized,token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized,no token');
  }
});
const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};
module.exports = { protect, admin };
