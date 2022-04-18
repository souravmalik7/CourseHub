/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

const mongoose = require('mongoose')

const courseDetailsSchema = {
    _id : mongoose.Schema.Types.ObjectId,
    courseName : String,
    courseCategory : String,
    courseDescription : String,
    coursePrice : Number,
    courseImage : String,
    courseAuthor : String,
    purchasedBy : Array,
    courseDetails : String
};

module.exports = mongoose.model("Courses", courseDetailsSchema);