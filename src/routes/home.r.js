const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c');

router.get('/', productController.index);
router.get('/page', productController.getPage);


module.exports = router;