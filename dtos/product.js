class ProductDTO {
    constructor(name, price, description, imageUrl, addedBy, isRemoved, createdAt, updatedAt) {
      this.name = name;
      this.price = price;
      this.description = description;
      this.imageUrl = imageUrl;
      this.addedBy = addedBy;
      this.isRemoved = isRemoved;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
    setImagePath(imagePath){
      this.imageUrl = imagePath;
    }
  }
  
  module.exports = { ProductDTO };
  