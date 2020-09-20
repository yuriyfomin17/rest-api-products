const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/product')
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const ProductControllers = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
        console.log('Incorrect Format of Image. File is not stored')
    }


}
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    }, fileFilter: fileFilter
})

router.get('/', ProductControllers.products_get_all)

router.post('/', checkAuth, upload.single('productImage'), ProductControllers.products_create_product)
router.get('/:productId',checkAuth, ProductControllers.products_get_by_id)
router.patch('/:productId', checkAuth, ProductControllers.products_patch_by_id)
router.delete('/:productId', checkAuth, ProductControllers.products_delete_by_id)
module.exports = router;