const { ObjectId } = require('mongodb');
const { ProductDTO } = require('../dto/product')
const getDb = require('../util/database').getDb;

class Product {
  constructor(productDTO){
    this._id = new ObjectId();
    this.name = productDTO.name;
    this.price = productDTO.price;
    this.description = productDTO.description;
    this.imageUrl = productDTO.imageUrl;
    this.addedBy = productDTO.addedBy;
    this.isRemoved = productDTO.isRemoved || false;
  }

  async save(){
    const db = getDb();
    await db.collection('products').insertOne(this)
    .then((result) => {
      return result;
    }).catch((err) => {
      console.error(err);
    });
  }

  static async insert(updatedProduct) {
    const productDTO = new ProductDTO(
      updatedProduct.name,
      updatedProduct.price,
      updatedProduct.description,
      updatedProduct.imageUrl,
      updatedProduct.addedBy,
      updatedProduct.isRemoved
    );
    const product = new Product(productDTO);
    return await product.save();
  }

  static async getAll(){
    const db = getDb();
    return await db.collection('products').find().toArray()
    .then((products) => {
      return products;
    }).catch((err) => {
      console.error(err);
    });
  }

  static async getByPk(pk){
    const db = getDb();
    return await db.collection('products').findOne({_id: new ObjectId(pk)})
    .then((result)=>{
      return result;
    })
    .catch((error)=>{
      console.error(error)
    })
  }

  static async updateProductByPk(updatedField, id){
    const db = getDb();
    return await db.collection('products').updateOne(
      {_id: new ObjectId(id)},
      {$set: {name: updatedField.name, price: updatedField.price, description: updatedField.description, imageUrl: updatedField.imageUrl}}
    )
    .then(result=>{
      return result;
    })
    .catch(error=>{
      console.error(error);
    })
  }

  static async deleteProductById(id){
    const db = getDb();
    return await db.collection('products').updateOne(
      {_id: new ObjectId(id)},
      {$set: {isRemoved: true}}
    )
    .then(result=>{
      return result;
    })
    .catch(error=>{
      console.error(error);
    })
  }

  static async findProductByUserId(userId){
    const db = getDb();
    return await db.collection('products').find({addedBy: new ObjectId(userId)}).toArray()
    .then(result=>{
      return result;
    })
    .catch(error=>{
      console.error(error);
    })
  }
  
}

module.exports = { Product };
