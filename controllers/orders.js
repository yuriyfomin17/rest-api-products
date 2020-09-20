const Order = require('../models/order')
const Product = require('../models/product')
const mongoose = require('mongoose')
exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            _id: doc._id,
                            product: doc.product,
                            quantity: doc.quantity,
                            request: {
                                type: 'GET',
                                getMoreInfo: 'http://localhost:3000/orders/' + doc._id
                            }
                        }
                    }
                })

            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.orders_create_order = (req, res, next) => {
    const id  = req.body.productId
    Product.findById(id)
        .then(product => {

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            order
                .save().then(result => {
                console.log(result)
                res.status(201).json({
                    message: 'Order stored',
                    createdOrder: {
                        _id: result._id,
                        product: result.product,
                        quantity: result.quantity
                    },
                    request: {
                        type: 'GET',
                        getMoreInfo: 'http://localhost:3000/orders/' + result._id
                    }
                })
            })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })

        }).catch(err => {
        res.status(500).json({
            error: 'Not found'
        })
    })


}

exports.orders_get_by_id = (req, res, next) => {
    const id = req.params.orderId
    Order.findById(id)
        .populate('product', 'name')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                })
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    getAllOrders: 'http://localhost:3000/orders/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}