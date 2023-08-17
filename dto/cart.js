class CartDTO {
    constructor(userId, productId, qty = 1) {
      this.userId = userId;
      this.products = productId;
      this.qty = qty;
    }
  }
  
  module.exports = { CartDTO };
  