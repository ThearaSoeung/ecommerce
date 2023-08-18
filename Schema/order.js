const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product', 
      required: true,
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
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

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
