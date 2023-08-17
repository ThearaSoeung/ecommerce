class OrderDTO {
    constructor(cartId, isRemoved = false, isCompleted = false) {
      this.cartId = cartId;
      this.isRemoved = isRemoved;
      this.isCompleted = isCompleted;
    }
  }
  
  module.exports = { OrderDTO };
  