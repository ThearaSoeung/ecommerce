const { ObjectId } = require('mongodb');
const getDb = require('../util/database').getDb;

class User{
  constructor(name, email){
    this._id = new ObjectId();
    this.name = name;
    this.email = email; 
  }

  static save(){
    const db = getDb();
    return db.collection('users').insertOne(this)
    .then((result) => {
      return result;
    }).catch((err) => {
      console.error(err);
    });
  }
  static getByPk(pk){
    const db = getDb();
    return db.collection('users').findOne({_id: new ObjectId(pk)})
    .then(res=>{
      return res;
    })
    .catch(err=>{
      console.error(err);
    })
  }

  static getAll(){
    const db = getDb();
    return db.collection('users').find().toArray()
    .then((products) => {
      return products;
    } 
    ).catch((err) => {
      console.error(err);
    })
  }

  static insert(name, email){
    const user = new User(name, email);
    const db = getDb();
    return db.collection('users').updateOne(
      {_id: new ObjectId(this._id)},
      {$set: {user: user}}
    )
  }

}
module.exports = { User };

