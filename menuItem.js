const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Menu item name is required"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Menu item price is required"],
  }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
