const fs = require('fs');
const path = require('path');
const Cart = require('../models/cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, price, description) {
    this.id= id,
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile(products => {

      if(this.id) {
        const existingProductIndex = products.findIndex( p => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p , JSON.stringify(updatedProducts), err => {
          console.log('ERROR_(Edit product existing): ', err);
        });
      }
      else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log('ERROR_(Add new product):', err);
        });
      }

    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static deleteById(id) {
    getProductsFromFile( products => {
      const product = products.find(p => p.id === id);
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if(!err) {
          Cart.deleteProduct(id,product.price);
        }
      });
    });
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
};
  