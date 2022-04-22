const fs = require('fs');
const path =require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id,price) {
        fs.readFile(p, (err, data)=> {
            let cart = { products:[], totalPrice: 0 };
            if(!err) {
                cart = JSON.parse(data);
            }

            const existingProductIndex = cart.products.findIndex( (product)=> product.id === id );
            const existingProduct = cart.products[existingProductIndex];
            let updateProduct;
            if(existingProduct) {
                updateProduct = {...existingProduct}
                updateProduct.qty = updateProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            }
            else {
                updateProduct = {id:id, qty:1};
                cart.products = [...cart.products,updateProduct]
            }
            cart.totalPrice = cart.totalPrice + Number(price);
            fs.writeFile(p, JSON.stringify(cart), (err)=> {
                if(err) {
                    console.log(err);
                }
            })
        });
    }
}