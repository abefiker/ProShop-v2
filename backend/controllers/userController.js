const asyncHandler = require('../middleware/asynchandler');
// @desc Auth user & get token
// @route GET /api/users/login
// @access Public
const authUser = asyncHandler(async(req,res)=>{
    res.send('auth user')
})
// @desc Register user 
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req,res)=>{
    res.send('register user')
})
// @desc logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async(req,res)=>{
    res.send('logout user')
})

// @desc Get user Profile
// @route Get /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req,res)=>{
    res.send('get user profile')
})

// @desc Update user Profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async(req,res)=>{
    res.send('update user profile')
})

// @desc Get users 
// @route Get /api/users
// @access Private/Admin
const getUsers = asyncHandler(async(req,res)=>{
    res.send('get users')
})

// @desc Get users by id
// @route Get /api/users/:id
// @access Private/Admin
const getUsersById = asyncHandler(async(req,res)=>{
    res.send('get users by id')
})

// @desc update users
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async(req,res)=>{
    res.send('update users')
})


// @desc Delete user
// @route Delete /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async(req,res)=>{
    res.send('delete users')
})

export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUsersById,
    updateUser,
    deleteUser,
}