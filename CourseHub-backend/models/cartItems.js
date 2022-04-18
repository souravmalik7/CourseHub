/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

const mongoose = require('mongoose')

const cartItemSchema = {
    _id : mongoose.Schema.Types.ObjectId,
    courseName : String,
    courseImage : String,
    coursePrice : String,
    courseAuthor: String
};

const cartSchema = {
    _id : mongoose.Schema.Types.ObjectId,
    userId : String,
    items : [cartItemSchema]
};


module.exports = mongoose.model("cart", cartSchema);