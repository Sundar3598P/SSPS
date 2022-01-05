import Order from '../models/orderModel.js'

import asyncHandler from 'express-async-handler'


// @desc Create new order
// @route POST / api/orders
// @access Private
const addOrderItems  = asyncHandler(async (req, res) => {
    const  {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error ('No order items')
        return
    }  else {
        //if order exist 
        const order = new Order({
            orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        })

        const createOrder = await order.save()
        res.status(201).json(createdOrder)
    }

})

// @desc Get order By ID
// @route GET / api/orders:id
// @access Private
const getOrderById  = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    
    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error ('Order not Found')
    }


})

// @desc Get Update Order to Paid
// @route GET / api/orders/:id/pay
// @access Private
const updateOrderToPaid  = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id)

   if(order) {
       order.isPaid = true 
       order.paidAt = Date.now()
       order.paymentResult = {
           id: req.body.id,
           status: req.body.status,
           update_time:req.body.update_time,
           email_address: req.body.payer.email_address,
       }

       const updateOrder = await order.save()

       res.json(updateOrder)
   } else {
       res.status(404)
       throw new Error ('Order Not Found')
   }

})

// @desc Get my Orders for loggedin user
// @route GET / api/orders/myOrders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Orders.find({ user: req.user._id })
    res.json(order)
})

// deliver here

// @desc Get Update Order to Delivered
// @route GET / api/orders/:id/deliver
// @access Private
const updateOrderToDelivered  = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
 
    if(order) {
        order.isDelivered = true 
        order.deliverdeAt = Date.now()
 
        const updateOrder = await order.save()
 
        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error ('Order Not Found')
    }
 
 })

 
// @desc Get all Orders
// @route GET / api/orders
// @access Private/AdminUser
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Orders.find({}).populate('user', 'id name')
    res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, updateOrderToDelivered }