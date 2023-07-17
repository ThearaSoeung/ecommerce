const fs = require('fs');
const path = require('path');

const pathToJSON = path.join(__dirname,'..','data','product.json');  

const getProductFromFile = cb => {
  fs.readFile(pathToJSON, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      let products = [];
      if (fileContent.length > 0) {
        try {
          products = JSON.parse(fileContent);
        } catch (error) {
          console.error('Invalid JSON file:', error);
        }
      }
      cb(products);
    }
  });
};
module.exports = class Product {
    constructor(t) {
        this.title = t.product_name;
        this.price = t.product_price;
        this.url = t.product_image_url;
        this.description = t.product_description; 
    }   
    save() {
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(pathToJSON, JSON.stringify(products), err => {
              console.log(err);
            });
          });
    } 
    static fetchAll(cb) {
        getProductFromFile(cb);
    }
}; 