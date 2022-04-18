/**
 * @Author  Jay Bipinchandra Patel
 * @Banner  B00886902
 * @NetID   jy439129
 * @EmailId jy439129@dal.ca
 */
 const mongoose = require('mongoose')
 const Schema = mongoose.Schema;
 
 const DiscussionThreadTopicShcema = new Schema ({
     _id : mongoose.Schema.Types.ObjectId,
     userId: String,
     topic: String,
     description: String
 })
 
 module.exports = mongoose.model("TopicCollection", DiscussionThreadTopicShcema)