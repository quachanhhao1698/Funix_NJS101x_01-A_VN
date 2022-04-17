const express = require('express');
const path = require('path');
const router = express.Router();
const rootdir = require('../util/path');

const products = [];

router.get('/add-product',(req, res, next) => {
      // console.log('In another middleware!');
      res.sendFile(path.join(rootdir, 'views', 'add-product.html'))
});

router.post('/add-product', (req, res, next) => {
      console.log(req.body);
      products.push({title: req.body.title})
      console.log('Arr Products',products);
      res.redirect('/');
});

exports.routes = router;
exports.products = products;