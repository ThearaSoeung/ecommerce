
const db = require("../util/database")

module.exports = class Product {
  constructor(t) {
    this.id = 10 + Math.floor(Math.random() * (100 - 1 + 1));
    this.title = t.product_name;
    this.price = t.product_price;
    this.url = t.product_image_url;
    this.description = t.product_description;
  }
  save() {
    return db.execute(
      'INSERT INTO products (id, title, price, descriptions, imageUrl) VALUES (?,?,?,?,?)', 
      [this.id, this.title, this.price, this.description, this.url]
    );
  }
  static fetchAll() {
    return db.execute('SELECT * FROM products'); 
  }

  static deleteById(id) {
    return (db.execute('DELETE FROM products WHERE id = ?',[id]));
  }

  static findById(id) {
    return (db.execute('SELECT * FROM products WHERE id = ?', [id]));
  }

 static update(req) {
  return this.findById(req.params.id) // Add 'return' here to propagate the Promise
    .then((prod) => {
      return db.execute('UPDATE products SET title = ?, price = ?, imageUrl = ?, descriptions = ? WHERE id = ?', [
        req.body.product_name, 
        req.body.product_price,  
        req.body.product_image_url,
        req.body.product_description, 
        prod[0][0].id
      ]);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  
};
