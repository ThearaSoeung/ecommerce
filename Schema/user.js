const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        // Basic email validation, you can use a library like validator.js for more advanced validation
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
      },
      message: props => `${props.value} is not a valid email address!`,
    },
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
