/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
const mongoose = require('mongoose')

const courseReviewSchema = {
    _id : mongoose.Schema.Types.ObjectId,
    courseName : String,
    userName : String,
    stars : Number,
    description : String
}

module.exports = mongoose.model("Reviews", courseReviewSchema)