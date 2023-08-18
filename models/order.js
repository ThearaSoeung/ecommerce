const { ObjectId } = require('mongoose').Types;
const { Order } = require('../Schema/order'); // Import your Order model
const ProductService = require('./Product').ProductService;

class OrderService {
  static async insert(cart, userId) {
    try {
      const order = await Order.create({
        cart: cart,
        user: userId,
      });
      return order;
    } catch (error) {
      console.error(error);
    }
  }

  static async appendCart(orderId, cart) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $push: { cart: cart } },
        { new: true } // Return the updated document
      );
      return updatedOrder;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateQtyInCart(orderId, cartItemId, qty) {
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        {
          _id: orderId,
          'cart._id': cartItemId
        },
        {
          $inc: { 'cart.$.qty': qty } 
        },
        { new: true } // Return the updated document
      );
      return updatedOrder;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAll() {
    try {
      const orders = await Order.find();
      return orders;
    } catch (error) {
      console.error(error);
    }
  }

  static async getByPk(pk) {
    try {
      const order = await Order.findById(pk);
      return order;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateOrderByPk(id, isRemoved, isCompleted) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { $set: { isRemoved: isRemoved, isCompleted: isCompleted } },
        { new: true } // Return the updated document
      );
      return updatedOrder;
    } catch (error) {
      console.error(error);
    }
  }

  static async getOrderByUserId(userId) {
    try {
      const orders = await Order.find({ user: userId });
      return orders;
    } catch (error) {
      console.error(error);
    }
  }

  static async completeAllOrdersFromUser(userId) {
    try {
      const updatedOrders = await Order.updateMany(
        { user: userId, isCompleted: false },
        { $set: { isCompleted: true } },
        { new: true } // Return the updated documents
      );
      return updatedOrders;
    } catch (error) {
      console.error(error);
    }
  }

  static async removeAllOrdersFromUser(userId) {
    try {
      const updatedOrders = await Order.updateMany(
        { user: userId, isRemoved: false },
        { $set: { isRemoved: true } },
        { new: true } // Return the updated documents
      );
      return updatedOrders;
    } catch (error) {
      console.error(error);
    }
  }

  static async markCartAsRemoved(orderId, productId) {
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        {
          _id: orderId,
          'cart': ObjectId(productId)
        },
        {
          $set: { 'cart.$.isRemoved': true } 
        },
        { new: true } // Return the updated document
      );
      return updatedOrder;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = OrderService;
