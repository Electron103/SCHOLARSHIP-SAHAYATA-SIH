// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, index: true },
  email: { type: String, index: true },

  // ⭐ Aadhaar (Hashed)
  aadhaarHash: { type: String },

  // ⭐ New Required Fields
  category: { 
    type: String, 
    enum: ["OBC", "SC", "ST", "SC/ST", "EWS", "PWD", "Other"],
    required: true 
  },

  state: { type: String, required: true },
  district: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Student', StudentSchema);