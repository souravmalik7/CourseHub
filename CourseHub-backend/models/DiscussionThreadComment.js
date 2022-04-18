/**
 * @Author  Jay Bipinchandra Patel
 * @Banner  B00886902
 * @NetID   jy439129
 * @EmailId jy439129@dal.ca
 */
 const mongoose = require('mongoose')
 const Schema = mongoose.Schema;
 
 const DiscussionThreadCommentShcema = new Schema ({
     _id : mongoose.Schema.Types.ObjectId,
     topicId: mongoose.Schema.Types.ObjectId,
     userId: String,
     comment: String
 })
 
 module.exports = mongoose.model("CommentCollection", DiscussionThreadCommentShcema)