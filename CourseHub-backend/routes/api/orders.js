/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.json());

const orderHistory = require('../../models/orderHistory')
const activeOrder = require('../../models/activeOrder')

router.get("/active/:email", (req, res) => { 
    // fetch all the order history for specified email id from the database
    activeOrder.find({ email: req.params.email }).exec().then(result => {
        console.log(result)
        if(! result.length) {
            return res.status(404).json({
                message: "No active orders are available for " + req.params.email,
                success: false,
            })    
        }
        return res.status(200).json({
            message: "Active orders for the " + req.params.email + " are retrieved successfully!",
            success: true,
            activeOrder: result
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
})

router.get("/history/:email", (req, res) => { 
    // fetch all the order history for specified email id from the database
    orderHistory.find({ email: req.params.email }).exec().then(result => {
        console.log(result)
        if(! result.length) {
            return res.status(404).json({
                message: "No order hisotry available for " + req.params.email,
                success: false,
            })    
        }
        return res.status(200).json({
            message: "Order History for the " + req.params.email + " are retrieved successfully!",
            success: true,
            orderHistory: result
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
})


router.post("/add", (req, res) => {
    const courseName = req.body.courseName
    const date = new Date()
    const amount = req.body.amount
    const status = req.body.status
    const email = req.body.email

    const order = new orderHistory({
        _id: new mongoose.Types.ObjectId(),
        courseName,
        date,
        amount,
        status,
        email
    })

    //save order to orderhistory table
    order.save().then(result => {
        return res.status(201).json({
            message: "Order Placed",
            success: true,
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
})

module.exports = router