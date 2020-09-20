const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')
const  OrdersController=require( '../controllers/orders')

const Product = require('../models/product')

router.get('/',checkAuth,OrdersController.orders_get_all )
router.post('/',checkAuth, OrdersController.orders_create_order)
router.get('/:orderId',checkAuth,OrdersController.orders_get_by_id )
router.delete('/:orderId',checkAuth, (req, res, next) => {
    const id = req.params.orderId
    Order.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted",
                request: {
                    type: 'POST',
                    createOrder: 'http://localhost:3000/orders/',
                    body: {productId: 'ID', quantity: 'Number'}
                }
            })

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
module.exports = router;