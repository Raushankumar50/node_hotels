const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  taste: {
    type: String,
    enum: ['sweet', 'spicy', 'sour'],
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;



// {
//   "name": "Spicy Chicken Wings",
//   "price": 9.99,
//   "taste": "spicy",
//   "is_drink": false,
//   "ingredients": ["chicken wings", "spices", "sauce"],
//   "num_sales": 62
// }