const express = require('express');
const path = require('path');
const { title } = require('process');
const rootdir = require('../util/path');
const router = express.Router();

const adminData = require('./admin');


router.get('/',(req, res, next) => {
      const product = adminData.products;
     res.render('shop', {prods: product,docTitle: 'Shop'});
});

module.exports = router