const { ObjectId } = require('mongodb');

class ProductDTO {
    constructor(name, price, description, imageUrl, userId, isRemoved) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.addedBy = new ObjectId(userId);
        this.isRemoved = isRemoved;
    }
}

module.exports = { ProductDTO };

