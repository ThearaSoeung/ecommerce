const fs = require('fs');
const path = require('path');

const pathToJSON = path.join(__dirname,'..','data','product.json');
console.log(pathToJSON); 

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
        this.title = t;
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