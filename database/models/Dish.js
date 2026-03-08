const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },
  restaurantName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  price: { type: Number },
  location: {
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
