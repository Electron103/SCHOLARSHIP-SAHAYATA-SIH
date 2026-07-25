// models/Login.js
const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  username: { type: String, default: null },
  email: { type: String, default: null },
  lastLogin: { type: Date, default: Date.now },
  ip: { type: String, default: null },
  userAgent: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Login', LoginSchema);
