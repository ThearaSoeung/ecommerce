const { Product } = require('../Schema/product'); // Update the path accordingly

class ProductService {
  static async insert(updatedProduct) {
    try {
      return await Product.create(updatedProduct);
    } catch (error) {
      console.error(error);
    } 
  }

  static async getAll() {
    try {
      return await Product.find();
    } catch (error) {
      console.error(error); 
    }
  }

  static async getByPk(pk) {
    try {
      return await Product.findById(pk);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateProductByPk(updatedField, id) {
    try {
      return await Product.findByIdAndUpdate(id, updatedField, { new: true });
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteProductById(id) {
    try {
      return await Product.findByIdAndUpdate(id, { isRemoved: true }, { new: true });
    } catch (error) {
      console.error(error);
    }
  }

  static async findProductByUserId(userId) {
    try {
      return await Product.find({ addedBy: userId });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { ProductService };
  