const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Replace 'User' with your actual user schema
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Replace 'Product' with your actual product schema
    required: true,
  },
  qty: {
    type: Number,
    default: 1,
    min: 1, // Minimum quantity value
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = { Cart };
