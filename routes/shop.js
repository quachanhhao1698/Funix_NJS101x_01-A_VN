const express = require('express');
const path = require('path');
const { title } = require('process');
const rootdir = require('../util/path');
const router = express.Router();

const adminData = require('./admin');


router.get('/',(req, res, next) => {
      // console.log('In another middleware!');
      console.log('shop.js : ',adminData.products);
      res.sendFile(path.join(rootdir, 'views', 'shop.html'));
});

module.exports = router