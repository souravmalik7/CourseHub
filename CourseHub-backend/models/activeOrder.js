/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
const mongoose = require('mongoose')

const activeOrderSchema = {
    _id : mongoose.Schema.Types.ObjectId,
    status : String,
    email: String
}

module.exports = mongoose.model("ActiveOrder", activeOrderSchema)