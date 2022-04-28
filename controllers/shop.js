const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products",
            });
        })
        .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    Product.findAll({ where: { id: prodId } })
        .then((product) => {
            console.log('find_prod_where_id', product);
            res.render("shop/product-detail", {
                product: product[0],
                pageTitle: product[0].title,
                path: "/products",
            });
        })
        .catch((err) => console.log(err));

    // Product.findByPk(prodId)
    //   .then(products => {
    //     res.render("shop/product-detail", {
    //       product: products,
    //       pageTitle: products.title,
    //       path: "/products",
    //     });
    //   })
    //   .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            // console.log("index_product: ", products);
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/",
            });
        })
        .catch((err) => console.log("ERROR_getIndex: ", err));
};

exports.getCart = (req, res, next) => {

    req.user
        .getCart() 
        .then(cart => {
            return cart.getProducts()
            .then(products => {
                res.render("shop/cart", {
                        path: "/cart",
                        pageTitle: "Your Cart",
                        products: products,
                });
            })
            .catch(err => console.log(err));
        })
        .catch();

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (products) => {
        Cart.addProduct(prodId, products.price);
    });
    res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect("/cart");
    });
};

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
    });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};