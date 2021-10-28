const express = require('express');
const { createProduct, getProductsBySlug } = require('../controllers/product');
//const { addCategory, getCategories } = require('../controllers/category');
const { requireSignIn, adminMiddleware } = require('../middleware');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
    //cb(null, path.join(path.dirname(__dirname),'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  '/product/create',
  requireSignIn,
  adminMiddleware,
  upload.array('productPicture'),
  createProduct
);
//router.get('/category/getCategory', getCategories);
router.get('/products/:slug',getProductsBySlug)
module.exports = router;
