// backend/models/userModel.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // --- Authentication Fields (from signup) ---
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },

  // --- Profile Fields (from resume upload) ---
  skills: { 
    type: [String], 
    default: [] 
  },
  experience: { 
    type: String, 
    default: '0' 
  },
  
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('User', UserSchema);