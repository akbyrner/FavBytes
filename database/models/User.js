const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String },
  location: {
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
