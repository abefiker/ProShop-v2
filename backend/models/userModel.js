const mongoose = require("mongoose");
import { isEmail } from 'validator';
const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9]+$/,
  },
  email:{
    type:String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [ isEmail, 'invalid email' ]
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
    select: false, // Never return password in response
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
},{
  timestamps: true, // Automatically adds createdAt and updatedAt fields.
 // select: false, // Never return password in response, can be useful for security.
});

const User = mongoose.model('User', userSchema);
module.exports = User;