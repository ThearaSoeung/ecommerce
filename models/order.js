const { ObjectId } = require('mongodb');

const getDb = require('../util/database').getDb;

class Order {
  constructor( cart, user, isRemoved = false, isCompleted = false){
    this._id = new ObjectId();
    this.cart = cart;
    this.user = user;
    this.isRemoved = isRemoved;
    this.isCompleted = isCompleted;     
  }

  save(){
    const db = getDb();
    return db.collection('orders').insertOne(this)
    .then((result) => {
      return result;
    }).catch((err) => {
      console.error(err);
    });
  }

  static async insert(cart, user){
    const order = new Order(cart, user);
    return await order.save();
  }

  static async appendCart(orderId, cart) {
    try {
      const db = getDb();
      return await db.collection('orders').updateOne(
        { _id: orderId },
        { $push: { cart: cart } }
      );
    } catch (error) {
      console.error(error);
    }
  }

  static async updateQtyInCart(orderId, cartId, qty) {
    try {
      const db = getDb();
      return await db.collection('orders').updateOne(
        {
          _id: new ObjectId(orderId),
          'cart._id': cartId
        },
        {
          $inc: { 'cart.$.qty': qty } 
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  
  static async getAll(){
    const db = getDb();
    return await db.collection('orders').find().toArray()
    .then((orders) => {
      return orders;
    }).catch((err) => {
      console.error(err);
    });
  }
  
  static async getByPk(pk){
    const db = getDb();
    return await db.collection('orders').findOne({_id: new ObjectId(pk)})
    .then((result)=>{
      return result;
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  static async updateOrderByPk(id, isRemoved, isCompleted){
    const db = getDb();
    return await db.collection('orders').updateOne(
      {_id: new ObjectId(id)},
      {$set: { isRemoved: isRemoved, isCompleted: isCompleted}}
    )
    .then(result=>{
      return result;
    })
    .catch(error=>{
      console.error(error);
    })
  }

  static async getOrderByUserId(userId){
    try {
      const db = getDb();
      return await db.collection('orders').find(
        {userId: userId}
      ).toArray();
    } catch (error) {
      console.log(error);
    }
  }

  static async completeAllOrdersFromUser(userId){
    try {
      const db = getDb();
      return await db.collection('orders').updateOne(
        {'user._id': new ObjectId(userId), isCompleted: false },
        {$set:{isCompleted: true}}
      );
    } catch (error) {
      console.error(error);
    }
  }

  static async removeAllOrdersFromUser(userId){
    try {
      const db = getDb();
      console.log("Called!!!");
      return await db.collection('orders').updateOne(
        {'user._id': new ObjectId(userId), isRemoved: false },
        {$set:{isRemoved: true}}
      );
    } catch (error) {
      console.error(error);
    }
  }

}

module.exports = { Order };
