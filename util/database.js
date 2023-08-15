const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db; 

const mongoConnect = (callback)=>{
  MongoClient.connect('mongodb+srv://thearasoeung:Theara011802399@cluster0.6wyv2kg.mongodb.net/?retryWrites=true&w=majority')
  .then(result=>{
    console.log("Database Connected.");
    _db = result.db();
    callback();
  })
  .catch(error=>{
    console.log(error);
    throw(error);
  })
};

const getDb = () => { 
  if(_db){
    return _db;
  }
  throw "No database found!";
}

module.exports = { mongoConnect, getDb };