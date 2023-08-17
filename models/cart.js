const { ObjectId, Double } = require('mongodb');

const getDb = require('../util/database').getDb;

class Cart {
  constructor(userId, productId, qty = 1, isRemoved = false){
    this._id = new ObjectId();
    this.userId = new ObjectId(userId);
    this.productId = new ObjectId(productId);
    this.qty = qty;
    this.isRemoved = isRemoved
  }

  save(){
    const db = getDb();
    return db.collection('carts').insertOne(this)
    .then((result) => {
      return result;
    }).catch((err) => {
      console.error(err);
    });
  }

  static insert(userId, productId){
    const cart = new Cart(userId, productId);
    return cart.save();
  }

  static getAll(){
    const db = getDb();
    return db.collection('carts').find().toArray()
    .then((carts) => {
      return carts;
    }).catch((err) => {
      console.error(err);
    });
  }

  static getByPk(pk){
    const db = getDb();
    return db.collection('carts').findOne({_id: new ObjectId(pk)})
    .then((result)=>{
      return result;
    }
    ).catch((error)=>{
      console.error(error);
    })
  }

  static updateQtyByPk(cart, qty = 1){
    const updatedQty = Number(cart.qty) + qty;
    const db = getDb();
    return db.collection('carts').updateOne(
      {_id: new ObjectId(cart._id)},
      {$set: { qty: updatedQty.toString()} }
    )
    .then(result=>{
      return result;
    })
    .catch(error=>{
      console.error(error);
    })
  }

  static ChangeQtyByPk(cart, qty){
    const quantity = parseInt(qty);
    const db = getDb();
    return db.collection('carts').updateOne(
      {_id: new ObjectId(cart)},
      {$set: { qty: quantity}}
    )
    .then(result=>{
      return result;
    })
    .catch(error=>{
      console.error(error);
    })
  }
  
  static deleteCartById(id) {
    const db = getDb();
    return db.collection('carts').deleteOne({ _id: new ObjectId(id) })
      .then(result => {
        return result;
      })
      .catch(error => {
        console.error(error);
      });
  }
  

  static async findCart(userId, productId) {
    const db = getDb();
    try {
      return await db.collection('carts').find({
        productId: new ObjectId(productId),
        userId: new ObjectId(userId),
      }).toArray();
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error for handling elsewhere
    }
  }

  static async findCartByUserId(userId){
    const db = getDb();
    try {
      return await db.collection('carts').find({
        userId: new ObjectId(userId)
      }).toArray();
    } catch (error) {
      console.error(error);
    }
  }

  static async isRemoved(id){
    const db = getDb();
    try{
      return await db.collection('carts').updateOne(
        { _id: id },
        { $set: { isRemoved: true } }
      )
    }catch (error) {
      console.error(error);
    }
  }



}

module.exports = { Cart };
