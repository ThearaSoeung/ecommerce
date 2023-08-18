const { Cart } = require('../Schema/cart');

class CartService {
  static async insert(userId, productId) {
    try {
      const cart = await Cart.create({
        userId: userId,
        productId: productId,
      });
      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAll() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      console.error(error);
    }
  }

  static async getByPk(pk) {
    try {
      const cart = await Cart.findById(pk);
      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateQtyByPk(cart, qty = 1) {
    try {
      const updatedQty = Number(cart.qty) + qty;
      const updatedCart = await Cart.findByIdAndUpdate(cart._id, { qty: updatedQty.toString() });
      return updatedCart;
    } catch (error) {
      console.error(error);
    }
  }

  static async changeQtyByPk(cartId, qty) {
    try {
      const quantity = parseInt(qty);
      const updatedCart = await Cart.findByIdAndUpdate(cartId, { qty: quantity });
      return updatedCart;
    } catch (error) {
      console.error(error);
    }
  }

  static async findCart(userId, productId) {
    try {
      const carts = await Cart.find({
        productId: productId,
        userId: userId,
      });
      return carts;
    } catch (error) {
      console.error(error);
    }
  }

  static async findCartByUserId(userId) {
    try {
      const carts = await Cart.find({ userId: userId });
      return carts;
    } catch (error) {
      console.error(error);
    }
  }

  static async markAsRemoved(id) {
    try {
      const result = await Cart.findByIdAndUpdate(id, { isRemoved: true });
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  static async markAsCompleted(id) {
    try {
      const result = await Cart.findByIdAndUpdate(id, { isCompleted: true });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = CartService;
