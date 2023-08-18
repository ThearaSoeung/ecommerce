const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace
      minlength: 2, // Minimum length of 2 characters
      maxlength: 100, // Maximum length of 100 characters
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Minimum price value
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Replace 'User' with your actual user schema
      required: true,
    },
    isRemoved: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: true,
  });
  
const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
