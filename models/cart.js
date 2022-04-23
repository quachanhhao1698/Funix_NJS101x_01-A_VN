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

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, data)=> {
            if(err){
                return;
            }
            const cart = JSON.parse(data);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(p => p.id === id);
            console.log('cart_product: ',product);
            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - ( productPrice * productQty);

            fs.writeFile(p, JSON.stringify(updatedCart), err =>{
                console.log('ERROR_(Delete product): ',err);
            })

        });
    }




}