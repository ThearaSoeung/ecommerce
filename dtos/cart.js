class CartDTO {
    constructor(userId, productId, qty, isRemoved, createdAt, updatedAt) {
      this.userId = userId;
      this.productId = productId;
      this.qty = qty;
      this.isRemoved = isRemoved;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
}

module.exports = { CartDTO };
  