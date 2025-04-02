import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, updateStatusReferral, userOrders, verifyRazorpay } from '../controllers/orderController.js';
import authUser from '../middleware/authUser.js';






const orderRouter=express.Router();

//Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.post('/referralUpated',adminAuth,updateStatusReferral)
//Payment Feauters
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//User Feauters
orderRouter.post('/userorders',authUser,userOrders)

//Verfiy Router
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter