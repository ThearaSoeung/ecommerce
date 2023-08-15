const { ObjectId } = require('mongodb');

const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save(){
    const db = getDb();
    db.collection('products').insertOne(this)
    .then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  }

  static add(title, price, description, imageUrl){
    const product = new Product(title, price, description, imageUrl);
    return product.save();
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray()
    .then((products) => {
      return products;
    }).catch((err) => {
      console.error(err);
    });
  }

  static fetchOne(pk){
    const db = getDb();
    return db.collection('products').findOne({_id: new ObjectId(pk)})
    .then((result)=>{
      return result;
    })
    .catch((error)=>{
      console.error(error)
    })
  }

  static updateProductByID(id, updatedField){
    const db = getDb();
    return db.collection('products').updateOne(
      {_id: new ObjectId(id)},
      {$set: updatedField}
    )
    .then(result=>{
      return result;
    })
    .catch(error=>{
      console.error(error);
    })
  }

  static deleteProductById(id){
    const db = getDb();
    return db.collection('products').deleteOne({_id: new ObjectId(id)})
    .then(result=>{
      return result;
    })
    .catch(error=>{
      console.error(error);
    })
  }
}

module.exports = { Product };
